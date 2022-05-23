import React from "react";
import Deck from "./Deck";

function DeckList({ deckList, removeDeck }) {

    //lists decks using JS map method and taking in each Deck from our deck component
    return (
        <div>
            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {deckList.map(deck => <li style={{paddingTop: "1em"}} key={deck.id}><Deck deck={deck} removeDeck={removeDeck}/></li>)}
            </ul>
        </div>
    );
}

export default DeckList;
