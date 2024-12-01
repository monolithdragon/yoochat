import { colors } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  KeyboardState,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  className?: string;
};

export function AuthAnimatedBackground({ className }: Props) {
  const keyboard = useAnimatedKeyboard();
  const colorScheme = useColorScheme();

  const progress = useDerivedValue(() => {
    const isKeyboardVisible =
      keyboard.state.value === KeyboardState.OPEN || keyboard.state.value === KeyboardState.OPENING;

    return withTiming(isKeyboardVisible ? 1 : 0, {
      duration: 100,
    });
  }, [keyboard.state.value]);

  const animationStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [1000, 350]),
    top: interpolate(progress.value, [0, 1], [-647, -71]),
    borderRadius: interpolate(progress.value, [0, 1], [500, 0]),
  }));

  return (
    <Animated.View
      className={`absolute w-[1000px] flex items-center justify-center overflow-hidden border-[60px] border-secondary-50 dark:border-neutral-800 ${className}`}
      style={animationStyle}>
      <LinearGradient
        colors={colorScheme === 'light' ? colors.gradient.light : colors.gradient.dark}
        className='w-full h-full '
      />
    </Animated.View>
  );
}
