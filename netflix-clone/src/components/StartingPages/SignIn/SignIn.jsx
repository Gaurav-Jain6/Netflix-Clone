import React, { useState, useEffect } from 'react';
import "./SignIn.css" ;
import firebaseAuth from "../config/firebase" ;
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';
import Home from "../../Home/Home"


const SignIn = () => {

    const[username , setUsername] = useState("") ;
    const[password , setPassword] = useState("") ;
    const[set , setState] = useState("") ;
    const[click , setClick]  = useState(false) ;
    const[showclick , setShowClick] = useState(false) ;
    const[message , setMessage] = useState("") ;
    const[user , setUser] = useState(null) ; 

    const handleClick = (e) =>{
        setClick(true) ;
    }

    const handleShowClick = (e) => {
        console.log(e) ;
        if(showclick)
        {
            document.getElementById("password").setAttribute("type", "password") ;
            setShowClick(false) ;
        }
        else
        {
            document.getElementById("password").setAttribute("type", "text") ;
            setShowClick(true) ;   
        }
    }

    const handleLogin = async ()=> {
        try{
            // console.log(firebaseAuth) ;
            let response = await signInWithEmailAndPassword(firebaseAuth, username , password) ;
            console.log(response) ;
            console.log(response.user.uid)
            let uid = response.user.uid ;
            console.log(uid) ;
            if(uid)
            {
                setUser(uid) ;
            }
            // console.log(username + " " + password) ;
        }
        catch(err){
            // setMessage(err.message) ;
            console.log(err) ;
        }
    }

    const handleLogout = async ()=> {
        // let response = await signOut(firebaseAuth) ;
        // console.log(response) ;
        // setUser(null) ;
        
        signOut(firebaseAuth).then((data) => {
            setUser(null) ;
        })
    }
    
    useEffect(() => {
        onAuthStateChanged(firebaseAuth , (data) => {
            console.log(username + " " + password)
            console.log(data) ;
            console.log(password) ;
            console.log(username) ;
            console.log("Auth State Change") ;
            if(data)
            {
                setUser(data.uid) ;
            }
        })
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value) ;
        setUsername(e.target.value) ;

    }

    const handleChangePass = (e) =>{
        console.log(e.target.value) ;
        setPassword(e.target.value) ;
    }

    // console.log(set) ;

    return ( 
        <div>
            {
            user ? 
                <div>
                    <Home></Home>
                    {/* <h1>I am Logged In I am user {user}</h1>
                    <button onClick={handleLogout}>Logout</button> */}
                </div>
            :
            <>
            <div class="sign-in-container">
                <div class="logo">
                    <svg viewBox="0 0 111 30" class="svg-icon svg-icon-netflix-logo" focusable="true">
                        <g id="netflix-logo">
                            <path
                                d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                                id="Fill-14"></path>
                        </g>
                    </svg>
                </div>
                <div class="form-container">
                    <form className='form-signIn'>
                        <h1 className='form-h1'>Sign In</h1>
                        <div class="form-group">
                            <input type="text" value={username}
                            onChange = {(e)=> setUsername(e.target.value) }
                            />
                            <label>Email or phone number</label>
                        </div>
                        <div class="form-group">
                            <input type="text" id="password" value={password} onClick={handleClick} 
                            onChange={handleChangePass}
                            // onChange = {(e)=> setPassword(e.target.value) }
                            />
                            <label>Password</label>
                            {click ? 
                            // {document.getElementById("password")} 
                            <span className='signIn-show-span' onClick={handleShowClick}>Show</span> : <></> 
                        }
                        </div>
                        <center><button id="formbutton" onClick={handleLogin} type="button" class="btn btn-primary btn-submit">Sign In</button></center>
                        {/* <button onClick={handleLogin}></button> */}
                        <div class="remember">
                            <div class="left">
                                <input type="checkbox" id="remember" />
                                <label for="remember">Remember Me</label>
                            </div>
                            <div class="right">
                                <a href="#">Need help?</a>
                            </div>
                        </div>
                        {/* <div class="facebook-login">
                            <img src="fb-logo.png"/>
                            <a href="#">Login with Facebook</a>
                        </div> */}
                        <div class="signup">
                            <p className='signup-para'>New to Netflix? <a href="#">Sign up now</a>.</p>
                        </div>
                        <p class="captcha">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot. 
                            <a href="#">Learn more</a>.
                        </p>
                    </form>
                </div>
                <footer>
                    <div class="top">
                        <a href="#">Questions? Contact us.</a>
                    </div>
                    <div class="links">
                        <a href="#">FAQ</a>
                        <a href="#">Help Center</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Privacy</a>
                        <a href="#">Cookie Preference</a>
                        <a href="#">Corporate Information</a>
                    </div>
                </footer>
            </div>
            </>}
        </div>
     );
}
 
