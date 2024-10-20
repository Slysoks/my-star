// Declare the types for the NextBus function
interface NextBusProps {
  lineId: string | undefined;
  lineName: string | undefined;
  destinationId: number | undefined;
  destinationName: string | undefined;
  stopId: number | undefined;
  stopName: string | undefined;
  rideId: number | undefined;
  busId: number | undefined;
  timezone: string | undefined;
}

// Create a new provider
const NextBus = (props: NextBusProps) => {
  
  return (
    true
  )
}

export {
  NextBus,
};