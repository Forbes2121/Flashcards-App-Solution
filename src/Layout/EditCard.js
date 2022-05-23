import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { updateCard, readCard } from "./../utils/api";

function EditCard({ deck, editCard }) {
    //initialize hooks and set states
    const params = useParams();
    const history = useHistory();

    const [card, setCard] = useState({});

    const [front, setFront] = useState("");
    const handleFrontChange = (event) => setFront(event.target.value);

    const [back, setBack] = useState("");
    const handleBackChange = (event) => setBack(event.target.value);

    //effect hook to get card and update the card
    useEffect(() => {
        async function getCard() {
            const cardInfo = await readCard(params.cardId);
            setCard(cardInfo);
            setFront(cardInfo.front);
            setBack(cardInfo.back);
        }
        getCard();
    }, [params.cardId]);

    //submit handler to edit the card
    async function handleSubmit(event) {
        event.preventDefault();
        card.front = front;
        card.back = back;
        updateCard(card);
        editCard(card);
        history.push(`/decks/${deck.id}`);
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
                </ol>
            </nav>
            <h1>Edit Card</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" rows="3" id="front" placeholder="Front side of card" onChange={handleFrontChange} value={front}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" rows="3" id="back" placeholder="Back side of card" onChange={handleBackChange} value={back}></textarea>
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1">Done</Link>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default EditCard;