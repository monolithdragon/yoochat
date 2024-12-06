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
      className,
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
      <View className='mb-4'>
        {label && <Text className={labelStyle}>{label}</Text>}
        <View className={`flex flex-row items-center px-3 py-2 gap-x-3 ${containerClasses}`}>
          {IconLeft && (
            <IconLeft
              width={iconWidth}
              height={iconHeight}
              color={iconColor}
            />
          )}

          <TextInput
            className={`flex-1 items-center text-2xl text-neutral-900 dark:text-neutral-50 disabled:opacity-40 ${inputStyle}`}
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