export default SignIn;







// import React, { useState, useEffect } from 'react'; // imrse
// import firebaseAuth from '../config/firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';
// import Home from "../../Home/Home"
// import "./SignIn.css"

// const SignIn = () => { // sfc

    
//     const[username , setUsername] = useState("") ;
//     const[password , setPassword] = useState("") ;  
//     const[newUsername , setNewUsername] = useState("") ;
//     const[newPassword , setNewPassword] = useState("") ;  
//     const[mailMessage , setErrorMessage] = useState("") ;
//     const[message , setMessage] = useState("") ;
//     const[user , setUser] = useState(null) ;

//     const handleLogin = async ()=> {
//         try{
//             // console.log(firebaseAuth) ;
//             let response = await signInWithEmailAndPassword(firebaseAuth, username , password) ;
//             console.log(response) ;
//             console.log(response.user.uid)
//             let uid = response.user.uid ;
//             if(uid)
//             {
//                 setUser(uid) ;
//             }
//             // console.log(username + " " + password) ;
//         }
//         catch(err){
//             setMessage(err.message) ;
//             console.log(err) ;
//         }
//     }

//     const handleLogout = async ()=> {
//         // let response = await signOut(firebaseAuth) ;
//         // console.log(response) ;
//         // setUser(null) ;
        
//         signOut(firebaseAuth).then((data) => {
//             setUser(null) ;
//         })
//     }

//     const handleRegister = async ()=> {
//         try{
//             const user = await createUserWithEmailAndPassword(firebaseAuth , newUsername , newPassword) ;
//             console.log(user) ;
//         }
//         catch(error){
//             console.log(error.message) ;
//             setErrorMessage(error.message) ;
//         }
//     }

//     useEffect(() => {
//         onAuthStateChanged(firebaseAuth , (data) => {
//             console.log(data) ;
//             console.log("Auth State Change") ;
//             if(data)
//             {
//                 setUser(data.uid) ;
//             }
//         })
//     }, [])



//     return ( <div>
//         {
//             user ? 
//                 <div>
//                     <Home></Home>
//                     <h1>I am Logged In I am user {user}</h1>
//                     <button onClick={handleLogout}>Logout</button>
//                 </div>
//             :
//             <> 
//             <h1>Firebase Register</h1>
//             <div>
//                 <div>
//                     New Username {" "}
//                     <input value={newUsername} onChange = {(e)=> setNewUsername(e.target.value) }></input>
//                 </div>
//                 <div>
//                     Password {" "}
//                     <input type = "" value={newPassword} onChange = {(e)=> setNewPassword(e.target.value) }></input>
//                 </div>
//             </div>
//             <button onClick={handleRegister}>Register</button>
//             <h2 style={{ color: "red" }}>{mailMessage}</h2> 
            
//             <h1>Firebase Login</h1>
//             <div>
//                 <div>
//                     Username {" "}
//                     <input value={username} onChange = {(e)=> setUsername(e.target.value) }></input>
//                 </div>
//                 <div>
//                     Password {" "}
//                     <input type="text" value={password} onChange = {(e)=> setPassword(e.target.value) }></input>
//                 </div>
//             </div>
//             <button onClick={handleLogin}>Login</button>
//             <h2>{message}</h2> </>
//         }
//     </div> );
// }
 
// export default SignIn;







// import React, { useState, useEffect } from 'react'; // imrse
// import firebaseAuth from '../config/firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';
// import Home from "../../Home/Home"

// const SignIn = () => { // sfc

    
//     const[username , setUsername] = useState("") ;
//     const[password , setPassword] = useState("") ;  
//     const[newUsername , setNewUsername] = useState("") ;
//     const[newPassword , setNewPassword] = useState("") ;  
//     const[mailMessage , setErrorMessage] = useState("") ;
//     const[message , setMessage] = useState("") ;
//     const[user , setUser] = useState(null) ;

