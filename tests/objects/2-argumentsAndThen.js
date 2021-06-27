module.exports = (passTestWithResolve, passTestWithReject) => {
	
	return new global.UltraPromise((resolve, reject) => {
		
		setTimeout(() => resolve(1, 2, 3), 100);
		
	}).then((one, two, three, resolve) => {
		
		resolve(one, two, three);
		
	}).finish((one, two, three) => {
		
		passTestWithResolve([one, two, three]);
		
	});
	
};