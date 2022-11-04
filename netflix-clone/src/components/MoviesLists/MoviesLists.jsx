import React, { useState, useEffect } from 'react';
import "./MoviesLists.css" ;
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
  } from "@mui/icons-material" ;


const MoviesLists = (props) => {
    const [response , setdata] = useState({}) ;
    let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;

    const [isHovered, setIsHovered] = useState(false);
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

    return ( 
        <div className="movielist"
        style={{ left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img src={poster} alt="" className="movieimg" />

        {isHovered && (
        <>
            <video className="video" src={trailer} autoPlay={true} loop />
            <div className="itemInfo">
                <div className="icons">
                <PlayArrow className="playy" />
                <Add />
                <ThumbUpAltOutlined />
                <ThumbDownOutlined  />
                </div>
                <div className="itemInfoTop">
                <span>1 hour 14 mins</span>
                <span className="limit">+16</span>
                <span>1999</span>
                </div>
                <div className="desc">
                    {props.movies.overview}
                </div>
                <div className="genre">Action</div>
            </div>
        </>
        )}
        </div>
     );
}
 
export default MoviesLists;