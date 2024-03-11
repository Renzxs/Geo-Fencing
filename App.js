import { StatusBar } from 'expo-status-bar';
import MapView, { Polygon, Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import CAVA from './assets/CAVA Building.png'
import CEIT from './assets/CEIT Building.png'
import COED from './assets/COED Building.png'
import MAIN from './assets/MAIN Building.png'

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import * as geolib from 'geolib';
import { Entypo } from '@expo/vector-icons';

export default function App() {

  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(null);
  const [isInsidePLV, setIsInsidePLV] = useState(false);
  const [isInsideCEIT, setIsInsideCEIT] = useState(false);
  const [isInsideCAVA, setIsInsideCAVA] = useState(false);
  const [isInsideCOED, setIsInsideCOED] = useState(false);
  const [isInsideMAIN, setIsInsideMAIN] = useState(false);
  const [building, setBuilding] = useState(null);

  useEffect(() => {(
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if(status !== 'granted') {
        setStatus('Permission Denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setStatus('Permission Access');

      console.log(geolib);

      try {
        const isInsideplv = geolib.isPointInPolygon({ latitude: location.coords.latitude, longitude: location.coords.longitude }, plvCoordinates);
        setIsInsidePLV(isInsideplv);

        if(isInsideplv){

          const isInsideceit = geolib.isPointInPolygon({ latitude: location.coords.latitude, longitude: location.coords.longitude }, cietBuildingCoordinates);
          setIsInsideCEIT(isInsideCEIT);

          const isInsidecava = geolib.isPointInPolygon({ latitude: location.coords.latitude, longitude: location.coords.longitude }, cavaBuildingCoordinates);
          setIsInsideCAVA(isInsidecava);

          const isInsidecoed = geolib.isPointInPolygon({ latitude: location.coords.latitude, longitude: location.coords.longitude }, coedBuildingCoordinates);
          setIsInsideCOED(isInsidecoed);

          const isInsidemain = geolib.isPointInPolygon({ latitude: location.coords.latitude, longitude: location.coords.longitude }, mainBuildingCoordinates);
          setIsInsideMAIN(isInsidemain);

          if(isInsideCEIT) {
            setBuilding("CEIT");
          }
          else if(isInsideCAVA) {
            setBuilding("CAVA");
          }
          else if(isInsideCOED) {
            setBuilding("COED");
          }
          else if(isInsideMAIN) {
            setBuilding("MAIN")
          } 
          else {
            setBuilding(null);
          }
          
        }
      } 
      catch (error) {
          console.error("Error while checking inside polygon:", error);
          setIsInsidePLV(false); // Set to false or handle the error appropriately
      }
    })();
  }, []);

  const plvCoordinates = [
    { latitude: 14.698308460529411, longitude: 120.97805292647185},
    { latitude: 14.697909897611515, longitude: 120.9785104403765},
    { latitude: 14.697634278716698, longitude:  120.97826592917714},
    { latitude: 14.697493995863578, longitude: 120.97848576169154},
    { latitude: 14.69799102713776,  longitude: 120.97910785868693},
    { latitude: 14.698330650279443,  longitude: 120.97942575829676},
    { latitude: 14.69870010458837,  longitude: 120.97925731895182},
    { latitude: 14.699048905594223,  longitude: 120.97885875824699},
  ]

  const cietBuildingCoordinates = [
    { latitude: 14.698497912550055, longitude: 120.97827701855364 },
    { latitude: 14.698453802505805, longitude: 120.97832131803371},
    { latitude: 14.698479008246473, longitude: 120.97834998240322},
    { latitude: 14.698118031204666,  longitude: 120.97868937449303},
    { latitude: 14.698103977083045, longitude: 120.97867666110511},
    { latitude: 14.698076976336054,  longitude: 120.97869916654047},
    { latitude: 14.69794338563149, longitude: 120.97854802713775},
    { latitude: 14.698092099806889, longitude: 120.97840861406804},
    { latitude: 14.698060592574794, longitude: 120.97837734384679},
    { latitude: 14.698179059743898, longitude: 120.97826789807243},
    { latitude: 14.698153166504737, longitude: 120.97822896823135},
    { latitude: 14.698291225408619, longitude: 120.97809982063323},
    { latitude: 14.698301613085135, longitude: 120.9781154558394},
    { latitude: 14.698335869973988, longitude: 120.97809456955929},
  ]

  const cavaBuildingCoordinates = [ 
    { latitude: 14.698871682161338, longitude: 120.97873841185304},
    { latitude: 14.698838303736215, longitude: 120.97877473581848},
    { latitude: 14.698813709103906, longitude: 120.97874930904268},
    { latitude: 14.698541411204, longitude: 120.97904080886516},
    { latitude: 14.698561613963067, longitude: 120.97906169514526},
    { latitude: 14.698536140918725, longitude: 120.97908803002021},
    { latitude: 14.698676681816062, longitude: 120.97922515298967},
    { latitude: 14.69900519581086, longitude: 120.97887099432683},
  ]

  const mainBuildingCoordinates = [ 
    { latitude: 14.698429682542821, longitude: 120.97921234160528},
    { latitude: 14.698290799128342, longitude: 120.97935266051373},
    { latitude: 14.697877304803283, longitude: 120.97892300184061},
    { latitude: 14.698016188480683, longitude: 120.97878159518872},
  ]

  const coedBuildingCoordinates = [ 
    { latitude: 14.697947798794987, longitude: 120.978578187153},
    { latitude: 14.697731055979835, longitude: 120.97879029713086},
    { latitude: 14.697493995863578, longitude: 120.97848576169154},
    { latitude: 14.697634278716698, longitude:  120.97826592917714},
  ]

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 14.698308460529411,
          longitude: 120.97805292647185,
          latitudeDelta: 0.0010,
          longitudeDelta: 0.008}}
        showsBuildings={true}
        showsUserLocation={true}
      >
        <Polygon coordinates={plvCoordinates} fillColor='rgba(0, 150, 0, 0.5)'/>

        <Polygon coordinates={cietBuildingCoordinates} />

        <Polygon coordinates={cavaBuildingCoordinates} />

        <Polygon coordinates={mainBuildingCoordinates} />

        <Polygon coordinates={coedBuildingCoordinates} />

        {/* CEIT BUILDING */}
        <Marker image={CEIT} coordinate={{latitude:14.698251947551112, longitude:  120.97842893817713}}/>

        {/* CAVA BUILDING */} 
        <Marker image={CAVA} coordinate={{latitude:14.69875323122254, longitude:  120.97898460845302}}/>

        {/* MAIN BUILDING */}
        <Marker image={MAIN} coordinate={{latitude:14.698164898603302, longitude:  120.97903183630147}}/>

        {/* COED BUILDING */}
        <Marker image={COED} coordinate={{latitude:14.697764831516636, longitude:  120.97857959386926}}/>

      </MapView>
      {isInsidePLV ? (
        <Text style={styles.insideText}>Your inside PLV Main Campus.</Text>
      ) : (
        <Text style={styles.outsideText}>Your not inside PLV Main Campus.</Text>
      )}

      {isInsidePLV && building !== null ? 
       <View style={styles.indicator}>
        <Entypo name="location-pin" size={24} color="black" /> 
        <Text style={{fontWeight: 'bold'}}>PLV Main Campus, {building} Building</Text>
       </View>
       :
       null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
  insideText: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    zIndex: 1000,
  },
  outsideText: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    zIndex: 1000,
  },
  indicator: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 65,
    alignItems: 'center',
    justifyContent: 'center',
  }
});