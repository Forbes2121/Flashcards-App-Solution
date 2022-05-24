import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "./../utils/api";
import CardForm from "./CardForm";

function CreateCard({ deck, addCard }) {

    //initialize hooks and set states
    const [front, setFront] = useState("");
    const handleFrontChange = (event) => setFront(event.target.value);

    const [back, setBack] = useState("");
    const handleBackChange = (event) => setBack(event.target.value);

    //upon submission of a card create, establishes a new card and sets initial values for the state
    async function handleSubmit(event) {
        event.preventDefault();
        const card = {front: front, back: back};
        const newCard = await createCard(deck.id, card);
        addCard(newCard);
        setFront("");
        setBack("");
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h1>{deck.name}: Add Card</h1>

            <div className="mb-3">
            <CardForm front={front} back={back} handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} handleSubmit={handleSubmit} />
            </div>
           
            <div className="mb-3">
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">Done</Link>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}

export default CreateCard;
