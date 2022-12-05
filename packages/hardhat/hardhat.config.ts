import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import dotenv from "dotenv";

dotenv.config();

const polygonMumbaiUrl = "https://polygon-mumbai.g.alchemy.com/v2/E0obo9iM1x_92GbGIKj4ZY0i96aFne9M";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    // mumbai: {
    //   url: polygonMumbaiUrl,
    //   accounts: [process.env.PRIVATE_KEY!],
    // },
    hardhat: {
      forking: {
        url: polygonMumbaiUrl,
      },
    },
  },
};

export default config;
