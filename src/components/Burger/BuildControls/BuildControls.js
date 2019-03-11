import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import IngredientEnum from '../BurgerIngredient/IngredientEnum';

import classes from './BuildControls.css';

const controls= [
    { label: 'Salad', type :IngredientEnum.Salad},
    { label: 'Meat', type :IngredientEnum.Meat},
    { label: 'Bacon', type :IngredientEnum.Bacon},
    { label: 'Cheese', type :IngredientEnum.Cheese}
]

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>{
                return <BuildControl key={ctrl.label}
                 label={ctrl.label} 
                 added={() => props.ingredientAdded(ctrl.type)}
                 removed={()=>props.ingredientRemoved(ctrl.type)}
                 disabled = {props.disable[ctrl.type]}
                 />
            })}
            <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
            >Order Now</button>
        </div>
    )
}

export default buildControls;