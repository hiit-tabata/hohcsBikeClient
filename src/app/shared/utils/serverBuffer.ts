import Dexie from 'dexie';
import {Observable} from "rxjs";
import { Injectable, Inject, Optional } from '@angular/core';
import { RecordInterface, Record }                           from '../sdk/models/Record';

class HohcsBufferDb extends Dexie{
  public RecordTable: Dexie.Table<RecordData,string>;

  constructor() {
      super("HohcsDatabase");
      this.version(1).stores({
          RecordTable: "id,dateTime,data,clientId,tags"
      });
      this.RecordTable.mapToClass (RecordData);
  }

}

class RecordData{
  id:string;
  data:string;
}


@Injectable()
export class RecordBuffer {
  private db:HohcsBufferDb;

  constructor(){
    this.db = new HohcsBufferDb();
  }

  public getRecordData(recordId:string){
    return Observable.fromPromise(this.db.RecordTable.get(recordId));
  }

  public put(record:Record){
    return Observable.fromPromise(
      this.db.transaction('rw', this.db.RecordTable,()=>{
        this.db.RecordTable.put(record);
      })
    );
  }

  public add(record:Record){
    return Observable.fromPromise(
      this.db.transaction('rw', this.db.RecordTable,()=>{
        this.db.RecordTable.add(record);
      })
    );
  }

  public delete(record:Record){
    return Observable.fromPromise(
      this.db.transaction('rw', this.db.RecordTable,()=>{
        this.db.RecordTable.delete(record.id);
      })
    );
  }
}
