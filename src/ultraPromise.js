const isObject = require("../deps/isObject");

const fnArgNames = require("fn-arg-names").default;

const defaultConfigs = require("./defaultConfigs");

const generateDoneArgs = function(error, args) {
		
	const result = [error];
	
	result.push([].slice.call(args));
	
	return result;
	
};

const wrongInit = () => {
	
	let wasTransfered = false;
	
	const proxy = new Proxy({}, {
				
		get(t, prop) {
			
			if(prop == "catch") {
				
				return new Proxy(()=>{}, {
					
					get() {
						
						return proxy;
						
					},
					
					apply(t, thisArg, [handler]) {
						
						if(typeof handler == "function" && !wasTransfered) {
							
							wasTransfered = true;
							
							handler({ _ultraPromiseError: "WRONG_INIT" })
							
						}
						
						return proxy
						
					}
					
				})
				
			}
			
			return new Proxy(()=>{}, {
					
				get() {
					
					return proxy;
					
				},
				
				apply() {
					
					return proxy
					
				}
				
			})
			
		}
		
	});
	
	return proxy;
	
};

const kUltraPromiseCalled = "__UltraPromiseCalled";

class UltraPromise {
	
	_inThenStatus = false
	_doneWasCalled = false
	_runWasCalled = false
	
	constructor(configs, fn) {
		
		if(typeof configs == "function") {
			
			fn = configs;
			configs = undefined;
			
			this.config({});
			
		} else if(isObject(configs)) {
			
			this.config(configs);
			
		} else {
		
			this.config({});
		
		}
		
		if(typeof fn != "function") {
			
			return wrongInit();
			
		}
		
		this._firstFn = fn;
		
		this._tasksStack = [];
		
		this._finishHandlers = [];
		
		this._catchHandler = null;
		this._finallyHandler = null;
		
		if(!this._configs.runMustCalled) this._setIntervalToRunMainFn();
		
		return this;
		
	}
	
	config(configsObject) {
		
		this._configs = this._configs || {};
		
		for(const key in defaultConfigs) {
			
			if(configsObject.hasOwnProperty(key)) {
				
				this._configs[key] = configsObject[key];
				
			} else if(!this._configs.hasOwnProperty(key)) {
				
				this._configs[key] = defaultConfigs[key];
				
			}
			
		}
		
		return this
		
	}
	
	_setIntervalToRunMainFn() {
			
		const mainFnInterval = setInterval(() => {
			
			if(this._inThenStatus) return;
			
			if(this._configs.runMustCalled) {
				
				clearInterval(mainFnInterval);
				return;
				
			}
			
			this.run();
			
			clearInterval(mainFnInterval);
			
		}, 3);
		
	}
	
	_setTimeout(fn) {
		
		if(this._configs.usedTimeout) {
			
			const usedTimeout = this._configs.usedTimeout == "reject" ? "rejectTimeout" : "resolveTimeout";
			
			setTimeout(() => {
				
				if(fn[kUltraPromiseCalled]) return;
				
				fn[kUltraPromiseCalled] = true;
				
				this["_" + this._configs.usedTimeout]({ _ultraPromiseError: "TIMEOUT" });
				
			}, this._configs[usedTimeout])
			
		}
		
	}
	
	_makeResolveReject(fn) {
		
		return [
		
			(...args) => {
				
				if(fn[kUltraPromiseCalled]) return;
				
				fn[kUltraPromiseCalled] = true;
				
				this._resolve.apply(this, args);
				
			},
			
			(...args) => {
				
				if(fn[kUltraPromiseCalled]) return;
				
				fn[kUltraPromiseCalled] = true;
				
				this._reject.apply(this, args);
				
			}
			
		];
		
	}
	
	run() {
		
		if(this._runWasCalled) return;
		
		this._runWasCalled = true;
		
		const [resolve, reject] = this._makeResolveReject(this._firstFn);
			
		this._firstFn.apply(this, [resolve, reject]);
		
		this._setTimeout(this._firstFn);
		
		return true
		
	}
	
	then(fn) {
			
		this._tasksStack.push(fn);
		
		if(!this._configs.runMustCalled) {
			
			this._inThenStatus = this._inThenStatus ? this._inThenStatus + 1 : 1;
		
			setTimeout(() => {
				
				this._inThenStatus -= 1;
				
			}, 1);
			
		}
		
		return this
		
	}
	
	_resolve() {
		
		if(this._doneWasCalled) return;
			
		if(!this._tasksStack.length) return this._done.apply(this, generateDoneArgs(null, arguments));
		
		const nowTaskFn = this._tasksStack[0];
		
		this._tasksStack.splice(0, 1);
		
		const [resolve, reject] = this._makeResolveReject(nowTaskFn);
		
		if(this._configs.useTryCatch) {
		
			try {
				
				nowTaskFn.apply({ toFinish: this.toFinish.bind(this) }, ([].slice.call(arguments)).concat([resolve, reject]));
				
				this._setTimeout(nowTaskFn);
				
			} catch(err) {
				
				return this._done(err)
				
			}
			
		} else {
			
			nowTaskFn.apply({ toFinish: this.toFinish.bind(this) }, ([].slice.call(arguments)).concat([resolve, reject]));
				
			this._setTimeout(nowTaskFn);
			
		}
		
	}
	
	_reject(err) {
		
		this._done(err);
		
	}
	
	catch(fn) {
		
		this._catchHandler = fn;
		
		return this
		
	}
	
	finally(fn) {
		
		this._finallyHandler = fn;
		
		return this
		
	}
	
	finish(handler) {
		
		this._finishHandlers.push(handler);
		
		return this
			
	}
	
	toFinish() {
		
		this._done.apply(this, generateDoneArgs(null, arguments))
		
		return true;
		
	}
	
	_done(err, args) {
		
		if(this._doneWasCalled) return;
		
		this._doneWasCalled = true;
			
		this._configs.finallyPriority > 0 && typeof this._finallyHandler == "function" && this._finallyHandler.apply(this, [err].concat(args));
		
		if(err) {
			
			if(this._catchHandler) this._catchHandler(err);
			
		}
			
		if(this._finishHandlers.length) {
			
			if(!err && this._finishHandlers.length == 1) {
				
				this._finishHandlers[0].apply(this, args);
				
			} else {
				
				for(let i = 0; i < this._finishHandlers.length; ++i) {
					
					const handler = this._finishHandlers[i];
					
					const argNames = fnArgNames(handler);
					
					if(err && argNames[0] == "$error") {
						
						handler.apply(this, [err].concat(args));
						
					} else if(!err && argNames[0] != "$error") {
						
						handler.apply(this, args);
						
					}
					
				}
				
			}
			
		}
		
		this._configs.finallyPriority <= 0 && typeof this._finallyHandler == "function" && this._finallyHandler.apply(this, [err].concat(args));
		
	}
	
}

module.exports = UltraPromise;