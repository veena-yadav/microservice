const axios = require("axios");
axios.default.withCredentials = true;
const producer = require("./kafka/producer");
const consumer = require("./kafka/consumer");
const request = require("request");
const producer1 = require("./kafka/client_pro")

//const api=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDYxNDVlMjdlZDVjZjU1ZGViMWQ3MCIsImlhdCI6MTY2MTM1NTI2OSwiZXhwIjoxNjYzOTQ3MjY5fQ.MytWjGcCopbFmgpQxCEvGF1BIr-uja3wVonl_xghfUw

const url = "http://host.docker.internal:5000/api/medicine/view";

const loginurl = "http://host.docker.internal:5000/api/admin/login";
const url2 = "http://host.docker.internal:5000/user/placeOrder";
const url3 = "http://host.docker.internal:5000/api/reorder";
const reorderurl = "http://host.docker.internal:5000/api/admin/reordermedicine";
const updateMedicineurl = "http://host.docker.internal:5000/api/medicine/update/";
const moveurl = "http://host.docker.internal:5000/user/moveOrderBucket"


var MedicinDetails = {

  //reorder event
  moveOrderBucket: function (req, res) {
    request.post({

      url: moveurl,
      json: true,
      body: req.body


    }, function (err, response, body) {
      //producer(JSON.stringify(body))

      console.log(body)
      producer(JSON.stringify(body))

      res.send(body)
    })
  },

  //Admin:accept req 

  updateMedicine: function (req, res) {
    request.patch({

      url: updateMedicineurl + req.params.itemName,
      json: true,
      body: req.body

    }, function (err, response, body) {

      producer1(body)
      // console.log(body)
      //    console.log("err)
      res.send(body)
    })
  },

  getMedicine: function (req, res) {
    axios({
      method: "get",
      url: url,
      responseType: "json",
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  //belothreshold
  getMedicinebyvalue: function (req, res) {
    request(url3, function (err, response, body) {
      //setInterval(() => {
      //       producer(body)
      //   //  console.log()

      // }, 6000); res.send(body)
      producer(body)
      res.send(body)
    })
  },

  order: function (req, res) {
    request.post({

      url: url2,
      json: true,
      body: req.body


    }, function (err, response, body) {
      producer(JSON.stringify(body))
      console.log(body)
      res.send(body)
    })
  },

  Login: function (req, res) {
    axios({
      method: "post",
      url: loginurl,
      data: req.body,
      withCredentials: true,
    }).then((e) => {
      console.log(e);
    });

    res.send("succcesssfull");
  },

  reorderMed: function (req, res) {

    axios({ method: 'post', url: reorderurl, data: req.body }).then((e) => {

      console.log(e.data);

      res.send("reorder medicine Added. ")

    })



  },

  getNotification: function (req, res) {

    var list = req.body;
    //console.log(list)
    for (let x of list) {
      console.log(x)
    }
    res.send("notification sent")
  },
};
module.exports = MedicinDetails;