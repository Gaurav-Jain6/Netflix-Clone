import React, { useState, useEffect } from 'react';

import Movie from "./Movie" ;
import "./MoviesByName.css"
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;

const MoviesByName = (props) => {
    const [moviesData , setMovieData] = useState([]) ;
    // let urls = [] ;
    // console.log(props.name) ;
    // for(let i = 1 ; i < props.pages.length ; i++)
    // {
    //     let url = `${API_URL}/search/multi?api_key=${API_KEY}&page=${i}&query=${props.name}`
    //     urls = [...urls , url] ;
    // }
    // console.log(urls) ;
    
    // props.urls.map((val)=>{
    //     useEffect(() => {
    //         const fetchData2 = async() => {
    //             fetch(`${val}`)
    //             .then((data) =>{
    //                 return data.json() ;
    //             })
    //             .then((response) => {
    //                 console.log(1) ;
    //                 console.log(response.results) ;
    //                 setMovieData(response.results) ;
    //                 // movieMap = [...movieMap , response] ;
    //                 // console.log(movieMap) ;
    //             })
    //         }
    //         fetchData2() ;
    //     },[])

    // })

    useEffect(() => {
        let count = 0 ; 
        // if(count < 3)
        // {
            let movieMap = "" ;
            props.urls.map((val)=>{
                if(count < 1)
                {
                    // console.log(val) ;
                    count++ ;
                    const fetchData2 = async() => {
                        fetch(`${props.url[0]}`)
                        .then((data) =>{
                            return data.json() ;
                        })
                        .then((response) => {
                            // console.log(1) ;
                            // console.log(response.results) ;
                            // props.movies = [...props.movies, response.results] ;
                            movieMap = [...movieMap , response.results] ;
                            setMovieData(movieMap) ;
                            // console.log(movieMap) ;
                            // console.log(props.movies);
                            // console.log(moviesData) ;
                        })
    
                    }
                    fetchData2() ;
                }
            })
        // }
    },[])

    // useEffect(() => {
    //     const fetchData2 = async() => {
    //         // https://api.themoviedb.org/3/movie/550?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
    //         // props.urls.map((val)=> {
    //             // const data =fetch(`${val}`) ;
    //             fetch(`${props.movies}`)
    //             .then((data) =>{
    //                 return data.json() ;
    //             })
    //             .then((response) => {
    //                 // console.log(1) ;
    //                 console.log(response) ;
    //                 setMovieData(response.results) ;
    //                 // movieMap = [...movieMap , response] ;
    //                 // console.log(movieMap) ;
    //             })
    //             // console.log(val) ;
    //             // let response = data.json() ;
    //             // console.log(response) ;  
    //             // setMovieData(response) ;
    //         // }
    //     }
    //     fetchData2() ;
    // },[]) 
    // console.log(moviesData) ;\SwitchProfile

    return ( 
        <div className='movies'>
            {props.movies.map((movieObject) => {
                // console.log(movieObject.id) ;
                if(movieObject.poster_path)
                {
                    return <Movie key={movieObject.id} movie={movieObject}></Movie> ;
                }
            })} ;
        </div>
     );
}
 
export default MoviesByName;