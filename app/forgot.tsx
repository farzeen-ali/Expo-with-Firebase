import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleReset = async () => {
        if(!email){
            Alert.alert("Error", "Please enter your email")
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            router.replace('/login')
        } catch (error: any) {
            Alert.alert("Error", error.message)
        }
    }
  return (
    <View className='flex-1 bg-white justify-center px-6'>
      <View className=' w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200'>
        <Text className='text-3xl font-bold text-black text-center mb-2'>Forgot Password</Text>
        <Text className='text-center text-sm text-gray-500 mb-6'>Enter your email to reset your password</Text>
        <View className='mb-6'>
        <Text className='text-sm font-medium text-gray-700 mb-1'>Email</Text>
      <TextInput
        placeholder='you@example.com'
        value={email}
        onChangeText={setEmail}
        placeholderTextColor='#9ca3af'
        className='bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300'
      />
      </View>
      <TouchableOpacity onPress={handleReset} className='bg-purple-900 py-3 rounded-xl shadow-sm active:bg-purple-700'>
        <Text className='text-center text-white font-semibold text-base'>Send Reset Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text className='text-center text-xs text-gray-500 mt-5'>Back to <Text className='text-purple-700 font-semibold'>Login</Text></Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default ForgotPassword