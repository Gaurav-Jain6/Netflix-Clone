import React, { useState, useEffect } from 'react';
import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;

import Movie from "../../MoviesByNameComponent/Movie.jsx"
import "./MoviesByGenre.css"
import TempMovie from "./TempMovies" ;

const MoviesByGenre = (props) => {

    const [moviesData , setMovieData] = useState([]) ;
    
    useEffect(() => {
        let count = 0 ; 
            let movieMap = "" ;
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
                            movieMap = [...movieMap , response.results] ;
                            setMovieData(movieMap) ;
                        })

                    }
                    fetchData2() ;
                }
            })
    })
    let count = 0 ;
    return ( 
        <div>
            <h1 className="heading">{props.type} Movies</h1>
            <div className='movies-movie-genre'>
                {/* <h1>Hello</h1> */}
                {props.movies.map((movieObject) => {
                    // console.log(movieObject.id) ;
                    if(movieObject.poster_path)
                    {
                        count+=1 ;
                        let tempval = count-1 ;
                        let temp = count-1 ;

                        return <TempMovie key={movieObject.id} movie={movieObject} index={parseInt(tempval++%4)} top={parseInt(temp++/4)}></TempMovie> ;
                    }
                })} ;
            </div>
        </div>
     );
}
 
export default MoviesByGenre;