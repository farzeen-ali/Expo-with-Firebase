import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if(!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please Fill all fields");
      return;
    }
    if(password !== confirmPassword){
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login');
    } catch (error: any) {
      Alert.alert("Signup Error", error.message)
    }
  }

  return (
    <View className="flex-1 justify-center bg-white px-6">
      <View className='w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200'>
        <Text className='text-3xl font-bold text-black text-center mb-2'>Sign up</Text>
        <Text className='text-center text-sm text-gray-500 mb-6'>Start your journey with us today</Text>
        <View className='mb-4'>
          <Text className='text-sm font-medium text-gray-700 mb-1'>Email</Text>
          <TextInput
            placeholder='you@example.com'
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#9ca3af"
            className='bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600'
          />
        </View>
        <View className='mb-4'>
        <Text className='text-sm font-medium text-gray-700 mb-1'>Password</Text>
          <TextInput
            placeholder='.....'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
            className='bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600'
          />
        </View>
        <View className='mb-6'>
        <Text className='text-sm font-medium text-gray-700 mb-1'>Confirm Password</Text>
          <TextInput
            placeholder='.....'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
            className='bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-600'
          />
        </View>
        <TouchableOpacity onPress={handleSignup} className='bg-purple-900 rounded-xl py-3 shadow-sm active:bg-purple-700'>
          <Text className='text-center text-white font-semibold text-base'>Create Account</Text>
        </TouchableOpacity>
        <Text className='text-center text-base text-gray-500 mt-5'>
          Already have an account?{" "}
          <Text className='text-purple-700 font-semibold' onPress={() => router.push('/login')}>Log in</Text>
        </Text>
      </View>
    </View>
  )
}

export default Signup