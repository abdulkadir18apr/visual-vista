import { Link } from "react-router-dom"

import "./css/navbar.scss"
export const Navbar=()=>{
    return(
        <div className="navbar">
        <h2><Link to="/">Visual-Vista</Link></h2>
        <ul>
        <li><Link to={"/dashboard"}>Explore</Link></li>
            <li><Link to={"/login"}>Login</Link></li>
            <li><Link to={"/signup"}>Create Account</Link></li>
        </ul>
    </div>
    )
}