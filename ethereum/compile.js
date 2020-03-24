const path = require("path"); 
const solc = require("solc");

const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

fs.removeSync(buildPath);

var campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");

var source = fs.readFileSync(campaignPath, "utf-8");

var output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
 
  fs.outputJsonSync(
   
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[
      contract
    ] 
  );
}

 campaignPath = path.resolve(__dirname, "contracts", "ERC_20.sol");

 source = fs.readFileSync(campaignPath, "utf-8");

 output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
 
  fs.outputJsonSync(
   
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[
      contract
    ] 
  );
}

campaignPath = path.resolve(__dirname, "contracts", "DPToken.sol");

source = fs.readFileSync(campaignPath, "utf-8");

output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {

 fs.outputJsonSync(
  
   path.resolve(buildPath, contract.replace(":", "") + ".json"),
   output[
     contract
   ] 
 );
}

campaignPath = path.resolve(__dirname, "contracts", "Token.sol");

source = fs.readFileSync(campaignPath, "utf-8");

output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {

 fs.outputJsonSync(
  
   path.resolve(buildPath, contract.replace(":", "") + ".json"),
   output[
     contract
   ] 
 );
}



