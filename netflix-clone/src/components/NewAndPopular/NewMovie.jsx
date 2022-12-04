import React, { useState, useEffect, useRef } from 'react';
import MoviesLists from '../MoviesLists/MoviesLists';
import "./New.css"
import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@mui/icons-material" ;
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;

const New = (props) => {

    const [movieObject , setdata] = useState([]) ;
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

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

        // https://api.themoviedb.org/3/trending/all/week?api_key=b7c5d92115fce280b185d643ac4d4dfb
    
        fetch(`${API_URL}${props.url}?api_key=${API_KEY}`)
        .then((data) =>{
            return data.json() ;
        })
        .then((response) => {
            
            // console.log(response.results) ;
            setdata(response.results) ;
        })
        // console.log(movieObject) ;

    },[] )
    
    let count = 0 ;


    return ( 
        <div className="list">
            <span className="listTitle">{props.duration} {props.showType} Movies</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                className="sliderArrow-left"
                onClick={() => handleClick("left")}
                style={{ display: !isMoved && "none" }}
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
 
export default New;