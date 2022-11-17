import React, { useState, useEffect } from 'react';
import "./MoviesContent.css" ;

const MoviesContent = () => {
    return ( 
    <div className="content-body">
       <div className="iframe-video">
            {/* <iframe></iframe> */}
        </div>
        <div className="main-container">

            <div className="movie-cast-content-info">
                <div className="movie-content-info">
                    <div className="movie-info">

                    </div>
                    <div className="movie-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel voluptatibus excepturi neque, facilis totam exercitationem esse qui repellat optio illum ut quos consequuntur non blanditiis architecto possimus corrupti, accusamus obcaecati.
                    </div>

                </div>
                <div className="cast-content-info">
                    <div className="cast-info">
            
                    </div>
                    <div className="genre-info">
                        Genres: 
                    </div>
                </div>
            </div>
            <div className="more-like-this">

            </div>
            <div className="about-movie-info">

            </div>
        </div>

    </div> );
}
 
export default MoviesContent;