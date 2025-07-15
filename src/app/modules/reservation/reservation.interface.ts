import { Model, Types } from "mongoose"

export type IReservation = {
    barber: Types.ObjectId;
    customer: Types.ObjectId;
    service: Types.ObjectId;
    status: "Upcoming" | "Accepted" | "Canceled" | "Completed";
    paymentStatus: "Pending" | "Paid" | "Refunded";
    price: number;
    txid: string;
    cancelByCustomer: boolean;
    isReported: boolean;
    sessionId?: string;
    tips?: number;
    transfer?: boolean;
}

export type ReservationModel = Model<IReservation, Record<string, unknown>>;