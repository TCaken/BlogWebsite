const express = require("express")
const mongoose = require("mongoose")
const articleRouter = require("./routers/articles")
const Article = require("./models/article")
const methodOverride = require("method-override")
const app = express()

const dbUrl = "mongodb://127.0.0.1:27017/blog"
mongoose.connect(dbUrl, {
    useNewUrlParser: true 
});

mongoose.connection.once('open', function(){
    console.log("Database connected at ", dbUrl)
}).on('error', err => {
    console.log("Database connection error!", err)
})

app.set("view engine", "ejs")
app.set('views', __dirname + '/views')

app.use(express.urlencoded({ extended : false}))
app.use(methodOverride('_method'))
app.use("/articles", articleRouter)

PORT = 5000

app.get("/", async(req, res) =>  {
    const articles = await Article.find().sort({
        createdAt : "desc"
    })
    res.render('articles/index', {
        message : "From server",
        articles : articles
    })
})

app.listen(PORT, (req, res)=>{
    console.log("Server listen on localhost:%i", PORT)
})