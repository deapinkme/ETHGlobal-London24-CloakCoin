import * as React from "react";
import { useChainId, useReadContract } from "wagmi";

const savedAddressABI = [
  {
    name: "savedAddress",
    inputs: [],
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

interface GetWinnerProps {
  contractAddress: string;
}

export function GetWinner({ contractAddress }: GetWinnerProps) {
  const activeChain = useChainId();

  const {
    data: savedAddress,
    error,
    isLoading,
  } = useReadContract({
    abi: savedAddressABI,
    address: `0x${contractAddress}`, // '0x' to string
    functionName: "savedAddress",
    chainId: activeChain, // active chain ID
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <div>{savedAddress as React.ReactNode}</div>
  );
}
