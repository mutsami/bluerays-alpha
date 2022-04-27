import { Coordinate } from "mapbox-gl";
import { Timestamp } from "rxjs";

 

export interface House {
    id?: string;
    location?:string; 
    agentimage?:string; 
    gps?:GeolocationCoordinates
    agent?:string; 
    agentcontact?:string; 
    balcony?:boolean;
    borehole?:boolean;
    baths?:number; 
    longdesc?:string;
    desctitle?:string;
    shortdesc?:string;
    generator?:boolean;
    elevator?:boolean; 
    floors?:number; 
    parking?:boolean;
    pool?:boolean;
    security?:string; 
    image1?:string; 
    image2?:string; 
    image3?:string; 
    image4?:string; 
    image5?:string; 
    price?:number; 
    rooms?:number; 
    size?:number; 
    title?:string; 
    type?:string; 
    tenure?:string;
    uploader_id?:string;
    listed?: Timestamp<any>; 
  }