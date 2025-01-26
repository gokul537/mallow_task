import React from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";

export const UserCard = ({handleEditUser, setIsModalOpen, handleDelete, filteredUsers, currentUsers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {filteredUsers.length === 0 ? (
        <div className="col-span-full text-center py-4 text-gray-600">
          No users found.
        </div>
      ) : (
        filteredUsers.map((user, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transition duration-300"
          >
            {console.log("uii",user)}
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold text-center">{user.first_name} {user.first_name}</h3>
            <p className="text-gray-600 text-center">{user.email}</p>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center space-x-4 rounded-lg transition-opacity duration-300"
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { handleEditUser(user.id), setIsModalOpen(true); }}
                className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition"
              >
                <Edit className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white p-3 rounded-full shadow-md hover:bg-red-600 transition"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        ))
      )}
    </div>
  );
};
