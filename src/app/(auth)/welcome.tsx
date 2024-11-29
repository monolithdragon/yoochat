import { Button } from '@/components/ui/button';
import { onboarding } from '@/constants/onboarding';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

export default function Onboarding() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className='container relative flex-1 mx-auto bg-secondary-500 dark:bg-primary-500'>
      <View className='absolute border-[50px] bg-white dark:bg-[#292929] w-[700px] h-[700px] rounded-full border-secondary-50 dark:border-neutral-900 -top-1/3 left-1/2 -translate-x-1/2' />
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className='w-2.5 h-2.5 mx-1 rounded-full bg-secondary-300' />}
        activeDot={
          <View className='w-3.5 h-3.5 mx-1 border-2 rounded-full bg-secondary-500 border-secondary-300' />
        }
        onIndexChanged={(index) => setActiveIndex(index)}>
        {onboarding.map((item) => (
          <View
            key={item.id}
            className='items-center justify-center px-5 mt-20 gap-y-20'>
            <Image
              source={item.image}
              className='w-full'
              resizeMode='contain'
            />
            <View className='flex items-center justify-center w-full gap-y-4'>
              <Text className='text-2xl text-center font-poppins-bold text-primary-500 dark:text-secondary-300'>
                {item.title}
              </Text>
              <Text className='text-lg text-center font-poppins-regular text-primary-500 dark:text-secondary-300'>
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View className='flex flex-row items-center justify-between w-full px-5 py-4'>
        {!isLastSlide && (
          <Button
            title='Skip'
            onPress={() => {
              router.replace('/(auth)/sign-in');
            }}
            className='w-[60px] h-[60px]'
            labelStyle='text-base text-secondary-600 font-poppins-bold'
          />
        )}
        <Button
          title={isLastSlide ? 'Get Started' : 'Next'}
          className={`h-[60px] shadow-lg shadow-black/15 rounded-full ${
            isLastSlide ? 'w-full' : 'w-[60px] bg-secondary-300 dark:bg-secondary-200'
          }`}
          onPress={() =>
            isLastSlide ? router.replace('/(auth)/sign-in') : swiperRef.current?.scrollBy(1)
          }
          useGradient={isLastSlide}
          gradientColors={['#40C4FF', '#03A9F4']}
          labelStyle={
            isLastSlide
              ? 'text-white dark:text-[#292929] font-poppins-bold text-xl'
              : 'text-secondary-900 font-poppins-medium text-base'
          }
        />
      </View>
    </SafeAreaView>
  );
}
