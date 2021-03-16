const assert = require("assert");
const ganache = require("ganache-core");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const contractInterface = require("./../compile");

let accounts, inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of the contracts to deploy contract
  inbox = await new web3.eth.Contract(contractInterface.abi)
    .deploy({
      data: contractInterface.evm.bytecode.object,
      arguments: ["Nandan Pandey"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("deployes a contract", () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Nandan Pandey");
  });

  it("can change the default message", async () => {
    await inbox.methods
      .setMessage("Anjali Jaiswal")
      .send({ from: accounts[0] });

    const message = await inbox.methods.message().call();
    assert.strictEqual(message, "Anjali Jaiswal");
  });
});
