import { View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type TabIconProps = {
  Icon: any;
  color: string;
  name: string;
  focused: boolean;
  size?: number;
};

export function TabIcon({ Icon, color, name, focused, size }: TabIconProps) {
  return (
    <View
      className={`flex items-center justify-center gap-y-2 w-[70px] h-[70px] rounded-xl overflow-hidden ${
        Platform.OS === 'web' ? null : 'mt-[4.5rem]'
      }`}>
      {focused && (
        <LinearGradient
          colors={['#40C4FF', '#03A9F4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className='absolute inset-0 -z-10'
        />
      )}

      <Icon
        color={color}
        width={size}
        height={size}
      />
      <Text
        className={`text-xs ${focused ? 'font-poppins-semiBold' : 'font-poppins-regular'}`}
        style={{ color: color }}>
        {name}
      </Text>
    </View>
  );
}
