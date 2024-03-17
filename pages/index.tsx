import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

{
  /* Funcs to use, directly or new component */
}

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [cardCount, setCardCount] = useState(1);
  const gameContractAddress = "0x67CD4a1C23B16f32B06a0CAc706b5d57199eAC0A";
  {
    /* add state variables */
  }

  // Function to be passed to GameTable component to handle game start
  const handleGameStart = () => {
    setIsGameStarted(true);
  };

  const addNewCard = () => {
    setCardCount((prevCount) => prevCount + 1);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title> Cloak Coin </title>
        <link href="/CloakCoin.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/CloakCoinLogo.png"
          alt="Main Logo"
          width={300}
          height={100}
        />
        <ConnectButton />

        <Button
          variant="contained"
          sx={{ width: "200px", marginTop: "20px" }}
          color="primary"
          endIcon={<FavoriteIcon />}
          onClick={addNewCard}
          className={styles.centerButton}
        >
          Mint Cloak Coin
        </Button>

        <Button
          variant="contained"
          sx={{ width: "200px", marginTop: "20px" }}
          color="primary"
          endIcon={<DeleteIcon />}
          onClick={addNewCard}
          className={styles.centerButton}
        >
          Burn Cloak Coin
        </Button>


        {isConnected && (
          <div className={styles.grid}>
            
            {Array.from({ length: cardCount - 1 }, (_, index) => (
              <a className={styles.card} key={index + 1}>
                <h2 style={{ marginBottom: "10px" }}>
                  Community Collection Deployed &rarr;
                </h2>

              </a>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ @ ETH Global London
        </a>
      </footer>
    </div>
  );
};

export default Home;
