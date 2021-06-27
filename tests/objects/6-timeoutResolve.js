module.exports = (passTestWithResolve, passTestWithReject) => {
	
	return new global.UltraPromise({
		
		usedTimeout: "resolve",
		resolveTimeout: 100,
		
	}, resolve => {
		
		resolve();
		
	}).then(() => {
		
		
		
	}).finish(timeoutError => {
		
		passTestWithResolve(timeoutError && timeoutError._ultraPromiseError);
		
	});
	
};