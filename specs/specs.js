let sinon = require("sinon"),
	chai = require("chai"),
	expect = chai.expect,
	should = chai.should(),
	Greeting = require('../src/app.js'),
	logger   = require("../src/logger.js");

describe("Greeting App", function() {

	xit("should test if Greetings exist", function() {

		var app = new Greeting();

		expect(app).to.be.an('object');
	})

	it("should test if a name argument was passed", function() {

		var expectedName = "Laura"

		var app = new Greeting(expectedName);

		expect(app.name).to.equal(expectedName);
	})

	it("should test if a default name was generated", function() {

		var app = new Greeting();

		expect(app.name).to.not.be.null;
	})

	it("should test if greeting was called", function() {

		var app = new Greeting();

		var greetSpy = sinon.spy(app, "greet");

		app.greet();

		expect(greetSpy.calledOnce).to.be.true;
	})

	xit("should test if greeting was returned", function() {

		let expectedMessage = "Hi, Jane",

			app = new Greeting(),

			expectedResult;

		expectedResult = app.greet("Hi");
		console.log(expectedResult);

		expect(expectedResult).to.equal(expectedMessage)

	})

	describe("#greet", function() {

		var log, error, sandbox, play;

		before(function() {
			play    = new Greeting("jude"),
			sandbox = sinon.sandbox.create(),
			log     = sandbox.stub(logger, "log"),
			error   = sandbox.stub(logger, "error");
		})

		afterEach(function() {

			log.reset();
			error.reset();
			sinon.sandbox.reset();
		})

		it("should pass a greeting message", function() {

			var expectedMessage  = "Good day and how are you jude",
				msg              = "Good day and how are you";

			play.greet(msg);

			sinon.assert.calledOnce(log);
			sinon.assert.calledWithExactly(log, expectedMessage)
			sinon.assert.notCalled(error);

		})

		it("should throw an error if msg is not passed", function() {

			var errMessage  = "no message passed";

			play.greet();

			sinon.assert.calledOnce(error);
			sinon.assert.calledWithExactly(error, errMessage);
			sinon.assert.notCalled(log);
		})
	})

	describe("#lateGreeting", function() {

		it("should check if greet was called", function(done) {

			var play      = new Greeting("jide"),
				msg       = "Good day and how are you",
				greetSpy  = sinon.spy(play, "greet");

			play.lateGreeting(msg, function(err, val) {

				sinon.assert.calledOnce(greetSpy);

				done()
			})
		})

		it("should check if a msg was passed to lateGreeting", function(done) {
			var play      = new Greeting("jide");

			play.lateGreeting(null, function(err, val) {

				expect(err).to.be.an.instanceof(Error)

				done()

		   })
    	})	
 	})	

})