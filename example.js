import { Station } from './dist/index.js'
import { Route } from './dist/index.js'

const myStation = new Station();

myStation.poll(40, 1000);   //Poll station 28 (Porta Nuova) every 1000 milliseconds
myStation.on('refresh', (passageData, station) => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(`Data on station ${station}`)
    console.log(passageData);
    /*  Your code here  */
});

myStation.stop();  //Stop the polling



const myRoute = new Route();

myRoute.poll('4', 1000);  //Poll route 4 every 1000 milliseconds
myRoute.on('refresh', (vehicleData, route) => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(`Data on route ${route}`)
    console.log(vehicleData);
    /*  Your code here  */
});

myRoute.stop();  //Stop the polling
