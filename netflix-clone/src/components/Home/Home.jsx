import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Featured from '../Featured/Featured';
// import Register from '../Register/Register' ;
import "./Home.css" ;
import MoviesLists from '../MoviesLists/MoviesLists';
import List from '../List/List';
    
const Home = () => {
    return ( 
        
        <div className="home">
            {/* <Register></Register> */}
            <Navbar></Navbar>
            <Featured></Featured>
            <List type="Horror" id="27"></List>
            <List type="Crime" id="80"></List>
            <List type="Action" id="28"></List>
            <List type="Family" id="10751"></List>
            <List type="Fantasy" id="14"></List>
            <List type="Documentary" id="99"></List>
            <List type="History" id="36"></List>
            <List type="Thriller" id="53"></List>
        </div>
        
     );
}
 
export default Home;