import React, { Component } from "react";
import { Table, Button, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import {Router} from "../routes";

class RequestRow extends Component {
  state = {
    loading1: false,
    loading2: false,
    errorMessage: ""
  };

  onApprove = async () => {
    this.setState({ loading1: true });
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await Campaign(this.props.address);
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.replace(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading1: false });
  };

  onFinalize = async () => {
    this.setState({ loading2: true });
    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await Campaign(this.props.address);
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });
      Router.replace(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading2: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount/2;

    return (
      <Row disabled={request.complete} positive = { readyToFinalize && !request.complete }>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{request.value}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {approversCount}
        </Cell>

        <Cell>
          {request.complete ? null : (
            <Button
              color="green"
              basic
              onClick={this.onApprove}
              loading={this.state.loading1}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              color="teal"
              basic
              onClick={this.onFinalize}
              loading={this.state.loading2}
            >
              Finalize
            </Button>
          )}
        </Cell>
        
      </Row>
    );
  }
}

export default RequestRow;
