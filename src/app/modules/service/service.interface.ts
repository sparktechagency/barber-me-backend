import { Model, Types } from "mongoose";


export type IService = {
    barber: Types.ObjectId;
    title: Types.ObjectId;
    category: Types.ObjectId;
    image: String;
    price: Number;
    duration: String;
    description: String;
    gender: "Male" | "Female" | "Children" | "Others";
    isOffered: Boolean;
    rating: Number;
    status: "Active" | "Inactive";
    totalRating: Number;
}

export type ServiceModel = Model<IService, Record<string, unknown>>;