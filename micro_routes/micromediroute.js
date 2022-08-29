
const controller=require("../Microservices/getMedicine")

module.exports=function(app)
{
    app.route("/getmedicines").get(controller.getMedicine);
    app.route("/belowthreshold").get(controller.getMedicinebyvalue);
   app.route("/login").post(controller.Login);

}