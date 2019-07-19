import React from 'react';
import FormValidator from './FormValidator'

class QuoteForm extends React.Component {

  // Finish writing the GroceryApp class
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'First Name is required.'
      },
      {
        field: 'lastName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Last name is required.'
      },
      {
        field: 'amount',
        method: 'isEmpty',
        validWhen: false,
        message: 'Amount is required.'
      },

      {
        field: 'currencyFrom',
        method: 'isEmpty',
        validWhen: false,
        message: 'Currency From is required.'
      },
      {
        field: 'currencyTo',
        method: 'isEmpty',
        validWhen: false,
        message: 'Currency To is required.'
      },

    ]);


    this.state = {
      quote: null,
      isLoaded: false,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      countryCode:"",
      currencyFrom: "",
      currencyTo: "",
      amount: "",
      validation: this.validator.valid(),
    }

  }



  handleInputChange = (e) => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  handleFormSubmit = (e) => {
    e.preventDefault();
  
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    console.log(validation);
    if (validation.isValid) {
      this.onGetQuote();
    }
  }

  startNewQuote = () => {
    this.setState({
      isLoaded: false,
      quote: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      countryCode: "",
      currencyFrom: "",
      currencyTo: "",
      amount: "",
    });
  }
  onGetQuote = () => {
    let context = this;
    let currencyFrom = this.state.currencyFrom;
    let currencyTo = this.state.currencyTo;
    let amount = this.state.amount;
    let urlFetch = "https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/" + currencyFrom + "/" + currencyTo + "/" + amount + "?format=json"

    console.log(urlFetch);

    fetch(urlFetch)
      .then(res => res.json())
      .then(
        (result) => {
          context.setState({
            isLoaded: true,
            quote: result
          });
          console.log(result);
        },

        (error) => {
          context.setState({
            isLoaded: false,
          });

        }
      )

  }



  render() {

    return (
      <div className="main-container">
        <div className="quote-form">
          <h1>Quick Quote</h1>
          <div className="display-content">
            <form >
              <div className="row">
                <div className="half">
                  <div className="field-row">
    <label className="label">First Name<span className="required">*</span>{this.state.validation.firstName.isInvalid && <span className="required"> required</span>}</label>
                    <input type="text" name="firstName" value="" className="form-control input-sm" value={this.state.firstName} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="half">
                  <div className="field-row mL10">
                    <label className="label">Last Name<span className="required">*</span>{this.state.validation.lastName.isInvalid && <span className="required"> required</span>}</label>
                    <input type="text" name="lastName" value="" className="form-control input-sm" value={this.state.lastName} onChange={this.handleInputChange} />
                  </div>
                </div>

              </div>

              <div className="field-row">
                <label className="label">Email</label>
                <input type="email" className="form-control input-sm" name="email" value={this.state.email} onChange={this.handleInputChange} />
              </div>
              <div className="row">
                <div className="one-quarter">
                  <div className="field-row">
                    <label className="label">Telephone / Mobile</label>
                   
                      <div className="select-input">
                        <select className="form-control input-sm select" name="countryCode" value={this.state.countryCode}
                          autoComplete="off"
                          onChange={this.handleInputChange}>
                          <option value="+ 61">+ 61</option>
                          <option value="+ 1">+ 1</option>

                        </select>
                      </div>

                  </div>
                </div>
               <div className="three-fourth">
                  <div className="field-row">
                    <label className="label"></label>
                    <input type="phone" className="form-control input-sm" name="phone" value={this.state.phone} onChange={this.handleInputChange} />
                    </div>
               </div>
              </div>
              


              <div className="row">
                <div className="half">
                  <div className="field-row">
                    <label className="label">From Currency<span className="required">*</span>{this.state.validation.currencyFrom.isInvalid && <span className="required"> required</span>}</label>
                    <div className="select-input">
                      <select className="form-control input-sm select" name="currencyFrom"  value={this.state.currencyFrom}
                        autoComplete="off"
                        onChange={this.handleInputChange}>
                        <option value="">Select Currency</option>
                        <option value="GBP">Great Britain Pound</option>
                        <option value="USD">United States Dollar (USD)</option>
                        <option value="AUD">Australian Dollar (AUD)</option>
                      </select>
                    </div>

                  </div>
                </div>
                <div className="half">
                  <div className="field-row mL10">
                    <label className="label mL25">To Currency<span className="required">*</span>{this.state.validation.currencyTo.isInvalid && <span className="required"> required</span>}</label>
                    <div className="select-input mL25">
                      <select className="form-control input-sm" name="currencyTo"  value={this.state.currencyTo}
                        autoComplete="off"
                        onChange={this.handleInputChange}>
                        <option value="">Select Currency</option>
                        <option value="GBP">Great Britain Pound</option>
                        <option value="USD">United States Dollar (USD)</option>
                        <option value="AUD">Australian Dollar (AUD)</option>

                      </select>
                    </div>
                  </div>
                </div>


              </div>
              <div className="half">
                <div className="field-row ">
                  <label className="label">Amount<span className="required">*</span>{this.state.validation.amount.isInvalid && <span className="required"> required</span>}</label>
                  <input type="number" min="250" className="form-control input-sm" name="amount" value={this.state.amount} onChange={this.handleInputChange} />
                </div>
              </div>




            </form>



            <div className="div-center-action">
              <button className="btn-blue" onClick={this.handleFormSubmit}>Get</button>
            </div>
           
          </div>
        </div>
        <div className="quote-display-form">
          <h1>Quick Quote</h1>
          <div className="display-content-quote">
            {this.state.isLoaded &&
              <div>
                <div className="rate-container">
                  <h4>OFX Customer Rate</h4>
                <label className="label-green mL25">{this.state.quote && this.state.quote.CustomerRate}</label>
                </div>
                <div className="currency-container">
                  <h4>From</h4>
                  <div><span className="currency">{this.state.currencyFrom}</span><span className="amount">{this.state.amount}</span></div>
                  <div>
                    <h4>To</h4>
                  <div><span className="currency">{this.state.currencyTo}</span><span className="amount">{this.state.quote.InterbankAmount && this.state.quote.InterbankAmount.toFixed(3)}</span></div>
                  </div>
                </div>
                <div className="div-center-action">
                  <button className="btn-blue" onClick={this.startNewQuote}>Start new quote</button>
                 
                </div>
              <div className="error">{this.state.quote && this.state.quote.SystemMessage && this.state.quote.SystemMessage}</div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default QuoteForm;