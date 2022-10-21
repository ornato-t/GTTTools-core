import { Station } from './dist/index.js'
import { Route } from './dist/index.js'

const myStation = new Station();

myStation.poll(40, 1000);   //Poll station 28 (Porta Nuova) every 1000 milliseconds
myStation.on('refresh', passageData => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(passageData);
    /*  Your code here  */
});

setTimeout(() => myStation.stop(), 20000);  //Stop the polling after 20 seconds



const myRoute = new Route();

myRoute.poll('4', 1000);  //Poll route 4 every 1000 milliseconds
myRoute.on('refresh', vehicleData => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(vehicleData);
    /*  Your code here  */
});

setTimeout(() => myVehicle.stop(), 20000);  //Stop the polling after 20 seconds
