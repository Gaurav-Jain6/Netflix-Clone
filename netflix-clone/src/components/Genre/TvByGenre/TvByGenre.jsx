import React, { useState, useEffect } from 'react';
import { API_KEY , API_URL , IMAGE_URL } from "../../../API/secrets" ;

import Tv from "./Tv"
import "./TvByGenre.css"
import Temp from './Temp' ;

const TvByGenre = (props) => {

    const [SeriesData , settvData] = useState([]) ;
    
    useEffect(() => {
        let count = 0 ; 
            let tvMap = "" ;
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
                            tvMap = [...tvMap , response.results] ;
                            settvData(tvMap) ;
                        })
    
                    }
                    fetchData2() ;
                }
            })
    })
    let count = 0 ;
    return ( 
        <div>
            <h1 className="heading">{props.type} Series</h1>
            <div className='movies'>
                {/* <h1>Hello</h1> */}  
                {props.tv.map((tvObject) => {
                    // console.log(movieObject.id) ;
                    if(tvObject.poster_path)
                    {
                        count+=1 ;
                        let tempval = count-1 ;
                        let temp = count-1 ;
                        // return <Tv key={tvObject.id} movie={tvObject}></Tv> ;
                        return <Temp key={tvObject.id} movie={tvObject} index={parseInt(tempval++%4)} top={parseInt(temp++/4)}></Temp> ;
                    }
                })} ;
            </div>
        </div>
     );
}
 
export default TvByGenre;
