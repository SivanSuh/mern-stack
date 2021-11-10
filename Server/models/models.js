import Mongoose from "mongoose";

const Schema = Mongoose.Schema;
const fikirSchema = new Schema({
  isim: String,
  emailAdress: String,
  Tur: String,
  Fikir: String,
});

export default Mongoose.model("fikir", fikirSchema);
