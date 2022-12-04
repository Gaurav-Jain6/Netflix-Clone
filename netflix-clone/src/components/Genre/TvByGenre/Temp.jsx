import React, { useState, useEffect } from 'react';
import {API_KEY, API_URL, IMAGE_URL} from "../../../API/secrets" ;
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
} from "@mui/icons-material" ;
import "./Temp.css" ;
import { Link } from 'react-router-dom';

const Temp = (props) => {
    // console.log(props.movie) ;
    const[tvObject , setTvObject] = useState({}) ;

    useEffect(()=>{

        const fetchData = async() => {
            const data = await fetch(`${API_URL}/tv/${props.movie.id}?api_key=${API_KEY}`) ;
            const response = await data.json() ;
            // console.log(response) ;
            let posterPath = IMAGE_URL + response.poster_path;
            // console.log(posterPath) ;
            response.poster_path = posterPath ;
            setTvObject(response) ;
            // console.log(tvObject) ;
        }
        // console.log(tvObject) ;
        
        fetchData() ;
    }, [])

    const [isHovered, setIsHovered] = useState(false);
    const[vObject , setObject] = useState({}) ;
    const[movieData , setMovieData] = useState({}) ;
    const[genresstate , setgenre] = useState("") ;
    const[timestate , setTime] = useState("") ;

    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch(`${API_URL}/tv/${props.movie.id}/videos?api_key=${API_KEY}&language=en-US`) ;
            const response = await data.json() ;
            // console.log(response) ;
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
            const data = await fetch(`${API_URL}/tv/${props.movie.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
            let response = await data.json() ;
            // console.log(response) ;     
            setMovieData(response) ;
            for(let i = 0 ; i < response.genres.length && i < 3  ; i++)
            {
                if(i == response.genres.length - 1)
                {
                    str += response.genres[i].name ;
                    // console.log(str) ;
                }
                else
                {
                    str += response.genres[i].name + " / " ;
                }
                // console.log(response.genres[i].name)  ;
            }
            // console.log(str) ;
            setgenre(str) ;
            let len = response.episode_run_time ;
            episodeRunTime = response.episode_run_time[0] ; 
            
            if(len == 0)
            {
                episodeRunTime = "25" ;
            }

            setTime(episodeRunTime) ;
        }
        fetchData() ;
        fetchData2() ;
    },[])
    
    let {number_of_seasons, episode_run_time, vote_average, tagline, first_air_date} = movieData;
    // let genres = movieData.genres ;
    let episodeRunTime = "" ;
    let str = "" ;
   
    var hours = Math.floor(timestate / 60);          
    var minutes =  timestate % 60;
    let val = "" ;
    if(hours > 0)
    {
        val = hours + "hr" + " " + minutes + "min" ;
    }
    else if(minutes == 0 )
    {
        val = hours + "hr" ;
    }
    else
    {
        val = minutes + "min" ;
    }
    let count = 0 ;
    
    return (    
        <div>
        <div className="movielist-temp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img src={tvObject.poster_path} alt="" className="movieimg" />
            {isHovered && (
        <>
        <div className="movieHover"
        style={{ left: isHovered && props.index * 225 + 5 + props.index * 130 , top: isHovered && props.top * 225 + 650 + props.top * 72}}
        >
            {vObject != undefined ? (
                <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
                ) : (<img className="movieList-img-hover" src={tvObject.poster_path} alt="" />) }
            
            {/* <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe> */}
            <div className="itemInfo">
                <div className="icons">
                    <div className="icon-play-like">
                        <PlayArrow className="playy" />
                        <ThumbUpAltOutlined />
                        <ThumbDownOutlined  />
                    </div>
                    <div className="icon-add-to-list">
                            {/* <Add></Add> */}
                            <Link to="/fullTvInfo" state={{from: props.movie}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z" fill="currentColor">
                                </path>
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="itemInfoTop">
                {/* <span>{val}</span> */}
                <li>{val}</li>
                <span className="limit">{vote_average.toFixed(1)}</span>
                {/* <span>{release_date}</span> */}
                <span>{number_of_seasons} Seasons</span>
                {/* <li>{first_air_date}</li> */}
                </div>
                <div className="desc">
                    {/* {props.movies.overview} */}
                    {tagline.length === 0 ? props.movie.name : tagline}
                </div>
                <div className="genre">
                    <span>{genresstate}</span>
                </div>
            </div>
        </div>
        </>
        )}
        </div>

        </div>
    );
}
 
export default Temp;
