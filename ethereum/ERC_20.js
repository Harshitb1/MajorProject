import web3 from "./web3";
import ERC_20 from "./build/ERC_20.json";

export default () => {
  return new web3.eth.Contract(JSON.parse(ERC_20.interface), address);
  
};
