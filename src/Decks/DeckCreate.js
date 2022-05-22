import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import { createDeck } from "../utils/api";

function DeckCreate () {
    //initialize and set hooks
    const history = useHistory()
    const initialFormState = {name: "", description: ""};
  
    // declares a state variable, initialized as a blank object that will be updated by the form
    const [deckData, setDeckData] = useState({ ...initialFormState });      
    
    // handler for "name" of deck in form
    const handleNameChange = ({target}) => {     
        setDeckData({...deckData, name: target.value});
    };
  
    // handler for "description" value of deck in form
    const handleDescriptionChange = ({target}) => {     
        setDeckData({...deckData, description: target.value});
    };
  
    //handler that calls "createDeck" api and the resets the form ("deckData") to blank then returns to home
    const handleSubmit = async (event) => {         
        event.preventDefault();
        await createDeck(deckData)
        setDeckData({...initialFormState});
        history.push("/")
    }
    
    const cardStyle = {
        marginRight: "5px",
    }
    
    return (
        <div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="Deck Name" onChange={handleNameChange} value={deckData.name}/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea type="textarea" className="form-control" id="description" placeholder="Brief description of the deck" onChange={handleDescriptionChange} value={deckData.description}/>
                </div>
                <button type="submit" className="btn btn-secondary" style={cardStyle} onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default DeckCreate;