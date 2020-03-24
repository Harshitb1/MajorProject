import React from "react";
import { Menu, Header,Image } from "semantic-ui-react";
import { Link } from "../routes.js"; 

export default () => {
  return (

    <div>
       <Header as='h2' block  style={{ marginTop: "10px" }}>
    <Image circular src='https://static.thenounproject.com/png/445105-200.png' /> Fund IN
  </Header>
    <Menu style={{ marginTop: "10px" }}>
      {/*<Menu.Item>CrowdCoin</Menu.Item>*/}
      <Link route="/">
        <a className="item">Fund-IN</a>
      </Link>
      
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
    </div>
  );
};

// import React from "react";


// import { Header, Image } from 'semantic-ui-react'
// import { Link } from "../routes.js"; 

// const HeaderExampleImage = () => (
//   <Header as='h2' block  style={{ marginTop: "10px" }}>
//     <Image circular src='https://static.thenounproject.com/png/445105-200.png' /> Fund IN
//   </Header>
  
// )

// export default HeaderExampleImage
