import axios from "axios";
import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";

import "./image-details.scss";
import { Loader } from "../component/Loader";


export const ImageDetails = ({ imageId }) => {

    const [image, setImage] = useState({
        loading: true,
        data: null,
        error: null
    });

    const [selectedSize, setSelectedSize] = useState(1)

    const url = `https://pixabay.com/api/?key=${import.meta.env.VITE_API_KEY}`;

    const fetchImage = async () => {
        try {
            const res = await axios.get(`${url}&id=${imageId}`);
            if (res.data) {
                setImage({ loading: false, data: res.data?.hits[0] });
            }
        } catch (err) {
            setImage({ loading: false, error: true })
        }
    }

    useEffect(() => {
        console.log("calll")
        fetchImage()
    }, [])

    const handleDownload = () => {
        const link = document.createElement('a');
        if (selectedSize === 0) {
            link.href = image.data.previewURL;
        } else if (selectedSize === 1) {
            link.href = image.data.webformatURL;
        } else {
            link.href = image.data.largeImageURL;
        }
        link.target = "_blank"
        link.download = 'image.jpg';
        link.click();
    };


    if (image.loading) {
        return <Loader/>
    }
    if (image.error) {
        return <h1>Error....</h1>
    }

    const selectedUrl = () => {
        if (selectedSize === 0) {
            return image.data.previewURL
        } else if (selectedSize === 1) {
            return image.data.webformatURL
        } else {
            return image.data.largeImageURL
        }
    }

    return (
        <div className="image-details-container">
            <div className="image-details">
                <div className="image">
                    <img src={selectedUrl()} alt={image.data.id} />
                </div>
                <div className="details">
                    <h2>Downloads</h2>
                    <ul className="options" >
                        <li className={selectedSize === 0 ? "active" : ""} onClick={() => setSelectedSize(0)}>
                            <span>Small</span>
                            <span>150X100</span>
                            <span className="tick"><img width="48" height="48" src="https://img.icons8.com/color/48/tick-tick.png" alt="tick-tick" /></span>
                        </li>
                        <span className="line"></span>
                        <li className={selectedSize === 1 ? "active" : ""} onClick={() => setSelectedSize(1)}>
                            <span>Medium</span>
                            <span>640X427</span>
                            <span className="tick"><img width="48" height="48" src="https://img.icons8.com/color/48/tick-tick.png" alt="tick-tick" /></span>
                        </li>
                        <span className="line"></span>
                        <li className={selectedSize === 2 ? "active" : ""} onClick={() => setSelectedSize(2)}>
                            <span>Big</span>
                            <span>{image.data.imageWidth}X{image.data.imageHeight}</span>
                            <span className="tick"><img width="48" height="48" src="https://img.icons8.com/color/48/tick-tick.png" alt="tick-tick" /></span>
                        </li>
                    </ul>
                    <button onClick={handleDownload}>Download For Free</button>
                    <RWebShare
                        data={{
                            text: "Sharing this beautiful image with you",
                            url: `${image.data.largeImageURL}`,
                            title: `${image.data.tags}`,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <button>Share 🔗</button>
                    </RWebShare>
                    <h2>Information</h2>
                    <div className="info">
                        <div className="col">
                            <div className="info-box">
                                <span>User</span>
                                <span>{image.data.user}</span>
                            </div>
                            <div className="info-box">
                                <span>Views</span>
                                <span>{image.data.views}</span>

                            </div>
                        </div>
                        <div className="col">
                            <div className="info-box">
                                <span>UserId</span>
                                <span>{image.data.user_id}</span>
                            </div>
                            <div className="info-box">
                                <span>Downloads</span>
                                <span>{image.data.downloads}</span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="info-box">
                                <span>Type</span>
                                <span>{image.data.type}</span>
                            </div>
                            <div className="info-box">
                                <span>Likes</span>
                                <span>{image.data.likes}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="tags">
                <h3>Tags:</h3>
                {image.data.tags?.split(",").map((tag) => (
                    <p key={tag}>{tag}</p>
                ))}

            </div>


        </div>
    )
}