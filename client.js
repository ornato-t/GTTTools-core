import {vehicles, getVehicles, stopVehicles, getStation, stopStation, stations} from './dist/index.js'

getVehicles('10N', '1000');

vehicles.on('refresh', v => {
    console.log(v)
});

setTimeout(() => {stopVehicles()}, 10000)

getStation(28, 1000);

stations.on('refresh', v => {
    console.log(v)
});

setTimeout(() => {stopStation()}, 10000)