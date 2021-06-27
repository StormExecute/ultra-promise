module.exports = (passTestWithResolve, passTestWithReject) => {
	
	return new global.UltraPromise(resolve => {
		
		resolve(123);
		
	}).then((arg, resolve, reject) => {
		
		reject("test");
		
	}).then(resolve => {
		
		resolve(true);
		
	}).catch(err => {
		
		passTestWithReject(err);
		
	}).finish(result => {
		
		passTestWithResolve(result);
		
	});
	
};