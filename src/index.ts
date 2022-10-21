import { EventEmitter } from 'events';

import { pollVehicles } from "./vehicles.js";
import { pollStations } from "./stations.js";

const waitFor = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));   //Promise based setTimeout wrapper [ms]

let vehcilesLoop: boolean;
export class Vehicle extends EventEmitter {
    //Polls the GTT API every INTERVAL number of milliseconds, for the given LINE
    async poll(line: string, interval: number) {
        vehcilesLoop = true;
        while (vehcilesLoop) {
            await waitFor(interval);
            this.emit('refresh', await pollVehicles(line));
        }
    }

    //Stops the poll
    stop() {
        vehcilesLoop = false;
    }
}

let stationsLoop: boolean;
export class Station extends EventEmitter {
    constructor() { super() }

    //Polls the GTT API every INTERVAL number of milliseconds, for the given STATION
    async poll(station: number, interval: number) {
        stationsLoop = true;
        while (stationsLoop) {
            await waitFor(interval);
            this.emit('refresh', await pollStations(station));
        }
    }

    //Stops the poll
    stop() {
        stationsLoop = false;
    }
}
