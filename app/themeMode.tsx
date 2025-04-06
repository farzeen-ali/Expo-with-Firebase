import { View, Text, useColorScheme, Pressable } from 'react-native'
import React from 'react'
import { useThemeStore } from './theme/store'

const ThemeMode = () => {
    const { toggleTheme, theme } = useThemeStore();
    const scheme = useColorScheme();

    const isDark = theme === 'dark' || (theme === 'auto' && scheme === 'dark');

  return (
    <View className={`flex-1 justify-center items-center ${isDark ? "bg-black" : "bg-white"}`}>
      <Text className={`text-2xl mb-4 ${isDark ? "text-white" : "text-black"}`}>
        {isDark ? "Dark Mode" : "Light Mode"}
      </Text>
      <Pressable className='bg-blue-500 px-4 py-2 rounded-full' onPress={toggleTheme}>
        <Text className='text-white font-bold'>Toggle Theme</Text>
      </Pressable>
    </View>
  )
}

export default ThemeMode