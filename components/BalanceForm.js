import React, { Component } from "react";
import { Input, Message, Form, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign.js";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

class BalanceForm extends Component {
  state = {
    loading: "",
    errorMessage: "",
    value: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(
      this.props.address
    ); 
    this.setState({ loading: true, errorMessage: "" });
    try {
    //   const accounts = await web3.eth.getAccounts();

      var x=  campaign.methods.getAccountBalance(this.state.value);
      alert("Balance of " +this.state.value+" " + "is : "+ x);

    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form        
        onSubmit={this.onSubmit}
        error={!!this.state.errorMessage}
      >
        <Form.Field>
          <label>Check balance of an address</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message
          error
          header="There was an error"
          content={this.state.errorMessage}
        />
        <Button primary loading={!!this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}
export default BalanceForm;
