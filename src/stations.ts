//Represents a vehicle stopping by a station. As provided by the GTT site
interface passageWeb {
  Linea: string,
  LineaAlias: string,
  PassaggiRT: string[],
  Passaggi: string,
  Direzione: string,
  DirezioneBreve: string,
  Bacino: string,
  Regol: string,
  Avviso: boolean,
  PassaggiPR: string[]
};

//Represents a vehicle stopping by a station. Prettified for use in app
export interface passage {
  line: string,
  lineID: string,
  direction: string,
  realTime: Date[],
  programmed: Date[]
}

//Fetch all info regarding departing vehicles from a station (by number)
export async function pollStations(station: number) {
  const url = `https://www.gtt.to.it/cms/index.php?option=com_gtt&task=palina.getTransitiOld&palina=${station}&realtime=true&get_param=value`;
  const options = {
    method: 'GET'
  };

  try {
    const response = await fetch(url, options);
    const passagesWeb: passageWeb[] = await response.json();

    const passages: passage[] = passagesWeb.map(pass => ({
      line: parseBusN(pass.LineaAlias),
      lineID: pass.Linea,
      direction: pass.Direzione,
      realTime: pass.PassaggiRT.map(hour => dateFromHourStr(hour)),
      programmed: pass.PassaggiPR.map(hour => dateFromHourStr(hour))
    }))

    return passages;
  } catch (err) {
    throw err;
  }
}

//Returns a date object from a string formatted as HH:mm
function dateFromHourStr(str: string) {
  const d = new Date();
  const dateStr = d.toISOString();
  const ISOStr = `${dateStr.substring(0, dateStr.indexOf('T'))}T${str}`;
  return new Date(ISOStr);
}

//Renames bus substituting trams, called "X navetta" to "XN", as shown on the bus themselves
function parseBusN(bus: string){
  if (!bus.includes('navetta')) return bus;

  return bus.replace(' navetta', 'N');
}