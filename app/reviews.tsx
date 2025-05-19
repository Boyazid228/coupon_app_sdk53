import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    Image,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import styles from '@/assets/styles/reviews';
import {router, useLocalSearchParams} from 'expo-router';
import { useTranslation } from 'react-i18next';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import Stars from "@/components/Stars";
import ApiHook from '@/hooks/ApiHook';
import PostApiHook from '@/hooks/PostApiHook';
import MyReviews from '@/components/MyReviews';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthTokenRefresh from "@/hooks/useAuthTokenRefresh";


const Reviews = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { id, type } = useLocalSearchParams();
    const { getData, data: reviewsData, loading: reviewsLoading, error: reviewsError } = ApiHook();
    const [modalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation();
    const [errorPassword, setErrorPassword] = useState(false);
    const { postData, loading } = PostApiHook(`/reviews/${id}/${type}/`);
    const richText = useRef<RichEditor | null>(null);
    const [starts, setStars] = useState(0)
    const [apiError, setApiError] = useState('');
    const [shop , setShop] = useState(id)
    const [product , setProduct] = useState(id)
    const [user_, setUser] = useState()
    const { refresh } = useAuthTokenRefresh();
    const [reviewText, setReviewText] = useState('');


    useEffect(() => {
        const load = async () => {
            await getData(`/reviews/${id}/${type}/`);
            if (type == "shop"){
                setShop(id)
                setProduct(null)
            }else{
                setShop(null)
                setProduct(id)
            }

            const jsonValue = await AsyncStorage.getItem('tokens');
            if (!jsonValue) {
                router.navigate('login');
                return;
            }

            const tokenParse = JSON.parse(jsonValue);
            const user = await postData({ token: tokenParse.access }, tokenParse.access, '/getUser/');
            if (user?.code === 'token_not_valid') {
                const newAccessToken = await refresh();
                if (!newAccessToken) {
                    router.navigate('login');
                    return;
                }
            }
            setUser(user)
            setRefreshing(false);
        };
        load();
    }, [refreshing]);

    const handleRefresh = async () => {
        setRefreshing(true);
    };

    const validateInputs = () => {
        const plainText = reviewText.replace(/<[^>]*>?/gm, '').trim();
        const isValid = plainText !== '';
        setErrorPassword(!isValid);
        return isValid;
    };

    const handleSubmitReview  = async () => {
        if (!validateInputs()) return;

        setApiError('');

        try {
            const content = await richText.current?.getContentHtml();
            const response = await postData({ grade: starts, description: content, user: user_.id, shop: shop, product:product});

            if (response?.id) {
                setModalVisible(false);
                await getData(`/reviews/${id}/${type}/`);
            } else {
                setApiError('Failed to submit review. Please try again.');
            }
        } catch (e) {
            console.error('Review submission error:', e);
            setApiError('An error occurred. Please try again later.');
        }
    };
    const closeModal = () => {

        handleSubmitReview()


    };

    const hideKeyboard = () => {
        richText.current?.blurContentEditor?.();
        Keyboard.dismiss();
    };

    if (reviewsLoading) return <ActivityIndicator style={{ margin: 'auto' }} size="large" color="#ffff" />;
    if (reviewsError) return <Text>Error: {reviewsError?.message}</Text>;

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
                <View style={styles.add_rew}>
                    <TouchableOpacity style={styles.header} onPress={() => setModalVisible(true)}>
                        <Image style={styles.img} source={require('@/assets/images/add-file.png')} />
                        <Text >{t('Add_review')}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <ScrollView style={styles.cuponBox}>
                        {reviewsData && reviewsData.length > 0 ? (
                            reviewsData.map((item) => <MyReviews data={item} key={item.id} />)
                        ) : (
                            <Text>{t('Data_not_found')}</Text>
                        )}
                    </ScrollView>
                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.header}>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Image style={styles.close} source={require('@/assets/images/close.png')} />
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={styles.label}>{ t('Reviews') }</Text>

                                    <View style={styles.review_score}>
                                        <Text style={styles.text}>{ t('rate') }</Text>
                                        <Stars style={ styles.starts } stars_count={starts} call_back={setStars}/>
                                    </View>


                                    <RichToolbar
                                        editor={richText}
                                        actions={[
                                            actions.setBold,
                                            actions.setItalic,
                                            actions.setUnderline,
                                            actions.heading1,
                                            actions.insertBulletsList,
                                            actions.insertOrderedList,
                                            actions.insertLink,
                                            actions.undo,
                                            actions.redo,
                                        ]}
                                        iconMap={{
                                            [actions.setBold]: () => <Text style={{ fontWeight: 'bold' }}>B</Text>,
                                            [actions.setItalic]: () => <Text style={{ fontStyle: 'italic' }}>I</Text>,
                                            [actions.setUnderline]: () => <Text style={{ textDecorationLine: 'underline' }}>U</Text>,
                                            [actions.heading1]: () => <Text style={{ fontWeight: 'bold', fontSize: 16 }}>H1</Text>,
                                        }}
                                    />


                                    <RichEditor
                                        ref={richText}
                                        initialHeight={200}
                                        onInitialized={() => console.log("Editor ready")}
                                        placeholder={ t('review_area') }
                                        onChange={(text) => setReviewText(text)}
                                        style={{
                                            borderColor: '#ccc',
                                            borderWidth: 1,
                                            backgroundColor: '#fff',
                                            width: '100%',
                                        }}
                                    />
                                    {errorPassword && (
                                        <Text style={styles.error}>{ t('error_blank') }</Text>
                                    )}


                                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                        <Text style={styles.modalText}>{ t('Submit') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
};

export default Reviews;
