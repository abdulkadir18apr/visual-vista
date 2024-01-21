

import { useNavigate } from "react-router-dom";
import { Navbar } from "../component/Navbar";
import { Searchbar } from "../component/Searchbar";
import "./home.scss";

export const Home=()=>{
    const navigate=useNavigate();
        return(
            <div className="home">
            
                <div className="nav">
                    <Navbar/>
                </div>
                <header>
                    <h1>
                        Discover over 2,000,000 <br/>free stock images
                    </h1>
                </header>
                <div className="search" onClick={()=>navigate("/dashboard")}>
                    <Searchbar/>

                    <div className="trending">
                    <p><span>Trending:</span> flowers,forest,love,river</p>
                </div>
                </div>

                
                
            </div>
        )
    }
