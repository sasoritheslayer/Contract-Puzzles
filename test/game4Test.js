const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    const signer = await ethers.provider.getSigner();

    return { game, signer };
  }
  it("should be a winner", async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.write(await signer.getAddress());

    await game.win(await signer.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
