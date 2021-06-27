module.exports = async (passTestWithResolve, passTestWithReject) => {
	
	const result = await global.UltraPromiseW(resolve => {

		setTimeout(() => resolve(123), 10);

	})
	.then(function(firstResult, resolve, reject) {
		
		reject(new Error("someError"));
		
	});
	
	if(result._ultraPromiseError) {
		
		return passTestWithReject(result._ultraPromiseError.message);
		
	}
	
	return passTestWithResolve(result);
	
};