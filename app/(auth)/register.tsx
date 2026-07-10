import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { supabase } from '@/lib/supabase';
import { registerSchema, RegisterFormData } from '@/utils/validation';

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (error) {
      Alert.alert('Registration Failed', error.message);
      setLoading(false);
      return;
    }

    // Create the profile row linked to the new auth user
    if (authData.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        username: data.fullName,
      });

      if (profileError) {
        Alert.alert('Error creating profile', profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    router.push('/(auth)/verify-email');
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-16">
      <Text className="text-3xl font-bold text-[#1A2744] mb-2">Create Account</Text>
      <Text className="text-gray-500 mb-8">Sign up with your university email</Text>

      <Text className="text-sm font-medium text-[#1A2744] mb-1">Full Name</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
            placeholder="Your full name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.fullName && (
        <Text className="text-red-500 text-xs mb-3">{errors.fullName.message}</Text>
      )}

      <Text className="text-sm font-medium text-[#1A2744] mb-1 mt-3">University Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
            placeholder="you@sjp.ac.lk"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500 text-xs mb-3">{errors.email.message}</Text>
      )}

      <Text className="text-sm font-medium text-[#1A2744] mb-1 mt-3">Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
            placeholder="Create a password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text className="text-red-500 text-xs mb-3">{errors.password.message}</Text>
      )}

      <Text className="text-sm font-medium text-[#1A2744] mb-1 mt-3">Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
            placeholder="Confirm your password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text className="text-red-500 text-xs mb-3">{errors.confirmPassword.message}</Text>
      )}

      <TouchableOpacity
        className="bg-[#6B7C4F] rounded-xl py-4 items-center mt-6"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-base">
          {loading ? 'Creating Account...' : 'Register'}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6 mb-10">
        <Text className="text-gray-500">Already have an account? </Text>
        <Link href="/(auth)/login">
          <Text className="text-[#6B7C4F] font-semibold">Login</Text>
        </Link>
      </View>
    </ScrollView>
  );
}