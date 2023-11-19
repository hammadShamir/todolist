const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();


let listItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItem = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", function (req, res) {

    let day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItem: listItems
    });
});


app.post("/", function (req, res) {

    var item = req.body.newItem;

    if (req.body.list === "work") {
        workItem.push(item);
        res.redirect("/work");
    } else {
        listItems.push(item);
        res.redirect("/")
    }


});



app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "work List",
        newListItem: workItem
    });
})

app.get("/about", function (req, res) {
    res.render("about");
})


// RUN SERVER
if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT, () => {
        console.log(`Server Started at Port ${process.env.PORT}`);
    });
}
app.listen(3000, () => {
    console.log("Server Started at 3000 Port");
})