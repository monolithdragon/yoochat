import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='chats'
        options={{ title: 'Chats' }}
      />
      <Tabs.Screen
        name='groups'
        options={{ title: 'Groups' }}
      />
      <Tabs.Screen
        name='profile'
        options={{ title: 'Profile' }}
      />
      <Tabs.Screen
        name='settings'
        options={{ title: 'Settings' }}
      />
    </Tabs>
  );
}
