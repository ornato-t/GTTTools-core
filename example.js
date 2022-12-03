import { Stop } from './dist/index.js'
import { Route } from './dist/index.js'

const myStop = new Stop();

myStop.poll(40, 1000);   //Poll stop 28 (Porta Nuova) every 1000 milliseconds
myStop.on('refresh', (passageData, stop) => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(`Data on stop ${stop}`)
    console.log(passageData);
    /*  Your code here  */
});

myStop.stop();  //Stop the polling



const myRoute = new Route();

myRoute.poll('4', 1000);  //Poll route 4 every 1000 milliseconds
myRoute.on('refresh', (vehicleData, route) => {    //Every 1000 milliseconds a "refresh" emitter is raised. Whever that happens, execute the callback
    console.log(`Data on route ${route}`)
    console.log(vehicleData);
    /*  Your code here  */
});

myRoute.stop();  //Stop the polling
