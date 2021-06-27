module.exports = (passTestWithResolve, passTestWithReject) => {
	
	let finishWasCalled = false;
	
	const promise = new global.UltraPromise({
		
		runMustCalled: true,
		
	}, (resolve, reject) => {
		
		setTimeout(() => resolve(true), 100);
		
	}).config({
		
		usedTimeout: "reject"
		
	}).finish(() => {
		
		finishWasCalled = true;
		
	});
	
	setTimeout(() => passTestWithResolve([promise._configs.runMustCalled, promise._configs.usedTimeout, promise._configs.rejectTimeout, finishWasCalled]), 100);
	
};