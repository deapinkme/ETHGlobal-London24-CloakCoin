import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.PHOSPHOR_API_KEY || ""; // Ensure that the apiKey is defined

interface Headers {
  [key: string]: string;
}

const headers: Headers = {
  "Content-Type": "application/json",
  "Phosphor-Api-Key": apiKey,
};

/**
 * Mint NFT
 *
 * @param {string} collectionId - The collection ID
 * @param {string} ipfs_url - The IPFS URL
 *
 * @returns {string} item_id - The item ID
 */
async function mintNFT(
  collectionId: string,
  description: string,
  date: string,
  game_winner: string,
  ipfs_url: string
): Promise<string> {
  const apiUrl: string = "https://admin-api.phosphor.xyz/v1/items";
  const mint_nft: string = `
  {
    "collection_id": "${collectionId}",
    "attributes": {
        "title": "My Biggest Fan NFT",
        "description": "${description}",
        "any trait 1": "${date}",
        "any trait 2": "${game_winner}",
        "image_url": "${ipfs_url}"
    }
  }
  `;
  try {
    const response = await axios.post(apiUrl, mint_nft, { headers });
    console.log("API Response:", response.data);
    return response.data.id;
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
}

/**
 * Lock NFT
 *
 * @param {string} item_id - The item ID
 */
async function lockNFT(item_id: string): Promise<void> {
  const apiUrl: string = "https://admin-api.phosphor.xyz/v1/items/lock";
  const lock_nft: string = `{
    "item_id": "${item_id}"
  }`;

  try {
    const response = await axios.post(apiUrl, lock_nft, { headers });
    console.log("API Response:", response.data);
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
}

async function airdropNFT(
  item_id: string,
  recipient_address: string
): Promise<void> {
  /**
   * Airdrop NFT
   *
   * @param {string} item_id - The item ID
   * @param {string} recipient_address - The recipient address
   *
   * @returns {string} transactionId - The transaction ID
   */
  const apiUrl: string = "https://admin-api.phosphor.xyz/v1/transactions";
  const airdrop_nft: string = `
  {
    "item_id": "${item_id}",
    "recipient_address": "${recipient_address}"
  }
  `;
  try {
    const response = await axios.post(apiUrl, airdrop_nft, { headers });
    console.log("API Response:", response.data);
  } catch (error: any) {
    console.error("API Error:", error.message);
    throw error;
  }
}

export { mintNFT, lockNFT, airdropNFT };
