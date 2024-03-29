import React, {useState, useEffect} from "react";
import axios from "axios";
import config from "../config";

function SearchResult(props) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("q");

        const fetchData = async () => {
            const response = await axios.get(`${config.API_ENDPOINT}/search/?q=${searchQuery}`);
            setResults(response.data);
            console.log(response.data)
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Search Results </h1>
            {results.length === 0 ? (
                <p>Aucun résultat a votre recherche</p>
            ) : (
                <ul>
                    {results.map((result, index) => (
                        <li key={index}>
                            <a href={`${config.SEARCH_ENDPOINT}/${result.fileUrl}`} download>{result.name}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchResult;
