import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const connectToDatabase = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://hemant11102219:${process.env.DATABASE_PASSWORD}@cluster0.ojlnq2k.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectToDatabase;
