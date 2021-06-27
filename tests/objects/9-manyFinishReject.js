module.exports = (passTestWithResolve, passTestWithReject) => {
	
	let count = 0;
	
	return new global.UltraPromise((_, reject) => {
		
		reject("many");
		
	}).finish(arg => {
		
		arg == "many" && (++count);
		
	}).finish(arg => {
		
		arg == "many" && (++count);
		
	}).finish(arg => {
		
		arg == "many" && (++count);
		
	}).finish($error => {
		
		$error == "many" && (++count);
		
	}).finish($error => {
		
		$error == "many" && (++count);
		
	}).finish($error => {
		
		if(count == 2) {
			
			passTestWithReject($error);
			
		} else {
			
			passTestWithReject(false);
			
		}
		
	});
	
};