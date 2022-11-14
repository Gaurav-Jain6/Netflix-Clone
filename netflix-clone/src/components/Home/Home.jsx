// import React, { useState, useEffect } from 'react';
// import Navbar from '../Navbar/Navbar';
// import Featured from '../Featured/Featured';
// // import Register from '../Register/Register' ;
// import "./Home.css" ;
// import MoviesLists from '../MoviesLists/MoviesLists';
// import List from '../List/List';
// import TvList from '../TvComponent/TvList/TvList.jsx' ;
// import NewMovie from '../NewAndPopular/NewMovie.jsx'
// import NewTv from '../NewAndPopular/NewTv.jsx'
// import Footer from '../Footer/Footer.jsx'
// // import {Link} from "react-router-dom" ;
// import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
// import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
// import MoviesByName from '../MoviesByNameComponent/MoviesByName.jsx'

// const Home = () => {

//     const [tvObject , setdata] = useState([]) ;
//     const [moviesObject , setMovieData] = useState([]) ;

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

//     useEffect(() =>{
//         // https://api.themoviedb.org/3/genre/tv/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US
//         fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=b7c5d92115fce280b185d643ac4d4dfb&language=en-US`)
//         .then((data) =>{
//             return data.json() ;
//         })
//         .then((response) => {
//             // console.log(response.genres) ;
//             setMovieData(response.genres) ;
//         })
//         // console.log(movieObject) ;
//     },[] )

//     const [movieData , setmn] = useState([]) ;
//     const [currentMovie , setcm] = useState("") ;
//     const [pages , setpage] = useState([]) ;
//     let setMovies = async(newMovieName) =>
//   {
//     let data = await fetch(`${API_URL}/search/multi?api_key=${API_KEY}&page=1&query=${newMovieName}`) ;
//     let response = await data.json() ;
//     // console.log(response) ;
//     let moviesData = response.results ;
//     let pagesCount = response.total_pages; //3
//     let pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//       pages.push(i);
//     }
//     setmn(moviesData) ;
//     setcm(newMovieName) ;
//     setpage(pages) ;
//     // console.log(movieData) ;
//     // console.log(currentMovie) ;
//   }

//     return ( 

        
//         <Router>
        
//         <div className="home">
//         {/* 505642 */}
//                 {/* <Register></Register> */}
//                 <Navbar setMovie={setMovies} movies={movieData} name={currentMovie}></Navbar>
//                 <Featured id="829280"></Featured>
//                 <Routes>
//                     <Route path="/TvShows" exact element=
//                         {tvObject.map((val) => {
//                             // let count = 0 ;
//                             return <TvList key={val.id} id={val.id} type={val.name}/> })
//                         } 
//                         >
//                     </Route>

//                 </Routes>

//                 <Routes>
//                     {/* <Route path="/searched" exact element= {<>  */}
//                     <Route path="/" exact element= {<> 
//                         {movieData.length ? (
//                         <React.Fragment>
//                             <MoviesByName movies={movieData} pages={pages} name={currentMovie}></MoviesByName>
//                             {/* <Pagination
//                                 pages={this.state.pages}
//                                 currPage={this.state.currPage}
//                                 nextPage={this.nextPage}
//                                 previousPage={this.previousPage}
//                                 setPage={this.setPage}
//                             ></Pagination> */}
//                         </React.Fragment>
//                         ) : (
//                         <React.Fragment>
//                             <List type="Horror" id="27"></List>
//                             <List type="Crime" id="80"></List>
//                             <List type="Action" id="28"></List>
//                             <List type="Family" id="10751"></List>
//                             <List type="Fantasy" id="14"></List>
//                             <List type="Documentary" id="99"></List>
//                             <List type="History" id="36"></List>
//                             <List type="Thriller" id="53"></List> 
//                         </React.Fragment> 
//                         // <h1>Oops ! No Movies Or Shows Found !!!</h1>
//                     )}</> }>
                    
//                     </Route>

//                 </Routes>

//                 {/* <Routes>
//                     <Route path="/" exact element= {<>  
        
                    
//                     <List type="Horror" id="27"></List>
//                     <List type="Crime" id="80"></List>
//                     <List type="Action" id="28"></List>
//                     <List type="Family" id="10751"></List>
//                     <List type="Fantasy" id="14"></List>
//                     <List type="Documentary" id="99"></List>
//                     <List type="History" id="36"></List>
//                     <List type="Thriller" id="53"></List> 
//                         </>} 
//                         >
//                     </Route>

//                 </Routes> */}

//                 <Routes>
//                     <Route path="/Movies" exact element=
//                         {moviesObject.map((val) => {
//                             // let count = 0 ;
//                             return <List key={val.id} id={val.id} type={val.name}/> })} 
//                         >
//                     </Route>

//                 </Routes>

//                 <Routes>
//                     <Route path="/NewAndPopular" exact element={<>

