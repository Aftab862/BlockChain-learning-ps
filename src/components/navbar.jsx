"use client";

import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";

import React from 'react'

const Navbar = () => {

    const pathname = usePathname();
    const hideNavbarRoutes = ["/Auth/login", "/Auth/signup"];
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("auth-token");
        Cookies.remove("user-role");
        router.push("/Auth/login");
    };




    return (
        <>
            {
                !hideNavbarRoutes.includes(pathname) &&
                <div>
                    <AppBar position="static" >
                        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h6"> Dashboard</Typography>
                            <Button color="white" sx={{ textTransform: "none" }}
                                variant="outlined"
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </Button>
                        </Toolbar>
                    </AppBar>
                </div>
            }
        </>
    )
}


export default Navbar;
