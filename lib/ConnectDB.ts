import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!

if(!MONGO_URI) {
    throw new Error("Please define MONGO_URL in env");
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

export default async function connectDB() {
    if(cached.conn) {
        console.log("Database Connected");
       return cached.conn
    }

    if(!cached.promise) {
       cached.promise = mongoose.connect(MONGO_URI)
        .then(()=> mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null
        console.log("Database connection failed");
    }

    return cached.conn
}