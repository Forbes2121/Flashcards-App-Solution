import React, { useEffect, useState } from "react";
import {useParams, useRouteMatch, useHistory} from "react-router-dom";
import { deleteCard, readCard, readDeck } from "../utils/api";

function CardList ({ setCard }) {
    //initiialize hooks and set states
    const history = useHistory();
    const {url} = useRouteMatch();
    const {deckId} = useParams();
    const [cards, setCards] = useState([])
    
    // effect hook that depends on the deckId url param which pulls the info from that deck
    useEffect(() => {               
        async function getCards() {
            const deck = await readDeck(deckId)
            // sets 'cards' state to the value of 'cards' array from 'deck' object
            setCards(deck.cards)    
        }
        getCards()
    }, [deckId])
  
    // edit button that updates 'card' state which is lifted up and used by 'DeckHome'
    const handleClick = async ({target}) => {       
        const id = target.value
        const cardClicked = await readCard(id)
        setCard(cardClicked)
        history.push(`${url}/cards/${target.value}/edit`) // tkaes user to edit screen for the card that was clicked
    }
    
    //delete handler with confirm window
    const deleteFunction = (event) => {
        if (window.confirm("Delete this card?")) {
        deleteCard(event.target.value)
        history.push(`/decks/${deckId}`)
        }
    }
    
    const cardStyle = {
        marginRight: "5px",
    }

    // for each card in the array, creates a bootstrap "card"
    const cardList = cards.map((card, index) => {       
        return (
            <div className="card" key={index} value={card.id}>
                <div className="card-body" value={card.id}>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <div style={cardStyle}>
                    <button type="button" className="btn btn-secondary" style={cardStyle} key={index} value={card.id} onClick={handleClick}>Edit</button>
                    <button type="button" className="btn btn-danger bi bi-trash" value={card.id} onClick={deleteFunction}>Delete</button>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div>
            {cardList}
        </div>
    )
}

export default CardList;