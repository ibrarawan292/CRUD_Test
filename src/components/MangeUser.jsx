import React, { useEffect, useState } from "react";
import Pagination from "./Pagination/Pagination";
import TotalServices from "../TotalServices";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import Filters from "./Filters/Filters";
const MangeUser = () => {
  const [record, setRecord] = useState(0);
  const [totalRecords, setTotalRecords] = useState("");
  const [NumberOfRecordsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [goto, setGoto] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const [data, setData] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState([]);
  const [previliges, setPreviliges] = useState([]);
  const [previligesList, setPreviligesList] = useState([]);
  const [titlesList, setTitlesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [previligesFilter, setPreviligesFilter] = useState([]);
  const [titlesFilter, setTitlesFilter] = useState([]);

  const handleShowEditModal = (item) => {
    console.log(item);
    setShowModal(true);
    setIsEdit(true);
    setUserName(item.name);
    setAge(item.age);
    setAddress(item.address);
    setTitle(item.titles);
    setPreviliges(item.previliges);
    setEditId(item.user_id);
  };

  const handleSearch = () => {
    setSearchValue(searchValue);
  };

  const userList = async () => {
    try {
      const res = await TotalServices.manageUser(
        NumberOfRecordsPerPage,
        (currentPage - 1) * NumberOfRecordsPerPage,
        {
          keyword: searchValue,
          previliges: previligesFilter,
          titles: titlesFilter,
        }
      );
      console.log(res, "res");
      if (res.data.status === 200) {
        if (res.data.pages === 1) {
          setCurrentPage(1);
        }
        console.log(res.data.users_data, "success");
        setData(res.data.users_data);
        setTotalPages(res.data.pages);
        setTotalRecords(res.data.total_records);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userList();
  }, [searchValue, currentPage, previligesFilter, titlesFilter]);

  const GetPrivilitesList = async () => {
    try {
      const res = await TotalServices.getPreviliges();
      if (res.status === 200) {
        setPreviligesList(res.data.data);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    GetPrivilitesList();
  }, []);

  const GetTitlesList = async () => {
    try {
      const res = await TotalServices.getTitles();
      if (res.status === 200) {
        setTitlesList(res.data.data);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  useEffect(() => {
    GetTitlesList();
  }, []);

  const CreateUser = async () => {
    let prevlig = [];
    previliges.map((item) => {
      prevlig.push(item.value);
    });

    let tit = [];
    title.map((item) => {
      tit.push(item.value);
    });
    let data = {
      name: userName,
      age: age,
      address: address,
      previllige_ids: prevlig,
      title_ids: tit,
    };
    console.log(data, "create");
    if (
      userName === "" ||
      age === "" ||
      address === "" ||
      prevlig == "" ||
      tit == ""
    ) {
      toast.error("Fields must not be empty!!");
    } else {
      try {
        const res = await TotalServices.createUser(data);
        console.log(res);
        if (res.status === 200) {
          toast.success("User Created Successfully");
          userList();
          setShowModal(false);
        } else if (res.data.status !== 200) {
          toast.error("Ops! some error occurred!!");
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const EditUser = async () => {
    let prevlig = [];
    previliges.map((item) => {
      prevlig.push(item.value);
    });

    let tit = [];
    title.map((item) => {
      tit.push(item.value);
    });
    let data = {
      name: userName,
      age: age,
      address: address,
      previliges_ids: prevlig,
      title_ids: tit,
    };
    if (
      userName === "" ||
      age === "" ||
      address === "" ||
      prevlig == "" ||
      tit == ""
    ) {
      toast.error("Fields must not be empty!!");
    } else {
      try {
        const res = await TotalServices.editUser(editId, data);
        console.log(res, "editRes");
        if (res.data.status === 200) {
          toast.success("User Edited Successfully");
          setShowModal(false);
          userList();
        } else if (res.data.status !== 200) {
          toast.error("Ops! some error occurred!!");
        }
      } catch (error) {
        console.log("error ", error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await TotalServices.deleteUser(id);
      console.log(res);
      if (res.status === 200) {
        toast.success("User Deleted successfully");
        userList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreviligeFilter = (selectedOption) => {
    let previligeArr = [];
    selectedOption.map((item) => {
      previligeArr.push(item.label);
    });
    setPreviligesFilter(previligeArr);
  };
  const handleTitleFilter = (selectedOption) => {
    let titleArr = [];
    selectedOption.map((item) => {
      titleArr.push(item.label);
    });
    setTitlesFilter(titleArr);
  };
  return (
    <>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between pb-4 p-2 bg-white dark:bg-gray-900">
            <div>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-blue-600"
                onClick={() => {
                  setShowModal(true);
                  setIsEdit(false);
                  setUserName("");
                  setAge("");
                  setAddress("");
                  setTitle([]);
                  setPreviliges([]);
                }}
                // onClick={handleShowAddModal}
              >
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Create User
              </button>
            </div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
            <div className="flex items-center flex-1 space-x-4"></div>

            <div className="relative flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              {/* Filters--->> */}

              <Filters
                label="Previliges"
                options={previligesList}
                value={previligesFilter}
                onChange={handlePreviligeFilter}
                placeholder={"Select Previliges"}
              />
              <Filters
                label="Titles"
                options={titlesList}
                value={titlesFilter}
                onChange={handleTitleFilter}
                placeholder={"Select Titles"}
              />
            </div>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Age
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Previliges
                </th>
                <th scope="col" className="px-6 py-3">
                  Titles
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => {
                  return (
                    <>
                      <tr
                        key={item.user_id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        {/* <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-1"
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="checkbox-table-1" className="sr-only">
                              checkbox
                            </label>
                          </div>
                        </td> */}
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.name}
                        </th>
                        <td className="px-6 py-4">{item.age}</td>
                        <td className="px-6 py-4">{item.address}</td>
                        <td className="px-6 py-4">
                          {item.previliges.map((item, index) => {
                            return <p key={index}>{item.label}</p>;
                          })}
                        </td>
                        <td className="px-6 py-4">
                          {item.titles.map((item, index) => {
                            return <p key={index}>{item.label}</p>;
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleShowEditModal(item)}
                            type="button"
                            className="px-1 py-2  rounded-full border text-green-800 hover:text-green-400 text-lg border-white"
                          >
                            <AiOutlineEdit />
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteUser(item.user_id);
                            }}
                            type="button"
                            className="px-1 py-2 rounded-full border text-red-500 hover:text-red-400 text-lg border-white "
                          >
                            <AiOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Pagination
          totalRecords={totalRecords}
          setRecord={setRecord}
          record={record}
          NumberOfRecordsPerPage={NumberOfRecordsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setGoto={setGoto}
          goto={goto}
          totalPages={totalPages}
        />
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none m-0 p-0">
            <div className="relative w-auto my-6 mx-auto max-w-full">
              <div
                className={
                  isEdit === true
                    ? "border-0 mt-12 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
                    : "border-0 mt-12 rounded-lg shadow-lg relative flex flex-col w-[500px] bg-white outline-none focus:outline-none"
                }
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {isEdit === true ? "Edit User" : "Create User"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-dark border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex flex-col text-left ">
                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Name <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-2 border-gray-300"
                      placeholder={
                        isEdit === true ? "UserName Edit" : "User Name"
                      }
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Address <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="text"
                      className="w-full rounded-md border p-2 border-gray-300"
                      placeholder={
                        isEdit === true ? "Address Edit" : "Add Address"
                      }
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Age <span className="text-red-900">*</span>
                    </p>
                    <input
                      type="number"
                      className="w-full rounded-md border p-2 border-gray-300"
                      placeholder={isEdit === true ? "Age Edit" : "Add Age"}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Previliges <span className="text-red-900">*</span>
                    </p>
                    <Select
                      value={previliges}
                      options={previligesList}
                      isMulti
                      onChange={(selectedOptions) => {
                        console.log(selectedOptions);
                        setPreviliges(selectedOptions);
                      }}
                      //   defaultValue={previliges}
                      className="text-black basic-multi-select"
                    />
                  </div>

                  <div>
                    <p className="text-gray-500 whitespace-no-wrap text-sm mt-3 mb-1">
                      Titles <span className="text-red-900">*</span>
                    </p>
                    <Select
                      value={title}
                      options={titlesList}
                      isMulti
                      onChange={(selectedOptions) => {
                        console.log(selectedOptions);
                        setTitle(selectedOptions);
                      }}
                      //   defaultValue={previliges}
                      className="text-black basic-multi-select"
                    />
                  </div>
                </div>
                {/*footer*/}

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    style={{ background: "black" }}
                    className="btn text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    style={{ background: "var(--bg-fill4)" }}
                    className="btn-hover text-black border-2 border-black font-bold uppercase text-sm px-6 py-[10px] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      isEdit === true ? EditUser() : CreateUser();
                    }}
                  >
                    {isEdit === true ? "Edit User" : "Create User"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default MangeUser;
