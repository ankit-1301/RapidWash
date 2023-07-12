//-----------------------------------DELIVERYBOY TABLE FOR WASHERMANPAGE-------------------------------------------------------

import React from "react";
function Delboytable({ boy, onDelete }) {
    const [showDelete, setShowDelete] = React.useState(false);
    return (<>
        <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                        <span className="font-medium">{boy.name}</span>
                    </div>
                </td>
                <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                        <span className="font-medium">{boy.email}</span>
                    </div>
                </td>
                <td className="py-3 px-6">
                    <div>{boy.contact}</div>
                </td>
                <td className="py-3 px-6">
                    <div>{boy.password}</div>
                </td>
                <td className="py-3 px-6 text-center">
                    <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110" onClick={() => setShowDelete(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </div>
                </td>
            </tr>
        </tbody>
        {showDelete ? (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="w-full md:w-1/3 mx-auto">
                        <div className="flex flex-col p-4 rounded-lg shadow bg-white">
                            <div className="flex">
                                <div>
                                    <svg
                                        className="w-6 h-6 fill-current text-red-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M0 0h24v24H0V0z" fill="none" />
                                        <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                                    </svg>
                                </div>

                                <div className="ml-3">
                                    <h2 className="font-semibold text-gray-800">
                                        Delete Your Order
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                        Are You Sure?
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end items-center mt-3">
                                <button
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-sm font-medium rounded-md"
                                    onClick={() => setShowDelete(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="px-4 py-2 ml-2 bg-red-500 hover:bg-red-700 text-white text-sm font-medium rounded-md"
                                    onClick={() => {
                                        onDelete(boy._id);
                                        setShowDelete(false);
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
    </>
    )
}
export default Delboytable;