import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "@/assets/styles/login.style";
import PostApiHook from "@/hooks/PostApiHook";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router, Stack} from 'expo-router';
import { NavigationContext } from "@react-navigation/native";
import '../i18n/i18n';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const navigation = useNavigation();


    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const { postData, loading } = PostApiHook(`/token/`);
    const { t, i18n } = useTranslation();
    const validateInputs = () => {
        const isLoginValid = login.trim() !== '';
        const isPasswordValid = password.trim() !== '';

        setErrorLogin(!isLoginValid);
        setErrorPassword(!isPasswordValid);

        return isLoginValid && isPasswordValid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) return;

        setApiError(''); // Reset API error before login

        try {
            const response = await postData({ username: login, password: password });

            if (response?.access) {
                // Save tokens to AsyncStorage
                try {
                    const jsonValue = JSON.stringify(response);
                    await AsyncStorage.setItem('tokens', jsonValue);
                } catch (storageError) {
                    console.error('Error saving tokens to AsyncStorage:', storageError);
                }

                // Navigate to account screen
                router.push(`/account?login=true`);
            } else {
                setApiError(t('error_login'));
            }
        } catch (e) {
            console.error('Login error:', e);
            setApiError(t('error_login2'));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentBox}>
                <Text style={styles.title}>{ t('Welcome_back') }</Text>
                <Text style={styles.sub_title}>{ t('Welcome_text') }</Text>

                {/* Display API error */}
                {apiError ? (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorBoxText}>{apiError}</Text>
                    </View>
                ) : null}

                {/* Username Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.label}>{ t('Login') }</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={ t('Enter_your_username') }
                        placeholderTextColor="gray"
                        onChangeText={setLogin}
                        value={login}
                    />
                    {errorLogin && (
                        <Text style={styles.error}>{ t('error_blank') }</Text>
                    )}
                </View>

                {/* Password Input */}
                <View style={styles.inputBox}>
                    <Text style={styles.label}>{ t('Password') }</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={ t('Enter_your_password') }
                        placeholderTextColor="gray"
                        secureTextEntry // Masks the password input
                        onChangeText={setPassword}
                        value={password}
                    />
                    {errorPassword && (
                        <Text style={styles.error}>{ t('error_blank') }</Text>
                    )}
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.searchButtonText}>{ t('Submit') }</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Login;
