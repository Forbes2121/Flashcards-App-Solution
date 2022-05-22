import React, { useEffect, useState } from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

function CardEdit ( { card,  setCard } ) { 
    //initialize hooks and set states
    const history = useHistory()
    const { deckId, cardId } = useParams()
    const [deckData, setDeckData] = useState({});
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    // effect hook containing async function to call 'getDeck' to get relevant deck data
    useEffect(() => {       
        const abortController = new AbortController();
        async function getDeck () {
            const gotDeck = await readDeck( deckId, abortController.signal )
            setDeckData(gotDeck)
        }
        getDeck()
        return () => abortController.abort()
    }, [deckId])
  
    // effect hook retreiving the data for the current card being edited
    useEffect(() => {       
        async function getCard() {
            const cardInfo = await readCard(cardId);
            // setting the state of the whole card
            setCard(cardInfo);      
            // individual state variable for front and back data
            setFront(cardInfo.front);   
            setBack(cardInfo.back);
        }
        getCard();
    }, [cardId, setCard]);

    
    const handleFrontChange = (event) => {
        // set state for front of card based on inputted form data. this is only used to display up-to-date info in the form
        setFront(event.target.value);   
        // updating the actual value for the card that will eventually be submitted with the form
        setCard({...card, front: event.target.value,});
    }
  
    const handleBackChange = (event) => {
        // set state for back of card based on inputted form data. this is only used to display up-to-date info in the form
        setBack(event.target.value); 
        // updating the actual value for the card that will eventually be submitted with the form
        setCard({...card, back: event.target.value,});
    }
    
    // async submit handler that calls 'updateCard' api
    const handleSubmit = async (event) => {     
        event.preventDefault();
        await updateCard(card)
        // return to deck view page
        history.push(`/decks/${deckId}`)        
    }
    
    const cardStyle = {
        marginRight: "5px",
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckData.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <form name="addCard" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" rows="3" id="front" onChange={handleFrontChange}  value={front}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" rows="3" id="back" onChange={handleBackChange}  value={back}></textarea>
                </div>
                <button type="button" className="btn btn-secondary" style={cardStyle} onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CardEdit;