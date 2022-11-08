import React, { useState, useEffect, useRef } from 'react';
import MoviesLists from '../MoviesLists/MoviesLists';
import "./List.css"
import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@mui/icons-material" ;
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;



const List = (props) => {

    const [movieObject , setdata] = useState([]) ;
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const[ids, setIds] = useState([]) ;

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if (direction === "left" && slideNumber > 0) {
          setSlideNumber(slideNumber - 1);
          listRef.current.style.transform = `translateX(${1330 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 20) {
          setSlideNumber(slideNumber + 1);
          listRef.current.style.transform = `translateX(${-1330 + distance}px)`;
        }
      };
    
    useEffect(() =>{
        // https://api.themoviedb.org/3/genre/movie/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        // https://api.themoviedb.org/3/discover/movie?api_key=b7c5d92115fce280b185d643ac4d4dfb&with_genres=28
        //https://api.themoviedb.org/3/genre/movie/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        // console.log(`${API_URL}/search/movie/?api_key=${API_KEY}&query=${props.name}&page=1&include_adult=false`)
        // https://api.themoviedb.org/3/search/movie?api_key=b7c5d92115fce280b185d643ac4d4dfb&query=avengers&page=1&include_adult=false
        // https://api.themoviedb.org/3
        // https://image.tmdb.org/t/p/w500/
        // fetch(`${API_URL}/discover/movie/?api_key=${API_KEY}&with_genres=28`)    
        fetch(`${API_URL}/discover/movie/?api_key=${API_KEY}&with_genres=${props.id}`)
        .then((data) =>{
            return data.json() ;
        })
        .then((response) => {
            
            // console.log(response) ;
            setdata(response.results) ;
        })
        // console.log(movieObject) ;

    },[] )
    
    let count = 0 ;


    return ( 
        <div className="list">
            <span className="listTitle">{props.type} Movies</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                className="sliderArrow-left"
                onClick={() => handleClick("left")}
                // style={{ display: !isMoved && "none" }}
                />
                <div className="container-list" ref={listRef}>
                    {movieObject.map((val) => {
                        // let count = 0 ;
                        return <MoviesLists key={val.id} index={count++} movies={val}/> ;
                    })} ;
                
                </div>
                <ArrowForwardIosOutlined
                className="sliderArrow-right"
                onClick={() => handleClick("right")}
                />
            </div>
        </div>
     );
}
 
export default List;