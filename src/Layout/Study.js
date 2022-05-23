import React from "react";
import { Link, useParams } from "react-router-dom";
import CardDisplay from "./CardDisplay";

function Study({ deck, deckList, cardList }) {
    const params = useParams();

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${params.deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>{deck.name}: Study</h1>
            <CardDisplay deck={deck} cardList={cardList}/>
        </div>
    );
}

export default Study;
