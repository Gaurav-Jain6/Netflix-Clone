import React, { useState, useEffect } from 'react';
import "./MoviesLists.css" ;
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
  } from "@mui/icons-material" ;
  import YouTube from "react-youtube";


const MoviesLists = (props) => {
    const [response , setdata] = useState({}) ;
    let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;

    const [isHovered, setIsHovered] = useState(false);
    // const trailer = "https://www.youtube.com/watch?v=mDgEqoQUBgk&t=9s";

    const[vObject , setObject] = useState({}) ;
    const[movieData , setMovieData] = useState({}) ;

    useEffect(() => {
        // https://api.themoviedb.org/3/movie/{movie_id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

        const fetchData = async() => {
            const data = await fetch(`${API_URL}/movie/${props.movies.id}/videos?api_key=${API_KEY}&language=en-US`) ;
            const response = await data.json() ;
           
            let videoObject = await response.results.filter((videoObj) => {
                if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
                    // console.log(videoObj); 
                    return true;
                }
                else if(response.results.length == 1 && videoObj.site == "YouTube")
                {   
                    return true ;
                }
                else if(response.results.length == 1 || videoObj.site == "YouTube")
                {   
                    return true ;
                }
                return false;
            });
            setObject(videoObject[0]) ;
        }
        const fetchData2 = async() => {
            // https://api.themoviedb.org/3/movie/550?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
            const data = await fetch(`${API_URL}/movie/${props.movies.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
            let response = await data.json() ;
            // console.log(response) ;  
            setMovieData(response) ;
        }
        fetchData() ;
        fetchData2() ;
    },[])
    
    // console.log(movieData) ;    
    let {runtime, vote_average, tagline, release_date} = movieData;
    let genres = movieData.genres ;
    
    var hours = Math.floor(runtime / 60);          
    var minutes = runtime % 60;
    let val = "" ;
    if(hours > 0)
    {
        val = hours + "h" + " " + minutes + "m" ;
    }
    else if(minutes == 0 )
    {
        val = hours + "h" ;
    }
    else
    {
        val = minutes + "m" ;
    }

    // let len = vObject.length ;
    // console.log(vObject === undefined) ;

    // console.log(val) ;
    // console.log(genres) ;
    // console.log(runtime + " " + vote_average + " " + tagline + " " + release_date) ;

    // const trailer = `https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0` ;
    // const trailer = 'https://www.youtube.com/embed/${vObject.key}?autoplay=1' ;
    let count = 0 ;

    return (    
        <div className="movielist"
        // style={{ left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img src={poster} alt="" className="movieimg" />

        {vObject != undefined && isHovered && (
        <>
        <div className="movieHover"
        style={{ left: isHovered && props.index * 225 - 35 + props.index * 2.5 }}
        >
            
            <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
            {/* <YouTube className="video-class" videoId={vObject.key}></YouTube> */}
            {/* <iframe className="video-class" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0"></iframe> */}
            <div className="itemInfo">
                <div className="icons">
                    <div className="icon-play-like">
                        <PlayArrow className="playy" />
                        <ThumbUpAltOutlined />
                        <ThumbDownOutlined  />
                    </div>
                    <div className="icon-add-to-list">
                        <Add />
                    </div>
                </div>
                <div className="itemInfoTop">
                {/* <span>{val}</span> */}
                <li>{val}</li>
                <span className="limit">{vote_average.toFixed(1)}</span>
                {/* <span>{release_date}</span> */}
                <li>{release_date}</li>
                </div>
                <div className="desc">
                    {/* {props.movies.overview} */}
                    {tagline.length === 0 ? props.movies.title : tagline}
                </div>
                <div className="genre">
                    
                    {genres.map((val) => {
                        {if(count < 3)
                        {
                            if(count == 0)
                            {
                                count++ ;
                                return <span className="lispan">{val.name}</span>
                            }
                            count++ ;
                            return <li>{val.name}</li> 
                        }}
                    })}
                </div>
            </div>
        </div>
        </>
        )}
        </div>
     );
}
 
export default MoviesLists;