//     const handleLogin = async ()=> {
//         try{
//             // console.log(firebaseAuth) ;
//             let response = await signInWithEmailAndPassword(firebaseAuth, username , password) ;
//             console.log(response) ;
//             console.log(response.user.uid)
//             let uid = response.user.uid ;
//             if(uid)
//             {
//                 setUser(uid) ;
//             }
//             // console.log(username + " " + password) ;
//         }
//         catch(err){
//             setMessage(err.message) ;
//             console.log(err) ;
//         }
//     }

//     const handleLogout = async ()=> {
//         // let response = await signOut(firebaseAuth) ;
//         // console.log(response) ;
//         // setUser(null) ;
        
//         signOut(firebaseAuth).then((data) => {
//             setUser(null) ;
//         })
//     }

//     const handleRegister = async ()=> {
//         try{
//             const user = await createUserWithEmailAndPassword(firebaseAuth , newUsername , newPassword) ;
//             console.log(user) ;
//         }
//         catch(error){
//             console.log(error.message) ;
//             setErrorMessage(error.message) ;
//         }
//     }

//     useEffect(() => {
//         onAuthStateChanged(firebaseAuth , (data) => {
//             console.log(data) ;
//             console.log("Auth State Change") ;
//             if(data)
//             {
//                 setUser(data.uid) ;
//             }
//         })
//     }, [])



//     return ( <div>
//         {
//             user ? 
//                 <div>
//                     <Home></Home>
//                     <h1>I am Logged In I am user {user}</h1>
//                     <button onClick={handleLogout}>Logout</button>
//                 </div>
//             :

//             <div class="form-container">
//                 {/* <form className='form-signIn'> */}
//                     <h1 className='form-h1'>Sign In</h1>
//                     <div class="form-group">
//                         <input type="text" value={username}
//                         onChange = {(e)=> setUsername(e.target.value) }
//                         />
//                         {/* <label>Email or phone number</label> */}
//                     </div>
//                     <div class="form-group">
//                         <input type="text" value={password} id="password"
//                         onChange = {(e)=> setPassword(e.target.value) }
//                         />
//                         {/* <label>Password</label> */}
//                         {/* {click ? 
//                         // {document.getElementById("password")} 
//                         <span className='signIn-show-span' >Show</span> : <></> 
//                         } */}
//                     </div>
//                     <button onClick={handleLogin}>Sign In</button>
                    
//                     {/* <div class="facebook-login">
//                         <img src="fb-logo.png"/>
//                         <a href="#">Login with Facebook</a>
//                     </div> */}

//                 {/* </form> */}
//             </div>
//             // <> 
//             // <h1>Firebase Register</h1>
//             // <div>
//             //     <div>
//             //         New Username {" "}
//             //         <input value={newUsername} onChange = {(e)=> setNewUsername(e.target.value) }></input>
//             //     </div>
//             //     <div>
//             //         Password {" "}
//             //         <input type = "" value={newPassword} onChange = {(e)=> setNewPassword(e.target.value) }></input>
//             //     </div>
//             // </div>
//             // <button onClick={handleRegister}>Register</button>
//             // <h2 style={{ color: "red" }}>{mailMessage}</h2> 
            
//             // <h1>Firebase Login</h1>
//             // <div>
//             //     <div>
//             //         Username {" "}
//             //         <input value={username} onChange = {(e)=> setUsername(e.target.value) }></input>
//             //     </div>
//             //     <div>
//             //         Password {" "}
//             //         <input type="text" value={password} onChange = {(e)=> setPassword(e.target.value) }></input>
//             //     </div>
//             // </div>
//             // <button onClick={handleLogin}>Login</button>
//             // <h2>{message}</h2> </>
//         }
//     </div> );
// }
 
// export default SignIn;

















// import React, { useState, useEffect } from 'react';
// import "./SignIn.css" ;
// import firebaseAuth from "../config/firebase" ;
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';
// import Home from "../../Home/Home"


// const SignIn = () => {

//     const[username , setUsername] = useState("") ;
//     const[password , setPassword] = useState("") ;
//     const[set , setState] = useState("") ;
//     const[click , setClick]  = useState(false) ;
//     const[showclick , setShowClick] = useState(false) ;
//     const[message , setMessage] = useState("") ;
//     const[user , setUser] = useState(null) ; 
//     const[ passClickInput , setPassState] = useState(false) ;

