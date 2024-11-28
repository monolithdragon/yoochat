import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
    <SafeAreaView className='flex-1 container mx-auto bg-white dark:bg-[#292929]'>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}
