// import React, { useState, useEffect } from 'react';
// import "./MoviesLists.css" ;
// import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
// import {
//     PlayArrow,
//     Add,
//     ThumbUpAltOutlined,
//     ThumbDownOutlined,
//   } from "@mui/icons-material" ;


// const MoviesLists = (props) => {
//     const [response , setdata] = useState({}) ;
//     let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;

//     const [isHovered, setIsHovered] = useState(false);
//     const trailer = "https://www.youtube.com/watch?v=mDgEqoQUBgk&t=9s";

//     return ( 
//         <div className="movielist"
//         // style={{ left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         >
//             <img src={poster} alt="" className="movieimg" />

//         {isHovered && (
//         <>
//         <div className="movieHover"
//         style={{ left: isHovered && props.index * 225 - 35 + props.index * 2.5 }}
//         >
            
//             {/* <video className="video-class" src={trailer} autoPlay={true} loop /> */}
//             <iframe className="video-class" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0"></iframe>
//             {/* <img src={poster} alt="" className="movieimg" /> */}
//             <div className="itemInfo">
//                 <div className="icons">
//                 <PlayArrow className="playy" />
//                 <Add />
//                 <ThumbUpAltOutlined />
//                 <ThumbDownOutlined  />
//                 </div>
//                 <div className="itemInfoTop">
//                 <span>1 hour 14 mins</span>
//                 <span className="limit">+16</span>
//                 <span>1999</span>
//                 </div>
//                 <div className="desc">
//                     {props.movies.overview}
//                 </div>
//                 <div className="genre">Action</div>
//             </div>
//         </div>
//         </>
//         )}
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


// const MoviesLists = (props) => {
//     const [response , setdata] = useState({}) ;
//     let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ;

//     const [isHovered, setIsHovered] = useState(false);
//     // const trailer = "https://www.youtube.com/watch?v=mDgEqoQUBgk&t=9s";

//     const[vObject , setObject] = useState({}) ;

//     useEffect(() => {
//         // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

//         const fetchData = async() => {
//             const data = await fetch(`${API_URL}/movie/${props.movies.id}/videos?api_key=${API_KEY}&language=en-US`) ;
//             const response = await data.json() ;
//             // console.log(response) ;
//             let videoObject = await response.results.filter((videoObj) => {
//                 if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
//                   return true;
//                 }
//                 return false;
//             });
//             setObject(videoObject[0]) ;
//         }
//         fetchData() ;
//     })

//     // const trailer = `https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0` ;
//     // const trailer = 'https://www.youtube.com/embed/${vObject.key}?autoplay=1' ;


//     return ( 
//         <div className="movielist"
//         // style={{ left: isHovered && props.index * 225 - 50 + props.index * 2.5 }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         >
//             <img src={poster} alt="" className="movieimg" />

//         {isHovered && (
//         <>
//         <div className="movieHover"
//         style={{ left: isHovered && props.index * 225 - 35 + props.index * 2.5 }}
//         >
            
//             <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
//             {/* <YouTube className="video-class" videoId={vObject.key}></YouTube> */}
//             {/* <iframe className="video-class" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0"></iframe> */}
//             <div className="itemInfo">
//                 <div className="icons">
//                 <PlayArrow className="playy" />
//                 <Add />
//                 <ThumbUpAltOutlined />
//                 <ThumbDownOutlined  />
//                 </div>
//                 <div className="itemInfoTop">
//                 <span>1 hour 14 mins</span>
//                 <span className="limit">+16</span>
//                 <span>1999</span>
//                 </div>
//                 <div className="desc">
//                     {props.movies.overview}
//                 </div>
//                 <div className="genre">Action</div>
//             </div>
//         </div>
//         </>
//         )}
//         </div>
//      );
// }
 
// export default MoviesLists;


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

    useEffect(() => {
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
                return false;
            });
            setObject(videoObject[0]) ;
        }
        fetchData() ;
    })

    // const trailer = `https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0` ;
    // const trailer = 'https://www.youtube.com/embed/${vObject.key}?autoplay=1' ;


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
            
            <iframe className="video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
            {/* <YouTube className="video-class" videoId={vObject.key}></YouTube> */}
            {/* <iframe className="video-class" src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&loop=1&modestbranding=1&;controls=0"></iframe> */}
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
        </div>
        </>
        )}
        </div>
     );
}
 
export default MoviesLists;