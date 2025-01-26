import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchSingleUser, fetchUsers } from "../actions/userActions";
import CreateUserModal from "./CreateUserModal";
import ConfirmationModal from "./ConfirmationModal";
import { UserCard } from "./UserCard";
import { SlidersHorizontal, Table } from "lucide-react";

const UserPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableView, setIsTableView] = useState(true);
  const [formMode, setFormMode] = useState("create");

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCreateUser = (newUser) => {
    dispatch({ type: "ADD_USER", payload: newUser });
    setIsModalOpen(false);
  };

  const handleEditUser = (userId) => {
    dispatch(fetchSingleUser(userId));
    setFormMode("update");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(selectedUserId));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTableView(true)}
              className={`px-3 py-1 rounded font-bold ${
                isTableView ? "bg-gray-200 text-blue-800" : "bg-gray-100 text-gray-500"
              }`}
            >
              <div className="flex gap-2">
                <Table />
                <p className="font-normal">Table</p>
              </div>
            </button>
            <button
              onClick={() => setIsTableView(false)}
              className={`px-3 py-1 rounded font-bold ${
                !isTableView ? "bg-gray-200 text-blue-800" : "bg-gray-100 text-gray-500"
              }`}
            >
              <div className="flex gap-2">
                <SlidersHorizontal />
                <p className="font-normal">Card</p>
              </div>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex items-center w-full sm:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={handleSearch}
                className="border px-3 py-2 rounded w-full pr-8 outline-none"
              />
              {search && (
                <div
                  onClick={() => setSearch("")}
                  className="absolute right-2 text-gray-500 hover:text-gray-700 outline-none cursor-pointer"
                >
                  ✕
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setIsModalOpen(true);
                setFormMode("create");
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Create User
            </button>
          </div>
        </div>

        {isTableView ? (
          <div className="overflow-x-auto">
            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <table className="table-auto w-full bg-white shadow-md rounded overflow-hidden text-sm">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-2 text-blue-600"></td>
                      <td className="px-4 py-2">
                      <img
  src={user.avatar}
  alt={user.first_name}
  className="w-8 h-8 md:w-12 md:h-12 rounded-full"
/>
                      </td>
                      <td className="px-4 py-2 text-blue-600">{user.email}</td>
                      <td className="px-4 py-2">{user.first_name}</td>
                      <td className="px-4 py-2">{user.last_name}</td>
                      <td className="px-4 py-2 flex flex-wrap gap-2">
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded outline-none w-full sm:w-auto"
                          onClick={() => handleEditUser(user.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded outline-none w-full sm:w-auto"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="flex justify-center sm:justify-end items-center gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
          </div>

          
        ) : (
          <UserCard
            handleEditUser={handleEditUser}
            handleDelete={handleDelete}
            setIsModalOpen={setIsModalOpen}
            filteredUsers={filteredUsers}
            currentUsers={currentUsers}
          />
        )}

        
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-sm">
            <CreateUserModal
              formMode={formMode}
              onClose={() => setIsModalOpen(false)}
              onSubmit={(newUser) => handleCreateUser(newUser)}
            />
          </div>
        </div>
      )}

      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default UserPage;
