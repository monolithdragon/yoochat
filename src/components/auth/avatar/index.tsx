import { Image, TouchableOpacity, View } from 'react-native';
import { Avatar, PenActive } from '@/constants/icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';

type Props = {
  profileImage?: string;
  pickImage: () => Promise<void>;
};

export default function ProfileAvatar({ profileImage, pickImage }: Props) {
  return (
    <View className='flex items-center justify-center'>
      <View className='relative w-40 h-40'>
        {!profileImage ? (
          <Avatar
            width={140}
            height={140}
            color={'#fff'}
          />
        ) : (
          <Image
            source={{ uri: profileImage }}
            className='w-[8.75rem] h-[8.75rem] rounded-full'
          />
        )}
        <TouchableOpacity
          onPress={pickImage}
          className='absolute -top-2 right-0 w-[3.75rem] h-[3.75rem]  rounded-full overflow-hidden'>
          <LinearGradient
            colors={colors.gradient.dark}
            className='flex items-center justify-center w-full h-full'>
            <PenActive
              width={32}
              height={32}
              color={'#fff'}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
