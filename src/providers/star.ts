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

// Create a new provider
const NextBus = async (props: NextBusProps) => {
  // Get the props
  const { lineId, lineName, destinationId, destinationName, stopId, stopName, rideId, busId, timezone, limit=20 } = props;
  const uri = 'https://data.explore.star.fr/api/explore/v2.1/catalog/datasets/tco-bus-circulation-passages-tr/records?';
  
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

  const args = Object.keys(params)
    .filter((key) => params[key as keyof typeof params] !== undefined)
    .map((key) => key + '=' + params[key as keyof typeof params])
    .join('&');

  const url = uri + args;
  // Fetch the data
  const response = await fetch(url);
  const data = await JSON.parse(await response.text());

  return (data);
};

export {
  NextBus,
};