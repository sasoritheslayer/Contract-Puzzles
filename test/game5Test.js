const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    const threshold = 0x00ffffffffffffffffffffffffffffffffffffff;
    return { game, threshold };
  }
  it("should be a winner", async function () {
    const { game, threshold } = await loadFixture(
      deployContractAndSetVariables
    );
    let validAddress = false;
    let wallet;
    let address;
    while (!validAddress) {
      wallet = new ethers.Wallet.createRandom();
      address = await wallet.getAddress();
      if (address < threshold) validAddress = true;
    }
    wallet = wallet.connect(ethers.provider);
    const signer = ethers.provider.getSigner(0);

    // send some ether(needed for gas fees on the upcoming function call)
    await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("1000"),
    });
    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
