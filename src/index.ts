import { pollVehicles } from "./vehicles.js";
import { pollStations } from "./stations.js";

const bus = await pollVehicles('10');
const stat = await pollStations(28);

bus.forEach(el => {
    console.log(el)
});

stat.forEach(el => {
    console.log(el)
});
