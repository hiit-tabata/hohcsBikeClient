/* tslint:disable */
import {
  Client
} from '../index';

export interface RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  id?: any;
  clientId?: any;
  dataSamples?: Array<any>;
  client?: Client;
}

export class Record implements RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  id: any;
  clientId: any;
  dataSamples: Array<any>;
  client: Client;
  constructor(instance?: Record) {
    Object.assign(this, instance);
  }
}
