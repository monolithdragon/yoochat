import { View, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { InputField } from '@/components/ui/input_field';
import { User } from '@/constants/icons';
import { colors } from '@/constants/colors';

type Props = {
  setUsername: (text: string) => void;
};

export default function RenderCreateUser({ setUsername }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ? colors.neutral[50] : colors.neutral[900];

  return (
    <View
      className={`flex flex-row items-center gap-x-3 w-full h-[3.75rem] ${
        isFocused ? 'border-secondary-500' : 'border-neutral-900 dark:border-neutral-100'
      } border-b-2`}>
      <InputField
        IconLeft={User}
        iconWidth={32}
        iconHeight={32}
        iconColor={iconColor}
        placeholder='Enter your name'
        inputStyle='text-neutral-900 dark:text-neutral-50'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => setUsername(text)}
      />
    </View>
  );
}
