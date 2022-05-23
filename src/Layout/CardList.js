import React from "react";
import Card from "./Card";

function CardList({ cardList, removeCard }) {

    //List of cards using JS map and passing in the Cards from our Card component
    return (
        <div>
            <h5 style={{paddingTop: "1em"}}>Cards</h5>
            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {cardList.map(card => <li key={card.id}><Card card={card} removeCard={removeCard}/></li>)}
            </ul>
        </div>
    );
}

export default CardList;