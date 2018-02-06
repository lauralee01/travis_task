var logger = require("./logger.js");


function Greeting (name) {

	this.name = name || "Jane";
	// if(typeof name === undefined) {

	// 	this.name = "Jane";
	// }

	// this.name = name;
}

Greeting.prototype.greet = function(msg) {

	if(!msg){

		logger.error("no message passed");

		return;
	}

	logger.log( msg + " " + this.name );
	
}

Greeting.prototype.lateGreeting = function(msg, cb){

	var that =  this;

	setTimeout(function(){

		try{

			cb(null, that.greet(msg))

		} catch(err){
			cb(err)
		}
	}, 1000)
}

module.exports = Greeting;