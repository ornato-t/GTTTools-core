import { pollVehicles } from "./vehicles.js";
import { pollStations } from "./stations.js";

const vehicles = await pollVehicles('10N');
const stat = await pollStations(28);

// for(const line of stat){
//     console.log(line);
// }

for(const bus of vehicles){
    console.log(bus);
}
