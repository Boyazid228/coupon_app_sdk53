import React, {useEffect} from 'react';
import {ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/core";
import styles from "@/assets/styles/shops.style";
import Stars from "@/components/Stars";
import ApiHook from "@/hooks/ApiHook";
import config from '@/settings'
import {router} from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import '../i18n/i18n';
import { useTranslation } from 'react-i18next';

const Shops = () => {
    const { id  } = useLocalSearchParams();
    const { t, i18n } = useTranslation();

    const { getData, data: menuData, loading: menuLoading, error: menuError } = ApiHook();
    useEffect(() => {


        const load = async ()=>{
            const loadData = await getData(`/getShops/${id}`)

        }
        load()

    }, []);


    if (menuLoading) return <ActivityIndicator style={{margin: "auto"}} size="large" color="#ffff" />;

    if (!menuData  || menuData.length === 0 && !menuLoading) {
        return (
            <View style={styles.container}>

                <Text style={styles.short}>{ t('Data_not_found') }</Text>
            </View>
        );
    }
    if (menuError) return <Text>Error: {menuError?.message}</Text>;
    function handleImagePress(id, name){
        router.push(`/card?id=${id}&name=${encodeURIComponent(name)}`);
    }



    return (

        <View style={styles.container}>
            <ScrollView style={styles.shopsBox}>
                {menuData.map(item => (
                    <TouchableOpacity key={item.id} style={styles.shop} onPress={() => handleImagePress(item.id, item.name)}>
                        <View style={styles.flex}>
                            <View>
                                <Image
                                    style={styles.img}
                                    source={{ uri: config.img_link+item.preview }}
                                    defaultSource={require('@/assets/loader/loader.gif')}
                                />

                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Stars stars_count={item.rating} />
                                <Text style={styles.short}>{item.short_description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Shops;
