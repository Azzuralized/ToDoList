"use client"
import React, { useState, useEffect } from 'react';
import TableList from './TableList';


const ToDo = () => {
    const [toDoItems, setToDoItems] = useState([]);

    useEffect(() => {
        fetchTodo()
    }, [])

    const fetchTodo = async () => {
        const res = await fetch('/api/todo')
        const data = await res.json()

        console.log(data)
        setToDoItems(data.todos)
    }

    const createTodo = async (todo) => {
        const res = await fetch('api/todo', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: todo.text,
                dateTime: todo.dateTime,
                isEdit: todo.isEdit,
                status: todo.status
            })
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newItem = {
            status: false,
            text: event.target.elements[0].value,
            dateTime: event.target.elements[1].value,
            isEdit: false
        };

        createTodo(newItem)

        console.log(newItem)

        setToDoItems([...toDoItems, newItem]);

        event.target.elements[0].value = '';
        event.target.elements[1].value = '';
    };

    return (
        <>


            <div className="text-center h-[88px] mt text-black text-5xl font-bold font-[Poppins] mt-[82px]">
                To-Do-List
            </div>

            <div className='flex justify-center items-center mt-[76px] font-[Poppins'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-[450px] h-16 bg-lime-100 rounded-[10px] border  border-black p-3"
                    />

                    <input
                        type="datetime-local"
                        className="border border-black p-3 rounded-[10px] ml-[28px] bg-[#9AD0C2] h-16"
                    />

                    <button
                        type="submit"
                        className="w-[120px] h-16 bg-cyan-800 rounded-[10px] ml-[28px] border border-black text-white font-bold py-2 px-4 hover:bg-cyan-700"

                    >
                        Submit
                    </button>
                </form>
            </div>
            {/* kalau mau ngirim dua prop di destructure dulu, caranya tinggal { lala, lala } */}
            {/* todoItems */}
            <TableList items={{ toDoItems, setToDoItems }} />
        </>
    );
};

export default ToDo;