const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { error } = require("console");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

mongoConnect(() => {
  app.listen(3000, () => console.log("Server started Successfully"));
});

app.use((req, res, next) => {
  User.findById("656dcc23f5e69c065226c747")
    .then((user) => {
      req.user = new User(user.name, user.email, user._id, user.cart || []);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
