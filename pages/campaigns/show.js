// import React, { Component } from "react";
// import Layout from "../../components/Layout";
// import factory from "../../ethereum/factory.js";
// import Campaign from "../../ethereum/campaign.js";
// import { Card, Grid, Button } from "semantic-ui-react";
// import web3 from "../../ethereum/web3";
// import ContributeForm from "../../components/ContributeForm";
// import { Link } from "../../routes.js";

// class CampaignShow extends Component {
//   static async getInitialProps(props) {
   
//     const campaign = await Campaign(props.query.address);
//     const summary = await campaign.methods.getSummary().call();
   
//     return {
//       address: props.query.address,
//       minimumContribution: summary[0],
//       balance: summary[1],
//       requestsCount: summary[2],
//       approversCount: summary[3],
//       manager: summary[4]
//     };
//   }
 
//   renderCards() {
//     const {
//       minimumContribution,
//       balance,
//       requestsCount,
//       approversCount,
//       manager
//     } = this.props;

//     const items = [
//       {
//         header: manager,
//         description:
//           "The manager created this campaign and can create requests to withdraw money",
//         meta: "Address of manager",
//         style: {
//           overflowWrap: "break-word"
//         }
//       },
//       {
//         header: minimumContribution,
//         description: "Minimum Contribution(wei)",
//         meta:
//           "You must contribute at least this much wei to become an approver",
//         style: {
//           overflowWrap: "break-word"
//         }
//       },
//       {
//         header: requestsCount,
//         description:
//           "A request tries to withdraw money from the contract. Request must be approved by approvers",
//         meta: "Number of requests",
//         style: {
//           overflowWrap: "break-word"
//         } 
//       },
//       {
//         header: approversCount,
//         description:
//           "Number of people  who have already donated to this campaign",
//         meta: "Number of approvers",
//         style: {
//           overflowWrap: "break-word"
//         } 
//       },
//       {
//         header: web3.utils.fromWei(balance, "ether"),
//         description:
//           "The balance is how much money  this campaign  has left  to spend.",
//         meta: "Campaign balance (ether)",
//         style: {
//           overflowWrap: "break-word"
//         } 
//       }
//     ];

//     return <Card.Group items={items} />;
//   }

//   render() {
//     return (
//       <Layout>
//         <h3>Show Campaign</h3>
//         <Grid>
//           <Grid.Row>
//             <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
//             <Grid.Column width={6}>
//               <ContributeForm address={this.props.address} />
//             </Grid.Column>
//           </Grid.Row>

//           <Grid.Row> 
//             <Grid.Column> 
//               <Link route={`/campaigns/${this.props.address}/requests`}>
//                 <a>
//                   <Button primary>View Requests</Button>
//                 </a>
//               </Link>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//       </Layout>
//     );
//   }
// }

// export default CampaignShow;

import React, { Component } from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory.js";
import Campaign from "../../ethereum/campaign.js";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes.js";
import BalanceForm from "../../components/BalanceForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
   
    const campaign = await Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
   
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      name: summary[5]
    };
  }
 
  renderCards() {
    const {
      minimumContribution,
      balance,
      name,
      requestsCount,
      approversCount,
      manager
    } = this.props;

    const items = [

       {
        header: "",
        image: "https://byuc.files.wordpress.com/2012/07/avat-2.jpg",
        // description:
        //   "The manager created this campaign and can create requests to withdraw money",
        // meta: "Address of manager",
        style: {
          overflowWrap: "break-word",
          height: "90px",
          width: "90px"
        }
      },    
      {
        description: "Reason for need of Donation",
        header: name,
        meta: "Humanity With A Mission",
        style: {
          overflowWrap: "break-word"
        }
      },
      {
        header: manager,
        description:
          "The manager created this campaign and can create requests to withdraw money",
        meta: "Address of manager",
        style: {
          overflowWrap: "break-word"
        }
      },
      {
        header: minimumContribution,
        description: "Minimum Contribution(DPTokens)",
        meta:
          "You must contribute at least this much DPTokens to become an approver",
        style: {
          overflowWrap: "break-word"
        }
      },
      {
        header: requestsCount,
        description:
          "A request tries to withdraw money from the contract. Request must be approved by approvers",
        meta: "Number of requests",
        style: {
          overflowWrap: "break-word"
        } 
      },
      {
        header: approversCount,
        description:
          "Number of people  who have already donated to this campaign",
        meta: "Number of approvers",
        style: {
          overflowWrap: "break-word"
        } 
      },
      {
        header: balance, //web3.utils.fromWei(balance, "ether"),
        description:
          "The balance is how much money  this campaign  has left  to spend.",
        meta: "Campaign balance (DPTokens)",
        style: {
          overflowWrap: "break-word"
        } 
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Show Campaign</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />

            </Grid.Column>

          </Grid.Row>

          <Grid.Row> 
            <Grid.Column> 
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;