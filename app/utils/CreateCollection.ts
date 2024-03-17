import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load from .env.local

const apiKey: string = process.env.PHOSPHOR_API_KEY || "";

const headers = {
  "Content-Type": "application/json",
  "Phosphor-Api-Key": apiKey,
};

interface CreateFriendshipCollectionResponse {
  collectionId: string;
  transactionId: string;
}

/**
 * Create and deploy a creator friendship contract
 *
 * @param {string} creatorname - The name of the creator
 * @param {string} description - The description of the NFT
 * @param {string} png - The image of the NFT
 * @param {string} Network_ID - The network ID
 * @param {string} nftsymbol - The NFT symbol
 * @param {string} nftowneraddress - The NFT owner address
 * @returns {Promise<CreateFriendshipCollectionResponse>} - The collection ID and transaction ID
 */
export async function creatorContract(
  creatorname: string,
  description: string,
  png: string,
  Network_ID: string,
  nftsymbol: string,
  nftowneraddress: string
): Promise<CreateFriendshipCollectionResponse | undefined> {
  const apiUrl = "https://admin-api.phosphor.xyz/v1/collections";
  const createFriendshipCollection = {
    name: `Friendship NFT Collection - ${creatorname}`,
    description: description,
    media: {
      thumbnail_image_url: png,
    },
    editable_metadata: true,
    deployment_request: {
      network_id: Number(Network_ID),
      type: "PLATFORM",
      token_id_assignment_strategy: "AUTOMATIC",
      platform: {
        variant: "FlexibleERC721",
        symbol: nftsymbol,
        owner: nftowneraddress,
      },
    },
  };

  try {
    const response: AxiosResponse = await axios.post(
      apiUrl,
      createFriendshipCollection,
      { headers }
    );

    return {
      collectionId: response.data.id,
      transactionId: response.data.deployment.transaction_id,
    };
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
}

/**
 * Check collection details, deployment, and return creation transaction
 *
 * @param {string} collectionId - The collection ID
 * @param {string} transactionId - The transaction ID
 * @returns {Promise<any>} - Details of the collection, deployment, and creation transaction
 */
export async function checkDeployment(
  collectionId: string,
  transactionId: string
): Promise<any | undefined> {
  try {
    const collectionDetailsUrl = `https://admin-api.phosphor.xyz/v1/collections/${collectionId}`;
    const collectionDetailsResponse = await axios.get(collectionDetailsUrl, {
      headers,
    });

    console.log("Collection Details:", collectionDetailsResponse.data);

    const deploymentUrl = `https://admin-api.phosphor.xyz/v1/collections/${collectionId}/deployment-request`;
    const deploymentResponse = await axios.get(deploymentUrl, { headers });

    console.log("Deployment:", deploymentResponse.data);

    const creationTxUrl = `https://admin-api.phosphor.xyz/v1/transactions/${transactionId}`;
    const creationTxResponse = await axios.get(creationTxUrl, { headers });

    console.log("Creation Transaction:", creationTxResponse.data);

    return creationTxResponse.data;
  } catch (error: any) {
    console.error("API Error:", error.message);
  }
}
