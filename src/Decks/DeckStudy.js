import React, { useEffect, useState } from "react";
import {Link, NavLink, useParams} from "react-router-dom";
import CardStudy from "../Cards/CardStudy";
import { readDeck } from "../utils/api";

function DeckStudy () {
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState(""); 
    
    // "deckId" dependency means this runs each time a new deck is selected
    useEffect(() => {       
        const abortController = new AbortController();
        // calls "readDeck" api (promise)
        readDeck(deckId, abortController.signal) 
             // sets deck state to the result of api promise
            .then(setDeck)                          
        
        return () => abortController.abort()
    },[deckId])

    if (deck) {
        return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>{deck.name}: Study</h1>
            <CardStudy deck={deck}/>
        </div>
    )
        } else {
            return <h3>Loading...</h3>
        }
    }
export default DeckStudy;