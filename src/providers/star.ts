// NextBus provider
interface NextBusProps {
  lineId: string | undefined;
  lineName?: string | undefined;
  destinationId?: number | undefined;
  destinationName?: string | undefined;
  stopId?: number | undefined;
  stopName?: string | undefined;
  rideId?: number | undefined;
  busId?: number | undefined;
  timezone?: string | undefined;
  limit?: number;
};

const NextBus = async (props: NextBusProps) => {
  // Get the props
  const { lineId, lineName, destinationId, destinationName, stopId, stopName, rideId, busId, timezone='Europe/Paris', limit=20 } = props;
  const url = `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr/records?limit=${limit}&refine=`;
  
  const params = {
    idligne: lineId,
    nomcourtligne: lineName,
    sens: destinationId,
    destination: destinationName,
    nomarret: stopId,
    stopName: stopName,
    idcourse: rideId,
    idbus: busId,
  };

  // Build the query string
  const args = Object.keys(params)
    .filter((key) => params[key as keyof typeof params] !== undefined)
    .map((key) => key + ':' + params[key as keyof typeof params])
    .join('&refine=');

  const uri = url + args;

  // Fetch the data
  const response = await fetch(uri);
  return await response.text();
  const data = JSON.parse(await response.text());

  return (data);
};

// Global line provider
interface LineListProps {
  lineId?: string | undefined;
  lineName?: string | undefined;
  family?: string | undefined;
  limit?: number;
};

const LineList = async (props: LineListProps) => {
  // Get the props
  const { lineId, lineName, family, limit=-1 } = props;
  const url = 'https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-topologie-lignes-td/records?';
  
  const params = {
    lineId: lineId,
    lineName: lineName,
    family: family,
    limit: limit,
  };

  // Build the query string
  const args = Object.keys(params)
    .filter((key) => params[key as keyof typeof params] !== undefined)
    .map((key) => key + '=' + params[key as keyof typeof params])
    .join('&');

  const uri = url + args;

  // Fetch the data
  const response = await fetch(uri);
  const data = await JSON.parse(await response.json());

  return (data);
};

// Line picture provider
interface LinePictureProps {
  lineId: string;
  resolution: number;
};

const LinePicture = async (props: LinePictureProps) => {
  // Get the props
  const { lineId, resolution=1 } = props;
  if (resolution !== 0 && resolution !== 1) return null;
  const uri = `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-lignes-pictogrammes-dm/records?limit=5&refine=idligne:${lineId}`;
  
  // Fetch the data
  const response = await fetch(uri);
  const data = await response.json();

  if (data.results.length === 0) return null;
  if (data.results.length === 1) return data.results[0];

  const selectedPicture = data.results.reduce((prev: any, curr: any) => {
    const prevArea = prev.taille;
    const currArea = curr.taille;

    if (resolution === 0) {
      return currArea < prevArea ? curr : prev;
    } else {
      return currArea > prevArea ? curr : prev;
    }
  });

  return selectedPicture;
};

// Bus route end to end provider
interface BusRouteProps {
  lineId: string;
};

const BusRoute = async (props: BusRouteProps) => {
  // Get the props
  const { lineId } = props;
  const uri = `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-topologie-parcours-td/records?limit=5&refine=idligne:${lineId}`;
  
  // Fetch the data
  const response = await fetch(uri);
  const data = await response.json();

  return data;
};

export {
  NextBus,
  LineList,
  LinePicture,
};