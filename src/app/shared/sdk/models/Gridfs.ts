/* tslint:disable */

export interface GridfsInterface {
  fileName: string;
  id?: number;
}

export class Gridfs implements GridfsInterface {
  fileName: string;
  id: number;
  constructor(instance?: Gridfs) {
    Object.assign(this, instance);
  }
}
