function Core() {

	this.modules = {};
	
}

Core.prototype = {

	addModule: function (module_id, mod) {

		this.modules[module_id] = mod;
	},

	registerEvents: function(evt, module_id) {

		if(typeof evt !== 'object')
			throw "expected first argument evt to be an object"

		var theMod = this.modules[module_id]
		theMod.events = evt
	},

	triggerEvents: function(evt) {
		
		var mod, modules;

		for(mod in modules) {
			if(modules.hasOwnProperty(mod)) {
				mod = modules[mod];
				if(mod.events && mod.events["evt.type"]) {
					mod.events[evt.type](evt.data)
				}
			}
		}



		}
	}

module.exports = Core;