module.exports = async (passTestWithResolve, passTestWithReject) => {
	
	let _catchWasCalled = false;
	let finishWasCalled = false;
	
	const result = await global.UltraPromiseW(resolve => {

		setTimeout(() => resolve(123), 10);

	})
	.catch(err => {
		
		if(err === 123) {
		
			_catchWasCalled = true;
			
		}
		
	})
	.finish(result => {
		
		finishWasCalled = true;
		
	})
	.then(function(firstResult, resolve, reject) {
		
		reject(firstResult);
		
	});
	
	if(result === null && _catchWasCalled && !finishWasCalled) {
		
		return passTestWithReject(true);
		
	}
	
	passTestWithResolve(result);
	
};