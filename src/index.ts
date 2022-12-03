import { EventEmitter } from 'events';

import { pollRoute, vehicle } from "./routes.js";
import { pollStop, passage } from "./stops.js";

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

let stopsLoop: boolean;
export class Stop extends EventEmitter {
    constructor() { super() }

    //Polls the GTT API every INTERVAL number of milliseconds, for the given STOP
    async poll(stop: number, interval: number) {
        stopsLoop = true;
        while (stopsLoop) {
            await waitFor(interval);
            const data = await pollStop(stop)
            this.emit('refresh', data, stop);
        }
    }

    //Stops the poll
    stop() {
        stopsLoop = false;
    }
}
