module.exports = (passTestWithResolve, passTestWithReject) => {
	
	let count = 0;
	
	return new global.UltraPromise(resolve => {
		
		resolve("many");
		
	}).finish(arg => {
		
		arg == "many" && (++count);
		
	}).finish(arg => {
		
		arg == "many" && (++count);
		
	}).finish(arg => {
		
		arg == "many" && (++count);
		
	}).finish(arg => {
		
		if(count == 3) {
			
			passTestWithResolve(arg);
			
		} else {
			
			passTestWithResolve(false);
			
		}
		
	});
	
};