const isObject = require("../deps/isObject");

const defaultConfigs = require("./defaultConfigs");

const UltraPromise = require("./ultraPromise");

const UltraPromiseW = (configs, fn) => {
		
	if(typeof configs == "function") {
		
		fn = configs;
		configs = {};
		
	} else if(!isObject(configs)) {
		
		configs = {};
		
	}
	
	if(typeof fn != "function") {
		
		return new Promise(resolve => resolve());
		
	}
	
	const ultraPromise = new UltraPromise(configs, fn);
	
	const promise = new Promise(resolve => {
		
		ultraPromise.finish($error => {
			
			if(ultraPromise._catchHandler) return resolve(null);
			
			return resolve({ _ultraPromiseError: $error });
			
		});
		
		ultraPromise.finish((...args) => {
			
			return resolve(args);
			
		});
		
	});
	
	const _origin = {
		
		then: promise.then,
		catch: promise.catch,
		finally: promise.finally,
		
	};
	
	promise.finish = fn => {
		
		ultraPromise.finish(fn);
		
		return promise
		
	};
	
	promise.run = () => (ultraPromise.run(), true);
	promise.config = configs => (ultraPromise.config(configs), promise);
	
	promise.switchToPromise = function() {
		
		promise.then = _origin.then;
		promise.catch = _origin.catch;
		promise.finally = _origin.finally;
		
		return promise;
		
	};
	
	promise.switchToUltraPromise = function() {
		
		promise.then = fn => (ultraPromise.then(fn), promise);
		promise.catch = fn => (ultraPromise.catch(fn), promise);
		promise.finally = fn => (ultraPromise.finally(fn), promise);
		
		return promise;
		
	};
	
	return promise.switchToUltraPromise();
	
};

module.exports = UltraPromiseW;