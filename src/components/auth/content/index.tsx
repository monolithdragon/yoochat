import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { PhoneInput } from './phone_input';

export default function AuthContent() {
  return (
    <View className='items-center justify-center flex-1'>
      <View className='w-full gap-y-6'>
        <Text className='text-xl text-center font-poppins-regular text-secondary-900 dark:text-secondary-50'>
          You will get a code via sms.
        </Text>
        <PhoneInput />
      </View>
    </View>
  );
}
