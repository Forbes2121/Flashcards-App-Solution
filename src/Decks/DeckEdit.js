import React, { useEffect, useState } from "react";
import {NavLink, Link, useParams, useHistory} from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

function DeckEdit () {
    //initialize hooks and set states
    const history = useHistory();
    const { deckId } = useParams();
    const [ deckData, setDeckData ] = useState({});
    
    // effect hook, "deckId" dependency causes it to run each time the "deckId" url parameter changes
    useEffect(() => {       
        const abortController = new AbortController();
        async function getDeck () {
            const gotDeck = await readDeck( deckId, abortController.signal );
            setDeckData(gotDeck);
            
        }
        getDeck();
        return () => abortController.abort();
    }, [deckId]);
  
    // change handler for "name of deck"
    const handleNameChange = ({target}) => {   
        // changes state variable which will be used late to run "updateDeck" api call
        setDeckData({...deckData, name: target.value});
    };
  
    // change handler for "description of deck"
    const handleDescriptionChange = ({target}) => {   
        // changes state variable which will be used late to run "updateDeck" api call
        setDeckData({...deckData, description: target.value});
    };
  
    // async submit handler that runs "updateDeck" api
    const handleSubmit = async (event) => {         
        event.preventDefault();
        await updateDeck(deckData)
        history.push("/")    
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
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" onChange={handleNameChange} value={deckData.name} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" id="description" onChange={handleDescriptionChange} value={deckData.description}/>
                </div>
                <button type="submit" className="btn btn-secondary" style={cardStyle} onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeckEdit;