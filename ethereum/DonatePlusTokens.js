import web3 from "./web3";
import DonatePlusTokens from "./build/DonatePlusTokens.json";

export default () => {
  return new web3.eth.Contract(JSON.parse(DonatePlusTokens.interface),"0xACF4F85B92DE48Bed4f6062a8393711839e602A4");
  
};
