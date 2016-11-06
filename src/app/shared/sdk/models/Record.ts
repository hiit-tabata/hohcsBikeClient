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
  averageSpeed?: number;
  HighestConsecutiveSpeed?: number;
  id?: any;
  clientId?: any;
  dataSamples?: Array<DataSample>;
  dataSamplesInSecond?: Array<DataSample>;
  client?: Client;
}

export class Record implements RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  averageSpeed: number;
  HighestConsecutiveSpeed: number;
  id: any;
  clientId: any;
  dataSamples: Array<DataSample>;
  dataSamplesInSecond: Array<DataSample>;
  client: Client;
  constructor(instance?: Record) {
    Object.assign(this, instance);
  }
}
