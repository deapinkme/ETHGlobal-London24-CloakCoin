export const abi = [
  {
    name: "saveAddress",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ internalType: "address", name: "_newAddress", type: "address" }],
    outputs: [],
  },
] as const;
