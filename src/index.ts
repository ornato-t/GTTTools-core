import { EventEmitter } from 'events';

import { pollVehicles } from "./vehicles.js";
import { pollStations } from "./stations.js";

const waitFor = (delay:number) => new Promise(resolve => setTimeout(resolve, delay));

let vehcilesLoop = false;
//Emits a "refresh" event every time the data gets updated
export const vehicles = new EventEmitter();
//Polls the GTT API every INTERVAL number of milliseconds, for the given LINE
export async function getVehicles(line: string, interval: number) {
    vehcilesLoop = true;
    while(vehcilesLoop){
        await waitFor(interval);
        vehicles.emit('refresh', await pollVehicles(line));
    }
}
//Ends the polling
export function stopVehicles(){
    vehcilesLoop = false;
}

let stationsLoop = false;
//Emits a "refresh" event every time the data gets updated
export const stations = new EventEmitter();
//Polls the GTT API every INTERVAL number of milliseconds, for the given STATION
export async function getStation(station: number, interval: number) {
    stationsLoop = true;
    while(stationsLoop){
        await waitFor(interval);
        stations.emit('refresh', await pollStations(station));
    }
}
//Ends the polling
export function stopStation(){
    stationsLoop = false;
}