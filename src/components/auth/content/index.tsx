import { View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { PhoneInput } from './phone_input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@/constants/icons';

const PHONE_VALIDATION = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 11,
};

type AuthState = {
  phoneNumber: string | undefined;
  verificationCode: string | undefined;
  isValidPhoneNumber: boolean;
  rememberMe: boolean;
};

export default function AuthContent() {
  const [state, setState] = useState<AuthState>({
    phoneNumber: undefined,
    verificationCode: undefined,
    isValidPhoneNumber: false,
    rememberMe: false,
  });

  const validatePhoneNumber = useCallback((number: string) => {
    const cleaned = number.replace(/\D/g, '');
    return (
      cleaned.length >= PHONE_VALIDATION.MIN_LENGTH && cleaned.length <= PHONE_VALIDATION.MAX_LENGTH
    );
  }, []);

  // const formatFullNumber = useCallback(
  //   (number: string) => {
  //     const cleaned = number.replace(/\D/g, '');
  //     return `${countryCode}${cleaned}`;
  //   },
  //   [countryCode]
  // );

  const handlePhoneNumberChange = useCallback((number: string) => {
    const sanitizedNumber = number.replace(/[^\d\s]/g, '');
    setState((prev) => ({
      ...prev,
      phoneNumber: sanitizedNumber,
      isValidPhoneNumber: validatePhoneNumber(sanitizedNumber),
    }));
  }, []);

  const renderPhoneInput = (
    <>
      <Text className='text-xl text-center font-poppins-regular text-secondary-900 dark:text-secondary-50'>
        You will get a code via sms.
      </Text>
      <PhoneInput
        value={state.phoneNumber}
        onChangeText={(value) => handlePhoneNumberChange(value)}
      />
    </>
  );

  return (
    <View className='items-center justify-center flex-1'>
      <View className='w-full gap-y-5'>
        {renderPhoneInput}
        <View className='flex flex-row items-center justify-between w-full'>
          <Checkbox
            text='Remember Me'
            color={{ active: { colors: ['#40C4FF', '#03A9F4'] } }}
            value={state.rememberMe}
            onValueChange={() => setState((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))}
          />
          <Button
            IconLeft={ArrowRight}
            iconColor='#fff'
            iconWidth={32}
            iconHeight={32}
            className='w-[3.75rem] h-[3.75rem] rounded-full disabled:opacity-40'
            useGradient
            gradientColors={['#40C4FF', '#03A9F4']}
            disabled={state.isValidPhoneNumber}
          />
        </View>
      </View>
    </View>
  );
}
