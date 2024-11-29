import { View, Text, TextInputProps } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { countryCodes } from '@/constants/countries';
import { InputField } from '@/components/ui/input_field';

type PhoneInputProps = {
  defaultCountry?: string;
} & TextInputProps;

const PHONE_VALIDATION = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 11,
};

export function PhoneInput({ defaultCountry = 'HU', ...props }: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState(
    countryCodes.find((country) => country.code === defaultCountry)?.dial_code
  );

  const validatePhoneNumber = useCallback((number: string) => {
    const cleaned = number.replace(/\D/g, '');
    return (
      cleaned.length >= PHONE_VALIDATION.MIN_LENGTH && cleaned.length <= PHONE_VALIDATION.MAX_LENGTH
    );
  }, []);

  const formatFullNumber = useCallback(
    (number: string) => {
      const cleaned = number.replace(/\D/g, '');
      return `${countryCode}${cleaned}`;
    },
    [countryCode]
  );

  const dropdownItems = useMemo(
    () =>
      countryCodes.map((country) => ({
        flag: `${country.flag}`,
        value: `${country.dial_code}`,
        name: `${country.name['en']}`,
      })),
    []
  );

  const renderItem = (item: any) => (
    <View className='flex flex-row items-center justify-between w-[95%] mx-auto overflow-hidden py-3'>
      <View className='flex flex-row items-center justify-start w-1/2 gap-x-2'>
        <Text className='text-base font-medium'>{item.flag}</Text>
        <Text className='text-base font-medium text-neutral-900'>{item.value}</Text>
      </View>
      <Text className='w-1/2 text-base font-medium text-neutral-900'>{item.name}</Text>
    </View>
  );

  return (
    <View className='w-full h-[3.75rem] relativ'>
      <View className='absolute w-1/3 h-full inset-x-1.5 inset-y-1'>
        <View className='flex-row items-center justify-center flex-1 gap-x-3'>
          <Dropdown
            data={dropdownItems}
            value={countryCode}
            valueField='value'
            labelField='flag'
            mode='modal'
            onChange={(e) => setCountryCode(e.value)}
            renderItem={(item) => renderItem(item)}
            style={{ width: 40, zIndex: 1000 }}
            containerStyle={{ width: '90%' }}
            selectedTextProps={{ style: { fontSize: 24 } }}
          />
          <Text className='text-xl font-poppins-regular text-neutral-300'>{`(${countryCode})`}</Text>
        </View>
      </View>

      <InputField
        placeholder='00 000 0000'
        keyboardType='numeric'
        containerStyle={({ isFocused }) =>
          [
            isFocused ? 'border-secondary-500' : 'border-neutral-900 dark:border-neutral-100',
            'border-b-2',
          ]
            .filter(Boolean)
            .join(' ')
        }
        inputStyle='ml-[6.75rem]'
        maxLength={PHONE_VALIDATION.MAX_LENGTH}
        {...props}
      />
    </View>
  );
}
