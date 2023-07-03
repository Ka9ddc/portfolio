/* Conexão com o banco de dados(Esse banco de dados é um banco de testes) */

import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Wait connecting to database...");
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Atlas conectado!");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDatabase;
