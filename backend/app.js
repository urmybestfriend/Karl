require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors");
const { default: axios } = require("axios")

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post('/getData', (req, res) => {
    console.log(req.body.data)
    axios.post("https://api-pcv.gridbees.com/order/stream", req.body.data, {
        headers: {
            Authorization: "Bearer " + "MzQyMzJjMjQtYWFmYS00NzVjLWFjMDQtNDY0YzQ5MjRmM2Y2"
        }
    }).then((data) => {
        console.log(data);
        return res.send({message: "Success", status: 200, data: data.data, error: null});
    }).catch((err) => {
        console.log(err);
        return res.send({message: "error", status: 400, data: null, error: err})
    });
})
app.listen(process.env.PORT, async () => {
    console.log("express server is running on port:" + process.env.PORT)
    
})