import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment'; 
import algoliasearch from 'algoliasearch/lite';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  marker!: mapboxgl.Marker; 
  latVal:any;
  lngVal:any;
  address:any;
  mapData:any; 
  uploaderEmail:any;
  uploaderPhone:any;

  @ViewChild("lat") lat!: ElementRef;
  bnds:any;
  config = {
    indexName: 'beach-house',
    searchClient: algoliasearch('MS0SDRBX0K', 'd7d2fa3a66a52e49a90150f5f632ebf2'),
  } 
  body:any[];
  map: mapboxgl.Map;
  
  constructor(private auth:AuthService, private elem: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() { 

    this.auth.getBeachHouseListings().pipe(take(1)).subscribe(e=>{ 
      this.mapData = e;

          // all of your map code here
    (mapboxgl as any).accessToken  = environment.mapbox.accessToken
    
    /*-------------------------------------------------------------------------------
      Map Initialization
    -------------------------------------------------------------------------------*/
    this.map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [ 36.82,-1.38],
      zoom: 11.5,
      pitch: 45,
      container: 'mapEl',
      antialias: true
    });
    
    /*-------------------------------------------------------------------------------
      Add Markers to map (Data coming from assets/js/mapdata.js)
    -------------------------------------------------------------------------------*/

      
    var bounds = new mapboxgl.LngLatBounds();
    console.log('mapdata',this.mapData)
    this.mapData.forEach((marker:any) => {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';    
        
      bounds.extend([marker.latitude,marker.longitude]);  
      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat([marker.latitude,marker.longitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<img src="'+marker.gallery[0]?.url+'"  onerror="this.onerror=null;this.src=' + "'" + 'https://via.placeholder.com/300x210?' + "' " + '" alt="'+marker.name+'" /> '+
                '<div class="acr-listing-popup-body"><h5><a title="'+marker.name+'">' + marker.name + '</a></h5> <span class="listing-price"> KES. '+  marker.price +'</span>'+
                  '<p class="ellipsis2"><i class="fas fa-map-signs"></i> ' + marker.description + '</p> <div class="location-popup-meta"> <span><i class="fas fa-bed"></i>'+marker.beds+'</span>'+
                  '<span><i class="fas fa-bath"></i>'+marker.bathrooms+'</span> <span><i class="fas fa-ruler-combined"></i>'+marker.size+'</span>  </div></div>'))
        .addTo(this.map);  
    });
    // [routerLink]="['+ "'" +'/listings/details'+ "',"+ marker.id+ "'" +']"
    this.map.fitBounds(bounds, {padding: 100})
   
    /*-------------------------------------------------------------------------------
    Map Building Generation
    -------------------------------------------------------------------------------*/
    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    this.map.on('load', e=> {
      // Insert the layer beneath any symbol layer.
      var layers = this.map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers!.length; i++) {
        if (layers![i].type === 'symbol' ) {
          labelLayerId = layers![i].id;
          break;
        }
      }

      this.map.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
    })

 
}

flyTo(lat: any,long: any){
  this.map.flyTo({
    zoom: 18.5,
    center: [ lat, long],
    essential: true // this animation is considered essential with respect to prefers-reduced-motion
  });
}

showFilter(){
  let filters = document.getElementsByClassName('acr-filter-form') as HTMLCollectionOf<HTMLElement>;

  if (filters.length != 0) {
    filters[0].style.display = "block";
  }
}
lessFilter(){
  let filters = document.getElementsByClassName('acr-filter-form') as HTMLCollectionOf<HTMLElement>;

  if (filters.length != 0) {
    filters[0].style.display = "none";
  }
}

getData(){
  alert("Image is loaded");
}

getUploaderEmail(id:any){ 
  this.auth.getUploaderID(id).forEach((e:any)=>{
    this.uploaderEmail = e?.email
  }) 
}


getUploaderPhone(id:any){ 
  this.auth.getUploaderID(id).forEach((e:any)=>{
    this.uploaderPhone = e?.phoneNumber
  }) 
}

}
