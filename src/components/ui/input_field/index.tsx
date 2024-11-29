import { View, Text, TextInput, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { InputFieldProps } from '@/types';

export const InputField = React.forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      IconLeft,
      IconRight,
      secureTextEntry,
      labelStyle,
      containerStyle,
      inputStyle,
      iconWidth = 24,
      iconHeight = 24,
      iconColor,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const colorScheme = useColorScheme();

    const placeholderColor =
      colorScheme === 'dark' ? 'rgba(240, 240, 243, 0.3)' : 'rgba(44, 45, 58, 0.3)';

    let containerClasses: string | undefined;
    if (typeof containerStyle === 'function') {
      containerClasses = containerStyle({ isFocused: isFocused });
    } else {
      containerClasses = containerStyle;
    }

    return (
      <View className={`w-full flex justify-center ${label ? 'h-20' : 'h-[60px]'}`}>
        {label && (
          <Text
            className={`text-left text-neutral-500 dark:text-neutral-50 font-poppins-regular ${labelStyle}`}>
            {label}
          </Text>
        )}
        <View
          className={`flex flex-row justify-start items-center w-full gap-x-3 ${containerClasses}`}>
          {IconLeft && (
            <IconLeft
              width={iconWidth}
              height={iconHeight}
              color={iconColor}
            />
          )}

          <TextInput
            className={`flex-1 items-stretch p-4 text-xl text-neutral-900 dark:text-neutral-50 ${inputStyle}`}
            placeholderTextColor={placeholderColor}
            secureTextEntry={secureTextEntry}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            ref={ref}
            {...props}
          />

          {IconRight && (
            <IconRight
              width={iconWidth}
              height={iconHeight}
              color={iconColor}
            />
          )}
        </View>
      </View>
    );
  }
);
