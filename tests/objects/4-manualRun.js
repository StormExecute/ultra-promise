module.exports = (passTestWithResolve, passTestWithReject) => {
	
	const promise = new global.UltraPromise((resolve, reject) => {
		
		resolve("yes");
		
	}).config({
		
		runMustCalled: true
		
	}).finish(result => {
		
		passTestWithResolve(result);
		
	});
	
	setTimeout(promise.run.bind(promise), 300);
	
};