import React, { Component } from 'react';
import IngredientEnum from './IngredientEnum';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component{
    
    render(){

        let ingredient = null;
        switch(this.props.type){
            case (IngredientEnum.BreadBottom) : 
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
    
            case (IngredientEnum.BreadTop) : 
                ingredient = <div className={classes.BreadTop}>
                                <div className={classes.Seeds1}></div>
                                <div className={classes.Seeds2}></div>
                            </div>;
                break;
    
            case (IngredientEnum.Meat) : 
                ingredient = <div className={classes.Meat}></div>;
                break;
    
            case (IngredientEnum.Salad) : 
                ingredient = <div className={classes.Salad}></div>;
                break;
    
            case (IngredientEnum.Cheese) : 
                ingredient = <div className={classes.Cheese}></div>;
                break;
    
            case (IngredientEnum.Bacon) : 
                ingredient = <div className={classes.Bacon}></div>;
                break;
    
            default: ingredient = null;   
        }
        
        return ingredient;
    }
   
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;