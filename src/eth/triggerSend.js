import { ethers } from "ethers";
import { createInstance } from "./forwarder";
import { signMetaTxRequest } from "./signer";

async function sendMetaTx(metaTest, provider, signer, depositAddress, value) {
  console.log(`Sending funds meta-tx to address=${depositAddress}`);
  const url = process.env.REACT_APP_WEBHOOK_URL;
  if (!url) throw new Error(`Missing relayer url`);

  const forwarder = createInstance(provider);
  const from = await signer.getAddress();
  const data = metaTest.interface.encodeFunctionData("tf", [depositAddress]);
  const to = metaTest.address;

  const request = await signMetaTxRequest(signer.provider, forwarder, {
    to,
    from,
    data,
    value,
  });

  return fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  });
}

export async function triggerSend(metaTest, provider, depositAddress) {
  if (!depositAddress) throw new Error(`address cannot be empty`);
  if (!window.ethereum) throw new Error(`User wallet not found`);
  if (!ethers.utils.isAddress(depositAddress))
    throw new Error(`Invalid address`);
  await window.ethereum.enable();
  const userProvider = new ethers.providers.Web3Provider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();
  if (userNetwork.chainId !== 5)
    throw new Error(`Please switch to Goerli for signing`);

  console.log(userNetwork);

  const signer = userProvider.getSigner();
  const from = await signer.getAddress();
  const balance = await provider.getBalance(from);

  const value = ethers.utils.parseEther("0.1");

  const hasMoney = balance.gt(value);

  console.log(value.toString());

  if (hasMoney)
    return sendMetaTx(
      metaTest,
      provider,
      signer,
      depositAddress,
      value.toString()
    );
  else console.log("Wallet is empty");
}
