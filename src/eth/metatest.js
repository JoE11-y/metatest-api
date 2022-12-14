import { ethers } from "ethers";
import { metatest as address } from "../deploy.json";

const abi = [
  {
    inputs: [
      {
        internalType: "contract MinimalForwarder",
        name: "forwarder",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_depositAddress",
        type: "address",
      },
    ],
    name: "tf",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export function createInstance(provider) {
  return new ethers.Contract(address, abi, provider);
}
