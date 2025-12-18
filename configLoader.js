import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { configSchema } from "./config/schema.js";

dotenv.config();

const env = process.env.NODE_ENV || "development";
const configPath = path.resolve(`src/config/${env}.json`);
const fileConfig = fs.existsSync(configPath)
  ? JSON.parse(fs.readFileSync(configPath, "utf8"))
  : {};

const mergedConfig = {
  ...fileConfig,
  chainhook: {
    url: process.env.CHAINHOOK_URL || fileConfig.chainhook?.url,
    network: process.env.CHAINHOOK_NETWORK || fileConfig.chainhook?.network
  },
  nft: {
    contractAddress: process.env.NFT_CONTRACT_ADDRESS || fileConfig.nft?.contractAddress,
    collectionName: process.env.NFT_COLLECTION_NAME || fileConfig.nft?.collectionName
  },
  access: {
    allowedRole: process.env.ALLOWED_ROLE || fileConfig.access?.allowedRole,
    mode: process.env.ACCESS_MODE || fileConfig.access?.mode
  },
  monitor: {
    pollInterval: Number(process.env.POLL_INTERVAL) || fileConfig.monitor?.pollInterval,
    outputMode: process.env.OUTPUT_MODE || fileConfig.monitor?.outputMode
  },
  alert: {
    webhook: process.env.WEBHOOK_URL || fileConfig.alert?.webhook,
    failureAlert: process.env.FAILURE_ALERT_URL || fileConfig.alert?.failureAlert
  }
};

const { value, error } = configSchema.validate(mergedConfig);
if (error) throw new Error(`❌ Config error: ${error.message}`);

export default value;
