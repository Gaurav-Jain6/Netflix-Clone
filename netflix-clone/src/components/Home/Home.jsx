import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Featured from '../Featured/Featured';
import "./Home.css" ;
import MoviesLists from '../MoviesLists/MoviesLists';
import List from '../List/List';
    
const Home = () => {
    return ( 
        <div className="home">
            <Navbar></Navbar>
            <Featured></Featured>
            <List type="Horror"></List>
            <List type="Crime"></List>
            <List type="Documentary"></List>
            <List type="Action"></List>
            <List type="Family"></List>
            <List type="Fantasy"></List>
            <List type="History"></List>
            <List type="Thriller"></List>
        </div>
        
     );
}
 
export default Home;