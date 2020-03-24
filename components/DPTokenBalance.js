import React, { Component } from "react";
import { Input, Message, Form, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import {Router} from "../routes";
import DonatePlusTokens from "../ethereum/DonatePlusTokens.js";

class DPTokenBalance extends Component {
  state = {
    loading: "",
    errorMessage: "",
    value: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const dptoken = DonatePlusTokens(); 
    
    // this.setState({ loading: true, errorMessage: "" });
    try {
    //   const accounts = await web3.eth.getAccounts();

    //   await dptoken.methods.contribute(this.state.value).send({
    //     from: accounts[0]
    //     //  value: web3.utils.toWei(this.state.value, "ether")
    //   });
       var x =  dptoken.methods.balanceOf(this.state.value);
       console.log("value of x is "+ x);
    //   Router.replace(`/campaigns`);
     alert("Balance of " +this.state.value+" " + "is : "+ String(x));
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    // this.setState({ loading: false });
  };

  render() {
    return (
      <Form        
        onSubmit={this.onSubmit}
        error={!!this.state.errorMessage}
      >
        <Form.Field>
          <label>Check balance of an address </label>
          <Input
            label="DPTokens"
            labelPosition="right"
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
          Check Balance
        </Button>
      </Form>
    );
  }
}
export default DPTokenBalance;
