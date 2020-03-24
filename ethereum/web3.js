import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
  console.log("metamask1")
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    // 'https://rinkeby.infura.io/v3/ds7803cf20fc44f34885cf74a24f4b20c'
    "https://rinkeby.infura.io/v3/63fd9c18d25f4d2f9fc0bab3eb13c1f5"
    
  );
  console.log("infura")  
  console.log(typeof window)
  // console.log(typeof window.web3)

  web3 = new Web3(provider);
}

export default web3;