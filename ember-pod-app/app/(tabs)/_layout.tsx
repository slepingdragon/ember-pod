import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -2 }} {...props} />;
}

/**
 * Blurred translucent tab bar background — matches the glass aesthetic of
 * the rest of the app. Sits over the ambient gradient at root.
 */
function GlassTabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView
        intensity={40}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(5,5,5,0.55)' },
        ]}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopColor: 'rgba(255,255,255,0.08)',
          borderTopWidth: 1,
          backgroundColor: 'transparent',
          elevation: 0,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingTop: 8,
        },
        tabBarBackground: () => <GlassTabBarBackground />,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-square" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
