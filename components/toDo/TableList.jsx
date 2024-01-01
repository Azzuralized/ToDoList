import React, { useState } from 'react';
import Image from 'next/image';
import PencilIcon from './icons/pencil.png';
import TrashIcon from './icons/trash.png'

const TableList = ({ items: { toDoItems, setToDoItems } }) => {
    const [tempTodo, setTempTodo] = useState('')

    const updateStatus = async (id, status) => {
        await fetch('/api/todo/status', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                status
            })
        })
    }

    const updateText = async (id, text) => {
        await fetch('/api/todo', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
                text
            })
        })
    }

    const removeTodo = async (id) => {
        await fetch('/api/todo', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            })
        })
    }

    const handleStatus = (status, id) => {
        // setToDoItems((toDoItems) )

        // isEdit ? 'ini untuk true' : 'ini untuk false'

        // semua todo yang baru
        const updatedTodo = toDoItems.map(item => {
            // mencari todo yang mau diupdate
            if (item.id === id) {
                // return todo yang baru
                // item: {
                //     status: ,
                //     id: ,
                //     text: ,
                //     datetime: ,
                // }
                return { ...item, status: !status }
            } else {
                // return todo yang lama
                return item
            }
        })
        // masukin semua todo yang baru
        updateStatus(id, !status)
        setToDoItems(updatedTodo)


    }

    const updateTodo = (e, id, isEdit) => {
        e.preventDefault()

        const updatedTodo = toDoItems.map(item => {
            // mencari todo yang mau diupdate
            if (item.id === id) {
                // return todo yang baru
                // item: {
                //     status: ,
                //     id: ,
                //     text: ,
                //     datetime: ,
                // }
                return { ...item, text: e.target.elements[0].value, isEdit: !isEdit }
            } else {
                // return todo yang lama
                return item
            }
        })
        // masukin semua todo yang baru
        updateText(id, e.target.elements[0].value)
        setToDoItems(updatedTodo)
        setTempTodo('')
    }

    const setEdit = (id) => {
        const updatedTodo = toDoItems.map(item => {
            // mencari todo yang mau diupdate
            if (item.id === id) {
                // return todo yang baru
                // item: {
                //     status: ,
                //     id: ,
                //     text: ,
                //     datetime: ,
                // }
                return { ...item, isEdit: !item.isEdit }
            } else {
                // return todo yang lama
                return item
            }
        })
        // masukin semua todo yang baru
        setToDoItems(updatedTodo)


    }

    const deleteToDo = (id) => {
        const updatedTodo = toDoItems.filter(item => {
            if (item.id == id) {
                return false
            }
            else {
                return true
            }
        })

        removeTodo(id);
        setToDoItems(updatedTodo)
    }

    const editTodo = (e, todo) => {
        event.preventDefault();
        // e.target.value = todo
        // setTempTodo(e.target.value)
        // console.log('e.target.value', e.target.value)
    }

    return (
        <div className='flex justify-center mb-[250px]'>
            <div className="w-[1200px] bg-rose-200 rounded-[10px] border border-black mt-[106px] flex justify-center font-[Poppins]">
                <table className="w-full border-collapse font-[Poppins] table-fixed">
                    <thead>
                        <tr>
                            <th className="w-[20px] text-center h-[50px] py-2 px-[32px]  font-medium text-black  tracking-wider">
                                No
                            </th>
                            <th className="w-[300px] h-[50px] py-2 mr-[px] text-left font-medium text-black  tracking-wider">
                                Activities
                            </th>
                            <th className="w-[100px] h-[50px] py-2 mr-[116px] text-left font-medium text-black  tracking-wider">
                                Date
                            </th>
                            <th className="w-[100px] h-[50px] py-2 mr-[116px] text-left font-medium text-black  tracking-wider">
                                Time
                            </th>
                            <th className="w-[100px] h-[50px] py-2 mr-[116px] text-left font-medium text-black  tracking-wider">
                                Status
                            </th>
                            <th className="w-[100px] h-[50px] py-2 mr-[116px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {toDoItems from param} */}
                        {toDoItems.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 text-center w-[20px] h-[50px]">
                                    {index + 1}
                                </td>

                                <td className="py-2 mr-[16px] px-[10px] h-[50px]">
                                    {/* kalau isEdit true tampilin input, kalau false tampilin teks */}
                                    {/* 
                                        isEdit ? (
                                            <div></div>
                                        ) : (
                                            <div></div>
                                        )
                                    */}

                                    {item.isEdit ? (
                                        <>
                                            <form onSubmit={(e) => updateTodo(e, item.id, item.isEdit)}>
                                                <input type="text" className='p-3 bg-transparent rounded-[10px] border border-black' />
                                                <button type='submit' className='btn btn-outline btn-primary ml-3 rounded-[10px] h-[35px] font-black border-black'>Update</button>
                                            </form>
                                        </>
                                    ) : (
                                        <div>{item.text}</div>
                                    )}
                                </td>


                                <td className="py-2 mr-[116px] w-[100px] h-[50px]">
                                    {item.dateTime.slice(0, 10)}
                                </td>
                                <td className="py-2 mr-[116px]">{item.dateTime.slice(11, 16)}</td>
                                <td className="py-2 mr-[116px]">
                                    <input onChange={() => handleStatus(item.status, item.id)} type="checkbox" className="checkbox checkbox-primary outline-black" checked={item.status} />
                                </td>

                                {/* icon button */}

                                <td className="py-2 gap-8 flex">
                                    <button onClick={() => setEdit(item.id)}>
                                        <Image src={PencilIcon} alt="Pencil icon" width={20} height={20} />
                                    </button>
                                    <button onClick={() => deleteToDo(item.id)}>
                                        <Image src={TrashIcon} alt="Trashbin icon" width={20} height={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableList;
