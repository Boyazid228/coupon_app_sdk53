import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

const resources = {
    en: {
        translation: {
            welcome: 'Welcome',
            Hot: 'Hot',
            Best_Sellers: 'Best Sellers',
            Most_visited_places : 'Most visited places',
            Copyright: 'Copyright. All Rights Reserved.',
            Korean_food: 'Korean food',
            Search: 'Search',
            Home: 'Home',
            Vlog: 'Vlog',
            Near_me: 'Near Me',
            Favorites: 'Favorites',
            Account: 'Account',
            You_are_here: 'You are here ',
            My_Favorites: 'My Favorites',
            My_Account: 'My Account',
            Log_out: 'Log out',
            My_Vlog: 'My Vlog',
            My_Orders: 'My Orders',
            My_Reviews: "My Reviews",
            Payment: 'Payment',
            Return_condition: 'Return condition',
            Sale: 'Sale',
            FAQ : 'FAQ',
            Sing_in: 'Sing in',
            Sing_up: 'Sing up',
            Shops: 'Shops',
            Reviews: 'Reviews',
            back: 'back',
            Data_not_found: 'Data not found',
            Info: 'Info',
            Like: 'Like',
            Read_Reviews: 'Read Reviews',
            Buy: 'Buy',
            Add_review: 'Add review',
            Welcome_back : 'Welcome back',
            Welcome_text: 'We\'re so excited to see you again!',
            Login: 'Login',
            Password: 'Password',
            Enter_your_username: 'Enter your username',
            Enter_your_password: 'Enter your password',
            error_blank: 'The field cannot be blank.',
            Submit: 'Submit',
            error_login: 'Invalid username or password. Please try again.',
            error_login2 : 'An error occurred. Please try again later.',
            sing: 'We\'re so excited to see you!',
            review_area: 'Write your review...',
            rate: 'Click to rate',
            My_orders : 'My orders',
            My_reviews: 'My reviews'
        },
    },
    ko: {
        translation: {
            welcome: '어서 오세요',
            Hot: '뜨거운',
            Best_Sellers: '베스트셀러',
            Most_visited_places : '가장 많이 방문한 장소',
            Copyright: '저작권. 모든 권리 보유.',
            Korean_food: '한국 음식',
            Search: '검색',
            Home: '홈',
            Vlog: '브이로그',
            Near_me: '내 근처',
            Favorites: '찜',
            Account: '계정',
            You_are_here: '나',
            My_Favorites: '내가 즐겨찾는 것',
            Log_out: '로그아웃',
            My_Account: '계정',
            My_Vlog: '내 블로그',
            My_Orders: '내 주문',
            My_Reviews: "내 리뷰",
            Payment: '지불',
            Return_condition: '반품 조건',
            Sale: '판매',
            FAQ : '자주 묻는 질문',
            Sing_in: '로그인',
            Sing_up: '가입',
            Reviews: '리뷰',
            Shops: '상점',
            back: '백',
            Data_not_found: '데이터를 찾을 수 없습니다',
            Info: '정보',
            Like: '라이크',
            Read_Reviews: '리뷰 읽기',
            Buy: '구입',
            Add_review: '리뷰 하기',
            Welcome_back : '돌아온 것을 환영합니다',
            Welcome_text: '다시 만나 뵙게 되어 정말 반갑습니다!',
            Login: '로그인',
            Password: '비밀번호',
            Enter_your_username: '사용자 이름을 입력하세요',
            Enter_your_password: '비밀번호를 입력하세요.',
            error_blank: '필드는 비워 둘 수 없습니다',
            Submit: '제출하기',
            error_login: '사용자 이름 또는 비밀번호가 잘못되었습니다. 다시 시도해 주세요.',
            error_login2 : '오류가 발생했습니다. 나중에 다시 시도해 주세요.',
            sing: '여러분을 만나게 되어 매우 기쁩니다!',
            review_area: '리뷰 작성하기...',
            rate: '평가하려면 클릭',
            My_orders : '내 주문',
            My_reviews: '내 리뷰'
        },
    },

};

const languageDetector = {
    type: 'languageDetector' as const,
    async: true,
    detect: async (callback: (lang: string) => void) => {
        const savedLang = await AsyncStorage.getItem('user-language');
        if (savedLang) {
            callback(savedLang);
        } else {
            const locale = Localization.locale.split('-')[0]; // "en-US" → "en"
            const bestLang = Object.keys(resources).includes(locale) ? locale : 'en';
            callback(bestLang);
        }
    },
    init: () => {},
    cacheUserLanguage: (lng: string) => {
        AsyncStorage.setItem('user-language', lng);
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
