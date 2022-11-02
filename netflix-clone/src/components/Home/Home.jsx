import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Featured from '../Featured/Featured';
import "./Home.css" ;

const Home = () => {
    return ( 
        <div className="home">
            <Navbar></Navbar>
            <Featured></Featured>
        </div>
        
     );
}
 
export default Home;