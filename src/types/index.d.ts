import { ColorValue, TouchableOpacityProps, TextInputProps } from 'react-native';

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

interface ContainerStyleProps {
  isFocused: boolean;
}

declare interface InputFieldProps extends TextInputProps {
  label?: string;
  IconLeft?: any;
  IconRight?: any;
  secureTextEntry?: boolean;
  className?: string;
  labelStyle?: string;
  containerStyle?: string | (({ isFocused }: ContainerStyleProps) => string);
  inputStyle?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: ColorValue;
}

interface GradientConfig {
  colors: [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

declare interface ColorConfig {
  active: GradientConfig;
}

interface CheckboxColor extends ColorConfig {
  checkMark?: string;
}

declare interface CheckboxProps {
  text?: string;
  color: CheckboxColor;
  disabled?: boolean;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  animationConfig?: WithTimingConfig;
  containerClassName?: string;
  checkboxClassName?: string;
  textClassName?: string;
}

declare interface AuthState {
  phoneNumber?: string;
  verificationCode?: string;
  verificationId?: string;
  isValidPhoneNumber?: boolean;
  rememberMe?: boolean;
}
