import mongoose from 'mongoose';

export const connectToDB = async() => {
    let isConnected = false;
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("Database already connected!");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        isConnected = true;
        console.log("Connected To database!")
    }catch(error){
        console.log(error);
    }
}