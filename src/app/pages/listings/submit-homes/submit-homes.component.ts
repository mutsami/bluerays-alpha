import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as mapboxgl from 'mapbox-gl';
import { FileUpload } from 'src/app/models/file-upload';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { MapService } from 'src/app/services/map.service';
import { environment } from 'src/environments/environment';
'use strict';
@Component({
  selector: 'app-submit-homes',
  templateUrl: './submit-homes.component.html',
  styleUrls: ['./submit-homes.component.css']
})
export class SubmitHomesComponent implements OnInit {
  
  marker!: mapboxgl.Marker;
  map!: mapboxgl.Map;
  latVal:any;
  lngVal:any;
  address:any;
  county:any;
  form!: FormGroup;
  fileUploads?: any[];
  
  @ViewChild("lat") lat!: ElementRef;
  @Input() fileUpload!: FileUpload;
  images?: Array<any> = [];
  
  constructor(public auth:AuthService ,public mapServe:MapService,private uploadService: FileUploadService) { 
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      bathrooms: new FormControl('', Validators.required),
      rooms: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      // period: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      // videoUrl: new FormControl('', Validators.required), 
      gallery: new FormControl('' ),
      fullAddress: new FormControl(''),
      county: new FormControl(''),
      longitude: new FormControl(''),
      latitude: new FormControl(''),
      title_deed: new FormControl('' ),
      electricity: new FormControl('' ),
      water: new FormControl('' ),
      fenced: new FormControl('' ),
      next_to_road: new FormControl('' ),
      view: new FormControl('' ),
      // beds: new FormControl('', Validators.required),
      // bathrooms: new FormControl('', Validators.required),
      // condition: new FormControl('', Validators.required),
      // built: new FormControl('', Validators.required),
      // neighbourhood: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required),
      uploader_id: new FormControl(''),
      uploaded: new FormControl(''),
      uploader_photoURL: new FormControl(''),
      uploader_displayName: new FormControl(''),
    });

    this.form.patchValue({ 
      lngVal: this.lngVal,
      latVal: this.latVal,
      fullAddress: this.address,
      county: this.address 
    });

    this.uploadService.getFiles().subscribe((fileUploads: any[] | undefined) => { 
      this.fileUploads = fileUploads;
    });
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() { 
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
      The Draggable Marker
    -------------------------------------------------------------------------------*/
    var marker = new mapboxgl.Marker({
      draggable: true
    })
    .setLngLat([36.82588315391189,-1.3848034891855718])
    .addTo(this.map);
    
    this.lngVal = 36.82;
    this.latVal = 1.38;

    const onDragEnd = () => { 
      var lngLat = marker.getLngLat();
      var lngLat = marker.getLngLat();
       
      this.latVal = lngLat.lng;
      this.lngVal = lngLat.lat; 

      this.mapServe.getAddress(lngLat.lng,lngLat.lat).subscribe((e:any)=>{
        this.address = e.features[0].place_name;
        this.county = e.features[0].context[1].text;
      })


    }

    marker.on('dragend', onDragEnd);

    /*-------------------------------------------------------------------------------
      Map Building Generation
    -------------------------------------------------------------------------------*/
    // The 'building' layer in the mapbox-streets vector source contains building-height
    // data from OpenStreetMap.
    this.map.on('load', () => {
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


    console.log('user data',this.auth.userData)
  }


deleteFileUpload(fileUpload: FileUpload): void {
  this.uploadService.deleteFile(fileUpload);
}
include(fileUpload: any){
  if(this.imageExists(fileUpload.id)){
    const index: any = this.images?.indexOf(fileUpload);
    if (index !== -1) {
        this.images?.splice(index, 1);
    }   
    
  }else if (!this.imageExists(fileUpload.id)){ 
    this.images?.push(fileUpload)
  } 
  
}

imageExists(id: any) {
  return this.images?.some(function(el) {
    return el.id === id;
  }); 
}

  setLat(lat: any){
    this.latVal = lat
  }
      
  get f(){
    return this.form.controls;
  }

  submit(){
    this.form.patchValue({
      fullAddress: this.address,
      county: this.county,
      longitude:this.lngVal,
      latitude:this.latVal,
      gallery:this.images,
      uploader_id:this.auth.userData.uid,
      uploaded:this.auth.ts,
      uploader_photoURL:this.auth.userData.photoURL,
      uploader_displayName:this.auth.userData.displayName,
    })
    this.auth.createListing(this.form.value);
  }



}
