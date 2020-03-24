import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Form, Input, Button, Message } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
  state = {
    loading: false,
    errorMessage: "",
    value: "",
    description: "",
    recipient: ""
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return {
      address
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await Campaign(this.props.address);
      /*desctructuring*/
      const { description, value, recipient } = this.state;
      await campaign.methods
        .createRequest(description, value, recipient)
        .send({
          from: accounts[0]
        });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {

    return (
      <Layout>
        <Link route = {`/campaigns/${this.props.address}/requests`}>
          <a>
            Back
          </a>
         
        </Link>
   <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              /*label="description"*/
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Value in DPTokens</label>
            <Input
              /*label="value"*/
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              /*label="Recipient"*/
              value={this.state.recipient}
              onChange={event =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <Button primary loading={this.state.loading}>
              Create!
            </Button>
          </Form.Field>
          <Message
            error
            header="There was an error"
            content={this.state.errorMessage}
          />
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
