import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const { PORT, PORT_NODE, MONGO_URL, JWT_SECRET, EXPIRES_IN } = process.env;

const dbConnection = async () => {

     mongoose.set("strictQuery", false);

     try {

          await mongoose.connect(MONGO_URL as string);
          console.log("==> Database successfully connect.");

     } catch (err) {
          console.log("==> Database error connect.");
          process.exit(1);
     };
};

export default {
     connect: dbConnection,
     port: PORT,
     port_node: PORT_NODE,
     JWT_SECRET: JWT_SECRET,
     EXPIRES_IN: EXPIRES_IN,
};