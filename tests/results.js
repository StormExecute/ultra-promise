module.exports = [

	["resolve", true],
	
	["resolve", [1, 2, 3]],
	
	["resolve", 3],
	
	["resolve", "yes"],
	
	["reject", "test"],
	
	["resolve", "TIMEOUT"],
	
	["resolve", 3],
	
	["resolve", "many"],
	
	["reject", "many"],
	
	["resolve", [123, 456, 789]],
	
	["reject", "someError"],
	
	["reject", true],
	
	["resolve", [true, "reject", 10000, false]],

];