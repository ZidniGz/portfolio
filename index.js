const express = require("express")
var app = express()
const path = require("path")
const got = require("got")
async function AgentGpt(question, history = [{
  type: "ai",
  data: {
    content: "Model AI",
    additional_kwargs: {}
  }
}]) {
  const url = "https://mylangchain.vercel.app/api/agentchat";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://mylangchain.vercel.app/?page=1"
  };
  const data = {
    bot: "",
    question: question,
    history: history,
    toolsSelect: ["Google Search", "WebPilot", "URL Reader", "Creature Generator", "Pinecone Store", "Medium plugin", "Filtir", "AI Agents", "Xpapers", "getit.ai plugins finder", "Eightify Insights", "Ukr-School-Books", "Welt NewsVerse", "Stories", "My Writing Companion", "Video Summary", "Check Website Down", "Paxi AI"]
  };
  try {
    const response = await got(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    }).text()
    const result = response
    const {
      action_input: output
    } = JSON.parse("{" + result.split("\n").slice(2, 5).join(""));
    return output;
  } catch (error) {
    console.error(error);
  }
}
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req,res)=>res.render("index"))
app.get("/profile", (req, res)=>res.render("profile"))
app.get("/termux", (req, res)=>res.redirect("https://github.com/termux/termux-app/releases/download/v0.119.0-beta.1/termux-app_v0.119.0-beta.1+apt-android-7-github-debug_universal.apk"))
app.get("/mt-manager", (req, res)=>res.redirect("https://github.com/ZidniGz/portfolio/raw/refs/heads/main/public/assets/MT_Manager.apk"))
app.get("/code-bot", (req, res)=>res.redirect("https://pastebin.com/x5Pf8bVH"))
app.post("/agentgpt", async (req, res) => {
  const { question, history } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }
  const result = await AgentGpt(question, history);
  if (result) {
    res.json({ response: result });
  } else {
    res.status(500).json({ error: "Failed to get response from AgentGpt" });
  }
});
app.get("/views",async(req,res)=>{
  let { count } = await got('https://api.counterapi.dev/v1/azmi/azmi').json()
    res.json({count:count})
})
app.listen(3000)
