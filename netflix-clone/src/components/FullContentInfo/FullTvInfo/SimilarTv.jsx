import React, { useState, useEffect } from 'react';
import "./SimilarTv.css" ;
import { API_KEY, API_URL } from '../../../API/secrets';

const SimilarTv = (props) => {

    let poster = `https://image.tmdb.org/t/p/w500${props.tv.poster_path}` ; 

    const[contentRating , setContentRatingMovieData] = useState("") ;
    const[ratingContext , setRatingContext] = useState("") ;   
    
    // console.log(props) ;

    useEffect(() => {
        // https://api.themoviedb.org/3/tv/90462/content_ratings?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        const fetchData = async() => {
           
            let rating = "" ;
            let ratingContext = "" ;
            const data = await fetch(`${API_URL}/tv/${props.tv.id}/content_ratings?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
            let response = await data.json() ;
            // console.log(response.releases.countries) ;
            console.log(response) ;
            
            let contentRatingObject = await response.results.filter((contentRatingObj) => {
                // console.log(contentRatingObj) ;
                if (contentRatingObj.iso_3166_1 == "US") {
                    return true;
                }
                return false;
            });
            if(contentRatingObject.length != 0)
            {
                rating = contentRatingObject[0].rating ;
            }
            console.log(rating.length) ;
            if(rating.length == 0 || rating == "NR")
            {
                rating = "U/A 13+"
                ratingContext = "Suitable for persons aged 13 and above and under parental guidance for people under age of 13" ;
            } 
            else if(rating == "TV-G" || rating == "TV-Y")
            {
                rating = "U"
                ratingContext = "Suitable for children and persons of all ages"
            }
            else if(rating == "TV-Y7")
            {
                rating = "U/A 7+"
                ratingContext = "Suitable for children 7 and above and under parental guidance for persons under age of 7"
            }
            else if(rating == "TV-14")
            {
                rating = "U/A 13+"
                ratingContext = "Suitable for persons aged 13 and above and under parental guidance" ;
            }
            else if(rating == "TV-PG" )
            {
                rating = "U/A 16+"
                ratingContext = "Suitable for persons aged 16 and above and under parental guidance"
            }
            else if(rating == "TV-MA")
            {
                rating = "A"
                ratingContext = "Content restricted to adults" 
            }

            // console.log(rating) ;
            setContentRatingMovieData(rating) ;
            setRatingContext(ratingContext) ;
        }

        fetchData() ;

    },[])

    let str = props.tv.first_air_date.substring(0,4) ;
    // console.log(str) ;

    return ( 
        <div className='similar-movies'>
             <img src={poster} alt="" className="similar-movieimg" />
             <div className="content-info-box">
                <span className='similar-contentRating'>{contentRating}</span>
                <span className='similar-date'>{str}</span>
             </div>
             <div className="content-info-overview">
                <p>{props.tv.overview}</p>
             </div>
        </div>
     );
}
 
export default SimilarTv;