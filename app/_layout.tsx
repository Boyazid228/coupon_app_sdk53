import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import '../i18n/i18n'; 
import { useTranslation } from 'react-i18next';
import MyReviews from "@/app/myReviewsUser";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{
              headerStyle: {
                  backgroundColor: '#fff', // белый фон хедера
              },
              headerTintColor: '#000', // цвет текста и кнопки "назад"
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }}>
              <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
              <Stack.Screen name="card" options={{headerShown: false}}/>
              <Stack.Screen name="cuponPage" options={{headerShown: false}}/>
              <Stack.Screen name="shops" options={{title: t('Shops'), headerBackTitle: t('back')}}/>
              <Stack.Screen name="reviews" options={{title: t('Reviews'), headerBackTitle: t('back')}}/>
              <Stack.Screen name="vlogPage" options={{headerShown: false}}/>
              <Stack.Screen name="signup" options={{title: t('Sing_up'), headerBackTitle: t('back')}}/>
              <Stack.Screen name="login" options={{title: t('Sing_in'), headerBackTitle: t('back')}}/>
              <Stack.Screen name="orders" options={{title: t('My_orders'), headerBackTitle: t('back')}}/>
              <Stack.Screen name="myReviewsUser" options={{title: t('My_reviews'), headerBackTitle: t('back')}}/>
              <Stack.Screen name="+not-found"/>
          </Stack>
          <StatusBar style="auto"/>
      </ThemeProvider>
  );
}
