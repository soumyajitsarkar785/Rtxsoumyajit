export interface Location {
  lat: number;
  lng: number;
  timestamp: Date;
}

export interface RouteInfo {
  distance: number;   // km
  duration: number;   // minutes
  polyline: string;   // encoded Google polyline
}
