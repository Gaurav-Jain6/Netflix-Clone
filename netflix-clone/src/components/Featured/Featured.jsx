// import React, { useState, useEffect } from 'react';
// import "./Featured.css"
// import { InfoOutlined, PlayArrow } from "@mui/icons-material";
// import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
// import YouTube from "react-youtube";
// import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// const Featured = (props) => {

//     const[movieObject , setData] = useState([]) ;
//     const[videoObje , setObject] = useState([]) ;

//     useEffect(() => {
       
//         // https://api.themoviedb.org/3/movie/{movie_id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
//         // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

//         const fetchData = async() => {
//             const data = await fetch(`${API_URL}/movie/${props.id}/videos?api_key=${API_KEY}&language=en-US`) ;
//             const response = await data.json() ;
//             // console.log(response) ;
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
//         console.log(videoObje) ;
//         fetchData() ;

//     },[])

//     useEffect(() =>{
//          // https://api.themoviedb.org/3/movie/829280?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
//         fetch(`${API_URL}/movie/${props.id}?api_key=${API_KEY}&language=en-US`)
//         .then((data) =>{
//             return data.json() ;
//         })
//         .then((response) => {
            
//             // console.log(response) ;
//             setData(response) ;
//         })
        
//     },[] )
//     let poster = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}` ;
//     // console.log(movieObject) ;



//     ///////////////////////////////////////
//     const navigate = useNavigate();
//     useEffect(() =>{
//         // fetch(`${API_URL}/movie/${props.id}?api_key=${API_KEY}&language=en-US`)
//         fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
//        .then((data) =>{
//            return data.json() ;
//        })
//        .then((response) => {
           
//            console.log(response) ;
//            setData(response) ;
//        })
       
//    },[] )
    
   
//     return (
//         <div className="featured">
//             {props.addGenres ? 
//             (<div className='category-genres'>
//                 <div className="category">
//                     <span>{props.type === "movie" ? "Movies" : "Series"}</span>
//                     <select name="genre" id="genre" 
//                     // // onChange={() => this.setRedirect({ redirect: true })}
//                     // onChange={(e)=>
//                     //     {console.log("I am here in change") 
//                     //     console.log(e.currentTarget.value)
//                     //     navigate("/genre")
//                     //     props.setMovieGenre("Adventure") 
//                     // }
//                     // }
//                     >
//                         {/* <option>Genre</option>
//                         <option value="adventure"   >Adventure</option>
//                         <option value="comedy">Comedy</option>
//                         <option value="crime">Crime</option>
//                         <option value="fantasy">Fantasy</option>
//                         <option value="historical">Historical</option>
//                         <option value="horror">Horror</option>
//                         <option value="romance">Romance</option>
//                         <option value="sci-fi">Science-fiction</option>
//                         <option value="thriller">Thriller</option>
//                         <option value="western">Western</option>
//                         <option value="animation">Animation</option>
//                         <option value="drama">Drama</option>
//                         <option value="documentary">Documentary</option> */}
//                     </select>
//                 </div>

//             </div>) : 
//             (
//                 <div>

//                 </div>)
//             }
//             <img
//             src={poster}
//             alt=""
//             />
//             {/* <YouTube className="video-class" videoId={videoObje.key} opts={opts}></YouTube> */}
//             {/* <iframe className="video-class" id="fileUploadIframe" src={`https://www.youtube.com/embed/${videoObje.key}?autoplay=1&mute=1&loop=1&controls=0&vq=1080hd&modestbranding=1`}  style={{ width: '100%', height:'100%' , left:'0'}}></iframe> */}
//             <div className="info">
//                 <img src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1" alt="" className="img-info" />
//                 <span className="desc">
//                     {movieObject.overview}
//                 </span>
//                 <div className="buttons">
//                     <button className="play">
//                         <PlayArrow />
//                         <span>Play</span>
//                     </button>
//                     <button className="more">
//                         <InfoOutlined />
//                         <span>More Info</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//       );
// }
 
// export default Featured;



import React, { useState, useEffect } from 'react';
import "./Featured.css"
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
import YouTube from "react-youtube";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Featured = (props) => {

    const[movieObject , setData] = useState([]) ;
    const[videoObje , setObject] = useState([]) ;
   

    useEffect(() => {
       
        // https://api.themoviedb.org/3/movie/{movie_id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

        const fetchData = async() => {
            const data = await fetch(`${API_URL}/movie/${props.id}/videos?api_key=${API_KEY}&language=en-US`) ;
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
        // console.log(videoObje) ;
        fetchData() ;

    },[])

    useEffect(() =>{
         // https://api.themoviedb.org/3/movie/829280?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        fetch(`${API_URL}/movie/${props.id}?api_key=${API_KEY}&language=en-US`)
        .then((data) =>{
            return data.json() ;
        })
        .then((response) => {
            
            // console.log(response) ;
            setData(response) ;
        })
        
    },[] )
    let poster = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}` ;
    // console.log(movieObject) ;

    const[genreMovieObject , setMovieGenre] = useState([]) ;
    const navigate = useNavigate();
    useEffect(() =>{
        // fetch(`${API_URL}/movie/${props.id}?api_key=${API_KEY}&language=en-US`)
        fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
       .then((data) =>{
           return data.json() ;
       })
       .then((response) => {
        //    console.log(response.genres) ;
        setMovieGenre(response.genres) ;
       })
       
   },[] )
    
   
    return (
        <div className="featured">
            {props.addGenres && props.type=="Movies" ? 
            (<div className='category-genres'>
                <div className="category">
                    <span>{props.type === "Movies" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" 
                    onChange={(e)=>{
                        navigate("/genre")
                        // console.log(e.target.selectedOptions[0].innerText) ;
                        props.setMovieGenre(e.target.selectedOptions[0].innerText + e.currentTarget.value) 
                    }}>
                        <option>Genre</option>
                        {genreMovieObject.map((movieGenreObject) => {
                            return <option value={movieGenreObject.id}>{movieGenreObject.name}</option>
                        })} ;
                    </select>
                </div>

            </div>) : 
            (<div></div>)
            }
            <img src={poster} alt="" />
            {/* <YouTube className="video-class" videoId={videoObje.key} opts={opts}></YouTube> */}
            {/* <iframe className="video-class" id="fileUploadIframe" src={`https://www.youtube.com/embed/${videoObje.key}?autoplay=1&mute=1&loop=1&controls=0&vq=1080hd&modestbranding=1`}  style={{ width: '100%', height:'100%' , left:'0'}}></iframe> */}
            <div className="info">
                <img src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1" alt="" className="img-info" />
                <span className="desc">
                    {movieObject.overview}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>More Info</span>
                    </button>
                </div>
            </div>
        </div>
      );
}
 
export default Featured;