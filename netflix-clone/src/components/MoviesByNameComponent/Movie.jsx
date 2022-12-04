import React, { Component } from 'react';
import {API_KEY, API_URL, IMAGE_URL} from "../../API/secrets"
import { Link } from "react-router-dom" ;
import "./Movie.css"
import axios from 'axios';

class Movie extends Component {
    state = { 
        detailedMovieObj: {}, 
    } ; 

    async componentDidMount()
    {
        // https://api.themoviedb.org/3/movie/299534?api_key=bdd243ea847239dc0799805e63e189f0
        let response = await axios.get(
            `${API_URL}/${this.props.movie.media_type}/${this.props.movie.id}?api_key=${API_KEY}`
            ) ;
        // console.log(response);
        // console.log(response.data) ;
        // console.log(this.props.movie) ;
        let detailedMovieObj = response.data ;
        
        let posterPath = IMAGE_URL + detailedMovieObj.poster_path;
        
        this.setState({
            // poster Path pura insert kar diya
            detailedMovieObj: { ...detailedMovieObj, poster_path: posterPath },
        });
        // console.log(this.state.detailedMovieObj);
    }

    // async componentDidMount()
    // {
    //         // // console.log(response) ;  
    //         // setMovieData(response) ;

    //     // https://api.themoviedb.org/3/movie/299534?api_key=bdd243ea847239dc0799805e63e189f0
    //     let response = await axios.get(
    //         `${API_URL}/tv/${this.props.movie.id}?api_key=${API_KEY}`
    //     ) ;

    //     console.log(response.data) ;
    //     // console.log(response);
    //     // console.log(response.data) ;
    //     // console.log(this.props.movie) ;
    //     // let detailedMovieObj = response.data ;
        
    //     // let posterPath = IMAGE_URL + detailedMovieObj.poster_path;
        
    //     // this.setState({
    //     //     // poster Path pura insert kar diya
    //     //     detailedMovieObj: { ...detailedMovieObj, poster_path: posterPath },
    //     // });
    //     // // console.log(this.state.detailedMovieObj);
    // }

    render() { 
        
        let {poster_path , title , vote_average , name} = this.props.movie ;
        // console.log(poster_path , title + " " + vote_average) ;
        let posterPath = IMAGE_URL + poster_path ;
        // console.log(posterPath) ;
        // console.log(this.state.detailedMovieObj);
        return (
            <div className='movie-item'>
                <div className='movie-poster'>
                    {this.props.movie.media_type == "tv" ? 
                    <Link to="/fullTvInfo" state={{from: this.state.detailedMovieObj}}>
                        <img src={posterPath} alt="" />
                    </Link>
                     : 
                    <Link to="/fullMovieInfo" state={{from: this.state.detailedMovieObj}}>
                        <img src={posterPath} alt="" />
                    </Link>
                    }
                </div>
                <div className="movie-info">
                <div className="movie-title">
                    {this.props.movie.media_type == "tv" ? <>{name}</>: <>{title}</>}
                    </div>
                    <div className="movie-rating">{vote_average} IMDB</div>
                </div>
            </div>
        );
    }
}
 
export default Movie;