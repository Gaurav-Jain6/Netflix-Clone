import React, { useState, useEffect } from 'react';
import {API_KEY, API_URL, IMAGE_URL} from "../../../API/secrets" ;
import {
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined,
  } from "@mui/icons-material" ;
import YouTube from "react-youtube";
import { Link } from 'react-router-dom';
import "./Temp.css" ;

const Temp = (props) => {
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
            console.log(response) ;     
            setMovieData(response) ;
        }
        fetchData() ;
        fetchData2() ;
    },[])

    let {number_of_seasons, episode_run_time, vote_average, tagline, release_date} = movieData;
    let genres = movieData.genres ;
    // console.log(genres) ;
    // let str = "" ;
    // if(genres != "undefined")
    // {
    //     console.log("I am here")
    //     for(let i = 0 ; i < genres.length || i < 3  ; i++)
    //     {
    //         // if(genres[i] == undefined)
    //         // {
    //         //     break ;
    //         // }
    //         if(i == 2)
    //         {
    //             str += genres[i].name ;
    //         }
    //         else{
    //             str += genres[i].name + "/" ;
    //         }
    //         console.log(genres[i].name)  ;
    //     }
    //     console.log(str) ;
    // }
    
    var hours = Math.floor(episode_run_time / 60);          
    var minutes = episode_run_time % 60;
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

    // let len = vObject.length ;
    // console.log(vObject === undefined) ;

    // console.log(val) ;
    // console.log(genres) ;
    // console.log(number_of_seasons + " " + episode_run_time + " " + vote_average + " " + tagline + " " + release_date) ;

    // const trailer = `https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0` ;
    // const trailer = 'https://www.youtube.com/embed/${vObject.key}?autoplay=1' ;
    let count = 0 ;
    
    return (    
        <div>
        <div className="movielist-temp"
        // style={{ left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img src={tvObject.poster_path} alt="" className="movieimg" />
            {vObject != undefined && isHovered && (
        <>
        <div className="movieHover"
        style={{ left: isHovered && props.index * 225 + 35 + props.index * 160 , top: isHovered && props.top * 225 + 700 + props.top * 72}}
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
                            <Add></Add>
                    </div>
                </div>
                <div className="itemInfoTop">
                {/* <span>{val}</span> */}
                <li>{val}</li>
                <span className="limit">{vote_average.toFixed(1)}</span>
                {/* <span>{release_date}</span> */}
                <li>{number_of_seasons}</li>
                <li>{release_date}</li>
                </div>
                <div className="desc">
                    {/* {props.movies.overview} */}
                    {tagline.length === 0 ? props.movie.name : tagline}
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
        {/* <div className="movie-info">
            <div className="movie-title">{props.movie.name}</div>
            <div className="movie-rating">{vote_average.toFixed(1)} IMDB</div>
        </div> */}

        </div>

        
    );
}
 
export default Temp;



// import React, { useState, useEffect } from 'react';
// import {API_KEY, API_URL, IMAGE_URL} from "../../../API/secrets" ;

// const Temp = (props) => {
//     const[tvObject , setObject] = useState({}) ;

//     useEffect(()=>{

//         const fetchData = async() => {
//             const data = await fetch(`${API_URL}/tv/${props.movie.id}?api_key=${API_KEY}`) ;
//             const response = await data.json() ;
//             // console.log(response) ;
//             let posterPath = IMAGE_URL + response.poster_path;
//             // console.log(posterPath) ;
//             response.poster_path = posterPath ;
//             setObject(response) ;
//             console.log(tvObject) ;
//         }
//         // console.log(tvObject) ;
        
//         fetchData() ;
//     }, [])

//     const [isHovered, setIsHovered] = useState(false);
    
//     return (    
//         <div className="movielist"
//         // style={{ left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         >
//             <img src={poster} alt="" className="movieimg" />

//         {vObject != undefined && isHovered && (
//         <>
//         <div className="movieHover"
//         style={{ left: isHovered && props.index * 225 - 35 + props.index * 2.5 }}
//         >
            
//             <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
//             {/* <YouTube className="video-class" videoId={vObject.key}></YouTube> */}
//             {/* <iframe className="video-class" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0"></iframe> */}
//             <div className="itemInfo">
//                 <div className="icons">
//                     <div className="icon-play-like">
//                         <PlayArrow className="playy" />
//                         <ThumbUpAltOutlined />
//                         <ThumbDownOutlined  />
//                     </div>
//                     <div className="icon-add-to-list">
//                             <Add onClick></Add>
//                     </div>
//                 </div>
//                 <div className="itemInfoTop">
//                 {/* <span>{val}</span> */}
//                 <li>{val}</li>
//                 <span className="limit">{vote_average.toFixed(1)}</span>
//                 {/* <span>{release_date}</span> */}
//                 <li>{release_date}</li>
//                 </div>
//                 <div className="desc">
//                     {/* {props.movies.overview} */}
//                     {tagline.length === 0 ? props.movies.title : tagline}
//                 </div>
//                 <div className="genre">
                    
//                     {genres.map((val) => {
//                         {if(count < 3)
//                         {
//                             if(count == 0)
//                             {
//                                 count++ ;
//                                 return <span className="lispan">{val.name}</span>
//                             }
//                             count++ ;
//                             return <li>{val.name}</li> 
//                         }}
//                     })}
//                 </div>
//             </div>
//         </div>
//         </>
//         )}
//         </div>
//     );
// }
 
// export default Temp;