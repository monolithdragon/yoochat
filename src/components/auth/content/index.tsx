import { Alert, View } from 'react-native';
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@/constants/icons';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/constants/colors';
import { RenderSendSms } from './render_send_sms';
import { RenderVerifyCode } from './render_verifycode';

export function AuthContent() {
  const { authState, setAuthState, signInWithPhone, verifyCode, user } = useAuth();
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
      Alert.alert('Logged in successfully!');
    } catch (error: any) {
      console.error('Kód ellenőrzési hiba:', error);
      Alert.alert('Hiba', 'Helytelen kód! Kérjük, próbáld újra.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='items-center justify-center flex-1'>
      <View className='w-full'>
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
  );
}
