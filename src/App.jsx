import React, { useEffect, useState } from 'react'
import Form from './components/Form'
import Table from './components/Table'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {
    const [employees, setEmployees] = useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [editIdx, setEditIdx] = useState(null);

    useEffect(() => {
        setEmployees(JSON.parse(localStorage.getItem("employee")) || [])
    }, [])

    useEffect(() => {
        localStorage.setItem("employee", JSON.stringify(employees))
    }, [employees])

    const handleDelete = (id) => {
        let newEmp = employees.filter((emp) => emp.id !== id);
        setEmployees(newEmp);

        if (editIdx === id) {
            setIsEdit(false);
            setEditIdx(null);
        }

        toast.error("Employee Deleted Successfully...");
    }

    const handleUpdate = (id) => {
        setIsEdit(true);
        setEditIdx(id);
    }

    return (
        <div className='container mx-auto sm:px-0 px-5'>
            <ToastContainer />
            <Form setEmployees={setEmployees} employees={employees} setIsEdit={setIsEdit} setEditIdx={setEditIdx} isEdit={isEdit} editIdx={editIdx} />
            <Table employees={employees} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </div>
    )
}

export default App