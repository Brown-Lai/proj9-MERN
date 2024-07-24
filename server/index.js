const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
// 這行代碼引入了位於 ./config/passport 路徑下的配置文件，並將 passport 變量作為參數傳遞給這個配置文件中的函數。
require("./config/passport")(passport);
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/mernDB")
  .then(() => {
    console.log("connecting to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);
// course route 應該被jwt保護
// 如果request header內部沒有jwt，則request 竟會被視為是unauthorized
// 只有登入系統的人(JWT)，才能夠新增課程或註冊課程
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, () => {
  console.log("後端伺服器正在聆聽 port 8080... ");
});