//     const handleClick = (e) =>{
//         setClick(true) ;
//     }

//     const handleShowClick = (e) => {
//         console.log(e) ;
//         if(showclick)
//         {
//             document.getElementById("password").setAttribute("type", "password") ;
//             setShowClick(false) ;
//         }
//         else
//         {
//             document.getElementById("password").setAttribute("type", "text") ;
//             setShowClick(true) ;   
//         }
//     }

//     const handleLogin = async ()=> {
//         try{
//             // console.log(firebaseAuth) ;
//             let response = await signInWithEmailAndPassword(firebaseAuth, username , password) ;
//             console.log(response) ;
//             console.log(response.user.uid)
//             let uid = response.user.uid ;
//             console.log(uid) ;
//             if(uid)
//             {
//                 setUser(uid) ;
//             }
//             // console.log(username + " " + password) ;
//         }
//         catch(err){
//             // setMessage(err.message) ;
//             console.log(err) ;
//         }
//     }

//     const handleLogout = async ()=> {
//         // let response = await signOut(firebaseAuth) ;
//         // console.log(response) ;
//         // setUser(null) ;
        
//         signOut(firebaseAuth).then((data) => {
//             setUser(null) ;
//         })
//     }
    
//     useEffect(() => {
//         onAuthStateChanged(firebaseAuth , (data) => {
//             console.log(username + " " + password)
//             console.log(data) ;
//             console.log(password) ;
//             console.log(username) ;
//             console.log("Auth State Change") ;
//             if(data)
//             {
//                 setUser(data.uid) ;
//             }
//         })
//     }, [])

//     const handleChange = (e) => {
//         console.log(e.target.value) ;
//         setUsername(e.target.value) ;

//     }

//     const handleChangePass = (e) =>{
//         console.log(e.target.value) ;
//         setPassword(e.target.value) ;
//     }

//     // console.log(set) ;

//     return ( 
//         <div>
//             {
//             user ? 
//                 <div>
//                     <Home></Home>
//                     {/* <h1>I am Logged In I am user {user}</h1>
//                     <button onClick={handleLogout}>Logout</button> */}
//                 </div>
//             :
//             <>
//             <div class="sign-in-container">
//                 <div class="logo">
//                     <svg viewBox="0 0 111 30" class="svg-icon svg-icon-netflix-logo" focusable="true">
//                         <g id="netflix-logo">
//                             <path
//                                 d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
//                                 id="Fill-14"></path>
//                         </g>
//                     </svg>
//                 </div>
//                 <div class="form-container">
//                     <form className='form-signIn'>
//                         <h1 className='form-h1'>Sign In</h1>
//                         <div class="form-group">
//                             <input type="text" value={username}
//                             onChange = {(e)=> setUsername(e.target.value) }
//                             />
//                             <label>Email or phone number</label>
//                         </div>
//                         <div class="form-group" onClick={ (e) => setPassState(true)}>
//                             {passClickInput ? 
//                                 <input type="password" id="password" value={password} onClick={handleClick} 
//                                 onChange={handleChangePass}
//                                 // onChange = {(e)=> setPassword(e.target.value) }
//                                 />
//                              : 
//                                 <input type="password" id="password" onClick={handleClick} 
//                                 onChange={handleChangePass}
//                                 />
//                             }
//                             {/* <input type="password" id="password" value={password} onClick={handleClick} 
//                             onChange={handleChangePass}
//                             // onChange = {(e)=> setPassword(e.target.value) }
//                             /> */}
//                             <label>Password</label>
//                             {click ? 
//                             // {document.getElementById("password")} 
//                             <span className='signIn-show-span' onClick={handleShowClick}>Show</span> : <></> 
//                             }
                            
