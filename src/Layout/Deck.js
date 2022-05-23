import React, { useState, useEffect } from "react";
import { listCards, deleteDeck } from "./../utils/api";
import { Link } from "react-router-dom";

function Deck({ deck, removeDeck }) {
    const [cardList, setCardList] = useState([]);
    const [cardCount, setCardCount] = useState(0);

    function confirmDelete() {
        let confirm = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
        if (confirm) {
            deleteDeck(deck.id);
            removeDeck(deck.id);
        }
    }

    useEffect(() => {
        async function loadCards() {
            const cards = await listCards(deck.id);
            setCardList(cards);
        }
        loadCards();
    }, []);

    useEffect(() => {
        if (cardList.length > 0) {
            setCardCount(cardList.reduce((total, card) => deck.id === card.deckId ? total + 1 : total, 0));
        }
    }, [cardList]);
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title" style={{float:"left"}}>{deck.name}</h5>
                    <p><span style={{float:"right"}}>{cardCount} card{cardCount !== 1 ? "s" : ""}</span></p>
                    <br />
                    <p className="card-text">{deck.description}</p>
                    <Link to={`/decks/${deck.id}`} style={{float:"left"}} className="btn btn-secondary mr-1">View</Link>
                    <Link to={`/decks/${deck.id}/study`} style={{float:"left"}} className="btn btn-primary mr-1">Study</Link>
                    <button style={{float:"right"}} className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </div>
            </div>
        </>
    );
}

export default Deck;
