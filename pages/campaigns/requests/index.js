import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    /*destructuring*/
    const { address } = props.query; 
    const campaign = await Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();
    //console.log(counts);
    const requests = await Promise.all(
      Array(
        parseInt(requestCount)
      ) 
        .fill()
        .map((elemento, indice) => {
          return campaign.methods.requests(indice).call();
        })
    );
    /*console.log(requests);*/
    return {
      address,
      requests,
      approversCount,
      requestCount
    }; 
  }

  renderRow() {
    return this.props.requests.map((request, indice) => {
      return (
        <RequestRow
          request={request}
          id={indice}
          key={indice}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Request List</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: "10px" }}>
              Add request
            </Button>
          </a>
        </Link>
        {/*<Table celled>*/}
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests</div>
      </Layout>
    );
  }
}

export default RequestIndex;
