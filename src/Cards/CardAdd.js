import React, { useEffect, useState } from "react";
import {NavLink, useParams, useHistory} from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function CardAdd () {
    // declares object for empty form
    const initialFormState = {front: "", back: ""};
  
    //initialize hooks and set states
    const history = useHistory()
    const { deckId } = useParams();
    const [deck, setDeck] = useState({})
    
    // declaring state value for new card, initializing it as empty
    const [cardData, setCardData] = useState({ ...initialFormState });  

    // effect hook runs with 'deckId' dependency
    useEffect(() => {                                       
        const abortController = new AbortController();
        // 'getDeck' api call in asynchronous function
        async function getDeck () {    
            // calls with deckId matching current url parameter
            const gotDeck = await readDeck( deckId, abortController.signal ) 
            // set state of 'deck' to result of api call
            setDeck(gotDeck)                                
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])
    
    // change handler corresponding with data for front of card
    const handleFront = ({target}) => {     
        setCardData({...cardData, front: target.value});
    };
  
    // change handler corresponding with data for back of card
    const handleBack = ({target}) => {      
        setCardData({...cardData,back: target.value});
    };
  
    // asynchronous submit handler function
    const handleSubmit = async (event) => {     
        event.preventDefault();
        // await result of 'createCard' api call
        await createCard(deckId, cardData)     
        // reset form to blank
        setCardData({...initialFormState});      
        // return to deck view
        history.push(`/decks/${deckId}`)        
    }
    
    const cardStyle = {
        marginRight: "5px",
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><NavLink to={`/decks/${deckId}`}>{deck.name}</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{deck.name}: Create Card</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" id="front" placeholder="Front side of card" onChange={handleFront} value={cardData.front}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" id="back" placeholder="Back side of card" onChange={handleBack} value={cardData.back}></textarea>
                </div>
                <button type="submit" className="btn btn-secondary" style={cardStyle} onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CardAdd;