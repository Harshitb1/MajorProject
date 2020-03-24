import web3 from './web3'; 
import CampaignFactory from './build/CampaignFactory.json';


const instance =  new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x3A46fB250eB9F809E81618aa4817BC3444f05185'
  // '0x902D8AF22b945BAEdE9cE6Ab2A755f106739D9A2'
  // '0xACF4F85B92DE48Bed4f6062a8393711839e602A4'
  // '0x3eB9e7b9A0B311A33de7F7320bbBC0eD23597F70'
  // '0x52451534EDD8B336810798F527cF84326303C526'
  // '0x04162e9F0479ec6d4E92698a3cc9390B33d3aB03'
  // '0xB57D6A740151a4A22ce162B115aAaDaB415c38d9'
  // '0x3794C29868a00F665Acef568c08aff9900C8df4C'
);

export default instance;
