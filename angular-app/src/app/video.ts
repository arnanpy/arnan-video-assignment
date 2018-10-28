export interface Video {
     description: string,
     sources: [string],
     subtitle: [string],
     thumb: string,
     title: string,
     liked: [string],
     likedpeople: Number,
     views: Number,
     score: Number
 } 


export interface Deserializable {
    deserialize(input: any): this;
  }

 
export class Videoc implements Deserializable {
    description: string;
    sources: [string];
    subtitle: [string];
    thumb: string;
    title: string;
    liked: [string];
    views: Number;
    score: Number;
  
    deserialize(input: any) {
      Object.assign(<any>this, input);
  
      return this;
    }
  }