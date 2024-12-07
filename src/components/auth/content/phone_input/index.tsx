import { InputField } from '@/components/ui/input_field';
import { countries, Country } from '@/constants/countries';
import { useAuth } from '@/hooks/useAuth';
import { InputFieldProps } from '@/types';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const PHONE_VALIDATION = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 11,
};
type PhoneInputProps = {
  defaultCountry?: string;
} & InputFieldProps;

export function PhoneInput({ defaultCountry = 'HU', ...props }: PhoneInputProps) {
  const { setAuthState, authState } = useAuth();
  const [countryCode, setCountryCode] = useState(
    countries.find((country) => country.code === defaultCountry)?.code
  );
  const [countryDialCode, setCountryDialCode] = useState(
    countries.find((country) => country.code === defaultCountry)?.dial_code
  );
  const [isFocused, setIsFocused] = useState(false);

  const validatePhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    return (
      cleaned.length >= PHONE_VALIDATION.MIN_LENGTH && cleaned.length <= PHONE_VALIDATION.MAX_LENGTH
    );
  };

  const formatFullNumber = (value: string) => {
    const cleaned = value.replace(
      /^(\+44)(\d{2})(\d{3})(\d{5})$/,
      (countryDialCode, part1, part2, part3) => {
        return `${part1} ${part2} ${part3}`;
      }
    );
    return `(${countryDialCode}) ${cleaned}`;
  };

  const handlePhoneNumberChange = (value: string) => {
    const isValid = validatePhoneNumber(value);
    const sanitizedNumber = formatFullNumber(value);

    setAuthState({
      phoneNumber: sanitizedNumber,
      isValidPhoneNumber: isValid,
    });
  };

  const renderItem = (item: Country) => (
    <View className='flex flex-row items-center justify-between w-[95%] mx-auto overflow-hidden py-3'>
      <View className='flex flex-row items-center justify-start w-1/2 gap-x-2'>
        <Text className='text-base font-medium'>{item.flag}</Text>
        <Text className='text-base font-medium text-neutral-900'>{item.dial_code}</Text>
      </View>
      <Text className='w-1/2 text-base font-medium text-neutral-900'>{item.name['en']}</Text>
    </View>
  );

  return (
    <View
      className={`flex flex-row items-center gap-x-3 w-full h-[3.75rem] ${
        isFocused ? 'border-secondary-500' : 'border-neutral-900 dark:border-neutral-100'
      } border-b-2 ${!authState.isValidPhoneNumber ? 'border-danger-500' : null}`}>
      <View className='flex flex-row items-center justify-start gap-x-3'>
        <Dropdown
          data={countries}
          value={countryCode}
          valueField='code'
          labelField='flag'
          mode='modal'
          search
          searchPlaceholder='Search...'
          onChange={(e) => {
            setCountryDialCode?.(e.dial_code);
            setCountryCode(e.code);
          }}
          renderItem={(item) => renderItem(item)}
          style={{ width: 40, zIndex: 1000 }}
          containerStyle={{ width: '90%' }}
          selectedTextProps={{ style: { fontSize: 24 } }}
        />
        <Text className='text-xl font-poppins-regular text-neutral-300'>{`(${countryDialCode})`}</Text>
      </View>

      <InputField
        {...props}
        placeholder='00 000 0000'
        keyboardType='numeric'
        onChangeText={(value) => handlePhoneNumberChange(value)}
        maxLength={PHONE_VALIDATION.MAX_LENGTH}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}
