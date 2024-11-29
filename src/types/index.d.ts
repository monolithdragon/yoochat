import { ColorValue, TouchableOpacityProps } from 'react-native';

declare interface ButtonProps extends TouchableOpacityProps {
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
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  IconLeft?: any;
  IconRight?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string | (({ isFocused }: ContainerStyleProps) => string);
  inputStyle?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: ColorValue;
}
