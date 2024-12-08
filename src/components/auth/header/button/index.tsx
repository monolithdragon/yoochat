import React from 'react';
import { Button } from '@/components/ui/button';
import { ButtonProps } from '@/types';
import { useColorScheme } from 'react-native';
import { colors } from '@/constants/colors';

type HeaderButtonProps = {
  title: string;
  Icon?: any;
} & ButtonProps;

export function HeaderButton({ title, Icon, ...props }: HeaderButtonProps) {
  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ? colors.secondary[500] : colors.primary[500];
  return (
    <Button
      {...props}
      title={title}
      IconLeft={Icon}
      iconWidth={24}
      iconHeight={24}
      iconColor={iconColor}
      className='flex justify-center items-center px-[22px] h-[53px] rounded-full bg-secondary-50 dark:bg-neutral-900'
      labelStyle='text-lg text-primary-500 dark:text-secondary-300 font-poppins-semiBold'
    />
  );
}
