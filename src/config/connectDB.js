import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Xuong_thay_Dat')
            .then(() => {
                console.log('Connected to the database!');
            }).catch((err) => console.log(err));
    } catch (error) {
        console.log('Error connecting to the database: ', error.message);
    }
};

export default connectDB;