import React from "react";
import Card from "./Card";

function CardList({ cardList, removeCard }) {
    return (
        <>
            <h5 style={{paddingTop: "1em"}}>Cards</h5>
            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {cardList.map(card => <li key={card.id}><Card card={card} removeCard={removeCard}/></li>)}
            </ul>
        </>
    );
}

export default CardList;