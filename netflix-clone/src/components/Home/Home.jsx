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
            <List></List>
            <List></List>
            <List></List>
            <List></List>
            <List></List>
            <List></List>
            <List></List>
            <List></List>
        </div>
        
     );
}
 
export default Home;