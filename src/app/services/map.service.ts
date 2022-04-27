
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { GeoJson } from '../models/map';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { House } from '../models/house';

import { HttpClient } from '@angular/common/http'; 

@Injectable()
export class MapService {
 
  forsaleCollection!: AngularFirestoreCollection<House>;
  forsale!: Observable<House[]>;
  forcesaleDoc?: AngularFirestoreDocument<House>;
  ts:any;

  url: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";


  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth,
    private afs: AngularFirestore, private http: HttpClient) {
    (mapboxgl as any).accessToken  = environment.mapbox.accessToken
  }

  getHouses() {
 
  }

  getAddress(lng: any,lat: any){
    return this.http.get(this.url + lng +','+ lat + '.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=' + environment.mapbox.accessToken)
                
    }


  getMarkers()  {
    this.forsaleCollection = this.afs.collection('buy', ref => ref.orderBy('listed','asc'));
    return this.forsaleCollection
      .snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as House;
            const id = a.payload.doc.id; 
            return { id, ...data };
        });
        })
    );
  }

  

  createMarker(data: GeoJson) {
    return this.db.list('/markers')
                  .push(data)
  }

  removeMarker($key: string) {
    return this.db.object('/markers/' + $key).remove()
  }

}