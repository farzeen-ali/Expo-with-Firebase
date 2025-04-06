import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useRouter } from 'expo-router'

const Home = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace('/login');
        } catch (error: any) {
            Alert.alert("Logout Failed", error.message);
        }
    }
    const gotTodo = () => {
        router.push('/todo');
    }
  return (
    <View className='flex-1 justify-center items-center bg-white px-6'>
      <View className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
        <Text className='text-3xl font-bold text-center text-black mb-2'>Welcome 👋</Text>
        <Text className='text-center text-sm text-gray-500 mb-8'>You're logged in, What would you like to do?🔥</Text>
        <TouchableOpacity onPress={gotTodo} className='w-full bg-purple-700 py-3 rounded-xl shadow-sm active:bg-purple-800 mb-4'>
        <Text className='text-center text-white font-semibold text-base'>Go to Todos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} className='w-full border border-gray-300 py-3 rounded-xl'>
        <Text className='text-center text-black font-medium text-base'>Logout</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Home