import { View, Text, useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Clock } from '@/constants/icons';
import { Button } from '@/components/ui/button';
import { OTPInput } from '../otp_input';
import { useAuth } from '@/hooks/useAuth';

export function RenderVerifyCode() {
  const { setAuthState } = useAuth();
  const colorScheme = useColorScheme();
  const [timerCount, setTimerCount] = useState<number>(45);
  const [resend, setResend] = useState<boolean>(false);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimerCount((prevState) => prevState - 1);
    }, 1000);

    if (timerCount <= 0) {
      setResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerCount]);

  return (
    <>
      <View className='flex-row items-center justify-center mb-6'>
        <Clock
          width={24}
          height={24}
          color={`${colorScheme === 'dark' ? '#f0f0f3' : '#2c2d3a'}`}
        />
        <Text className='mx-2 text-base text-neutral-900 dark:text-neutral-50 font-poppins-light'>{`00:${
          timerCount.toString().length > 1 ? timerCount : `0${timerCount}`
        }`}</Text>
        <Button
          title='Resend Code'
          labelStyle='text-secondary-900 dark:text-secondary-50 font-poppins-bold text-base underline'
          className='p-2 disabled:opacity-40'
          disabled={!resend}
        />
      </View>
      <OTPInput setValidationCode={(code) => setAuthState({ verificationCode: code })} />
    </>
  );
}
