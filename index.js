const express = require("express")
var app = express()
const path = require("path")
const got = require("got")

app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req,res)=>res.render("index"))
app.get("/profile", (req, res)=>res.render("profile"))
app.get("/views",(req,res)=>got('https://api.counterapi.dev/v1/azmi/azmi').json().then({count}=> res.send(count)))
app.listen(3000)