//                         </div>
//                         <center><button id="formbutton" onClick={handleLogin} type="button" class="btn btn-primary btn-submit">Sign In</button></center>
//                         {/* <button onClick={handleLogin}></button> */}
//                         <div class="remember">
//                             <div class="left">
//                                 <input type="checkbox" id="remember" />
//                                 <label for="remember">Remember Me</label>
//                             </div>
//                             <div class="right">
//                                 <a href="#">Need help?</a>
//                             </div>
//                         </div>
//                         {/* <div class="facebook-login">
//                             <img src="fb-logo.png"/>
//                             <a href="#">Login with Facebook</a>
//                         </div> */}
//                         <div class="signup">
//                             <p className='signup-para'>New to Netflix? <a href="#">Sign up now</a>.</p>
//                         </div>
//                         <p class="captcha">
//                             This page is protected by Google reCAPTCHA to ensure you're not a bot. 
//                             <a href="#">Learn more</a>.
//                         </p>
//                     </form>
//                 </div>
//                 <footer>
//                     <div class="top">
//                         <a href="#">Questions? Contact us.</a>
//                     </div>
//                     <div class="links">
//                         <a href="#">FAQ</a>
//                         <a href="#">Help Center</a>
//                         <a href="#">Terms of Use</a>
//                         <a href="#">Privacy</a>
//                         <a href="#">Cookie Preference</a>
//                         <a href="#">Corporate Information</a>
//                     </div>
//                 </footer>
//             </div>
//             </>}
//         </div>
//      );
// }
 
// export default SignIn;














// import React, { useState, useEffect } from 'react';
// import "./SignIn.css" ;
// import firebaseAuth from "../config/firebase" ;
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword , onAuthStateChanged, signOut} from 'firebase/auth';

// const SignIn = () => {

//     const[username , setUsername] = useState("") ;
//     const[password , setPassword] = useState("") ;
//     const[set , setState] = useState("") ;
//     const[click , setClick]  = useState(false) ;
//     const[showclick , setShowClick] = useState(false) ;
//     const[user , setUser] = useState(null) ;

//     const handleClick = (e) =>{
//         setClick(true) ;
//     }

//     const handleShowClick = (e) => {
//         console.log(e) ;
//         if(showclick)
//         {
//             document.getElementById("password").setAttribute("type", "password") ;
//             setShowClick(false) ;
//         }
//         else
//         {
//             document.getElementById("password").setAttribute("type", "text") ;
//             setShowClick(true) ;   
//         }
//     }

//     const handleLogin = async ()=> {
//         try{
//             // console.log(firebaseAuth) ;
//             let response = await signInWithEmailAndPassword(firebaseAuth, username , password) ;
//             console.log(response) ;
//             console.log(response.user.uid)
//             let uid = response.user.uid ;
//             console.log(uid) ;
//             if(uid)
//             {
//                 setUser(uid) ;
//             }
//             // console.log(username + " " + password) ;
//         }
//         catch(err){
//             // setMessage(err.message) ;
//             console.log(err) ;
//         }
//     }

//     const handleLogout = async ()=> {
//         // let response = await signOut(firebaseAuth) ;
//         // console.log(response) ;
//         // setUser(null) ;
        
//         signOut(firebaseAuth).then((data) => {
//             setUser(null) ;
//         })
//     }
    
//     useEffect(() => {
//         onAuthStateChanged(firebaseAuth , (data) => {
//             console.log(data) ;
//             console.log(password) ;
//             console.log(username) ;
//             console.log("Auth State Change") ;
//             if(data)
//             {
//                 setUser(data.uid) ;
//             }
//         })
//     }, [])

//     // console.log(set) ;

//     return ( 
//         <div>
//             <div>{user}</div>
//             {
//             user ? 
//                 <div>
//                     {/* <h1>I am Logged In I am user {user}</h1>
//                     <button onClick={handleLogout}>Logout</button> */}
//                 </div>
//             :
//             <>
//             <div class="container">
//                 <div class="logo">
//                     <svg viewBox="0 0 111 30" class="svg-icon svg-icon-netflix-logo" focusable="true">
//                         <g id="netflix-logo">
//                             <path
//                                 d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
//                                 id="Fill-14"></path>
//                         </g>
//                     </svg>
//                 </div>
//                 <div class="form-container">
//                     <form className='form-signIn'>
//                         <h1 className='form-h1'>Sign In</h1>
//                         <div class="form-group">
//                             <input type="text" required onChange = {(e)=> setUsername(e.target.value) }/>
//                             <label>Email or phone number</label>
//                         </div>
//                         <div class="form-group">
//                             <input type="text" id="password" required onClick={handleClick} onChange = {(e)=> setPassword(e.target.value) }/>
//                             <label>Password</label>
//                             {click ? 
//                             // {document.getElementById("password")} 
//                             <span className='signIn-show-span' onClick={handleShowClick}>Show</span> : <></> 
//                             }
//                         </div>
//                         <button onClick={handleLogin}>Sign In</button>
//                         <div class="remember">
//                             <div class="left">
//                                 <input type="checkbox" id="remember" />
//                                 <label for="remember">Remember Me</label>
//                             </div>
//                             <div class="right">
//                                 <a href="#">Need help?</a>
//                             </div>
//                         </div>
//                         {/* <div class="facebook-login">
//                             <img src="fb-logo.png"/>
//                             <a href="#">Login with Facebook</a>
//                         </div> */}
//                         <div class="signup">
//                             <p className='signup-para'>New to Netflix? <a href="#">Sign up now</a>.</p>
//                         </div>
//                         <p class="captcha">
//                             This page is protected by Google reCAPTCHA to ensure you're not a bot. 
//                             <a href="#">Learn more</a>.
//                         </p>
//                     </form>
//                 </div>
//                 <footer>
//                     <div class="top">
//                         <a href="#">Questions? Contact us.</a>
//                     </div>
//                     <div class="links">
//                         <a href="#">FAQ</a>
//                         <a href="#">Help Center</a>
//                         <a href="#">Terms of Use</a>
//                         <a href="#">Privacy</a>
//                         <a href="#">Cookie Preference</a>
//                         <a href="#">Corporate Information</a>
//                     </div>
//                 </footer>
//             </div>
//             </>}
//         </div>
//      );
// }
 
