export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  AGENT    = 'AGENT',
  MERCHANT = 'MERCHANT',
  ADMIN    = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: Date;
}

export interface DeliveryAgent extends User {
  vehicleType: 'BIKE' | 'CAR' | 'VAN';
  isOnline: boolean;
  currentLocation?: Location;
  rating: number;
}
