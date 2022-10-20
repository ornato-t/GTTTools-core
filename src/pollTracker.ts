import axios from "axios";

//Represents a vehicle: either a bus or a tram
export interface vehicle {
  id: number,
  tipo: string,
  disabili: boolean,
  lat: number,
  lon: number,
  direzione: number,
  aggiornamento: string,
  occupazione: number
};

export async function pollTracker(line: string) {
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
    const vehicles:vehicle[] = response.data;
    return vehicles;
  } catch (err) {
    throw err;
  }
}
