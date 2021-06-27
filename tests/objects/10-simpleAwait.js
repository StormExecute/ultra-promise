module.exports = async (passTestWithResolve, passTestWithReject) => {
	
	const result = await global.UltraPromiseW(resolve => {

		setTimeout(() => resolve(123), 10);

	})
	.then(function(firstResult, resolve) {
		
		setTimeout(() => resolve(firstResult, 456), 20);
		
	})
	.then((firstResult, secondResult, resolve) => {
		
		setTimeout(() => resolve(firstResult, secondResult, 789), 30);
	
	});
	
	passTestWithResolve(result);
	
};