import { TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { InputField } from '@/components/ui/input_field';
import { InputFieldProps } from '@/types';

type OTPInputProps = {
  setValidationCode: (code: string) => void;
  error?: boolean;
} & InputFieldProps;

export function OTPInput({ setValidationCode, error, ...props }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp);
    setValidationCode(newOtp.join(''));

    // If user types a digit, focus to the next input
    if (text && index < otp.length - 1) {
      inputRefs[index + 1].current?.focus();
    } else if (!text && index > 0) {
      // If backspace, move to the previous input
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <View className='flex flex-row gap-x-3'>
      {otp.map((digit, index) => (
        <InputField
          key={index}
          ref={inputRefs[index]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType='number-pad'
          maxLength={1}
          containerStyle={({ isFocused }) =>
            [
              isFocused ? 'border-secondary-500' : 'border-neutral-900 dark:border-neutral-50',
              'border-b-2 w-11',
              `${error ? 'border-danger-500' : ''}`,
            ]
              .filter(Boolean)
              .join(' ')
          }
          inputStyle='text-3xl font-semibold'
          {...props}
        />
      ))}
    </View>
  );
}
