import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../components/Navbar";

export default function Layout({ socket }) {
    return (
        <>
            <Navbar socket={socket} />
            <Outlet />
        </>
    )
}