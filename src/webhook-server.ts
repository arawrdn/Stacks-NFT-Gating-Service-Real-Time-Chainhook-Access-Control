import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/nft-access-hook', (req, res) => {
    
    const eventData = req.body;

    if (eventData && Array.isArray(eventData.chainhook_matches) && eventData.chainhook_matches.length > 0) {
        
        const stacksEvents = eventData.chainhook_matches[0].stacks_events;
        
        if (stacksEvents && stacksEvents.length > 0) {
            const stacksEvent = stacksEvents[0];
            
            console.log(`NFT Access Change Detected: Tx ID ${stacksEvent.tx_id}`);
            console.log(`Source Contract: ${stacksEvent.contract_id}`);
            
            // Logic for access gating execution goes here:
            // 1. Decode event data to identify the old and new owner principals.
            // 2. Make API calls to grant access to new_owner (e.g., Discord role, database flag).
            // 3. Make API calls to revoke access from old_owner.
            console.log('--- Access Gating Logic Triggered Successfully ---');
            
        } 
    }
    
    res.status(200).send('Event processed.');
});

app.listen(PORT, () => {
    console.log(`Webhook Server listening on http://localhost:${PORT}`);
});
