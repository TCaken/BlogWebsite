const express = require("express")
const Article = require("./../models/article")
const router = express.Router()

router.get("/", (req, res) =>{
    res.send("This is article")
})

router.get("/new", (req, res)=>{
    res.render("articles/new", {
        message : "Message this is from router"
    })
})

router.get("/show/:slug", async (req, res)=>{
    try{
        let article = await Article.findOne({ slug : req.params.slug})
        // console.log(article)
        res.render("articles/show", {
            article : article
        })
    }catch(e){
        console.log(e)
        res.redirect("/");
    }
})

router.get("/edit/:slug", async (req, res) => {
    try{
        let article = await Article.findOne({ slug : req.params.slug})
        res.render("articles/edit", {
            article : article
        })
    }catch(e){
        console.log(e);
        res.redirect("/")
    }
})

router.post("/edit/:slug", async (req, res) => {
    try{
        let article = await Article.findOne({ slug : req.params.slug})
        article.title = req.body.title
        article.description = req.body.desc,
        article.markdown = req.body.markdown

        article = await article.save()
        res.redirect(`/articles/show/${article.id}`)
    }
    catch(e){
        console.log(e)
        res.render("articles/edit", {
            article : article
        })
    }
})

router.post("/", async (req, res)=>{
    let article = new Article({
        title: req.body.title,
        description : req.body.desc,
        markdown: req.body.markdown
    })

    try{
        article = await article.save()
        res.redirect(`/articles/show/${article.slug}`)
    } catch(e){
        console.log(e)
        res.render("articles/new", {
            message : "Something happened! Please try again!",
            article : article,
        })
    }
})

router.delete("/delete/:id", async (req, res)=>{
    try{
        await Article.findByIdAndDelete(req.params.id)
    }catch(e){
        console.log(e)
    }
    res.redirect("/")
})

module.exports = router