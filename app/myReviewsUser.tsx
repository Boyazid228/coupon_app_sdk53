import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    TouchableOpacity, RefreshControl, ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostApiHook from '@/hooks/PostApiHook';
import useAuthTokenRefresh from '@/hooks/useAuthTokenRefresh';
import config from '@/settings';
import Stars from '@/components/Stars';
import styles from '@/assets/styles/shops.style';
import { router } from 'expo-router';
import '../i18n/i18n';
import { useTranslation } from 'react-i18next';
import ApiHook from "@/hooks/ApiHook";
import MyReviews from "@/components/MyReviews";

const MyReviewsUser = () => {
    const navigation = useNavigation();
    const {getData, data: data, loading: ordersLoading, error: menuError } = ApiHook();
    const { postData } = PostApiHook("");
    const { refresh } = useAuthTokenRefresh();
    const [orders, setOrders] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { t, i18n } = useTranslation();

    const fetchLikes = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('tokens');
            if (!jsonValue) {
                router.navigate('login');
                return;
            }

            const tokenParse = JSON.parse(jsonValue);
            const user = await postData({ token: tokenParse.access }, tokenParse.access, '/getmyreviews/');
            if (user?.code === 'token_not_valid') {
                const newAccessToken = await refresh();
                if (!newAccessToken) {
                    router.navigate('login');
                    return;
                }
            }


            const ordersResponse = await getData('/getmyreviews/', tokenParse.access)
            console.log(ordersResponse)
            setOrders(ordersResponse || []);
        } catch (error) {
            console.error('Error fetching likes:', error);
        } finally {
            setLoadingData(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoadingData(true);
            fetchLikes();
        }, [refreshing])
    );

    const handleRefresh = async () => {
        setRefreshing(true);

    };



    if (!orders.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.short}>{ t('Data_not_found') }</Text>
            </View>
        );
    }

    const handleImagePress = (id, name) => {
        router.push(`/card?id=${id}&name="${name}"`);
    };



    return (
        <View style={styles.container}>

            <ScrollView style={{ width: "90%", margin: "auto" }}  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }>
                {(!orders || (orders.length === 0 && !ordersLoading)) ? <Text  style={styles.ntf}>{t('Data_not_found')}</Text> : <View  style={styles.box}>
                        { orders.map(i => (



                                <MyReviews  key={i.id}  data={i}/>


                        ))}
                </View>
                }
            </ScrollView>
        </View>
    );
};

export default MyReviewsUser;
