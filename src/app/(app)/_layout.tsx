import React from 'react';
import { Tabs } from 'expo-router';

export default function AppLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name='chats'
				options={{ title: 'Chats' }}
			/>
		</Tabs>
	);
}
