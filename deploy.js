const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const contractInterface = require("./compile");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "shiver offer canal lion recall rifle wrist battle final truck supreme tongue",
  },
  providerOrUrl:
    "https://rinkeby.infura.io/v3/54823ca149b649dbbe8431209dabe585",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(contractInterface.abi)
    .deploy({
      data: contractInterface.evm.bytecode.object,
      arguments: ["Nandan Pandey"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });

  console.log("Address : ", inbox.options.address);
};

deploy();
