module.exports = (passTestWithResolve, passTestWithReject) => {
	
	return new global.UltraPromise((resolve, reject) => {
		
		setTimeout(() => resolve({a: 1}, {b: 2}), 100);
		
	}).then(function (a, b, resolve) {
		
		this.toFinish(a.a + b.b);
		
		resolve();
		
	}).then(resolve => {
		
		resolve(10);
		
	}).finish(result => {
		
		passTestWithResolve(result);
		
	});
	
};