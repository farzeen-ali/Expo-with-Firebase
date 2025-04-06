import { db } from "../firebaseConfig";
import { ref, push, onValue, remove, update } from 'firebase/database';

const todosRef = ref(db, "todos");

export const addTodo = async (todo: string) => {
    return await push(todosRef, {
       text: todo,
       createdAt: new Date().toISOString(), 
    });
};

export const onTodosChanged = (callback: (todos: any[]) => void) => {
    return onValue(todosRef, (snapshot) => {
        const data = snapshot.val();
        if(data) {
            const formatted = Object.entries(data).map(([id, value]: any) => ({
                id,
                ...value,
            }));
            callback(formatted);
        }
        else{
            callback([]);
        }
    })
}

export const deleteTodo = async (id: string) => {
    return await remove(ref(db, `todos/${id}`))
}
export const updateTodo = async (id: string, updatedText: string) => {
    return await update(ref(db, `todos/${id}`), {
        text: updatedText,
    })
}