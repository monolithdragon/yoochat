import { AuthAnimatedBackground } from '@/components/auth/animated_background';
import AuthContent from '@/components/auth/content';
import { AuthHeader } from '@/components/auth/header';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-70}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className='flex h-full p-5 bg-white dark:bg-[#292929]'>
          <AuthAnimatedBackground className='-right-[248]' />
          <View className='w-full h-1/2'>
            <AuthHeader
              title='Login'
              subtitle='Enter your mobile phone'
              buttonText='Register'
              onPress={() => router.push('/sign-up')}
              className='flex-row'
            />
          </View>
          <View className='w-full h-1/2'>
            <AuthContent />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
