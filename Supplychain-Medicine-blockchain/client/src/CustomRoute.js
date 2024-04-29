import React from 'react'
import { Routes, useNavigate,Route } from 'react-router-dom'
import AssignRoles from "./AssignRoles";
import Home from "./Home";
import AddMed from "./AddMed";
import Supply from "./Supply";
import Track from "./Track";
import RealHome from './RealHome';
function CustomRoutes() {
  const navigate=useNavigate()

  return (
    <>
        <div className="navbar bg-primary text-primary-content sticky top-0 z-[1000]">
          <div onClick={() => navigate('/')} className="navbar-start cursor-pointer">
          <img src="logo-removebg-preview.png" className="h-[10vh]" />
        </div>
        <div className="navbar-end gap-6">
          <button onClick={() => navigate('/roles')} className="btn btn-accent">
            Register
          </button>
          <button
            onClick={() => navigate('/addmed')}
            className="btn btn-accent"
          >
            Add Medicine
          </button>
          <button onClick={() => navigate('/track')} className="btn btn-accent">
            Track{' '}
          </button>
          <button
            onClick={() => navigate('/supply')}
            className="btn btn-accent"
          >
            Control Supply Chain
          </button>
        </div>
      </div>

     <Routes>
          
          <Route path="/" exact element={<RealHome />} />
          <Route path="/roles" element={<AssignRoles />} />
          <Route path="/addmed" element={<AddMed />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/track" element={<Track />} />
        </Routes>
    </>
  )
}

export default CustomRoutes