import { NFTStorage, File } from "nft.storage";
import { STORAGE_KEY } from "../constants";

const apiKey = STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

// https://nft.storage/#getting-started
export const storeNFT = async (nftName, description, imageFile) => {
  const metadata = await client.store({
    name: nftName, // "Pinpie",
    description, // "Pin is not delicious beef!",
    image: imageFile,
    //   image: new File(
    //     [
    //       /* data */
    //     ],
    //     "pinpie.jpg",
    //     { type: "image/jpg" },
    //   ),
  });
  console.log(metadata.url);
  return metadata
};
