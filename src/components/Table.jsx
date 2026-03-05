const Table = ({ employees, handleDelete, handleUpdate }) => {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-16">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Salary
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Joining Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-6 text-gray-500 dark:text-gray-400">
                                        No Employee Available
                                    </td>
                                </tr>
                            ) : (
                                employees.map((emp) => {
                                    return (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={emp.id}
                                        >
                                            <td className="px-6 py-4">{emp.name}</td>
                                            <td className="px-6 py-4">{emp.email}</td>
                                            <td className="px-6 py-4">{emp.gender}</td>
                                            <td className="px-6 py-4">{emp.salary}</td>
                                            <td className="px-6 py-4">{emp.department}</td>
                                            <td className="px-6 py-4">{emp.joiningDate}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-3">
                                                    <button
                                                        className="px-3 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                                        onClick={() => handleDelete(emp.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                    <button
                                                        className="px-3 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                                        onClick={() => handleUpdate(emp.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table