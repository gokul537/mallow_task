import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate =useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    window.location.href = "/";
    
  };

  console.log("usss",user)
  return (
    <div>
     {/* Header */}
     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Users</h1>
        <div className="flex items-center gap-2">
          <span>Elon Musk</span>
          <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={handleLogout}>Logout</button>
        </div>
      </header>
    </div>
  )
}

export default Header
