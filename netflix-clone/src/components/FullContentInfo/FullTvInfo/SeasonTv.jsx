import React, { useState, useEffect } from 'react';
import { API_KEY , API_URL , IMAGE_URL } from '../../../API/secrets';
import "./SeasonTv.css"

const SeasonTv = (props) => {

    let poster = IMAGE_URL +  props.episodes.still_path ;
    // console.log(poster) ;
    
    const[episodeTime , setTime] = useState("") ;

    useEffect(() => {

        // Episode Run Time
        const fetchData = async() => {
            let episodeRunTime = props.episodes.runtime ;

            setTime(episodeRunTime) ;
        }

        fetchData() ;
    }) ;

    var hours = Math.floor(episodeTime / 60);          
    var minutes = episodeTime % 60;
    let val = "" ;
    if(hours > 0)
    {
        val = hours + "h" + " " + minutes + "m" ;
    }
    else if(minutes == 0 )
    {
        val = hours + "h" ;
    }
    else
    {
        val = minutes + "m" ;
    }

    return ( 
        <div className='similar-tv'>
            <div className="episode-number">
                {props.index}
            </div>
            <div className="per-episode-image">
                <img src={poster} alt="" className='poster-image'/>
            </div>
            <div className="episode-content">
                <div className="episode-header">
                    <div className="episode-name">
                        {props.episodes.name}
                    </div>
                    <div className="episode-duration">
                        {val}
                    </div>
                </div>
                <div className="episode-content-overview">
                    {props.episodes.overview}
                </div>
            </div>
        </div>

     );
}
 
export default SeasonTv;