// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar/Navbar';
// import Featured from '../Featured/Featured';
// // import Register from '../Register/Register' ;
// import "./Home.css" ;
// import MoviesLists from '../MoviesLists/MoviesLists';
// import List from '../List/List';
// import TvList from '../TvComponent/TvList/TvList.jsx' ;

// const Home = () => {

//     const [movieObject , setdata] = useState([]) ;

//     useEffect(() =>{
//         // https://api.themoviedb.org/3/genre/tv/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
//         fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`)
//         .then((data) =>{
//             return data.json() ;
//         })
//         .then((response) => {
//             // console.log(response.genres) ;
//             setdata(response.genres) ;
//         })
//         // console.log(movieObject) ;
//     },[] )

//     return ( 
        
//         <div className="home">
//             {/* <Register></Register> */}
//             <Navbar></Navbar>
//             <Featured></Featured>
//             {movieObject.map((val) => {
//                         // let count = 0 ;
//                         return <TvList key={val.id} id={val.id} type={val.name}/> ;
//             })} ;
//             <List type="Horror" id="27"></List>
//             <List type="Crime" id="80"></List>
//             <List type="Action" id="28"></List>
//             <List type="Family" id="10751"></List>
//             <List type="Fantasy" id="14"></List>
//             <List type="Documentary" id="99"></List>
//             <List type="History" id="36"></List>
//             <List type="Thriller" id="53"></List>
//         </div>
        
//      );
// }
 
// export default Home;

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Featured from '../Featured/Featured';
// import Register from '../Register/Register' ;
import "./Home.css" ;
import MoviesLists from '../MoviesLists/MoviesLists';
import List from '../List/List';
import TvList from '../TvComponent/TvList/TvList.jsx' ;
import NewMovie from '../NewAndPopular/NewMovie.jsx'
import NewTv from '../NewAndPopular/NewTv.jsx'
// import {Link} from "react-router-dom" ;
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Home = () => {

    const [tvObject , setdata] = useState([]) ;
    const [moviesObject , setMovieData] = useState([]) ;

    useEffect(() =>{
        // https://api.themoviedb.org/3/genre/tv/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`)
        .then((data) =>{
            return data.json() ;
        })
        .then((response) => {
            // console.log(response.genres) ;
            setdata(response.genres) ;
        })
        // console.log(movieObject) ;
    },[] )

    useEffect(() =>{
        // https://api.themoviedb.org/3/genre/tv/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`)
        .then((data) =>{
            return data.json() ;
        })
        .then((response) => {
            // console.log(response.genres) ;
            setMovieData(response.genres) ;
        })
        // console.log(movieObject) ;
    },[] )

    return ( 

        
        <Router>
        
        <div className="home">
                {/* <Register></Register> */}
                <Navbar></Navbar>
                <Featured></Featured>
                <Routes>
                    <Route path="/TvShows" exact element=
                        {tvObject.map((val) => {
                            // let count = 0 ;
                            return <TvList key={val.id} id={val.id} type={val.name}/> })
                        } 
                        >
                    </Route>

                </Routes>

                <Routes>
                    <Route path="/Movies" exact element=
                        {moviesObject.map((val) => {
                            // let count = 0 ;
                            return <List key={val.id} id={val.id} type={val.name}/> })} 
                        >
                    </Route>

                </Routes>

                <Routes>
                    <Route path="/NewAndPopular" exact element={<>

                        <NewMovie type="movie" duration="" showType="Now Playing" url="/movie/now_playing"></NewMovie>  
                        <NewTv type="tv" duration="" showType="Top Rated" url="/tv/top_rated"></NewTv>  
                        <NewMovie type="movie" duration="" showType="Popular" url="/movie/popular"></NewMovie>
                        <NewTv type="tv" duration="" showType="Popular" url="/tv/popular"></NewTv>
                        <NewMovie type="movie" duration="Today's" showType="Trending" url="/trending/movie/day"></NewMovie>
                        <NewTv type="tv" duration="Today's" showType="Trending" url="/trending/tv/day"></NewTv>
                        <NewMovie type="movie" duration="This Week's" showType="Trending" url="/trending/movie/week"></NewMovie>
                        <NewTv type="tv" duration="This Week's" showType="Trending" url="/trending/tv/week"></NewTv>
                        <NewMovie type="movie" duration="" showType="Upcoming" url="/movie/upcoming"></NewMovie>  
                    
                    </>}
                    >

                    </Route>
                </Routes>

                <Routes>
                    <Route path="/" exact element= {<>  
        
                    
                    <List type="Horror" id="27"></List>
                    <List type="Crime" id="80"></List>
                    <List type="Action" id="28"></List>
                    <List type="Family" id="10751"></List>
                    <List type="Fantasy" id="14"></List>
                    <List type="Documentary" id="99"></List>
                    <List type="History" id="36"></List>
                    <List type="Thriller" id="53"></List> 
                        </>} 
                        >
                    </Route>

                </Routes>

            </div>

        </Router>
        
     );
}
 
export default Home;