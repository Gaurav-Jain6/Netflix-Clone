import React, { useState, useEffect } from 'react';
import "./Navbar.css" ;
// import "./Vavbar.scss"
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import {Link} from "react-router-dom" ;

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
    return ( 
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="./Images/logo.svg" alt="" />
                </div>
                <span>Homepage</span>
                <span className="TvShowsLink">
                    <Link to="/TvShows">TV Shows</Link>
                    {/* Tv Shows     */}
                </span>
                <span>Movies</span>
                <span>New & Popular</span>
                <span>My List</span>
            </div>
            <div className="right">
                <Search className="icon searchNav" />
                <span>KID</span>
                <Notifications className="icon bellNav" />
                <img
                    src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                />
                <div className="profile">
                    <ArrowDropDown className="icon dropDownNav" />
                    <div className="options">
                    <span>Settings</span>
                    <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;