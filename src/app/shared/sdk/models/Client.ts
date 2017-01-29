/* tslint:disable */
import {
  Record
} from '../index';

export interface ClientInterface {
  centerId?: string;
  remarks?: string;
  labeledDate?: string;
  Dementia?: boolean;
  Stroke?: boolean;
  Leg_Surgery?: boolean;
  Hospitalization_Past_History?: boolean;
  Hospitalization_Recent_Event?: boolean;
  Hospitalization_No_Significant_History?: boolean;
  Fall_Past_History?: boolean;
  Fall_Recent_Event?: boolean;
  Fall_No_Significant_History?: boolean;
  Waking_ability?: string;
  Mobilize_From_Chair?: string;
  Hip?: string;
  Trunk?: string;
  realm?: string;
  username?: string;
  password: string;
  challenges?: any;
  email: string;
  emailVerified?: boolean;
  verificationToken?: string;
  status?: string;
  created?: any;
  lastUpdated?: any;
  id?: any;
  accessTokens?: Array<any>;
  records?: Array<Record>;
}

export class Client implements ClientInterface {
  centerId: string;
  remarks: string;
  labeledDate: string;
  Dementia: boolean;
  Stroke: boolean;
  Leg_Surgery: boolean;
  Hospitalization_Past_History: boolean;
  Hospitalization_Recent_Event: boolean;
  Hospitalization_No_Significant_History: boolean;
  Fall_Past_History: boolean;
  Fall_Recent_Event: boolean;
  Fall_No_Significant_History: boolean;
  Waking_ability: string;
  Mobilize_From_Chair: string;
  Hip: string;
  Trunk: string;
  realm: string;
  username: string;
  password: string;
  challenges: any;
  email: string;
  emailVerified: boolean;
  verificationToken: string;
  status: string;
  created: any;
  lastUpdated: any;
  id: any;
  accessTokens: Array<any>;
  records: Array<Record>;
  constructor(instance?: Client) {
    Object.assign(this, instance);
  }
}
