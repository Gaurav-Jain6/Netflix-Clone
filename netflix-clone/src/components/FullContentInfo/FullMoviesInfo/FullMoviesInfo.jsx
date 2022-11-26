import React, { useState, useEffect } from 'react';
import "./FullMoviesInfo.css" ;
import { useLocation } from "react-router-dom";
import { API_URL, API_KEY, API_IMAGE } from "../../../API/secrets";
// import {HashLink} from "react-router-hash-link"
import AnchorLink from "react-anchor-link-smooth-scroll";
import Similar from "./Similar" ;

const FullMoviesInfo = () => {

    const location = useLocation();
    const { from } = location.state;
    // console.log(from);

    const[vObject , setObject] = useState({}) ;
    const[similarMovieData , setSimilarMovieData] = useState([]) ;
    const[genre , setgenre] = useState("") ;
    const[fullCastData , setCastMovieData] = useState({}) ;
    // const[director , setDirector] = useState([]) ;
    // const[cast , setCast] = useState([]) ;
    // const[writer , setWriter] = useState([]) ;
    // const[contentRating , setContentRatingMovieData] = useState([]) ;    
    const[director , setDirector] = useState("") ;
    const[cast , setCast] = useState("") ;
    const[smallcast , setSmallCast] = useState("") ;
    const[writer , setWriter] = useState("") ;
    const[contentRating , setContentRatingMovieData] = useState("") ;
    const[ratingContext , setRatingContext] = useState("") ;    


    useEffect(() => {
        const fetchData = async() => {
            const data = await fetch(`${API_URL}/movie/${from.id}/videos?api_key=${API_KEY}&language=en-US`) ;
            const response = await data.json() ;
            // console.log(response) ;
            
            let videoObject = await response.results.filter((videoObj) => {
                if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
                    return true;
                }
                else if(response.results.length == 1 && videoObj.site == "YouTube")
                {   
                    return true ;
                }
                // else if(response.results.length == 1 && videoObj.site == "YouTube")
                // {   
                    //     return true ;
                    // }
                    return false;
                });
                setObject(videoObject[0]) ;
                // console.log(videoObject[0]) ;
            }
            
        // https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US&page=1
        // SIMILAR MOVIES
        const fetchData1 = async() => {
           
            const data = await fetch(`${API_URL}/movie/${from.id}/similar?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US&page=1`) ;
            let response = await data.json() ;
            setSimilarMovieData(response.results) ;
            // console.log(response.results) ;
        }
        
        const fetchData2 = async() => {
           
            // const data = await fetch(`${API_URL}/movie/${from.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`) ;
            // let response = await data.json() ;
            // setMovieData(response) ;
            for(let i = 0 ; i < from.genres.length; i++)
            {
                if(i == from.genres.length - 1){
                    str += from.genres[i].name ;
                }
                else{
                    str += from.genres[i].name + ", " ;
                }
            }
            setgenre(str) ;
        }

        // https://api.themoviedb.org/3/movie/882598/credits?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        const fetchData3 = async() => {
           
            const data = await fetch(`${API_URL}/movie/${from.id}/credits?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US&page=1`) ;
            let response = await data.json() ;
            setCastMovieData(response) ;
            // console.log(response) ;
            
            let DirectorObject = await response.crew.filter((castObj) => {
                if (castObj.job == "Director") {
                    return true;
                }
                
                return false;
            });
            let director = "" ;
            for(let i = 0 ; i < DirectorObject.length; i++)
            {
                if(i == DirectorObject.length - 1){
                    director += DirectorObject[i].name ;
                }
                else{
                    director += DirectorObject[i].name + ", " ;
                }
            }
            // console.log(director) ;
            setDirector(director) ;
            // setDirector(DirectorObject) ;

            let writerObject = await response.crew.filter((castObj) => {
                if (castObj.job == "Writer" || castObj.known_for_department == "Writing") {
                    return true;
                }
                
                return false;
            });
            let writer = "" ;
            for(let i = 0 ; i < writerObject.length; i++)
            {
                if(i == writerObject.length - 1){
                    writer += writerObject[i].name ;
                }
                else{
                    writer += writerObject[i].name + ", " ;
                }
            }
            // console.log(writer) ;
            setWriter(writer) ;
            // setWriter(writerObject) ;

            let i = 0 ;
            let castObject = await response.cast.filter((castObj) => {
                if (castObj.known_for_department == "Acting" && i < 10) {

                    i++ ;
                    return true;
                }
                
                return false;
            });
            let cast = "" ;
            for(let i = 0 ; i < castObject.length; i++)
            {
                if(i == castObject.length - 1){
                    cast += castObject[i].name ;
                }
                else{
                    cast += castObject[i].name + ", " ;
                }
            }
            // console.log(cast) ;
            setCast(cast) ;

            let smallCast = "" ;
            for(let i = 0 ; i < castObject.length && i < 3; i++)
            {
                if(i == castObject.length - 1){
                    smallCast += castObject[i].name ;
                }
                else{
                    smallCast += castObject[i].name + ", " ;
                }
            }
            // console.log(cast) ;
            setSmallCast(smallCast) ;
            // console.log(castObject) ;
            // console.log(castObject[0]) ;
            // console.log(castObject) ;            
        }

        // https://api.themoviedb.org/3/movie/550?api_key=b7c5d92115fce280b185d643ac4d4dfb&append_to_response=releases
        const fetchData4 = async() => {
           
            let rating = "" ;
            let ratingContext = "" ;
            const data = await fetch(`${API_URL}/movie/${from.id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&append_to_response=releases`) ;
            let response = await data.json() ;
            // console.log(response.releases.countries) ;

            let contentRatingObject = await response.releases.countries.filter((contentRatingObj) => {
                if (contentRatingObj.iso_3166_1 == "US" && contentRatingObj.certification != "") {
                    return true;
                }
                return false;
            });
            rating = contentRatingObject[0].certification ;
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
        fetchData1() ;
        fetchData2() ;
        fetchData3() ;
        fetchData4() ;
    },[])

    let str = "" ;

    let {release_date , runtime , vote_average} = from ;

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
    
    return ( 
    <div className="content-body">
       <div className="iframe-video">
       <iframe className="iframe-video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
        </div>
        <div className="main-container">

            <div className="movie-cast-content-info">
                <div className="movie-content-info">
                    <div className="movie-info-fullContent">
                        <span className='info_span'>{release_date}</span>
                        <span className='info_span contentRating'>{contentRating}</span>
                        <span className='info_span'>{vote_average.toFixed(1)}</span>
                        <span className='info_span'>{val}</span>

                    </div>
                    <div className="movie-description">
                        {from.overview}
                    </div>

                </div>
                <div className="cast-content-info">
                    <div className="upper-cast-info">
                        <span className='genre-span cast-span'>Cast:</span>
                        <span className="cast-span-info"> {smallcast}
                            <AnchorLink href='#about-movie-id'className='anchorLink'> more...</AnchorLink>
                        </span>
                    </div>
                    <div className="genre-info">
                        <span className='genre-span'>Genres:</span>
                        <span className="genre-span-info">{genre}</span>
                         
                    </div>
                </div>
            </div>
            <div className="more-like-this">
                <h3 className='more-like-span'>More Like This</h3>
                <div className="more-like-component">
                    {similarMovieData.map((val) => {
                        // let count = 0 ;
                        // console.log(val) ;
                        return <Similar key={val.id} index={count++} movies={val}/> ;
                    })} ;
                </div>
            </div>
            <div className="about-movie-info">
                <span className="about-span">About {from.title}</span>

                <div className="about-movie" id="about-movie-id">   
                    <span className="director about">
                        <span className="general director">Director:</span>
                        <span className="director-info">{director}</span>
                    </span>
                    <span className="cast about">
                        <span className="general cast">Cast:</span>
                        <span className="cast-info">{cast}</span>
                    </span>
                    <span className="writer about">
                        <span className="general writer">Writer:</span>
                        <span className="writer-info">{writer}</span>
                    </span>
                    <span className="genre-about about">
                        <span className="general genre-about">Genres:</span>
                        <span className="genre-span-info">{genre}</span>
                    </span>
                    <span className="maturity-rating about">
                        <span className="general maturity-rating">Maturity rating:</span>
                        <span className="general-info contentRating">{contentRating}</span>
                        <span className="general-info">{ratingContext}</span>
                    </span>
                </div>
            </div>
        </div>

    </div> );
}
 
export default FullMoviesInfo;