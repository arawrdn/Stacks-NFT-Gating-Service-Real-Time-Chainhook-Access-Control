import { ChainhookClient, Blockchains, Networks, StacksChainhook } from '@hirosystems/chainhooks-client';

const CONTRACT_ADDRESS = 'ST1PQHQKV0RJQDZGR7Y12K8SHTGYQYJPQ55N1082D.nft-access'; 
const CHAINHOOK_API_URL = 'http://localhost:8000'; 
const WEBHOOK_URL = 'http://localhost:3000/api/nft-access-hook'; 

const nftAccessPredicate: StacksChainhook = {
    chain: Blockchains.Stacks,
    network: Networks.Testnet,
    name: 'nft-access-change-hook',
    version: 1,
    webhook: {
        url: WEBHOOK_URL,
        authorization: 'Bearer YOUR_SECRET_TOKEN',
    },
    trigger: {
        start_block: 100000, 
        
        events: [
            {
                contract_id: CONTRACT_ADDRESS,
                topic: 'print',
            }
        ],
    },
};

async function registerChainhook() {
    try {
        const client = new ChainhookClient(CHAINHOOK_API_URL);

        await client.deleteChainhook(nftAccessPredicate.name).catch(() => {});

        const response = await client.registerChainhook(nftAccessPredicate);
        
        console.log('Chainhook Registration Successful!');
        console.log(`Hook Name: ${nftAccessPredicate.name}`);
        console.log(`Monitoring: ${CONTRACT_ADDRESS}`);
        console.log(`Webhook Target: ${WEBHOOK_URL}`);
        
    } catch (error) {
        console.error('Error during Chainhook registration:', error);
    }
}

registerChainhook();
