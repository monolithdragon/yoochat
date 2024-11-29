import { View, Text, TouchableOpacity, TouchableOpacityProps, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonProps = {
  title?: string;
  IconLeft?: any;
  IconRight?: any;
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: ColorValue;
  className?: string;
  labelStyle?: string;
  useGradient?: boolean;
  gradientColors?: [string, string, ...string[]];
} & TouchableOpacityProps;

export function Button({
  title,
  IconLeft,
  IconRight,
  iconWidth,
  iconHeight,
  iconColor,
  className,
  labelStyle,
  useGradient,
  gradientColors,
  onPress,
  ...props
}: ButtonProps) {
  const renderContent = (
    <>
      {IconLeft && (
        <IconLeft
          width={iconWidth}
          height={iconHeight}
          color={iconColor}
        />
      )}
      {title && <Text className={labelStyle}>{title}</Text>}
      {IconRight && (
        <IconRight
          width={iconWidth}
          height={iconHeight}
          color={iconColor}
        />
      )}
    </>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`overflow-hidden flex flex-row items-center justify-center ${className}`}
      {...props}>
      {useGradient ? (
        <LinearGradient
          className='absolute inset-0 flex flex-row items-center justify-center gap-x-2'
          colors={gradientColors!}>
          {renderContent}
        </LinearGradient>
      ) : (
        <View className='flex flex-row items-center justify-center gap-x-2'>{renderContent}</View>
      )}
    </TouchableOpacity>
  );
}
