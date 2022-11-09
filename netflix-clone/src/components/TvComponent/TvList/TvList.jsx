import React, { useState, useEffect, useRef } from 'react';
import Tv from '../Tv/Tv.jsx'
import "./TvList.css"
import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@mui/icons-material" ;
import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;

const TvList = (props) => {
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
        fetch(`${API_URL}/discover/tv/?api_key=${API_KEY}&with_genres=${props.id}`)
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
            <span className="listTitle">{props.type} Shows</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                className="sliderArrow-left"
                onClick={() => handleClick("left")}
                style={{ display: !isMoved && "none" }}
                />
                <div className="container-list" ref={listRef}>
                    {movieObject.map((val) => {
                        // let count = 0 ;
                        return <Tv key={val.id} index={count++} shows={val}/> ;
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
 
export default TvList;