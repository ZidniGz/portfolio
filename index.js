const express = require("express")
var app = express()
const path = require("path")
const got = require("got")

app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req,res)=>res.render("index"))
app.get("/profile", (req, res)=>res.render("profile"))
app.get("/termux", (req, res)=>res.redirect("https://github.com/termux/termux-app/releases/download/v0.119.0-beta.1/termux-app_v0.119.0-beta.1+apt-android-7-github-debug_universal.apk"))
app.get("/mt-manager", (req, res)=>res.redirect(""))
app.get("/views",async(req,res)=>{
  let { count } = await got('https://api.counterapi.dev/v1/azmi/azmi').json()
    res.json({count:count})
})
app.listen(3000)
