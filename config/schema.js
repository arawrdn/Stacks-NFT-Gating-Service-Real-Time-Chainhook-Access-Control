import Joi from "joi";

export const configSchema = Joi.object({
  chainhook: Joi.object({
    url: Joi.string().uri().required(),
    network: Joi.string().valid("mainnet", "testnet").required()
  }),
  nft: Joi.object({
    contractAddress: Joi.string().required(),
    collectionName: Joi.string().required()
  }),
  access: Joi.object({
    allowedRole: Joi.string().required(),
    mode: Joi.string().valid("token-gated", "open").default("token-gated")
  }),
  monitor: Joi.object({
    pollInterval: Joi.number().min(5).default(10),
    outputMode: Joi.string().valid("console", "webhook").default("console")
  }),
  alert: Joi.object({
    webhook: Joi.string().allow(""),
    failureAlert: Joi.string().allow("")
  })
});
