import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if(!email || !password){
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email,password);
      router.push('/home');
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  }

  return (
    <View className='flex-1 justify-center bg-white px-6'>
      <View className='w-full max-w-sm mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200'>
        <Text className='text-3xl font-bold text-center text-black mb-2'>Welcome Back</Text>
        <Text className='text-center text-sm text-gray-500 mb-6'>Log in to your account</Text>
        <View className='mb-4'>
          <Text className='text-sm font-medium text-gray-700 mb-1'>Email</Text>
          <TextInput
            placeholder='you@example.com'
            value={email}
            onChangeText={setEmail}
            placeholderTextColor='#9ca3af'
            className='bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300'
          />
        </View>
        <View className='mb-6'>
          <Text className='text-sm font-medium text-gray-700 mb-1'>Password</Text>
          <TextInput
            placeholder='......'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor='#9ca3af'
            className='bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300'
          />
        </View>
        <TouchableOpacity className='bg-purple-900 py-3 rounded-xl shadow-sm active:bg-purple-700' onPress={handleLogin}>
          <Text className='text-center text-white'>Login</Text>
        </TouchableOpacity>
        <Text className='text-center text-base text-gray-500 mt-5'>Don't have an account?{" "}
          <Text className='text-purple-700 font-semibold' onPress={() => router.push('/')}>Sign up</Text>
        </Text>
      </View>
    </View>
  )
}

export default Login