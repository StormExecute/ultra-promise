module.exports = (passTestWithResolve, passTestWithReject) => {
	
	return new global.UltraPromise((resolve, reject) => {
		
		setTimeout(() => resolve(true), 100);
		
	}).finish(result => {
		
		passTestWithResolve(result);
		
	});
	
};