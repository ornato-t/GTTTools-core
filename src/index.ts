import { EventEmitter } from 'events';

import { pollRoute, vehicle } from "./routes.js";
import { pollStations, passage } from "./stations.js";

const waitFor = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));   //Promise based setTimeout wrapper [ms]

let routesLoop: boolean;
export class Route extends EventEmitter {
    //Polls the GTT API every INTERVAL number of milliseconds, for the given ROUTE
    async poll(route: string, interval: number) {
        routesLoop = true;
        while (routesLoop) {
            await waitFor(interval);
            const data = await pollRoute(route)
            this.emit('refresh', data, route);
        }
    }

    //Stops the poll
    stop() {
        routesLoop = false;
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
            const data = await pollStations(station)
            this.emit('refresh', data, station);
        }
    }

    //Stops the poll
    stop() {
        stationsLoop = false;
    }
}
