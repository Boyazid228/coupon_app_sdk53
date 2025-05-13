import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import '../../i18n/i18n';
import { useTranslation } from 'react-i18next';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t, i18n } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        //tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({

          ios: {
            backgroundColor: '#fff',
          },
          android: {
            backgroundColor: '#fff',
            elevation: 0,
          },
          default: {
            backgroundColor: '#fff',
          }
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('Home') ,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"#0c6671"} />
          ),
          tabBarActiveTintColor: "#0c6671"
        }}
      />
        <Tabs.Screen
            name="vlog"
            options={{
                title: t('Vlog'),
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'library' : 'library-outline'} color={"#0c6671"} />
                ), tabBarActiveTintColor: "#0c6671"
            }}
        />


        <Tabs.Screen
            name="map"
            options={{
                title: t('Near_me'),
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'map' : 'map-outline'} color={"#0c6671"} />
                ), tabBarActiveTintColor: "#0c6671"
            }}
        />


        <Tabs.Screen
            name="favorits"
            options={{
                title: t('Favorites'),
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={"#0c6671"} />
                ), tabBarActiveTintColor: "#0c6671"
            }}
        />




      <Tabs.Screen
        name="account"
        options={{
          title: t('Account'),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={"#0c6671"} />
          ), tabBarActiveTintColor: "#0c6671"
        }}
      />
    </Tabs>
  );
}
