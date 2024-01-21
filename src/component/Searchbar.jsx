import { useSelector } from "react-redux";
import "./css/seacrchbar.scss";


export const Searchbar=(props)=>{
    const {handleSearchInput}=props
    const {searchQuery}=useSelector((state)=>state.image)
    return(
        <div className="search-bar-container">
              <div className="search-bar">
            <div className="icon">
            <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/f8fafc/search--v2.png" alt="search--v2"/>
            <span>|</span>
                <input value={searchQuery} type="text" placeholder="search" onChange={handleSearchInput} />
            </div>
            

        </div>

        </div>
      
    )
}