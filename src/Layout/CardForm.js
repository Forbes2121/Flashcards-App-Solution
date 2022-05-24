import React from "react";

function CardForm({front, back, handleFrontChange, handleBackChange, handleSubmit}) {

    return (
        <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea type="text" className="form-control" rows="3" id="front" placeholder="Front side of card" onChange={handleFrontChange} value={front}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea type="text" className="form-control" rows="3" id="back" placeholder="Back side of card" onChange={handleBackChange} value={back}></textarea>
                </div>
        </form>
    )

}

export default CardForm;