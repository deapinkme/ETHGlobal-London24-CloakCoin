import { fetchQuery, init } from "@airstack/node";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.AIRSTACK_API_KEY || "";

init(apiKey);

interface Follower {
  userId: string;
  profileName: string;
  address: string;
  since: string;
}

interface Friend {
  userId: string;
  profileName: string;
  address: string;
  since: string;
}

/**
 * @param {string} identity - "fc_fname:us", "0x...", "us.eth"
 *
 * @returns {Promise<Follower[]>} fansList - Followers data
 *
 */
async function fetchFollowers(identity: string): Promise<Follower[]> {
  try {
    const follower_query = `{
        SocialFollowers(
          input: { filter: { identity: { _eq: "${identity}" }}, blockchain: ALL }
        ) {
          Follower {
            followerSince
            followerAddress {
              addresses
              domains {
                name
              }
              socials {
                profileName
                userId
              }
            }
          }
        }
      }
    `;

    const { data, error } = await fetchQuery(follower_query);

    if (error) {
      console.error("Error from fetchQuery:", error);
      throw error;
    }

    const fansList: Follower[] = [];
    const followers = data.SocialFollowers.Follower;

    followers.forEach(
      (follower: {
        followerAddress: {
          socials: { userId: string; profileName: string }[];
          addresses: string[];
        };
        followerSince: string;
      }) => {
        const userId = follower.followerAddress.socials[0].userId;
        const profileName = follower.followerAddress.socials[0].profileName;
        const address = follower.followerAddress.addresses[0];
        const since = follower.followerSince;

        const fan: Follower = {
          userId: userId,
          profileName: profileName,
          address: address,
          since: since,
        };

        fansList.push(fan);
      }
    );

    console.log(fansList);
    return fansList;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { fetchFollowers };
