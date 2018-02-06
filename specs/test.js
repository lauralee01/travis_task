let sinon = require("sinon"),
	chai = require("chai"),
	expect = chai.expect,
	should = chai.should(),
	logger = require("../src/logger.js"),
	Core = require("../src/core.js"),
	Sb = require("../src/sandbox.js");
	
	

describe("modules", function() {

	var core;

	beforeEach(function() {
		core = new Core();
	});

	afterEach(function() {
		core = null;
	})

	it("should test if the property modules exists", function() {

		expect(core).to.have.property("modules")
	});

	it("should test if module exists as an object", function() {

		expect(core.modules).to.be.an("object");
	})

	describe("add module method", function() {

		it("should test if method addModule registers a module", function() {

			var moduleID = "chat",
				module = function chatModule() {},
				addModuleSpy = sinon.spy(core, 'addModule');
				core.addModule(moduleID, module);

			expect(core.modules).to.have.property(moduleID);
			expect(core.modules[moduleID]).to.equal(module);
			sinon.assert.calledOnce(addModuleSpy)

			addModuleSpy.restore()
		})
	})

	describe("registerEvent method", function() {

		it("should throw an error if the first argument is not a valid object", function() {

			var expectedArg = function noop() {};

			expect(function() {
				core.registerEvents(expectedArg, "anymodule")
			}).to.throw()
		})

		it("should register an event on an existing module", function() {

			var moduleID = "search",
				module = function() {},
				evt = {type:"fire", data:"laura"},
				registerEventSpy = sinon.spy(core, "registerEvents");

			core.addModule(moduleID, module);
			core.registerEvents(evt, moduleID);

			expect(core.modules[moduleID]['events']).to.equal(evt);
			sinon.assert.calledOnce(registerEventSpy);

			registerEventSpy.restore();
		})
	})

	describe("triggerEvents method", function() {

		it("it should test if a registered event has property type", function() {

			var evt = {type: function() {
				return "laura";
			},
				data: "laura"},
				moduleID  = "search",
				triggerEventSpy = sinon.spy(core, "triggerEvents");

			core.addModule(moduleID, module);
			core.registerEvents(evt, moduleID);
			core.triggerEvents(evt);

			expect(core.modules[moduleID].events).to.have.property("type");
			expect(core.modules[moduleID].events.type()).to.equal("laura");
			sinon.assert.calledOnce(triggerEventSpy)

			triggerEventSpy.restore()
				
			})


	})

	describe("listen function", function() {

		it("should check if function listen exists", function() {

			var sand = new Sb(core)
			expect(sand).to.have.property("listen");
		})

		it("should check if register event is called via sandbox", function() {

			var moduleID = "search",
				module = function() {},
				evt = {type:"do-search", data: "hello world"},
			 	listenSpy = sinon.spy(core, "registerEvents"),
			 	sand;

			core.addModule(moduleID, module);
			sand = new Sb(core);

			sand.listen(evt, moduleID);
			//expect(core.modules[moduleID]['events']).to.equal(evt);
			sinon.assert.calledOnce(listenSpy);

			listenSpy.restore();
		})

		it("should check if function notify exists", function() {

			var sand = new Sb(core)
			expect(sand).to.have.property("notify");
		})

		it("should check if trigger event is called via sandbox", function() {

			var moduleID = "book",
				module = function() {},
				evt = {type:"trigger", data: "hi laura"},
				triggerSpy = sinon.spy(core, "triggerEvents"),
				sand;

			core.addModule(moduleID, module);
			sand = new Sb(core);
			sand.listen(evt, moduleID);
			sand.notify(evt);
			
			sinon.assert.calledOnce(triggerSpy);

			triggerSpy.restore();


		})
	})
});


