import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        // JS object which will define all the inputs, values and how they should be configured
        orderForm: {
            name: {
                elementType: 'input',
                // Config of normal attributes we can set for each input type
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                // Config of normal attributes we can set for each input type
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                // Config of normal attributes we can set for each input type
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                // Config of normal attributes we can set for each input type
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                // Config of normal attributes we can set for each input type
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                // Config of normal attributes we can set for each input type
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        // End of input elements
        loading: false
    }

    orderHandler = ( event ) => {
        // We don't want to send a request automatically because that would reload our page
        event.preventDefault();
        this.setState( { loading: true } );
        // Extract the data we want to submit, get the orderForm element
        const formData = {};
        // formElementIdentifier = name, country, email...
        for(let formElementIdentifier in this.state.orderForm) {
            // Create key/value pairs, where we add a new property to formData (country, name...) and
            // we set the value of that property to value the user entered
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    checkValidity(value, rules) {
        // This function will return either true or false
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    // Here we expect to get an event object
    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        // We need to update the value for a given input (name, street...) upon user changes, we need a second argument
        // which is the key from each object (inputIdentifier as an argument in this function)
        // Copy the orderForm:
        const updatedOrderForm = {
            // This does not create a "deep clone", the nested objects will be ignored and we need the 'value'
            ...this.state.orderForm
        }
        // Create a deep clone, we use the 'spread' operator
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        // Now we can safely change the value, because it is a clone
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // Now we can change State
        this.setState({orderForm: updatedOrderForm});
        // Two-way binding is now working
    }

    render () {
        // Turn the orderForm object into some array we will loop through
        const formElementsArray = [];

        // The keys are the properties of that object (name, street, zipCode) and when we access a given
        // key from orderForm we get the values hold inside
        for(let key in this.state.orderForm) {
            // Let's add new elements to the array
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* inputType, type, name and placeholder are passed as props to Input.js */}
                {/* <Input elementType="..." elementConfig="..." value="..." />
                <Input inputtype="input" type="email" name="email" placeholder="Your Mail" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" /> */}

                {/* Let's begin by adding curly braces to enter JSX */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        // Should be a reference to an anonymous function so that we can then pass arguments
                        // We get the event object and also the identifier
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;