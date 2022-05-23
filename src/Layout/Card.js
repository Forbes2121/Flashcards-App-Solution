import React from "react";
import { deleteCard } from "./../utils/api";
import { Link } from "react-router-dom";

function Card({ card, removeCard }) {

    //check if they want to delete and if so delete the card and remove it
    function confirmDelete() {
        if (window.confirm("Delete this card?\n\nYou will not be able to recover it.")) {
            deleteCard(card.id);
            removeCard(card.id);
        }
    }

    //Card with edit and delete buttons
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="card-text container">
                        <div className="row">
                            <div className="col">
                                <p>{card.front}</p>
                            </div>
                            <div className="col">
                                <p>{card.back}</p>
                            </div>
                        </div>
                    </div>
                    <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} style={{float:"left"}} className="btn btn-secondary mr-1">Edit</Link>
                    <button style={{float:"right"}} className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Card;