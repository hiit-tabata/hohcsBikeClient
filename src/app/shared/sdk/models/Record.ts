/* tslint:disable */
import {
  DataSample,
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
  dataSamples?: Array<DataSample>;
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
  dataSamples: Array<DataSample>;
  client: Client;
  constructor(instance?: Record) {
    Object.assign(this, instance);
  }
}
