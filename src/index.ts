import { pollTracker, vehicle } from "./pollTracker.js";

const line = '10N';
const res: vehicle[] = await pollTracker(line);

res.forEach(el => {
    console.log(el.id)
})