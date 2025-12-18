import config from "./configLoader.js";
import { startMonitor } from "./monitor.js";

console.log("🔗 Loaded configuration:");
console.log(JSON.stringify(config, null, 2));

startMonitor(config);
