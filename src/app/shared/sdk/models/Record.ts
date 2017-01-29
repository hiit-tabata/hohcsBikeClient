/* tslint:disable */
import {
  DataSample,
  Client,
  Tag
} from '../index';

export interface RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  remarks?: string;
  valid?: boolean;
  processed?: boolean;
  data?: string;
  dataTypes?: string;
  sensorIds?: string;
  bleAddress?: string;
  labelJson?: string;
  Bike?: string;
  Inattention?: boolean;
  Rest?: boolean;
  Test_complete?: boolean;
  Hip_Pelvic_Shift?: boolean;
  Hip_Leave_Sit?: boolean;
  Hip_Pendulum_Movement?: boolean;
  Hip_Disconnection_Left?: boolean;
  Hip_Disconnection_Right?: boolean;
  Trunk_Lean_Stably?: boolean;
  Trunk_Lean_Evenly?: string;
  Trunk_Fall_Like_Pattern?: boolean;
  Trunk_Pendulum?: boolean;
  Fatigue?: boolean;
  Trunk_Leave_The_Lean?: boolean;
  Trunk_Disconnection_Left?: boolean;
  Trunk_Disconnection_Right?: boolean;
  Leg_coordinated?: string;
  id?: any;
  clientId?: any;
  tagId?: any;
  dataSamples?: Array<DataSample>;
  client?: Client;
  tags?: Array<Tag>;
}

export class Record implements RecordInterface {
  dateTime: any;
  duration: number;
  ip: string;
  location: string;
  deviceId: string;
  remarks: string;
  valid: boolean;
  processed: boolean;
  data: string;
  dataTypes: string;
  sensorIds: string;
  bleAddress: string;
  labelJson: string;
  Bike: string;
  Inattention: boolean;
  Rest: boolean;
  Test_complete: boolean;
  Hip_Pelvic_Shift: boolean;
  Hip_Leave_Sit: boolean;
  Hip_Pendulum_Movement: boolean;
  Hip_Disconnection_Left: boolean;
  Hip_Disconnection_Right: boolean;
  Trunk_Lean_Stably: boolean;
  Trunk_Lean_Evenly: string;
  Trunk_Fall_Like_Pattern: boolean;
  Trunk_Pendulum: boolean;
  Fatigue: boolean;
  Trunk_Leave_The_Lean: boolean;
  Trunk_Disconnection_Left: boolean;
  Trunk_Disconnection_Right: boolean;
  Leg_coordinated: string;
  id: any;
  clientId: any;
  tagId: any;
  dataSamples: Array<DataSample>;
  client: Client;
  tags: Array<Tag>;
  constructor(instance?: Record) {
    Object.assign(this, instance);
  }
}
