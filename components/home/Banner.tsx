import React from 'react';
import styles from "@/assets/styles/home.style";
import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Stars from "@/components/Stars";
import config from "@/settings";
import {router} from "expo-router";

const Banner = ({ banner, is_coupon }) => {

    let  img = config.img_link+banner.preview.replace(/\\/g, '/');

    const navigation = useNavigation();
    function handleImagePress(id, name) {
        if(is_coupon){
            router.push(`/cuponPage?id=${id}&name=${encodeURIComponent(name)}`);


        }else{
            router.push(`/card?id=${id}`);

        }
    }
    return (
        <TouchableOpacity style={styles.banner} onPress={() => handleImagePress(banner.id, banner.name)}>

            <ImageBackground
                source={{ uri: img }}
                style={styles.backgroundImage}
                defaultSource={require('@/assets/loader/loader.gif')} // Fallback image
            >

                <Stars stars_count={banner.rating}/>

            </ImageBackground>

            <View style={styles.bannerText}>
                <Text style={styles.text}>{banner.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default Banner;