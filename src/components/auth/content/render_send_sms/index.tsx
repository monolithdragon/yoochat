import React from 'react';
import { Text } from 'react-native';
import { PhoneInput } from '../phone_input';

export function RenderSendSms() {
  return (
    <>
      <Text className='mb-6 text-xl text-center font-poppins-regular text-secondary-900 dark:text-secondary-50'>
        You will get a code via sms.
      </Text>
      <PhoneInput />
    </>
  );
}
