module.exports = (passTestWithResolve, passTestWithReject) => {
	
	let finishWasCalled = false;
	let _catchWasCalled = false;
	
	return new global.UltraPromise((resolve, reject) => {
		
		resolve();
		
	}).finally(() => {
		
		if(!finishWasCalled) {
			
			return passTestWithResolve(1);
			
		}
		
		return new global.UltraPromise((resolve, reject) => {
		
			reject("error");
			
		}).finally(() => {
			
			if(!_catchWasCalled) {
			
				return passTestWithResolve(2);
				
			}
			
			return passTestWithResolve(3);
			
		}).catch(() => {
		
			_catchWasCalled = true;
			
		});
		
	}).finish(() => {
		
		finishWasCalled = true;
		
	});
	
};