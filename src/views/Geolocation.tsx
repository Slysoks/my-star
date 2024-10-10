import {
  View,
  Text,
  TouchableNativeFeedback,
  PermissionsAndroid,
} from 'react-native';
import GeolocationService from 'react-native-geolocation-service';
import { useState } from 'react';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Geolocation = () => {

  requestCameraPermission();

  const [location, setLocation] = useState<any>(null);

  

  return (
    <View>
      <TouchableNativeFeedback onPress={getLocation}>
        <View>
          <Text>Get location</Text>
        </View>
      </TouchableNativeFeedback>
      <Text>
        { location ? location.coords.latitude : 'No location' }
        { location ? location.coords.longitude : 'No location' }
      </Text>
    </View>
  )
};

export default Geolocation;

