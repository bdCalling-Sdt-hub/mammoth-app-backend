import { Model, Types } from "mongoose";

type Disorder = {
    _id?:Types.ObjectId;
    name:string
}
export type IDieases={
    name:string;
    total:number;
    disorders:Disorder[]
} 

export type DieasesModel = Model<IDieases>
