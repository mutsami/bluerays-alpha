import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {


  marker!: mapboxgl.Marker; 
  latVal:any;
  lngVal:any;
  address:any;
  mapData:any;
  @ViewChild("lat") lat!: ElementRef;
  bnds:any;
  
  constructor(public mapServe:MapService, private elem: ElementRef) { 
    this.mapData = {
      type: 'FeatureCollection',
      features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.038659, 38.931567]
          },
          properties: {
            title: 'Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'Washington, D.C.'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.003168, 38.894651]
          },
          properties: {
            title: '10 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.090372, 38.881189]
          },
          properties: {
            title: 'Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.111561, 38.882342]
          },
          properties: {
            title: '9 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.052477, 38.943951]
          },
          properties: {
            title: 'Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.043444, 38.909664]
          },
          properties: {
            title: ' 8 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.031706, 38.914581]
          },
          properties: {
            title: 'Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.020945, 38.878241]
          },
          properties: {
            title: '7 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
      ]
    };
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() { 
    // all of your map code here
    (mapboxgl as any).accessToken  = environment.mapbox.accessToken
    
    /*-------------------------------------------------------------------------------
      Map Initialization
    -------------------------------------------------------------------------------*/
    var map = new mapboxgl.Map({
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
    var mapData = {
      type: 'FeatureCollection',
      features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.038659, 38.931567]
          },
          properties: {
            title: '12 Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'Washington, D.C.'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.003168, 38.894651]
          },
          properties: {
            title: '12 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.090372, 38.881189]
          },
          properties: {
            title: 'Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.111561, 38.882342]
          },
          properties: {
            title: '11 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.052477, 38.943951]
          },
          properties: {
            title: 'Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.043444, 38.909664]
          },
          properties: {
            title: '5 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.031706, 38.914581]
          },
          properties: {
            title: 'Theodore Lowe, Azusa New York 39531',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-77.020945, 38.878241]
          },
          properties: {
            title: '4 Iris Watson, Frederick Nebraska 20620',
            price: '1,200$/mo',
            bed: 3,
            bath: 2,
            size: 2000 + ' sqft',
            thumbnail: 'https://via.placeholder.com/1280x850',
            description: 'San Francisco, California'
          }
        },
      ]
    };
    var bounds = new mapboxgl.LngLatBounds();
    mapData.features.forEach((marker:any) => {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';    
        
      bounds.extend(marker.geometry.coordinates);  

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<img src="'+marker.properties.thumbnail+'" alt="'+marker.properties.title+'"/> '+
                '<div class="acr-listing-popup-body"><h5><a href="#" title="'+marker.properties.title+'">' + marker.properties.title + '</a></h5> <span class="listing-price">'+marker.properties.price+'</span>'+
                  '<p><i class="fas fa-map-signs"></i> ' + marker.properties.description + '</p> <div class="location-popup-meta"> <span><i class="fas fa-bed"></i>'+marker.properties.bed+'</span>'+
                  '<span><i class="fas fa-bath"></i>'+marker.properties.bath+'</span><span><i class="fas fa-ruler-combined"></i>'+marker.properties.size+'</span> </div></div>'))
        .addTo(map);  
    });
 
    map.fitBounds(bounds, {padding: 100})
    

    

    /*-------------------------------------------------------------------------------
      Fly to Location
    -------------------------------------------------------------------------------*/

    var userSelection = document.getElementsByClassName('fly-to-location');

    for(var i = 0; i <= userSelection.length; i++) {
      (function(index) {
        userSelection[index].addEventListener("click", function(e) {
          e.preventDefault();
          // console.log("Clicked index: " +  e.target );

        })
      })(i);
    } 

    this.elem.nativeElement.querySelector('fly-to-location')
    .addEventListener('click', (e:any) => {
      e.preventDefault();
      var $this = this;

      console.log('fly to',e)
      // Fly to a random location by offsetting the point -74.50, 40
      // by up to 5 degrees.
      map.flyTo({
        zoom: 18.5,
        // center: [ $this.ele.data('lat'), $this.data('lng') ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
 
     
    /*-------------------------------------------------------------------------------
  Map Building Generation
-------------------------------------------------------------------------------*/
// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function() {
  // Insert the layer beneath any symbol layer.
  var layers = map.getStyle().layers;

  var labelLayerId;
  for (var i = 0; i < layers!.length; i++) {
    if (layers![i].type === 'symbol' ) {
      labelLayerId = layers![i].id;
      break;
    }
  }

  map.addLayer({
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
 
} 
 

}
