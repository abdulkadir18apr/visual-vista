import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../component/Navbar"
import { Searchbar } from "../component/Searchbar"
import _ from 'lodash'; 

import "./dashboard.scss";
import { useEffect, useState } from "react";
import { fetchImages, setQuery } from "../reducers/imageReducer";
import { ImageModal } from "../component/ImageModal";
import { ImageDetails } from "./ImageDetails";


export const Dashboard=()=>{

    const [modal,setModal]=useState(false);
    const [imageId,setImageId]=useState("")

    const {status,error,data,searchquery}=useSelector((state)=>state.image);
    console.log(status,error)

    const dispatch=useDispatch();

    const tags=["Digital","Code","Technology","Love","Marketing","Finance","Computer","Nature"]

    useEffect(()=>{
        dispatch(fetchImages());
    },[])

    useEffect(()=>{
        dispatch(fetchImages(searchquery));
    },[searchquery])

    const handleTagClick=(e)=>{
       
        dispatch(setQuery(e.target.value))

    }
    const debounceSearch=_.debounce((term)=>{
        dispatch(fetchImages(term));

    },1000)


    const handleSearchInput=(e)=>{

        dispatch(setQuery(e.target.value))

       

    }

    useEffect(()=>{
        debounceSearch(searchquery);

    },[searchquery])
    

    const handleImageClick=(e,id)=>{

        setImageId(id)
        setModal(true);
    }



    return(
    <>
        <div className="dashboard">
            <div className="searchContainer">
                <div className="nav">
                    <Navbar/>
                </div>
                <div className="search">
                    <Searchbar handleSearchInput={handleSearchInput}/>
                    <h2>{searchquery!=="" && `Query : ${searchquery}` }</h2>
                </div>

            </div>
            <div className="suggestions">
                <ul>
                   {tags.map((tag)=>(
                    <li key={tag} ><button onClick={handleTagClick} value={tag}>{tag}</button></li>
                   ))}
                </ul>

            </div>
            <div className="imageConatiner">
               {
                data?.hits?.map((image)=>(
                    <div key={image.id} className="imageBox">
                    <img src={image.webformatURL} alt={image.tags} onClick={(e)=>handleImageClick(e,image.id)} value={image.id} />
                    <div className="tags">
                        {
                             image.tags.split(',').map((tag)=>(
                                <li key={tag}>{tag}</li>
                             ))
                        }
                    </div>
                </div>
                ))
               }
            </div>
            
        </div>
        

        {modal && 
            <ImageModal isOpen={modal?true:false} onClose={()=>setModal(false)} imageId={imageId}   >
                <ImageDetails imageId={imageId}/>
            </ImageModal>
        }
    </>
    )
}

