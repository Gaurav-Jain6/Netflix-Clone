import React, { useState, useEffect } from 'react';
import "./Featured.css"
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
import YouTube from "react-youtube";

const Featured = (props) => {

    const[movieObject , setData] = useState([]) ;
    const[videoObje , setObject] = useState([]) ;

    useEffect(() => {
       
        // https://api.themoviedb.org/3/movie/{movie_id}?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US

        const fetchData = async() => {
            const data = await fetch(`${API_URL}/movie/${props.id}/videos?api_key=${API_KEY}&language=en-US`) ;
            const response = await data.json() ;
            // console.log(response) ;
            let videoObject = await response.results.filter((videoObj) => {
                if (videoObj.type == "Trailer" && videoObj.site == "YouTube") {
                    // console.log(videoObj); 
                    return true;
                }
                else if(response.results.length == 1 && videoObj.site == "YouTube")
                {   
                    return true ;
                }
                else if(response.results.length == 1 || videoObj.site == "YouTube")
                {   
                    return true ;
                }
                return false;
            });
            setObject(videoObject[0]) ;
        }
        console.log(videoObje) ;
        fetchData() ;

    },[])

    useEffect(() =>{
         // https://api.themoviedb.org/3/movie/829280?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        fetch(`${API_URL}/movie/${props.id}?api_key=${API_KEY}&language=en-US`)
        .then((data) =>{
            return data.json() ;
        })
        .then((response) => {
            
            // console.log(response) ;
            setData(response) ;
        })
        
    },[] )
    let poster = `https://image.tmdb.org/t/p/w500${movieObject.poster_path}` ;
    // console.log(movieObject) ;
    const opts = {
        height:"700px",
        width: "1532px",
        top:"-85px",
        left:"0px",
        playerVars: {
            autoplay: 1,
        },
    }; 

    // function resizeIFrameToFitContent( iFrame ) {

    //     iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
    //     iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
    // }
    
    // window.addEventListener('DOMContentLoaded', function(e) {
    
    //     var iFrame = document.getElementById( 'iFrame1' );
    //     resizeIFrameToFitContent( iFrame );
    //     // or, to resize all iframes:
    //     var iframes = document.querySelector("iframe");
    //     console.log(iframes) ;
    //     // for( var i = 0; i < iframes.length; i++) {
    //         resizeIFrameToFitContent( iframes );
    //     // }
    // } );
    
    window.onload = (e) =>
    {
        // // console.log(document.getElementById('fileUploadIframe')) ;
        // console.log(document.querySelector(".video-stream.html5-main-video"))
        // let video = document.querySelector(".video-stream.html5-main-video") ;
        // video.style.height = "816px" ;
        // video.style.width = "1532px" ;
        // document.getElementById('fileUploadIframe').style.height = document.body.clientHeight+5+'px';
        // document.getElementById('fileUploadIframe').style.width = document.body.clientWidth+18+'px';
        // document.getElementById('fileUploadIframe').style.top = document.body.clientTop-1111+'px';
    };

    

    return (
        <div className="featured">
            {/* <img
            src={poster}
            alt=""
            /> */}
            {/* <YouTube className="video-class" videoId={videoObje.key} opts={opts}></YouTube> */}
            <iframe className="video-class" id="fileUploadIframe" src={`https://www.youtube.com/embed/${videoObje.key}?autoplay=1&mute=1&loop=1&controls=0&vq=1080hd&modestbranding=1`}  style={{ width: '100%', height:'100%' , left:'0'}}></iframe>
            <div className="info">
                <img src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1" alt="" className="img-info" />
                <span className="desc">
                    {movieObject.overview}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>More Info</span>
                    </button>
                </div>
            </div>
        </div>
      );
}
 
export default Featured;