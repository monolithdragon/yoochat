import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

type HeaderProps = {
  title: string;
  subtitle: string;
  phoneNumber?: string;
  buttonText: string;
  IconLeft?: any;
  onPress?: () => void;
  className?: string;
  subtitleClassname?: string;
} & ButtonProps;

export function AuthHeader({
  title,
  subtitle,
  phoneNumber,
  buttonText,
  IconLeft,
  onPress,
  className,
  subtitleClassname,
  ...props
}: HeaderProps) {
  return (
    <View className='p-3 gap-y-6'>
      <View className={`flex items-center justify-between w-full ${className}`}>
        <Text className='text-4xl leading-[3rem] text-white dark:text-secondary-300 font-poppins-bold'>
          {title}
        </Text>
        <Button
          title={buttonText}
          onPress={onPress}
          IconLeft={IconLeft}
          className='items-center px-[22px] h-[53px] rounded-full bg-secondary-50 dark:bg-neutral-900'
          labelStyle='text-lg text-primary-500 dark:text-secondary-300 font-poppins-semiBold'
          {...props}
        />
      </View>
      <View className='gap-y-2'>
        <Text
          className={`text-[32px] text-white dark:text-secondary-300 font-poppins-medium ${subtitleClassname}`}>
          {subtitle}
        </Text>
        {phoneNumber && (
          <Text
            className={`text-xl text-white font-poppins-medium ${subtitleClassname}`}>{`Sent to: ${phoneNumber}`}</Text>
        )}
      </View>
    </View>
  );
}
