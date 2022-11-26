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
  import { Link } from 'react-router-dom';
  import MoviesDetailsComponent from "../FullContentInfo/FullMoviesInfo/FullMoviesInfo.jsx"
import FullMoviesInfo from '../FullContentInfo/FullMoviesInfo/FullMoviesInfo.jsx';
 
const MoviesLists = (props) => {
    const [response , setdata] = useState({}) ;
    let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;
    const [isHovered, setIsHovered] = useState(false);
    const[vObject , setObject] = useState({}) ;
    const[movieData , setMovieData] = useState({}) ;
    const[genresstate , setgenre] = useState("") ;

    useEffect(() => {
        
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
           
            const data = await fetch(`${API_URL}/movie/${props.movies.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
            let response = await data.json() ;
            setMovieData(response) ;
            for(let i = 0 ; i < response.genres.length && i < 3  ; i++)
            {
                if(response.genres.length == 2 && i == 1)
                {
                    str += response.genres[i].name ;
                    break ;
                }
                if(i == 2)
                {
                    str += response.genres[i].name ;
                }
                else{
                    str += response.genres[i].name + " / " ;
                }
            }
            setgenre(str) ;
        }
        fetchData() ;
        fetchData2() ;
    },[])
    
    let {runtime, vote_average, tagline, release_date} = movieData;
    let str = "" ;
    
    var hours = Math.floor(runtime / 60);          
    var minutes = runtime % 60;
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

    const[showContent , showContentState] = useState(false) ;

    const handleClick = () => {
        setIsHovered(!isHovered) ;
        showContentState(!showContent) ;    
    }
    
    return (   
        <div>
    <div className="movielist"
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
                <div className="itemInfo">
                    <div className="icons">
                        <div className="icon-play-like">
                            <PlayArrow className="playy" />
                            <ThumbUpAltOutlined />
                            <ThumbDownOutlined  />
                        </div>
                        <div className="icon-add-to-list">
                        {/* <Link to="/fullMovieInfo" state={{from: movieData}}><Add></Add></Link> */}
                        <Link to="/fullMovieInfo" state={{from: movieData}}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z" fill="currentColor">
                                </path>
                            </svg>
                        </Link>
                        
                        </div>
                    </div>
                    <div className="itemInfoTop">
                    <li>{val}</li>
                    <span className="limit">{vote_average.toFixed(1)}</span>
                    <li>{release_date}</li>
                    </div>
                    <div className="desc">
                        {tagline.length === 0 ? props.movies.title : tagline}
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
 
export default MoviesLists;
















// import React, { useState, useEffect } from 'react';
// import "./MoviesLists.css" ;
// import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
// import {
//     PlayArrow,
//     Add,
//     ThumbUpAltOutlined,
//     ThumbDownOutlined,
//   } from "@mui/icons-material" ;
//   import YouTube from "react-youtube";
//   import { Link } from 'react-router-dom';
//   import MoviesDetailsComponent from "../FullMoviesInfo/FullMoviesInfo.jsx"
// import FullMoviesInfo from '../FullMoviesInfo/FullMoviesInfo.jsx';
 
// const MoviesLists = (props) => {
//     const [response , setdata] = useState({}) ;
//     let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;
//     const [isHovered, setIsHovered] = useState(false);
//     const[vObject , setObject] = useState({}) ;
//     const[movieData , setMovieData] = useState({}) ;
//     const[genresstate , setgenre] = useState("") ;

//     useEffect(() => {
        
//         const fetchData = async() => {
//             const data = await fetch(`${API_URL}/movie/${props.movies.id}/videos?api_key=${API_KEY}&language=en-US`) ;
//             const response = await data.json() ;
           
//             let videoObject = await response.results.filter((videoObj) => {
//                 if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
//                     // console.log(videoObj); 
//                     return true;
//                 }
//                 else if(response.results.length == 1 && videoObj.site == "YouTube")
//                 {   
//                     return true ;
//                 }
//                 else if(response.results.length == 1 || videoObj.site == "YouTube")
//                 {   
//                     return true ;
//                 }
//                 return false;
//             });
//             setObject(videoObject[0]) ;
//         }
//         const fetchData2 = async() => {
           
//             const data = await fetch(`${API_URL}/movie/${props.movies.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
//             let response = await data.json() ;
//             setMovieData(response) ;
//             for(let i = 0 ; i < response.genres.length && i < 3  ; i++)
//             {
//                 if(response.genres.length == 2 && i == 1)
//                 {
//                     str += response.genres[i].name ;
//                     break ;
//                 }
//                 if(i == 2)
//                 {
//                     str += response.genres[i].name ;
//                 }
//                 else{
//                     str += response.genres[i].name + " / " ;
//                 }
//             }
//             setgenre(str) ;
//         }
//         fetchData() ;
//         fetchData2() ;
//     },[])
    
//     let {runtime, vote_average, tagline, release_date} = movieData;
//     let str = "" ;
    
//     var hours = Math.floor(runtime / 60);          
//     var minutes = runtime % 60;
//     let val = "" ;
//     if(hours > 0)
//     {
//         val = hours + "hr" + " " + minutes + "min" ;
//     }
//     else if(minutes == 0 )
//     {
//         val = hours + "hr" ;
//     }
//     else
//     {
//         val = minutes + "min" ;
//     }

//     let count = 0 ;

//     const[showContent , showContentState] = useState(false) ;

//     // const handleClick = () => {
//     //     if(!showContent)
//     //     {
//     //         showContentState(true) ;
//     //         setIsHovered(false) ;
//     //         console.log("I am here") ;
//     //         // <MoviesDetailsComponent></MoviesDetailsComponent> ;
//     //     }
//     // };
//     const handleClick = () => {
//         setIsHovered(!isHovered) ;
//         showContentState(!showContent) ;    
//     }
//     // function handleClick(){
//     //     showContentState(!showContent) ;    
//     // }
    
//     return (   
//         <div>
//             {showContent ? (<Link to="/fullMovieInfo"><FullMoviesInfo></FullMoviesInfo></Link>) : (<div></div>)}
//             {/* <FullMoviesInfo></FullMoviesInfo> */}
//             {/* {showContent ? (<FullMoviesInfo
//                 style={{ left: 0 }}
//             ></FullMoviesInfo>) : (<div></div>)} */}
//     <div className="movielist"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             >
//             <img src={poster} alt="" className="movieimg" />

//             {vObject != undefined && isHovered && (
//                 <>
//             <div className="movieHover"
//             style={{ left: isHovered && props.index * 225 - 35 + props.index * 2.5 }}
//             >
            
//                 <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
//                 <div className="itemInfo">
//                     <div className="icons">
//                         <div className="icon-play-like">
//                             <PlayArrow className="playy" />
//                             <ThumbUpAltOutlined />
//                             <ThumbDownOutlined  />
//                         </div>
//                         <div className="icon-add-to-list">
//                             {!showContent ? (
//                                 <Add
//                                 onClick={handleClick}
//                                 ></Add>
//                             ) : (
//                                 <PlayArrow className="playy" onClick={handleClick}/>
//                                 // <FullMoviesInfo className="fullContent"></FullMoviesInfo>
//                             )}
//                         </div>
//                     </div>
//                     <div className="itemInfoTop">
//                     <li>{val}</li>
//                     <span className="limit">{vote_average.toFixed(1)}</span>
//                     <li>{release_date}</li>
//                     </div>
//                     <div className="desc">
//                         {tagline.length === 0 ? props.movies.title : tagline}
//                     </div>
//                     <div className="genre">
//                         <span>{genresstate}</span>
//                     </div>
//                 </div>
//             </div>
//             </>
//             )}
//         </div>

//         </div>
//      );
// }
 
// export default MoviesLists;
























// import React, { useState, useEffect } from 'react';
// import "./MoviesLists.css" ;
// import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
// import {
//     PlayArrow,
//     Add,
//     ThumbUpAltOutlined,
//     ThumbDownOutlined,
//   } from "@mui/icons-material" ;
//   import YouTube from "react-youtube";
//   import { Link } from 'react-router-dom';
//   import MoviesNameComponent from "../FullMoviesInfo/FullMoviesInfo.jsx"
 


// const MoviesLists = (props) => {
//     const [response , setdata] = useState({}) ;
//     let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;

//     const [isHovered, setIsHovered] = useState(false);
//     // const trailer = "https://www.youtube.com/watch?v=mDgEqoQUBgk&t=9s";

//     const[vObject , setObject] = useState({}) ;
//     const[movieData , setMovieData] = useState({}) ;

//     const[showContent , showContentState] = useState(true) ;
//     const[genresstate , setgenre] = useState("") ;

//     useEffect(() => {
//         // https://api.themoviedb.org/3/movie/{movie_id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
//         // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

//         const fetchData = async() => {
//             const data = await fetch(`${API_URL}/movie/${props.movies.id}/videos?api_key=${API_KEY}&language=en-US`) ;
//             const response = await data.json() ;
           
//             let videoObject = await response.results.filter((videoObj) => {
//                 if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
//                     // console.log(videoObj); 
//                     return true;
//                 }
//                 else if(response.results.length == 1 && videoObj.site == "YouTube")
//                 {   
//                     return true ;
//                 }
//                 else if(response.results.length == 1 || videoObj.site == "YouTube")
//                 {   
//                     return true ;
//                 }
//                 return false;
//             });
//             setObject(videoObject[0]) ;
//         }
//         const fetchData2 = async() => {
//             // https://api.themoviedb.org/3/movie/550?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
//             const data = await fetch(`${API_URL}/movie/${props.movies.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
//             let response = await data.json() ;
//             // console.log(response) ;  
//             setMovieData(response) ;
//             for(let i = 0 ; i < response.genres.length && i < 3  ; i++)
//             {
//                 if(response.genres.length == 2 && i == 1)
//                 {
//                     str += response.genres[i].name ;
//                     break ;
//                 }
//                 if(i == 2)
//                 {
//                     str += response.genres[i].name ;
//                 }
//                 else{
//                     str += response.genres[i].name + " / " ;
//                 }
//             }
//             setgenre(str) ;
//         }
//         fetchData() ;
//         fetchData2() ;
//     },[])
    
//     // console.log(movieData) ;    
//     let {runtime, vote_average, tagline, release_date} = movieData;
//     let str = "" ;
//     // let genres = movieData.genres ;
//     // console.log(genres) ;
//     // let str = "" ;
//     // if(genres != "undefined")
//     // {
//     //     console.log("I am here")
//     //     for(let i = 0 ; i < genres.length || i < 3  ; i++)
//     //     {
//     //         // if(genres[i] == undefined)
//     //         // {
//     //         //     break ;
//     //         // }
//     //         if(i == 2)
//     //         {
//     //             str += genres[i].name ;
//     //         }
//     //         else{
//     //             str += genres[i].name + "/" ;
//     //         }
//     //         console.log(genres[i].name)  ;
//     //     }
//     //     console.log(str) ;
//     // }
    
//     var hours = Math.floor(runtime / 60);          
//     var minutes = runtime % 60;
//     let val = "" ;
//     if(hours > 0)
//     {
//         val = hours + "hr" + " " + minutes + "min" ;
//     }
//     else if(minutes == 0 )
//     {
//         val = hours + "hr" ;
//     }
//     else
//     {
//         val = minutes + "min" ;
//     }

//     // let len = vObject.length ;
//     // console.log(vObject === undefined) ;

//     // console.log(val) ;
//     // console.log(genres) ;
//     // console.log(runtime + " " + vote_average + " " + tagline + " " + release_date) ;

//     // const trailer = `https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0` ;
//     // const trailer = 'https://www.youtube.com/embed/${vObject.key}?autoplay=1' ;
//     let count = 0 ;

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
//                     <span>{genresstate}</span>
//                     {/* {genres.map((val) => {
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
//                     })} */}
//                 </div>
//             </div>
//         </div>
//         </>
//         )}
//         </div>
//      );
// }
 
// export default MoviesLists;