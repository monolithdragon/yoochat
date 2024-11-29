import { Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { CheckboxProps } from '@/types';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Unread } from '@/constants/icons';

export function Checkbox({
  text,
  color,
  value,
  disabled = false,
  containerClassName,
  checkboxClassName,
  textClassName,
  onValueChange,
  animationConfig = { duration: 300 },
}: CheckboxProps) {
  const progress = useDerivedValue<number>(
    () => withTiming(value ? 1 : 0, animationConfig),
    [value]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  const handlePress = useCallback(() => {
    if (disabled) return;

    onValueChange?.(!value);
  }, [value, disabled, onValueChange]);

  const renderText = (
    <Text
      className={`text-base text-neutral-900 dark:text-neutral-50 font-poppins-bold ${
        disabled ? 'opacity-40' : null
      } ${textClassName}`}>
      {text}
    </Text>
  );

  return (
    <View className={`flex-row items-center flex-1 gap-x-3 ${containerClassName}`}>
      <TouchableOpacity
        onPress={handlePress}
        className={`flex items-center justify-center border-neutral-300 rounded-lg disabled:opacity-40 overflow-hidden w-6 h-6 ${checkboxClassName} ${
          value ? 'border-none' : 'border'
        }`}
        disabled={disabled}>
        <Animated.View style={animatedStyle}>
          <LinearGradient
            colors={color.active.colors}
            start={{ x: color.active.start?.x || 0, y: color.active.start?.y || 0 }}
            end={{ x: color.active.end?.x || 1, y: color.active.end?.y || 1 }}
            className={`flex-1 justify-center items-center`}>
            <Unread
              width={20}
              height={20}
              color='#fff'
            />
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
      {text && renderText}
    </View>
  );
}