//                         <NewMovie type="movie" duration="" showType="Now Playing" url="/movie/now_playing"></NewMovie>  
//                         <NewTv type="tv" duration="" showType="Top Rated" url="/tv/top_rated"></NewTv>  
//                         <NewMovie type="movie" duration="" showType="Popular" url="/movie/popular"></NewMovie>
//                         <NewTv type="tv" duration="" showType="Popular" url="/tv/popular"></NewTv>
//                         <NewMovie type="movie" duration="Today's" showType="Trending" url="/trending/movie/day"></NewMovie>
//                         <NewTv type="tv" duration="Today's" showType="Trending" url="/trending/tv/day"></NewTv>
//                         <NewMovie type="movie" duration="This Week's" showType="Trending" url="/trending/movie/week"></NewMovie>
//                         <NewTv type="tv" duration="This Week's" showType="Trending" url="/trending/tv/week"></NewTv>
//                         <NewMovie type="movie" duration="" showType="Upcoming" url="/movie/upcoming"></NewMovie>  
                    
//                     </>}
//                     >

//                     </Route>
//                 </Routes>

//                 <Footer></Footer>
//             </div>

//         </Router>
        
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
import Footer from '../Footer/Footer.jsx'
// import {Link} from "react-router-dom" ;
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { API_KEY , API_URL , IMAGE_URL } from "../../API/secrets" ;
import MoviesByName from '../MoviesByNameComponent/MoviesByName.jsx'

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

    const [movieData , setmn] = useState([]) ;
    const [currentMovie , setcm] = useState("") ;
    const [pages , setpage] = useState([]) ;
    const [urls , setUrls] = useState([]) ;
    const [previousMovie , setPm] = useState([]) ;
    let url = [] ;
    let setMovies = async(newMovieName) =>
    {   
        setPm(currentMovie) ;

        let data = await fetch(`${API_URL}/search/multi?api_key=${API_KEY}&page=1&query=${newMovieName}`) ;
        let response = await data.json() ;
        // console.log(response) ;
        let moviesData = response.results ;
        let pagesCount = response.total_pages; //3
        
        for(let i = 2 ; i < pagesCount && i < 4 ; i++)
        {
            let data = await fetch(`${API_URL}/search/multi?api_key=${API_KEY}&page=${i}&query=${newMovieName}`) ;
            let response = await data.json() ;
            // console.log(response.results) ;
            let data1 = response.results ;
            console.log(data1.length) ;
            for(let j = 0 ; j < data1.length ; j++)
            {
                moviesData.push(data1[j]) ;
            }
        }

        // console.log(moviesData) ;
        for(let i = 1 ; i < pagesCount ; i++)
        {
            let urlt = `${API_URL}/search/multi?api_key=${API_KEY}&page=${i}&query=${newMovieName}` ;
            url = [...url , urlt]
            setUrls(url);
            // console.log(url) ;
        }
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
        }
        setmn(moviesData) ;
        setcm(newMovieName) ;
        setpage(pages) ;
        // console.log(movieData) ;
        // console.log(currentMovie) ;
    }

    return ( 

        
        <Router>
        
        <div className="home">
        {/* 505642 */}
                {/* <Register></Register> */}
                <Navbar setMovie={setMovies} movies={movieData} name={currentMovie}></Navbar>
                {/* <Featured id="829280"></Featured> */}
                <Routes>
                    <Route path="/TvShows" exact element=
                    {<>
                        <Featured id="829280"></Featured>
                        {tvObject.map((val) => {
                            // let count = 0 ;
                            return <TvList key={val.id} id={val.id} type={val.name}/> })
                        }
                        </>} 
                        >
                    </Route>

                </Routes>

                <Routes>
                    <Route path="/searched" exact element= {<> 
                    {/* <Route path="/" exact element= {<>  */}
                        { movieData.length ? (
                        <React.Fragment>
                            <MoviesByName urls={urls} movies={movieData} pages={pages} name={currentMovie}></MoviesByName>
                            {/* <Pagination
                                pages={this.state.pages}
                                currPage={this.state.currPage}
                                nextPage={this.nextPage}
                                previousPage={this.previousPage}
                                setPage={this.setPage}
                            ></Pagination> */}
                        </React.Fragment>
                        ) : (
                        // <React.Fragment>
                        //     <Featured id="829280"></Featured>
                        //     <List type="Horror" id="27"></List>
                        //     <List type="Crime" id="80"></List>
                        //     <List type="Action" id="28"></List>
                        //     <List type="Family" id="10751"></List>
                        //     <List type="Fantasy" id="14"></List>
                        //     <List type="Documentary" id="99"></List>
                        //     <List type="History" id="36"></List>
                        //     <List type="Thriller" id="53"></List> 
                        // </React.Fragment> 
                        <h1>Oops ! No Movies Or Shows Found !!!</h1>
                    )}</> }>
                    
                    </Route>

                </Routes>

                    <Routes>
                        <Route path="/" exact element= {<>  
            
                        <Featured id="829280"></Featured>
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

                <Routes>
                    <Route path="/Movies" exact element=
                        {<>
                            <Featured id="829280"></Featured>
                           { moviesObject.map((val) => {
                            // let count = 0 ;
                            return <List key={val.id} id={val.id} type={val.name}/> })}
                        </>} 
                        >
                    </Route>

                </Routes>

                <Routes>
                    <Route path="/NewAndPopular" exact element={<>

                        <Featured id="829280"></Featured>
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

                <Footer></Footer>
            </div>

        </Router>
        
     );
}
 
export default Home;