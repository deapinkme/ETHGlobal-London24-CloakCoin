import React, { useState } from "react";
import { useWalletClient } from "wagmi";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {
  DynamicWidget,
  GearIcon,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { createPublicClient, createWalletClient, getContract } from "viem";
import { contractBytecode } from "../app/contract/code";
import { contractAbi } from "../app/contract/abi";

const Home: NextPage = () => {
  const { data } = useWalletClient();
  const { walletConnector } = useDynamicContext();

  console.log(data);
  console.log(walletConnector);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [cardCount, setCardCount] = useState(1);
  const gameContractAddress = "0x67CD4a1C23B16f32B06a0CAc706b5d57199eAC0A";

  // Function to be passed to GameTable component to handle game start
  const handleGameStart = () => {
    if (walletConnector?.supportsNetworkSwitching()) {
      console.log("We're switching networks mate lfg");
    }
    setIsGameStarted(true);
  };

  const mintNewCoins = async (amount: number) => {
    console.log("WE'RE IN HERE LADS");
    if (walletConnector?.supportsNetworkSwitching()) {
      console.log("We're switching networks mate lfg");
      walletConnector
        .switchNetwork({ networkChainId: 42069 })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => console.log(e));
    }
    setCardCount((prevCount) => prevCount + 1);
    const contract = await getConfiguredContract();
    if (contract) {
      const hash = await contract.write.mintEncrypted();
    }
  };

  const burnCoins = async (amount: number) => {
    console.log("WE'RE IN HERE LADS");
    if (walletConnector?.supportsNetworkSwitching()) {
      console.log("We're switching networks mate lfg");
      walletConnector
        .switchNetwork({ networkChainId: 42069 })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => console.log(e));
    }
    setCardCount((prevCount) => prevCount + 1);
    const contract = await getConfiguredContract();
    if (contract) {
      const hash = await contract.write.burnCoins(amount);
    }
  };

  const deployCloakCoinContract = async () => {
    const [account] = (await data?.getAddresses()) || [];
    if (account) {
      const hash = await data?.deployContract({
        abi: contractAbi,
        account,
        args: ["CloakedAndrea", "CDEA"],
        bytecode: contractBytecode,
      });
    }
  };

  const doDeploy = () => {
    console.log("Doing the thing...");
    deployCloakCoinContract()
      .then((r) => {
        console.log("Right then...", r);
      })
      .catch((e) => {
        console.log("So close...", e);
      });
  };

  const getConfiguredContract = async () => {
    if (!walletConnector || !data) {
      return;
    }
    const publicClient = await walletConnector.getPublicClient();
    const contract = getContract({
      address: "0x4623622C1aE05DBa618a988CDEA64a0f02C6c187",
      abi: contractAbi,
      client: {
        wallet: data,
        public: publicClient,
      },
    });
    return contract;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Cloak Coin</title>
        <link href="/CloakCoin.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/CloakCoinLogo.png"
          alt="Main Logo"
          width={300}
          height={100}
        />
        <div>
          <DynamicWidget />
        </div>

        <Button
          variant="contained"
          sx={{ width: "200px", marginTop: "80px" }}
          color="primary"
          endIcon={<FavoriteIcon />}
          onClick={() =>
            mintNewCoins(1).then((r) => {
              console.log("mint response", r);
            })
          }
          className={styles.centerButton}
        >
          Mint Cloak Coin
        </Button>

        <Button
          variant="contained"
          sx={{ width: "200px", marginTop: "20px" }}
          color="secondary"
          endIcon={<DeleteIcon />}
          onClick={() =>
            burnCoins(1).then((r) => {
              console.log("burn response", r);
            })
          }
          className={styles.centerButton}
        >
          Burn Cloak Coin
        </Button>
      </main>
    </div>
  );
};

export default Home;