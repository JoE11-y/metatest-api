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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "depositAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "Sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "Amount",
        type: "uint256",
      },
    ],
    name: "Sent",
    type: "event",
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
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
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
