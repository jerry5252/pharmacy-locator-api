const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const medicineRouter = require("./routes/medicine");
const pharmacyRouter = require("./routes/pharmacy");
const adminRouter = require("./routes/admin");
const searchRouter = require("./routes/searchSelected")
const app = express();
dotenv.config();

mongoose
  .connect("mongodb://localhost/pharmacy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDb ..."))
  .catch((error) => console.log("could not connect to database" + error));

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/meds", medicineRouter);
app.use("/pharmacy", pharmacyRouter);
app.use("/admin", adminRouter);
app.use("/search", searchRouter)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening to port ${port}`));
