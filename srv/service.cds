using { db } from '../db/schema';

service myservice {
    @Capabilities : { Readable,Updatable,Deletable,Insertable }
    entity travelInitiate as projection on db.travelInitiate;

     entity department as projection on db.department;
     entity city as projection on db.city;
     entity customername as projection on db.customername;
}
