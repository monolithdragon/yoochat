import { AuthAnimatedBackground } from '@/components/auth/animated_background';
import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderButton } from '@/components/auth/header/button';
import { colors } from '@/constants/colors';
import { ArrowRight } from '@/constants/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RenderSendSms } from '@/components/auth/content/render_send_sms';
import { RenderVerifyCode } from '@/components/auth/content/render_verifycode';

export default function SignIn() {
  const { authState, setAuthState, signInWithPhone, verifyCode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!authState.isValidPhoneNumber) {
      Alert.alert('Hiba', 'Kérjük, adj meg egy érvényes telefonszámot!');
      return;
    }

    setIsLoading(true);

    try {
      const confirmation = await signInWithPhone(authState.phoneNumber!);
      setAuthState({
        verificationId: confirmation.verificationId!,
      });
      Alert.alert('Sikeres', 'Az SMS kód elküldve!');
    } catch (error: any) {
      console.error('SMS küldési hiba:', error);
      Alert.alert('Hiba', 'Nem sikerült elküldeni az SMS-t. Kérjük, próbáld újra!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!authState.verificationCode) return;

    setIsLoading(true);

    try {
      await verifyCode(authState.verificationId!, authState.verificationCode!);
      router.push('/(root)/(tabs)/chats');
    } catch (error: any) {
      console.error('Kód ellenőrzési hiba:', error);
      Alert.alert('Hiba', 'Helytelen kód! Kérjük, próbáld újra.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-100}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView className='flex h-full p-5 bg-white dark:bg-[#292929]'>
          <AuthAnimatedBackground className='-right-[248]' />
          <View className='w-full h-1/2'>
            <View className='p-3 gap-y-6'>
              <View className='flex flex-row items-center justify-between'>
                <Text className='text-4xl leading-[3rem] text-white dark:text-secondary-300 font-poppins-bold'>
                  Login
                </Text>
                <HeaderButton
                  title='Register'
                  onPress={() => router.push('/sign-up')}
                />
              </View>
              <View>
                <Text className='text-[32px] text-white dark:text-secondary-300 font-poppins-medium'>
                  {!authState.verificationId ? 'Enter your mobile phone' : 'Enter OTP Code'}
                </Text>
                {authState.verificationId && authState.phoneNumber && (
                  <Text className='text-xl text-white dark:text-secondary-300 font-poppins-medium '>{`Sent to: ${authState.phoneNumber}`}</Text>
                )}
              </View>
            </View>
          </View>
          <View className='w-full h-1/2'>
            <View className={`items-center justify-center flex-1 ${isLoading ? 'opacity-50' : ''}`}>
              {!authState.verificationId ? <RenderSendSms /> : <RenderVerifyCode />}
              <View className='flex flex-row items-center justify-between w-full mt-6'>
                <Checkbox
                  text='Remember Me'
                  color={{ active: { colors: ['#40C4FF', '#03A9F4'] } }}
                  value={authState.rememberMe}
                  onValueChange={() => setAuthState({ rememberMe: !authState.rememberMe })}
                  disabled={isLoading}
                />
                <Button
                  IconLeft={ArrowRight}
                  iconColor='#fff'
                  iconWidth={32}
                  iconHeight={32}
                  className='w-[3.75rem] h-[3.75rem] rounded-full disabled:opacity-40'
                  useGradient
                  gradientColors={colors.gradient.light}
                  disabled={!authState.isValidPhoneNumber || isLoading}
                  onPress={!authState.verificationId ? handleSendCode : handleVerifyCode}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
