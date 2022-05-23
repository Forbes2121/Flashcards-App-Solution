import React from "react";
import { deleteCard } from "./../utils/api";
import { Link } from "react-router-dom";

function Card({ card, removeCard }) {

    function confirmDelete() {
        let confirm = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
        if (confirm) {
            deleteCard(card.id);
            removeCard(card.id);
        }
    }

    return (
        <>
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
        </>
    );
}

export default Card;