import {Videoc} from "./video";

export interface Deserializable {
   deserialize(input: any): this;
 }

export class VideoResponse implements Deserializable {
 

   videos: Videoc[];

   deserialize(input: any) {
     Object.assign(<any>this, input);

     return this;
   }
 }