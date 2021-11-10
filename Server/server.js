import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
import FikirModels from "./models/models.js";
import Admin from "./models/Admin.js";

mongoose.connect(
  "mongodb://localhost:27017/Fikir",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Basarılı mongoose baglantısı");
  }
);

app.get("/fikirler", (req, res) => {
  FikirModels.find().then((docs) => res.send(docs));
});

app.post("/giris", (req, res) => {
  const { username, password } = req.body;
  Admin.find({ username }).then((doc) => {
    if (doc[0].password == password)
      console.log("basarılı bir sekilde giris yaptınız");
    res.send("basarılı");
  });
});

app.post("/fikir", (req, res) => {
  const { tamIsim, emailAdress, Tur, Fikir } = req.body;
  FikirModels.create(
    {
      isim: tamIsim,
      emailAdress,
      Tur,
      Fikir,
    },
    (err) => {
      if (err) res.sendStatus(400);
      res.sendStatus(200);
    }
  );
});
app.listen(port, () => console.log(`${port} portunda calısıyor`));
