import { Station } from './dist/index.js'
import { Vehicle } from './dist/index.js'

const myStation = new Station();

myStation.poll(40, 1000);   //Poll station 28 (Porta Nuova) every 1000 milliseconds
myStation.on('refresh', stationData => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(stationData);
    /*  Your code here  */
});

setTimeout(() => myStation.stop(), 20000);  //Stop the polling after 20 seconds



const myVehicle = new Vehicle();

myVehicle.poll('4', 1000);  //Poll line 4 every 1000 milliseconds
myVehicle.on('refresh', vehicleData => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(vehicleData);
    /*  Your code here  */
});

setTimeout(() => myVehicle.stop(), 20000);  //Stop the polling after 20 seconds
