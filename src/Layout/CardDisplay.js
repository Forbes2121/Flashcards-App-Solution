import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function CardDisplay({ deck, cardList }) {
    const history = useHistory();

    const [cardIndex, setCardIndex] = useState(0);
    const [cardCount, setCardCount] = useState(0);
    const [flipped, setFlipped] = useState(false);

    function flip() {
        setFlipped(!flipped);
    }

    function nextCard() {
        if (cardIndex === cardCount - 1) {
            let restart = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
            if (restart) {
                setCardIndex(0);
                setFlipped(false);
                return;
            }
            history.push("/");
            return;
        }
        setCardIndex(cardIndex + 1);
        setFlipped(false);
    }

    useEffect(() => {
        setCardCount(cardList.length);
    }, [cardList]);

    if (cardCount > 2) {
        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Card {cardIndex + 1} of {cardList.length}</h5>
                        {cardCount > 1 ? <p className="card-text">{flipped ? cardList[cardIndex].back : cardList[cardIndex].front}</p> : <br />}
                        <button className="btn btn-secondary mr-1" onClick={flip}>Flip</button>
                        {flipped ? <button className="btn btn-primary" onClick={nextCard}>Next</button> : <div></div>}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are only {cardCount} cards in this deck.</p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
        </>
    )
}

export default CardDisplay;