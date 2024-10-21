// NextBus provider
interface NextBusProps {
  lineId: number | undefined;
  lineName?: string | undefined;
  destinationId?: number | undefined;
  destinationName?: string | undefined;
  stopId?: number | undefined;
  stopName?: string | undefined;
  rideId?: number | undefined;
  busId?: number | undefined;
  timezone?: string | undefined;
  limit?: number;
}

const NextBus = async (props: NextBusProps) => {
  // Get the props
  const { lineId, lineName, destinationId, destinationName, stopId, stopName, rideId, busId, timezone, limit=20 } = props;
  const url = 'https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr/records?';
  
  const params = {
    lineId: lineId,
    lineName: lineName,
    destinationId: destinationId,
    destinationName: destinationName,
    stopId: stopId,
    stopName: stopName,
    rideId: rideId,
    busId: busId,
    timezone: timezone,
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
  const data = await JSON.parse(await response.text());

  return (data);
};

// Global line provider
interface LineListProps {
  lineId?: number | undefined;
  lineName?: string | undefined;
  family?: string | undefined;
  limit?: number;
}

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
}

const LinePicture = async (props: LinePictureProps) => {
  // Get the props
  const { lineId, resolution=1 } = props;
  if (resolution !== 0 && resolution !== 1) return null;
  const uri = `https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-lignes-pictogrammes-dm/records?limit=5&refine=idligne:${lineId}`;
  
  // Fetch the data
  const response = await fetch(uri);
  const data = await response.json();
  console.log(data);

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

export {
  NextBus,
  LineList,
  LinePicture,
};