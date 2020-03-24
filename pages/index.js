import React, { Component } from "react";
import factory from "../ethereum/factory.js";
import DPTokenBalance from "../components/DPTokenBalance";
import {
  Card,
  Button
} from "semantic-ui-react"; /*https://react.semantic-ui.com/views/card#types-group-props*/
/*https://react.semantic-ui.com/elements/button#types-labeled-icon-shorthand*/
/*import 'semantic-ui-css/semantic.min.css';*/
import Layout from "../components/Layout.js";
import { Link } from "../routes.js";
import campaign from "../ethereum/campaign.js";

class CampaignIndex extends Component {

  static async getInitialProps() {
   
    const campaigns = await factory.methods
      .getDeployedCampaigns()
      .call(); 
    //return {campaigns : campaigns}
    return { campaigns };
    //console.log(campaigns);
  }

  renderCampaigns = () => {

    // const campaign = await Campaign(props.query.address);
    // var n=campaign.name;
    // var i=0;
    const items = this.props.campaigns.map(address => {
      //  var n = campaigns[i];
      //  i++;
      // var n = this.name;

      // console.log(n);
      return {
        header: address,
        meta: "",
        image: "https://www.w3schools.com/howto/img_avatar.png",
        style : {
                      overflowWrap : "Break-word",
                      width :"30%",
                      height : "20%",
                   },
        // image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGTVf63Vm3XgOncMVSOy0-jSxdMT8KVJIc8WiWaevuWiPGe0Pm",
        description:(
          <Link route = {`/campaigns/${address}`}>
          <a><font color ="brown">View campaign</font></a>
          </Link> ), 
        fluid: true 
      };
    });

    return (
      <Card.Group items={items} />
    );

    // return(
    //   <Card>
    //   <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
    //   <Card.Content>
    //     <Card.Header>Matthew</Card.Header>
    //     <Card.Meta>
    //       <span className='date'>Joined in 2015</span>
    //     </Card.Meta>
    //     <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <a>
    //       <Icon name='user' />
    //       22 Friends
    //     </a>
    //   </Card.Content>
    // </Card>
    // )
  };

  
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
         
          <Link route="/campaigns/new">
            <a>
              {" "}
              
              <Button
                content="Create Campaign"
                icon="add circle"
                labelPosition="left"
                floated="right"
                inverted color ='black'
                primary
              />
              
            </a>
          </Link>
         
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
