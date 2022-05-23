import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "./../utils/api";

function CreateDeck({ addDeck }) {
    //establish hooks and set states
    const history = useHistory();

    const [name, setName] = useState("");
    //name change handler
    const handleNameChange = (event) => setName(event.target.value);

    const [description, setDescription] = useState("");
    //description change handler
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    //submit handler, creates a new deck with name and description then adds the new deck to list
    async function handleSubmit(event) {
        event.preventDefault();
        const deck = {name: name, description: description};
        const newDeck = await createDeck(deck);
        addDeck(newDeck);
        history.push(`/decks/${newDeck.id}`);
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="deckName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="deckName" placeholder="Deck Name" onChange={handleNameChange} value={name}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" placeholder="Brief description of the deck" onChange={handleDescriptionChange} value={description}></textarea>
                </div>
                <Link to="/" className="btn btn-secondary mr-1">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;