// export default SignIn;
















// import React, { useState, useEffect } from 'react';
// import "./SignIn.css" ;

// const SignIn = () => {

//     const[set , setState] = useState("") ;
//     const[click , setClick]  = useState(false) ;
//     const[showclick , setShowClick] = useState(false) ;
//     const handleChange = (e) => {
//         // console.log(e.target.value) ;
//         setState(e.target.value) ;

//     }

//     const handleClick = (e) =>{
//         setClick(true) ;
//     }

//     const handleShowClick = (e) => {
//         console.log(e) ;
//         if(showclick)
//         {
//             document.getElementById("password").setAttribute("type", "password") ;
//             setShowClick(false) ;
//         }
//         else
//         {
//             document.getElementById("password").setAttribute("type", "text") ;
//             setShowClick(true) ;   
//         }
//     }
    
//     // console.log(set) ;

//     return ( 
//         <div class="container">
//             <div class="logo">
//                 <svg viewBox="0 0 111 30" class="svg-icon svg-icon-netflix-logo" focusable="true">
//                     <g id="netflix-logo">
//                         <path
//                             d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
//                             id="Fill-14"></path>
//                     </g>
//                 </svg>
//             </div>
//             <div class="form-container">
//                 <form className='form-signIn'>
//                     <h1 className='form-h1'>Sign In</h1>
//                     <div class="form-group">
//                         <input type="text" required/>
//                         <label>Email or phone number</label>
//                     </div>
//                     <div class="form-group">
//                         <input type="password" id="password" required onClick={handleClick} onChange={handleChange}/>
//                         <label>Password</label>
//                         {click ? 
//                         // {document.getElementById("password")} 
//                         <span className='signIn-show-span' onClick={handleShowClick}>Show</span> : <></> 
//                         }
//                     </div>
//                     <button>Sign In</button>
//                     <div class="remember">
//                         <div class="left">
//                             <input type="checkbox" id="remember" />
//                             <label for="remember">Remember Me</label>
//                         </div>
//                         <div class="right">
//                             <a href="#">Need help?</a>
//                         </div>
//                     </div>
//                     {/* <div class="facebook-login">
//                         <img src="fb-logo.png"/>
//                         <a href="#">Login with Facebook</a>
//                     </div> */}
//                     <div class="signup">
//                         <p className='signup-para'>New to Netflix? <a href="#">Sign up now</a>.</p>
//                     </div>
//                     <p class="captcha">
//                         This page is protected by Google reCAPTCHA to ensure you're not a bot. 
//                         <a href="#">Learn more</a>.
//                     </p>
//                 </form>
//             </div>
//             <footer>
//                 <div class="top">
//                     <a href="#">Questions? Contact us.</a>
//                 </div>
//                 <div class="links">
//                     <a href="#">FAQ</a>
//                     <a href="#">Help Center</a>
//                     <a href="#">Terms of Use</a>
//                     <a href="#">Privacy</a>
//                     <a href="#">Cookie Preference</a>
//                     <a href="#">Corporate Information</a>
//                 </div>
//             </footer>
//         </div>
//      );
// }
 
// export default SignIn;