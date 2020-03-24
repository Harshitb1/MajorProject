import React, { Component } from "react";
import { Input, Message, Form, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign.js";
import web3 from "../ethereum/web3";
import {Router} from "../routes";

class ContributeForm extends Component {
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
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute(this.state.value).send({
        from: accounts[0]
        //  value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.replace(`/campaigns/${this.props.address}`);
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
          <img src="https://images.mixer.com/svGhCSLsSmCcLefjYXaDuZvTb9ZLCBb3A6Y3IHLyA1qA/https://cdn.discordapp.com/attachments/334441124217225216/424483345813209088/donate.gif"/>
          <label>Contribute to this campaign</label>
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
          Contribute!
        </Button>
      </Form>
    );
  }
}
export default ContributeForm;
