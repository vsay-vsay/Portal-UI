import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { FcEmptyTrash } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import UserCreationDrawer from "~/components/molecule/emp/usermanagement/usercreationdrawer";
import UserEditDrawer from "~/components/molecule/emp/usermanagement/useredit";

const IndeterminateCheckbox = ({ indeterminate, ...rest }) => {
    const ref = React.useRef();

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            {...rest}
        />
    );
};

const UserManagement = () => {
    const [data] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            lastLogin: "2024-01-20 10:30 AM"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            lastLogin: "2024-01-19 03:45 PM"
        },
        {
            id: 3,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            lastLogin: "2024-01-20 10:30 AM"
        },
        {
            id: 4,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            lastLogin: "2024-01-19 03:45 PM"
        },
        {
            id: 5,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            lastLogin: "2024-01-20 10:30 AM"
        },
        {
            id: 6,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            lastLogin: "2024-01-19 03:45 PM"
        },
        {
            id: 7,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            lastLogin: "2024-01-20 10:30 AM"
        },
        {
            id: 8,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            lastLogin: "2024-01-19 03:45 PM"
        },
        {
            id: 9,
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
            lastLogin: "2024-01-20 10:30 AM"
        },
        {
            id: 10,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
            lastLogin: "2024-01-19 03:45 PM"
        }
    ]);

const [activeDropdown, setActiveDropdown] = useState(null);
const dropdownRefs = useRef({}); // Store refs for each dropdown
const navigate = useNavigate();
const [isOpen, setIsOpen] = useState(false);
const [isEdit, setIsEdit] = useState(false);
const [editUser, setEditUser] = useState(null);

useEffect(() => {
    const handleClickOutside = (event) => {
        if (activeDropdown !== null && dropdownRefs.current[activeDropdown] &&
            !dropdownRefs.current[activeDropdown].contains(event.target)) {
            setActiveDropdown(null);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, [activeDropdown]);

const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
};

const handleEditClick = useCallback((user) => {
    setEditUser(user);
    setIsEdit(true);
}, []);

const columns = useMemo(() => [
    { Header: "User ID", accessor: "id" },
    {
        Header: "Name",
        accessor: "name",
        Cell: ({ row }) => (
            <Link to={`/emp/usermanagement/${row.original.id}`}>
                {row.original.name}
            </Link>
        )
    },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "role" },
    { Header: "Last Login", accessor: "lastLogin" },
    {
        Header: "Actions",
        Cell: ({ row }) => (
            <td className="px-6 whitespace-nowrap text-sm text-gray-500">
                <div className="relative" ref={(el) => (dropdownRefs.current[row.index] = el)}>
                    <button
                        onClick={() => handleDropdownToggle(row.index)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <FiMoreVertical className="w-5 h-5" />
                    </button>
                    {activeDropdown === row.index && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                            <div className="py-1">
                                <button
                                    onClick={() => handleEditClick(row.original)}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <FiEdit2 className="mr-2" /> Edit User
                                </button>
                                <UserEditDrawer isEdit={isEdit} setIsEdit={setIsEdit} user={editUser} />
                                <button
                                    onClick={() => navigate(`/emp/usermanagement/${row.original.id}`)}
                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    <FiEye className="mr-2" /> View Details
                                </button>
                                <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                                    <FiTrash2 className="mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </td>
        )
    }
], [activeDropdown, navigate]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => (
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]);
        }
    );

    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
        >
            <div className="flex items-center justify-center">
                <FcEmptyTrash size={60} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 pt-5">No Data Available</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating new Data.</p>
        </motion.div>
    );


    return (
        <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="sm:flex sm:items-center sm:justify-between mb-4">
                <div className="mt-4 sm:mt-0 flex inline-flex items-center">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 m-2 text-blue-500 rounded-md hover:bg-blue-100 border flex">
                        + Add User
                    </button>
                    <UserCreationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
                    <button className="px-4 py-2 m-2 text-red-600 rounded-md hover:bg-red-100 inline-flex items-center border">
                        <FiTrash2 className="mr-2" /> Delete
                    </button>
                </div>
            </div>

            {data.length === 0 ? (
                <EmptyState />
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <div className="max-h-[600px] overflow-y-auto rounded-xl">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 sticky top-0 z-10">
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th
                                                    {...column.getHeaderProps()}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {column.render("Header")}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white divide-y divide-gray-200"
                                >
                                    <AnimatePresence>
                                        {page.map((row, i) => {
                                            prepareRow(row);
                                            return (
                                                <motion.tr
                                                    {...row.getRowProps()}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className={`${row.isSelected ? "bg-blue-50" : ""} hover:bg-gray-50`}
                                                >
                                                    {row.cells.map(cell => {
                                                        if (cell.column.Header === "Actions") {
                                                            return (
                                                                <td
                                                                    {...cell.getCellProps()}
                                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                                >
                                                                    {cell.render("Cell")}
                                                                </td>
                                                            );
                                                        }
                                                        return (
                                                            <td
                                                                {...cell.getCellProps()}
                                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                            >
                                                                {cell.render("Cell")}
                                                            </td>
                                                        );
                                                    })}
                                                </motion.tr>
                                            );
                                        })}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="py-3 flex items-center justify-between">
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div className="flex gap-x-2 items-center">
                                <span className="text-sm text-gray-700">
                                    Rows per page:{" "}
                                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}
                                        className="ml-2 border rounded px-2 py-1">
                                        {[5, 10, 20].map(size => <option key={size} value={size}>{size}</option>)}
                                    </select>
                                </span>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => previousPage()}
                                        disabled={!canPreviousPage}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Previous
                                    </button>
                                    {Array.from(Array(pageCount).keys()).map(number => (
                                        <button
                                            key={number}
                                            onClick={() => gotoPage(number)}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${pageIndex === number ? "bg-blue-50 text-blue-600" : "text-gray-500"} hover:bg-gray-50`}
                                        >
                                            {number + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => nextPage()}
                                        disabled={!canNextPage}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <UserEditDrawer isEdit={isEdit} setIsEdit={setIsEdit} user={editUser} />
        </div>
    );
};

export default UserManagement;