import axios from 'axios';

//Represents a vehicle: either a bus or a tram. As provided by the GTT site
interface vehicleWeb {
  id: number,
  tipo: string,
  disabili: boolean,
  lat: number,
  lon: number,
  direzione: number,
  aggiornamento: string,
  occupazione: number
};

//Represents a vehicle: either a bus or a tram. Prettified for use in app
interface vehicle {
  id: number,
  vehicleType: string,
  lat: number,
  lon: number,
  direction: number,
  updated: Date,
};

//Fetch all info regarding a vehicle (from line id)
export async function pollVehicles(line: string) {
  const options = { //Request params
    method: 'GET',
    url: 'https://www.gtt.to.it/cms/components/com_gtt/views/percorsi/tmpl/proxydaslinea.php',
    params: { 'serviceName': 'GetVeicoliPerLineaJson', 'linea': line },
    headers: {
      Referer: `https://www.gtt.to.it/cms/percorari/urbano?view=percorsi&bacino=U&linea=${line}&Regol=GE`
    }
  };

  try {
    const response = await axios.request(options);
    const vehiclesWeb:vehicleWeb[] = response.data;
    const vehicles: vehicle[] = vehiclesWeb.map(vehicle => ({
      id: vehicle.id,
      vehicleType: vehicleName(vehicle.tipo),
      lat: vehicle.lat,
      lon: vehicle.lon,
      direction: vehicle.direzione,
      updated: updatedDate(vehicle.aggiornamento)
    }))
    return vehicles;
  } catch (err) {
    throw err;
  }
}

//Returns the full word "Bus" or "Tram"
function vehicleName(initial: string){
  if(initial === 'B') return 'Bus';
  if(initial === 'T') return 'Tram';
  return initial;
}

//Converts a date string in the format "DD/MM/YYYY HH:mm" to a date object
function updatedDate(dateStr: string){
  dateStr = dateStr.replace(' ', '-');
  dateStr = dateStr.replace(':', '-');
  dateStr = dateStr.replaceAll('/', '-');
  const dateFields = dateStr.split('-');
  const dateStrReconstructed = `${dateFields[2]}-${dateFields[1]}-${dateFields[0]}T${dateFields[3]}:${dateFields[4]}`;
  return new Date(dateStrReconstructed);
}