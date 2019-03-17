import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
  cheese:0.4,
  salad:0.5,
  meat:1.3,
  bacon:0.7
}
class BurgerBuilder extends Component {

  state = {
    ingredients : null,
    totalPrice: 5,
    purchasable:false,
    purchasing:false,
    loading:false
  }  

  componentDidMount(){
    axios.get('https://burger-app-4c372.firebaseio.com/ingredients.json')
    .then(response=>{
      this.setState({ingredients:response.data});
    })
    .catch(error=>{
      console.log(error)
    })  
  }

  updatePurchaseState(ingredients){
    const sum = Object.keys(ingredients)
    .map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,el)=>{
      return sum + el;
    },0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount<=0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchasingHandler = ()=>{
    this.setState({purchasing:true});
  }

  purchasingCancelHandler = () => {
    this.setState({purchasing:false})
  }

  purchasingContinueHandler = () => {
    this.setState({loading:true});
    const order = {
      ingredients :this.state.ingredients,
      price:this.state.totalPrice,
      customer:{
        name:'John bradman',
        address:{
          street :'test street',
          zipCode : '23234',
          country:'germany'
        },
        email:'test@test.com'
      },
      deliveryMethod:'fastest'
    }

    axios.post('/orders.json',order)
    .then(response=>{
      this.setState({loading:false});
    })
    .catch(error=>{
      this.setState({loading:false});
    });
  }

  render() {

    const disabledInfo = {...this.state.ingredients};
    
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    
    let orderSummary = null;
    let burger = <Spinner />;

    if(this.state.ingredients){
      burger = (
        <Fragment>
              <Burger ingredients={this.state.ingredients} />
              <BuildControls 
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler} 
              disable={disabledInfo}
              purchasable={this.state.purchasable}
              price={this.state.totalPrice}
              ordered={this.purchasingHandler}
              />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchasingCancelHandler}
          purchaseContinue={this.purchasingContinueHandler}
          totalPrice={this.state.totalPrice}
          />
      )
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return (
        <Fragment>
            <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );
  }
}

export default BurgerBuilder;
