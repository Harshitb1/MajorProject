const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'drip nasty agent student morning sell cigar evoke square chalk insane laundry',
    "https://rinkeby.infura.io/v3/2a5519926d044f2384a29537fd1ed9a9"
    // "https://rinkeby.infura.io/v3/bdf4b57825d546cb8a8d92d316d92693"
    // 'https://rinkeby.infura.io/v3/d7803cf20fc44f34885cf74a24f4b20c'
    // "novel feature stomach expand believe empty song rabbit royal cram judge wash",
    // "https://rinkeby.infura.io/v3/3cf83b73bf7a4ab29a3f6676c821167c"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: '0x'+ compiledFactory.bytecode,
    })
    .send({ from: accounts[0], gas: '6000000' })

  console.log('Contract deployed to', result.options.address); // Contract Address
};

// https://rinkeby.etherscan.io/
deploy();