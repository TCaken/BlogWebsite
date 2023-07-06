const express = require("express")
const app = express()

PORT = 5000

app.get("/", (req, res) =>  {
    res.send("<h1>Hello World!</h1>")
})

app.listen(PORT, (req, res)=>{
    console.log("Server listen on localhost:%i", PORT)
})