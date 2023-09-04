import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

export default function Layout() {
    const token = useSelector((state) => state.token);
    return (
        <>  
            {token 
            ? 
            <>
            <Navbar />
            <Outlet />
            </> 
            : 
            <Navigate to={'/login'} />}
        </>
    )
}