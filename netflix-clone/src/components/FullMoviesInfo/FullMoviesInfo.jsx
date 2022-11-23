import React, { useState, useEffect } from 'react';
import "./FullMoviesInfo.css" ;
import { useLocation } from "react-router-dom";
import { API_URL, API_KEY, API_IMAGE } from "../../API/secrets";

const FullMoviesInfo = () => {

    const location = useLocation();
    const { from } = location.state;
    console.log(from);

    const[vObject , setObject] = useState({}) ;
    const[similarMovieData , setSimilarMovieData] = useState({}) ;
    const[genre , setgenre] = useState("") ;
    const[fullCastData , setCastMovieData] = useState({}) ;
    // const[director , setDirector] = useState([]) ;
    // const[cast , setCast] = useState([]) ;
    // const[writer , setWriter] = useState([]) ;
    const[director , setDirector] = useState("") ;
    const[cast , setCast] = useState("") ;
    const[writer , setWriter] = useState("") ;


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
        const fetchData1 = async() => {
           
            const data = await fetch(`${API_URL}/movie/${from.id}/similar?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US&page=1`) ;
            let response = await data.json() ;
            setSimilarMovieData(response) ;
            console.log(response) ;
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

        // https://api.themoviedb.org/3/movie/299534/credits?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

        // https://api.themoviedb.org/3/movie/882598/credits?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        const fetchData3 = async() => {
           
            const data = await fetch(`${API_URL}/movie/${from.id}/credits?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US&page=1`) ;
            let response = await data.json() ;
            setCastMovieData(response) ;
            console.log(response) ;
            
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
            console.log(director) ;
            setDirector(director) ;
            // setDirector(DirectorObject) ;

            let writerObject = await response.crew.filter((castObj) => {
                if (castObj.job == "Writer") {
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
            console.log(writer) ;
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
            console.log(cast) ;
            setCast(cast) ;
            // setCast(castObject) ;
            // console.log(castObject) ;
            // console.log(castObject[0]) ;
            // console.log(castObject) ;            
        }

        fetchData() ;
        fetchData1() ;
        fetchData2() ;
        fetchData3() ;
    },[])

    let str = "" ;


    return ( 
    <div className="content-body">
       <div className="iframe-video">
       <iframe className="iframe-video-class" src={`https://www.youtube.com/embed/${vObject.key}?autoplay=1&mute=1&loop=1&controls=0&vq=low&modestbranding=1`}></iframe>
        </div>
        <div className="main-container">

            <div className="movie-cast-content-info">
                <div className="movie-content-info">
                    <div className="movie-info">

                    </div>
                    <div className="movie-description">
                        {from.overview}
                    </div>

                </div>
                <div className="cast-content-info">
                    <div className="upper-cast-info">
            
                    </div>
                    <div className="genre-info">
                        <span className='genre-span'>Genres:</span>
                        <span className="genre-span-info">{genre}</span>
                         
                    </div>
                </div>
            </div>
            <div className="more-like-this">

            </div>
            <div className="about-movie-info">
                <span className="about-span">About {from.title}</span>

                <div className="about-movie">   
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
                    </span>
                </div>
            </div>
        </div>

    </div> );
}
 
export default FullMoviesInfo;