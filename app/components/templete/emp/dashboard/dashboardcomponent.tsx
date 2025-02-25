// import React from 'react'

// const DashboardComponent  = () => {
//   return (
//     <div>dashboard</div>
//   )
// }

// export default DashboardComponent

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";
import { motion, AnimatePresence } from "framer-motion";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

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

const UserManagementTable = () => {
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

  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Role",
        accessor: "role"
      },
      {
        Header: "Last Login",
        accessor: "lastLogin"
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="relative group">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiMoreVertical className="w-5 h-5" />
            </button>
            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <div className="py-1">
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <FiEdit2 className="mr-2" /> Edit User
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                  <FiEye className="mr-2" /> View Details
                </button>
                <button className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        )
      }
    ],
    []
  );

  const dropdownRef = useRef(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      initialState: { pageIndex: 0, pageSize: 10 }
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
      <img
        src="https://images.unsplash.com/photo-1594312915251-48db9280c8f1"
        alt="No Users"
        className="mx-auto h-48 w-48 mb-4"
      />
      <h3 className="text-lg font-medium text-gray-900">No Users Available</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new user</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Add New User
      </button>
    </motion.div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="sm:flex sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <div className="mt-4 sm:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add User
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="max-h-[600px] overflow-y-auto">
              <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
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
                                  <div className="relative" ref={dropdownRef}>
                                    <button 
                                      className="p-2 hover:bg-gray-100 rounded-full"
                                      onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                                    >
                                      <FiMoreVertical className="w-5 h-5" />
                                    </button>
                                    {activeDropdown === i && (
                                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                        <div className="py-1">
                                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                                            <FiEdit2 className="mr-2" /> Edit User
                                          </button>
                                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
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
                  <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    {[5, 10, 20].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
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
    </div>
  );
};

export default UserManagementTable;