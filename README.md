# GTTTools-core
A new, decent and possibly working public transport tracker for the city of Turin, Italy.

# Core
This is the core package of the GTTTools application, a middleware meant for local or server side use, which provides a simplified interface for interacting with the GTT live public transportation API.

# The API
GTTTools-core fetches its data from the same endpoint used by the [GTT live tracker](https://www.gtt.to.it/cms/en/percorari/urbano) and many other services.  
Here's why you should use GTTTools-core instead of different solutions:
* **GTTTools-core is entirely available in English**, unlike the original data, which is partially written in Italian for seemingly no reason.
* **Requests made easy**. Just worry about your app's logic, GTTTools-core will handle HTTP requests, headers and parameters for you.
* **Simplified polling**. Enter your preferred polling interval to enjoy the fastest data available.
* **Easily accessible data**. GTTTools-core removes redundant data and improves typings on the response objects.

# Getting started
Download from [npm](https://www.npmjs.com/package/gtttools) using `npm i gtttools`.

# Usage examples
GTTTools-core provides two classes: `Station` and `Route`. 
## Station
The `Station` class represents a bus or tram stop. Each station is assigned a number, which the `Station.poll(...)` method takes as a parameter. 
```js
import { Station } from 'GTTTools'

const myStation = new Station();

myStation.poll(40, 1000);   //Poll station 40 (Porta Nuova) every 1000 milliseconds
myStation.on('refresh', passageData => {
    /*  Your code here  */
    console.log(passageData);
});

myStation.stop();  //Stop the polling 
```
This returns an array of lines, stating the programmed and real time arrival date of the bus or tram. The `lineID` property may be used as a parameter for the `Route` class.
```js
[  
  {
    line: '9',
    lineID: '9',
    direction: 'BARRIERA LANZO, PIAZZA STAMPALIA',
    realTime: [ 2022-10-21T20:07:00.000Z ],
    programmed: [ 2022-10-21T20:09:00.000Z, 2022-10-21T20:54:00.000Z ]
  },
  {
    line: '67',
    lineID: '67',
    direction: 'CITTADELLA, PIAZZA ARBARELLO',
    realTime: [ 2022-10-21T20:12:00.000Z ],
    programmed: [ 2022-10-21T20:16:00.000Z, 2022-10-21T20:46:00.000Z ]
  }
]
```
*Note: this endpoint takes several seconds to load because of a slow endpoint on the GTT API.*

## Route
The `Route` class represents a bus or tram route (line). Each route is assigned a code, which the `Route.poll(...)` method takes as a parameter. 
```js
import { Route } from 'GTTTools'

const myRoute = new Route();

myRoute.poll('4', 1000);  //Poll route 4 every 1000 milliseconds
myRoute.on('refresh', vehicleData => {    
    /*  Your code here  */
    console.log(vehicleData);
});

myVehicle.stop();  //Stop the polling
```
*Note: despite often being a number, the route code is a string because it can sometimes include letters inside of it. Examples of this are: 9N, 72B and M1S.*

This returns an array of vehicles, stating the latest available coordinates of the bus or tram. The `id` property may be used to identify the bus or tram model.
```js
[
  {
    id: 6017,
    vehicleType: 'Tram',
    lat: 45.06237,
    lon: 7.67727,
    direction: 166,
    updated: 2022-10-21T20:13:00.000Z
  },
  {
    id: 6027,
    vehicleType: 'Tram',
    lat: 45.08133,
    lon: 7.68663,
    direction: 24,
    updated: 2022-10-21T20:12:00.000Z
  }
]
```

# TypeScript
GTTTools-core is compatible with both JavaScript and TypeScript. TypeScript users may use the following interfaces to interact with the middleware:

`Station` class:
```ts
interface passage {
  line: string,
  lineID: string,
  direction: string,
  realTime: Date[],
  programmed: Date[]
}
```

`Route` class:
```ts
interface vehicle {
  id: number,
  vehicleType: string,
  lat: number,
  lon: number,
  direction: number,
  updated: Date,
};
```