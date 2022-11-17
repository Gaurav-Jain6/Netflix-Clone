import React, { useState, useEffect, useRef } from 'react';
import "./Navbar.css" ;

import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import {Link} from "react-router-dom" ;
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;

const Navbar = (props) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const[newMovieName , setState] = useState("") ;
    const[show , setshow] = useState(false) ;
    
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };

    const handleOnChange = (e) =>{
        // console.log(e) ;
        let value = e.target.value ;
        setState(value) ;
    }
    const handleKeyPress = (e) =>
    {
        if(e.key == "Enter")
        {
            console.log(e) ;
            setshow(false) ;
            // console.log(show) ;
            props.setMovie(newMovieName) ;
        }
    }

    let menuRef = useRef() ;

    useEffect(()=>{
        let handler = (event)=>{
            if(!menuRef.current.contains(event.target))
            {
                setshow(false) ;
            }
        }

        document.addEventListener("mousedown" , handler) ;

        return () =>{
            document.removeEventListener("mousedown" , handler) ;
        }
    })

    return ( 
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <Link to="/">
                        <img src="./Images/logo.svg" alt="" />
                    </Link>
                </div>
                <span>
                    <Link to="/">
                        <div 
                        // onClick={()=>
                        //     {if (props.name.length != 0){
                        //         // console.log(props.name) ;   
                        //         props.setMovie(props.name) ;
                        //     }
                        //     // props.setMovie(props.currentMovie)
                        // }}
                        >
                        Homepage
                        </div> 
                    </Link>
                </span>
                <span className="TvShowsLink">
                    <Link to="/TvShows">TV Shows</Link>
                    {/* Tv Shows     */}
                </span>
                <span>
                    <Link to="/Movies">Movies</Link>
                </span>
                <span>
                    <Link to="/NewAndPopular">New & Popular</Link>
                </span>
                <span>My List</span>
            </div>
            <div className="right">
                {/* <div className="search-btn">
                    {(show ? (<input type="text" 
                    className="search-movies" 
                    placeholder="Search" 
                    // onChange={handleOnChange} 
                    // onKeyPress={handleKeyPress}
                    />):(<h1>Nothing</h1>))}
                    {console.log(show)}
                </div>

                <Search onClick={()=>setshow(!show)} className="icon searchNav" /> */}
                <div ref={menuRef} className="search-area">
                    {(show ? (
                        <div className="search-btn-bar-area">
                            <Link to="/searched" >
                            <Search onClick={()=>{
                                setshow(!show) ;
                                props.setMovie(newMovieName) ;
                                }}  className="icon searchNav" />
                            </Link>
                            <input type="text" className="search-movies bar" placeholder="Titles, search, genres" 
                                onChange={handleOnChange}
                                // onKeyPress={(e)=>e.key=="Enter"? setshow(false) : ""} 
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    ):(<div className="search-btn-bar-area-active">
                        <Search onClick={()=>setshow(!show)}  className="icon searchNav onactive" />
                        </div>
                        ))}
                    {/* {console.log(show)} */}
                </div>

                {/* <Search onClick={()=>setshow(!show)} className="icon searchNav" /> */}
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