import { Model } from "mongoose";

type Disorder = {
    name:string
}
export type IDieases={
    name:string;
    total:number;
    disorders:Disorder[]
} 

export type DieasesModel = Model<IDieases>
