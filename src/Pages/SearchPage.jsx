import React from 'react';
import './SearchPage.css'
import { useStateValue } from "../StateProvider" 
import useGoogleSearch from '../useGoogleSearch';
import { Link } from "react-router-dom"
//import Response from "../Response"
import SearchIcon from "@material-ui/icons/Search"
import Google from "../Assets/Google.svg.png"
import Search from "../Components/Search";
import DescriptionIcon from "@material-ui/icons/Description"
import ImageIcon from "@material-ui/icons/Image"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import RoomIcon from "@material-ui/icons/Room"
import MoreVertIcon from "@material-ui/icons/MoreVert"


const SearchPage = () => {
    const[{ term }, dispatch] = useStateValue()

    const { data } = useGoogleSearch(term) //Live API Core
    //const data = Response Mock
    

    console.log(data)
    return (
        <div className='searchPage'>
            <div className="searchPage__header">
                <Link to="/">
                    <img 
                    className="searchPage__logo"
                    src={Google}
                    alt=""
                    />
                </Link>
                <div className="searchPage__headerBody">
                    <Search hideButtons />
                    <div className="searchPage__options">
                        <div className="searchPage__optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon />
                                <Link to="/all">All</Link>
                            </div>
                            <div className="searchPage__option">
                                <DescriptionIcon />
                                <Link to="/News">News</Link>
                            </div>
                            <div className="searchPage__option">
                                <ImageIcon />
                                <Link to="/images">Images</Link>
                            </div>
                            <div className="searchPage__option">
                                <LocalOfferIcon />
                                <Link to="/shopping">shopping</Link>
                            </div>
                            <div className="searchPage__option">
                                <RoomIcon />
                                <Link to="/maps">maps</Link>
                            </div>
                            <div className="searchPage__option">
                                <MoreVertIcon />
                                <Link to="/more">more</Link>
                            </div>
                        </div>
                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">
                                <Link to="/settings">Setting</Link>
                            </div>
                            <div className="searchPage__option">
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {term && (
            <div className="searchPage__results">
                <p className="searchPage__resultCount">
                    About {data?.searchInformation
                    .formattedTotalResults} results 
                    ({data?.searchInformation
                    .formattedSearchTime} seconds) for {term}
                </p>

                {data?.items.map(item => (
                    <div className="searchPage__result">
                        <a href={item.link} className="searchPage__resultLink">
                            {item.pagemap?.cse_image?.length > 
                            0 && item.pagemap?.cse_image[0]?.src && (
                                <img 
                                className='searchPage__resultImage' 
                                src={item.pagemap?.cse_image[0]?.src}
                                alt=""
                                />
                            )}
                            {item.displayLink}
                        </a>
                        <a className='searchPage__resultTitle' href={item.link}>
                            <h2>{item.title}</h2>
                        </a>
                        <p className="searchPage__resultSnippet">
                            {item.snippet}
                        </p>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default SearchPage;
