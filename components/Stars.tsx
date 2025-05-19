import React from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import styles from "@/assets/styles/home.style";
import {asyncWrapProviders} from "async_hooks";

const Stars = ({stars_count, call_back = null}) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if(i <= stars_count){
            stars.push(
                <TouchableOpacity key={i}  style={styles.stars} onPress={()=>call_back(i)}>
                    <Image style={styles.star}  source={ require("@/assets/images/star.png") }/>
                </TouchableOpacity>
            );
        }else {
            stars.push(
                <TouchableOpacity key={i} style={styles.stars} onPress={()=>call_back(i)} >
                    <Image style={styles.star}   source={ require("@/assets/images/star-empty.png") }/>
                </TouchableOpacity>
            );

        }

    }
    return (
        <View style={styles.score}>
            <View style={styles.stars}>
                {stars}
            </View>
        </View>
    );
};

export default Stars;