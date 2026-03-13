import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const Form = ({ setEmployees, employees, setIsEdit, setEditIdx, isEdit, editIdx }) => {
    const [input, setInput] = useState({
        name: "", email: "", salary: "", department: "", joiningDate: "", gender: ""
    })
    const [error, setError] = useState({})

    useEffect(() => {
        if (isEdit && editIdx) {
            const editEmployee = employees.find((emp) => emp.id === editIdx);

            if (editEmployee) {
                setInput(editEmployee);
            }
        }
    }, [isEdit, editIdx, employees]);

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name || e.target.id]: e.target.value })
        setError({ ...error, [e.target.name || e.target.id]: false })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorObj = {}
        const emailRgx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (input.name.trim() === "") {
            errorObj.name = true
        }
        if (!emailRgx.test(input.email) || input.email.trim() === "") {
            errorObj.email = true
        }
        if (!input.salary || Number(input.salary) < 1000) {
            errorObj.salary = true
        }
        if (input.department.trim() === "") {
            errorObj.department = true
        }
        if (input.joiningDate.trim() === "") {
            errorObj.joiningDate = true
        }
        if (input.gender.trim() === "") {
            errorObj.gender = true
        }

        setError(errorObj)

        if (Object.keys(errorObj).length > 0) {
            return
        }

        if (isEdit) {
            const updatedEmployees = employees.map((emp) => {
                if (emp.id === editIdx) {
                    return { ...input, id: editIdx };
                } else {
                    return emp;
                }
            });

            setEmployees(updatedEmployees);
            setIsEdit(false);
            setEditIdx(null);

            toast.success("Employee Updated Successfully...")
        } else {
            setEmployees([
                ...employees,
                { ...input, id: Date.now() }
            ])

            toast.success("Employee Added Successfully...")
        }

        setInput({
            name: "", email: "", salary: "", department: "", joiningDate: "", gender: ""
        })
    }

    return (
        <>
            <h1 className="text-white text-center my-10 text-3xl tracking-wide">Employee Management System</h1>
            <form className="max-w-md mx-auto p-9 border rounded-lg" noValidate onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name :</label>
                    <input type="text" id="name" className={`bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${error.name
                        ? "border border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                        : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"} dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} placeholder="John Doe" value={input.name} onChange={handleInput} required />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error.name ? "Invalid Name...." : ""}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
                    <input type="email" id="email" className={`bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${error.email
                        ? "border border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                        : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"} dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} placeholder="john@gmail.com" value={input.email} onChange={handleInput} required />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error.email ? "Invalid Email...." : ""}</p>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender :</label>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center">
                            <input type="radio" id="male" name="gender" value="Male" onChange={handleInput} checked={input.gender === "Male"} className={`w-4 h-4 ${error.gender
                                ? "border-red-500"
                                : "border-gray-300"} text-blue-600 bg-gray-100  dark:bg-gray-700 dark:border-gray-600`} />
                            <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-900 dark:text-white">Male</label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" id="female" name="gender" value="Female" onChange={handleInput} checked={input.gender === "Female"} className={`w-4 h-4  ${error.gender
                                ? "border-red-500"
                                : "border-gray-300"} text-blue-600 bg-gray-100  dark:bg-gray-700 dark:border-gray-600`} />
                            <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-900 dark:text-white">Female</label>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error.gender ? "Please select gender..." : ""}
                    </p>
                </div>
                <div className="mb-5">
                    <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary :</label>
                    <input type="number" min="1000" id="salary" className={`bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${error.salary
                        ? "border border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                        : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"} dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} value={input.salary} onChange={handleInput} required />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error.salary ? "Invalid Salary...." : ""}</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department :</label>
                    <select id="department" value={input.department} onChange={handleInput} className={`bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5  ${error.department
                        ? "border border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                        : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"} dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white`} required >
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="Manager">Manager</option>
                    </select>
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error.department ? "Please select department..." : ""}
                    </p>
                </div>
                <div className="mb-5">
                    <label htmlFor="joiningDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Joining Date :</label>
                    <input type="date" id="joiningDate" value={input.joiningDate} onChange={handleInput} className={`bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5  ${error.joiningDate
                        ? "border border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                        : "border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600"} dark:bg-gray-700 dark:text-white`} required />
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error.joiningDate ? "Please select joining date..." : ""}
                    </p>
                </div>
                <button type="submit" className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${isEdit ? "green-btn" : "blue-btn"}`}>{isEdit ? "Update" : "Submit"}</button>
            </form>
        </>
    )
}

export default Form