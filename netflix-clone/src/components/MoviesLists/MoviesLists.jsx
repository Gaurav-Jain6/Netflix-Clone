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

    // // console.log(props.name)
    // useEffect(() =>{
    //     // console.log(`${API_URL}/search/movie/?api_key=${API_KEY}&query=${props.name}&page=1&include_adult=false`)
    //     // https://api.themoviedb.org/3/search/movie?api_key=b7c5d92115fce280b185d643ac4d4dfb&query=avengers&page=1&include_adult=false
    //     // https://api.themoviedb.org/3
    //     // https://image.tmdb.org/t/p/w500/
    //     fetch(`${API_URL}/search/movie/?api_key=${API_KEY}&query=${props.name}&page=1&include_adult=false`)
    //     .then((data) =>{
    //         return data.json() ;
    //     })
    //     .then((response) => {
            
    //         // console.log(response) ;
    //         setdata(response) ;
    //     })
        
    // } )

    // console.log(response.results) ;
    let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;
    // console.log(poster) ;

    const [isHovered, setIsHovered] = useState(false);
    const trailer = "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";

    return ( 
        <div className="movielist"
        // style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
            <img src={poster} alt="" className="movieimg" />

            {isHovered && (
                <>
                    
                    <div className="itemInfo">
                        <div className="icons">
                        <PlayArrow className="icon" />
                        <Add className="icon" />
                        <ThumbUpAltOutlined className="icon" />
                        <ThumbDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                        <span>1 hour 14 mins</span>
                        <span className="limit">+16</span>
                        <span>1999</span>
                        </div>
                        <div className="desc">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Praesentium hic rem eveniet error possimus, neque ex doloribus.
                        </div>
                        <div className="genre">Action</div>
                    </div>
                </>
            )}
        </div>
     );
}
 
export default MoviesLists;