import React, { useState, useEffect } from 'react';
import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;

import Movie from "../../MoviesByNameComponent/Movie.jsx"
import "./MoviesByGenre.css"

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
    return ( 
        <div>
            <h1 className="heading">{props.type} Movies</h1>
            <div className='movies'>
                {/* <h1>Hello</h1> */}
                {props.movies.map((movieObject) => {
                    // console.log(movieObject.id) ;
                    if(movieObject.poster_path)
                    {
                        return <Movie key={movieObject.id} movie={movieObject}></Movie> ;
                    }
                })} ;
            </div>
        </div>
     );
}
 
export default MoviesByGenre;