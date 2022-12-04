import React, { useState, useEffect } from 'react';
import "./Similar.css"
import { API_KEY, API_URL } from '../../../API/secrets';

const Similar = (props) => {

    let poster = `https://image.tmdb.org/t/p/w500${props.movies.poster_path}` ; 

    const[contentRating , setContentRatingMovieData] = useState("") ;
    const[ratingContext , setRatingContext] = useState("") ;   

    useEffect(() => {

        // https://api.themoviedb.org/3/movie/550?api_key=b7c5d92115fce280b185d643ac4d4dfb&append_to_response=releases
        const fetchData = async() => {
           
            let rating = "" ;
            let ratingContext = "" ;    
            const data = await fetch(`${API_URL}/movie/${props.movies.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&append_to_response=releases`) ;
            let response = await data.json() ;
            // console.log(response.releases.countries) ;

            let contentRatingObject = await response.releases.countries.filter((contentRatingObj) => {
                if (contentRatingObj.iso_3166_1 == "US" && contentRatingObj.certification != "") {
                    return true;
                }
                return false;
            });
            if(contentRatingObject.length > 0)
            {
                rating = contentRatingObject[0].certification ;
            }
            else{
                rating = "" ;
            }
            // rating = contentRatingObject[0].certification ;
            if(rating.length == 0 || rating == "NR")
            {
                rating = "U/A 13+"
                ratingContext = "Suitable for persons aged 13 and above and under parental guidance for people under age of 13" ;
            }  
            else if(rating == "R")
            {
                rating = "U/A 16+"
                ratingContext = "Suitable for persons aged 16 and above and under parental guidance"
            }
            else if(rating == "NC-17")
            {
                rating = "A"
                ratingContext = "Content restricted to adults" 
            }
            else if(rating == "G")
            {
                rating = "U"
                ratingContext = "Suitable for children and persons of all ages"
            }
            else if(rating == "PG-13")
            {
                rating = "U/A 13+"
                ratingContext = "Suitable for persons aged 13 and above and under parental guidance" ;
            }

            // console.log(rating) ;
            setContentRatingMovieData(rating) ;
            setRatingContext(ratingContext) ;
        }

        fetchData() ;

    },[])

    let str = props.movies.release_date.substring(0,4) ;
    // console.log(str) ;

    return ( 
        <div className='similar-movies'>
             <img src={poster} alt="" className="similar-movieimg" />
             <div className="content-info-box">
                <span className='similar-contentRating'>{contentRating}</span>
                <span className='similar-date'>{str}</span>
             </div>
             <div className="content-info-overview">
                <p>{props.movies.overview}</p>
             </div>
        </div>
     );
}
 
export default Similar;