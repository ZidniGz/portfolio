const express = require("express")
var app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req,res)=>res.render("index"))
app.get("/profile", (req, res)=>res.render("profile"))
app.listen(3000)