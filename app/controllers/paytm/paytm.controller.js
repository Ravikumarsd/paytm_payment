var checksum = require('./checksum');
module.exports= {
    getRequest: (req,res)=>{
        res.render("paytm/index");
    },
    request:(req,res) =>{
            var paramlist = req.body;
            var paramArray = new Array();

            for(name in paramlist) {
                if(name ==="PAYTM_MERCHANT_KEY") {
                    var PAYTM_MERCHANT_KEY = paramlist[name];
                } else {
                    paramArray[name] = paramlist[name];
                }
            }
            paramArray["CALLBACK_URL"] = "http://172.16.16.80:3001/api/paytm/response";
            checksum.genchecksum(paramArray,PAYTM_MERCHANT_KEY,(err,result)=>{
                if(err) throw err;
                res.render("paytm/request",{ result });
            })
    },
    response:(req,res)=>{
         console.log(req.body);
        // res.render("paytm/response");
        if(req.body.RESPCODE === "01") {
            res.render("paytm/response",{
                status: true,
                result: req.body
            });
        } else {
            res.render("paytm/response",{
                status: false,
                result: req.body
            });
        }
    }
};