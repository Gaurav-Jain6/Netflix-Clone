import React, { useState, useEffect } from 'react';
import "./Tv.css"
import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
  } from "@mui/icons-material" ;
  import YouTube from "react-youtube";
  import {Link} from "react-router-dom" ;

const Tv = (props) => {
    // const [response , setdata] = useState({}) ;
    let poster = `https://image.tmdb.org/t/p/w500${props.shows.poster_path}` ;

    const [isHovered, setIsHovered] = useState(false);
    // const trailer = "https://www.youtube.com/watch?v=mDgEqoQUBgk&t=9s";

    const[vObject , setObject] = useState({}) ;
    const[movieData , setMovieData] = useState({}) ;
    const[genresstate , setgenre] = useState("") ;

    useEffect(() => {
        // https://api.themoviedb.org/3/movie/{movie_id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

        const fetchData = async() => {
            const data = await fetch(`${API_URL}/tv/${props.shows.id}/videos?api_key=${API_KEY}&language=en-US`) ;
            const response = await data.json() ;
        //    console.log(response.results) ;
            let videoObject = await response.results.filter((videoObj) => {
                if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
                    // console.log(videoObj); 
                    return true;
                }
                else if(response.results.length == 1 && videoObj.site == "YouTube")
                {   
                    return true ;
                }
                return false;
            });
            setObject(videoObject[0]) ;
        }
        const fetchData2 = async() => {
            // https://api.themoviedb.org/3/movie/550?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
            const data = await fetch(`${API_URL}/tv/${props.shows.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
            let response = await data.json() ;
            // console.log(response) ;  
            setMovieData(response) ;
        }
        const fetchData3 = async() => {
            let str = "" ;
            const data = await fetch(`${API_URL}/tv/${props.shows.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
            let response = await data.json() ;
            // console.log(response) ; 
            for(let i = 0 ; i < response.genres.length && i < 2  ; i++)
            {
                if(i == response.genres.length - 1 || i == 1)
                {
                    str += response.genres[i].name ;
                    
                    // console.log(str) ;
                }
                else
                {
                    str += response.genres[i].name + " / " ;
                }
            }
            setgenre(str) ;
        }
        fetchData() ;
        fetchData2() ;
        fetchData3() ;
    },[])
    
    // console.log(movieData) ;    
    let {number_of_seasons, vote_average, tagline, first_air_date} = movieData;
    
    let count = 0 ;

    return (    
        <div className="movielist"
        // style={{ left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img src={poster} alt="" className="movieimg" />

        {isHovered && (
        <>
        <div className="movieHover"
        style={{ left: isHovered && props.index * 225 - 35 + props.index * 2.5 }}
        >
            {vObject != undefined ? (
            <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
            ) : (<img className="movieList-img-hover" src={poster} alt="" />) }
            
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
                        {/* <Add /> */}
                        <Link to="/fullTvInfo" state={{from: movieData}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z" fill="currentColor">
                                </path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="itemInfoTop">
                <li>{number_of_seasons} Seasons</li>
                <span className="limit">{vote_average.toFixed(1)}</span>
                <li>{first_air_date}</li>
                </div>
                <div className="desc">
                    {tagline.length === 0 ? props.shows.name : tagline}
                </div>
                <div className="genre">
                    <span>{genresstate}</span>
                </div>
            </div>
        </div>
        </>
        )}
        </div>
     );
}
 
export default Tv;