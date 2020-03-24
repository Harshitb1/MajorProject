import React from "react";
import Header from "./Header.js";
import { Container } from "semantic-ui-react";
import Head from "next/head"; 

export default props => {
 var Background = "http://wrbbradio.org/wp-content/uploads/2016/10/grey-background-for-site11.jpg";
 var style={
   backgroundImage: "url(" + Background + ")",
   width:"100%",
   height: "850px",
   margin: "0 0",
   backgroundRepeat: "no-repeat"};
 
  return (
    <section style={style}>
    <Container >
      <Head>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
    </section>
  );
};
