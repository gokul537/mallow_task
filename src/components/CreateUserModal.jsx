import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../actions/userActions";
import { X } from "lucide-react";

const CreateUserModal = ({ onClose, onSubmit,formMode }) => {

    const { userDetails, loading } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  console.log("userDetails",userDetails)
  useEffect(() => {
    if (formMode === "update" && userDetails) {
      setFormData({
        first_name: userDetails.first_name || "",
        last_name: userDetails.last_name || "",
        email: userDetails.email || "",
        avatar: userDetails.avatar || "",
      });
    }
  }, [userDetails, formMode]);
  


      
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formMode === "create"){

        dispatch(createUser(formData)); 
       
    } else {
        dispatch(updateUser(userDetails.id,formData)); 
      }
      
      onSubmit(formData); 
    console.log("formData",formData)
    setFormData({ first_name: "", last_name: "", email: "", avatar: "" });
  };

  return (
    <div>
      <div className="flex justify-between">
      <h2 className="text-xl mb-4 capitalize">{formMode} New User</h2>
      <X onClick={onClose} className="cursor-pointer"/>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1"><span className="text-red-700">*</span> First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1"><span className="text-red-700">*</span>  Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter last name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1"><span className="text-red-700">*</span>  Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1"><span className="text-red-700">*</span>  Profile Image Link</label>
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter profile image URL"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserModal;
