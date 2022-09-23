const axios = require("axios");
axios.default.withCredentials = true

const request = require('request')
const url = "http://localhost:5000/api/medicine/view";
const loginurl = "http://localhost:5000/api/admin/login";
const url2 = "http://localhost:5000/api/medicine/";
const reorderurl = "http://localhost:5000/api/admin/reordermedicine"

var MedicinDetails =
{
    getMedicine: function (req, res) {
        axios({
            method: 'get',
            url: url,
            responseType: 'json'

        })
            .then(function (response) {
                console.log(response.data)
                res.send(response.data)
            })
            .catch(error => { console.log(error) })
    },

    getMedicinebyvalue: function (req, res) {
        axios({
            method: 'get',
            url: url2,
            responseType: 'json', withCredentials: true
        })
            .then(function (response) {
                console.log(response.data)
                res.send(response.data)
            })
            .catch(error => { console.log(error) })
    },

    Login: function (req, res) {
        axios({
            method: 'post',
            url: loginurl,
            data: req.body, withCredentials: true
        })
            .then((e) => {
                console.log(e)
            })

        res.send("succcesssfull")
    },

    reorderMed: function (req, res) {
        axios({ method: 'post', url: reorderurl + 'reordermedicines', data: req.body }).then((e) => {
            console.log(e.data);
            res.send("reorder medicine Added. " + e.data)
        })
    }
}
module.exports = MedicinDetails
