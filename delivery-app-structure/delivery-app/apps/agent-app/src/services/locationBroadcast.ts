import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { connectSocket } from './socket';

const LOCATION_TASK = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK, ({ data, error }: any) => {
  if (error) return;
  const [location] = data.locations;
  // Broadcast location to tracking-service via socket
  const socket = connectSocket('');
  socket.emit('agent:location', {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
    timestamp: new Date(),
  });
});

export const startLocationBroadcast = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TASK, {
    accuracy: Location.Accuracy.High,
    timeInterval: 5000,
    distanceInterval: 10,
  });
};
