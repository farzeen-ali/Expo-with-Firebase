import { View, Text, Alert, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { addTodo, deleteTodo, getTodos, updateTodo } from '../db/todoService';

import { addTodo, deleteTodo, updateTodo, onTodosChanged } from '../db/realtime';

const TodoApp = () => {
    const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    // const fetchTodos = async () => {
    //     const data = await getTodos();
    //     setTodos(data);
    // }

    const handleAddOrUpdate = async () => {
        if(!todoText.trim) return;
        try {
            if(editingId){
                await updateTodo(editingId, todoText);
                setEditingId(null);
            }
            else {
                await addTodo(todoText);
            }
            setTodoText("")
            // fetchTodos();
        } catch (error) {
            Alert.alert("Error","Something went wrong!");
        }
    }
    const handleEdit = (item: any) => {
        setTodoText(item.text);
        setEditingId(item.id);
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(id);
            // fetchTodos();
        } catch (error) {
            Alert.alert("Delete Failed","Something went wrong!");
            
        }
    }

    useEffect(()=> {
        // fetchTodos();
        const unsubscribe = onTodosChanged((data) => {
            setTodos(data);
        })

        return () => unsubscribe();
    }, []);

  return (
    <View className='flex-1 bg-white px-5 py-8'>
      <Text className='text-4xl font-bold text-center text-black mb-8'>📒 Todo List</Text>
      <View className='mb-6'>
        <View className='flex-row items-center rounded-2xl bg-gray-100 border border-gray-300 shadow-sm overflow-hidden'>
            <TextInput
                placeholder='Add your task...'
                value={todoText}
                onChangeText={setTodoText}
                className='flex-1 px-4 py-3 text-black text-base'
            />
            <TouchableOpacity onPress={handleAddOrUpdate} className={`${
                editingId ? "bg-green-600" : "bg-purple-700"
                } px-5 py-3 justify-center`}>
                <Text className='text-white font-semibold text-base'>{editingId ? "Update" : "Add"}</Text>
            </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
            <Text className='text-gray-400 text-center mt-10'>No todos yet. Add Something!</Text>
        }
        renderItem={({ item }) => (
            <View className='bg-gray-100 rounded-2xl p-4 mb-4 shadow-sm'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-lg text-black flex-1 pr-4'>{item.text}</Text>
                    <View className='flex-row'>
                        <TouchableOpacity onPress={() => handleEdit(item)} className='bg-green-500 px-4 mx-2 py-2 rounded-xl shadow'>
                            <Text className='text-white font-medium'>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.id)} className='bg-red-500 px-4 py-2 rounded-xl shadow'>
                            <Text className='text-white font-medium'>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )}
      />
    </View>
  )
}

export default TodoApp