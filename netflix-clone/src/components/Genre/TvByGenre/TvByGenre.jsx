import React, { useState, useEffect } from 'react';
import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;

import Tv from "./Tv"
import "./TvByGenre.css"

const TvByGenre = (props) => {

    const [SeriesData , settvData] = useState([]) ;
    
    useEffect(() => {
        let count = 0 ; 
            let tvMap = "" ;
            props.urls.map((val)=>{
                if(count < 1)
                {
                    count++ ;
                    const fetchData2 = async() => {
                        fetch(`${props.url[0]}`)
                        .then((data) =>{
                            return data.json() ;
                        })
                        .then((response) => {
                            tvMap = [...tvMap , response.results] ;
                            settvData(tvMap) ;
                        })
    
                    }
                    fetchData2() ;
                }
            })
    })
    return ( 
        <div>
            <h1 className="heading">{props.type} Series</h1>
            <div className='movies'>
                {/* <h1>Hello</h1> */}  
                {props.tv.map((tvObject) => {
                    // console.log(movieObject.id) ;
                    if(tvObject.poster_path)
                    {
                        return <Tv key={tvObject.id} movie={tvObject}></Tv> ;
                    }
                })} ;
            </div>
        </div>
     );
}
 
export default TvByGenre;



// import React, { useState, useEffect } from 'react';
// import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;

// import Movie from "../../MoviesByNameComponent/Movie.jsx"
// import "./MoviesByGenre.css"

// const MoviesByGenre = (props) => {

//     const [moviesData , setMovieData] = useState([]) ;
    
//     useEffect(() => {
//         let count = 0 ; 
//             let movieMap = "" ;
//             props.urls.map((val)=>{
//                 if(count < 1)
//                 {
//                     count++ ;
//                     const fetchData2 = async() => {
//                         fetch(`${props.url[0]}`)
//                         .then((data) =>{
//                             return data.json() ;
//                         })
//                         .then((response) => {
//                             movieMap = [...movieMap , response.results] ;
//                             setMovieData(movieMap) ;
//                         })
    
//                     }
//                     fetchData2() ;
//                 }
//             })
//     })
//     return ( 
//         <div>
//             <h1 className="heading">{props.type} Movies</h1>
//             <div className='movies'>
//                 {/* <h1>Hello</h1> */}  
//                 {props.movie.map((movieObject) => {
//                     // console.log(movieObject.id) ;
//                     if(movieObject.poster_path)
//                     {
//                         return <Movie key={movieObject.id} movie={movieObject}></Movie> ;
//                     }
//                 })} ;
//             </div>
//         </div>
//      );
// }
 
// export default MoviesByGenre;


// import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;

// import Movie from "../../MoviesByNameComponent/Movie.jsx"
// import "./TvByGenre.css"

// const TvByGenre = (props) => {

//     const [moviesData , setMovieData] = useState([]) ;
    
//     useEffect(() => {
//         let count = 0 ; 
//             let TvMap = "" ;
//             props.urls.map((val)=>{
//                 if(count < 1)
//                 {
//                     count++ ;
//                     const fetchData2 = async() => {
//                         fetch(`${props.url[0]}`)
//                         .then((data) =>{
//                             return data.json() ;
//                         })
//                         .then((response) => {
//                             TvMap = [...TvMap , response.results] ;
//                             setMovieData(TvMap) ;
//                         })
    
//                     }
//                     fetchData2() ;
//                 }
//             })
//     })
//     return ( 
//         <div>
//             <h1 className="heading">{props.type} Series</h1>
//             <div className='tv'>
//                 {props.tv.map((tvObject) => {
                    
//                     if(tvObject.poster_path)
//                     {
//                         return <Movie key={tvObject.id} movie={tvObject}></Movie> ;
//                     }
//                 })} ;
//             </div>
//         </div>
//      );
// }
 
// export default TvByGenre;