const UltraPromise = require("./ultraPromise");

const UltraPromiseWrapper = (configs, fn) => {
	
	const instance = new UltraPromise(configs, fn);
	
	const methods = {
		
		config(cfgs) {
			
			instance.config(cfgs);
			
			return methods;
			
		},
		
		then(fn) {
			
			instance.then(fn);
			
			return methods;
			
		},
		
		run() {
			
			instance.run();
			
			return true;
			
		},
		
		catch(fn) {
			
			instance.catch(fn);
			
			return methods;
			
		},
		
		finally(fn) {
			
			instance.finally(fn);
			
			return methods;
			
		},
		
		finish(fn) {
			
			instance.finish(fn);
			
			return methods;
			
		},
		
	};
	
	return methods;
	
};

module.exports = UltraPromiseWrapper;