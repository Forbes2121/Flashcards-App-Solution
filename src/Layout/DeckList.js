import React from "react";
import Deck from "./Deck";

function DeckList({ deckList, removeDeck }) {
    return (
        <>
            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {deckList.map(deck => <li style={{paddingTop: "1em"}} key={deck.id}><Deck deck={deck} removeDeck={removeDeck}/></li>)}
            </ul>
        </>
    );
}

export default DeckList;
