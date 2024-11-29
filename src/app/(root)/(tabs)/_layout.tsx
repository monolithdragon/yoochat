import { TabIcon } from '@/components/ui/tab_icon';
import { colors } from '@/constants/colors';
import {
  ChatDots,
  ChatDotsActive,
  Menu,
  UserCircle,
  UserCircleActive,
  UserGroup,
  UserGroupActive,
} from '@/constants/icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 100,
          backgroundColor: colorScheme === 'light' ? '#fff' : colors.neutral[800],
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderWidth: 0,
        },
        tabBarInactiveTintColor: colors.neutral[300],
        tabBarActiveTintColor: '#fff',
      }}>
      <Tabs.Screen
        name='chats'
        options={{
          title: '',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name='Chats'
              Icon={focused ? ChatDotsActive : ChatDots}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          title: '',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name='Groups'
              Icon={focused ? UserGroupActive : UserGroup}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: '',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name='Profile'
              Icon={focused ? UserCircleActive : UserCircle}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: '',
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              name='Settings'
              Icon={Menu}
              color={color}
              size={size}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
