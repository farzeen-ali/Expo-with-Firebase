import { db } from '../firebaseConfig'
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
} from 'firebase/firestore';

const todoRef = collection(db, "todos");

export const addTodo = async (todo: string) => {
    return await addDoc(todoRef, {
       text: todo,
       createdAt: new Date(), 
    });
};

export const getTodos = async () => {
    const snapshot = await getDocs(todoRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}))
};

export const deleteTodo = async (id: string) => {
    return await deleteDoc(doc(todoRef,id))
}

export const updateTodo = async (id: string, updatedText: string) => {
    return await updateDoc(doc(todoRef, id), {text: updatedText});
}