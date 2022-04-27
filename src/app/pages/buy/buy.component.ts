import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { House } from 'src/app/models/house';
import { FeatureCollection, GeoJson } from 'src/app/models/map';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  houses!:any;
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -1.2600491259886037;
  lng = 36.87231217162311;
  // data
  source: any;
  markers: any;

  constructor(public auth:AuthService,private mapService: MapService) { }

  ngOnInit(){
    this.auth.getHouses().subscribe(e=>{
      this.houses = e; 
    })
    this.markers = this.mapService.getMarkers();
    this.initializeMap()
  }

  private initializeMap() {

     

    /// locate the user
    // if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(position => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //     this.map.flyTo({
    //       center: [this.lng, this.lat],
    //       zoom:8
    //     })
        
    //   });
    // }

    this.buildMap()

  }

  buildMap() {
    this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [this.lng, this.lat],
          zoom: 7,
          scrollZoom: true
        });


     /// Add map controls
     this.map.addControl(new mapboxgl.NavigationControl());
 
     /// Add realtime firebase data on map load
     this.map.on('load', (event) => {

        /* Add the data to your map as a layer */
        this.map.addLayer({
          id: 'locations',
          type: 'circle',
          /* Add a GeoJSON source containing place coordinates and information. */
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          }
        }); 
       /// subscribe to realtime database and set data source
       
       this.markers.subscribe((e: any)=>{
         e.forEach((m: any) => { 
          const marker = new mapboxgl.Marker({})   
           marker 
          .setLngLat([m.gps._long,m.gps._lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML( 
                `<p style="margin-bottom:0px;"> kes ${Number(m.price ).toLocaleString('en')}</p><h4>${m.location} <br/> <hr style="margin-bottom:0px;" /> </h4>
                
                <div class="oppsect" style="margin-top:0px!important;">
                <span style="letter-spacing:2px;font-size: 11px;margin-right:5px;">${m.bedrooms}<i class="fas fa-bed"></i></span>
                <span style="letter-spacing:2px;font-size: 11px;margin-right:5px;">${m.baths}<i class="fas fa-bath"></i></span>
                <span style="letter-spacing:2px;font-size: 11px;margin-right:5px;">${m.area}&#13217;</span>
                <span style="letter-spacing:2px;font-size: 11px;">${m.built}</span> 
              </div>
                `
              )
          )
          .addTo(this.map);
          marker.getElement().addEventListener('click', () => {
            this.map.flyTo({
              center: [m.gps._long,m.gps._lat],
              zoom:15
            })
          });

         });
       }) 
                  
     })
     this.map.on('click', (event) => {
      /* Determine if a feature in the "locations" layer exists at that point. */
      const features = this.map.queryRenderedFeatures(event.point, {
        layers: ['locations']
      });
       
      /* If it does not exist, return */
      if (!features.length) {
        console.log('Features dont exist')
      };
    
 
    });


   }
 
   
   flyTo(lat: number,long: number) {
     this.map.flyTo({
       center: [long,lat],
       zoom:15
     })
   }

   scroll(coord: any){
     this.flyTo(coord._lat,coord._long); 
   }

}
