import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span>{igKey}</span>: {props.ingredients[igKey]}</li>
    })

    return(
        <div>
            <h3>Order</h3>
            <p>Ingredients are:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </div>
    )
}
 
export default orderSummary;