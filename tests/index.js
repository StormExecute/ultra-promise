global.UltraPromise = require("../src/ultraPromise");
global.UltraPromiseW = require("../src/ultraPromiseW");

const { passTest, throwTest } = require("./logs");
const checkArrIdentify = require("./checkArrIdentify");

const fs = require("fs");
const nodePath = require("path");

const objects = fs.readdirSync(nodePath.join(__dirname, "./objects")).filter(object => !fs.lstatSync( nodePath.join(__dirname, "./objects/" + object) ).isDirectory() ).sort((a, b) => {
	
	const $a = parseInt(a.match(/\d+/));
	const $b = parseInt(b.match(/\d+/));
	
	return $a - $b;
	
});
const results = require("./results");

async function runTests() {

	for(let i = 0; i < objects.length; ++i) {
		
		const test = require("./objects/" + objects[i]);
		
		let result;
		
		try {
		
			result = await new Promise((resolve, reject) => {
				
				test(resolve, reject);
				
				setTimeout(() => reject("$$$TIMEOUT"), 10000);
				
			});
			
			result = { type: "resolve", value: result };
			
		} catch(e) {
			
			result = { type: "reject", value: e };
			
		}
		
		if(result.value === "$$$TIMEOUT") {
			
			throwTest(i, "timeout");
			continue;
			
		}
		
		const [needType, needResult] = results[i];
		
		if(needType !== result.type) {
			
			throwTest(i, "type");
			continue;
			
		}
		
		if(Array.isArray(result.value) && checkArrIdentify(needResult, result.value)) {
			
			passTest(i);
			continue;
			
		} else if(needResult === result.value) {
			
			passTest(i);
			continue;
			
		} else {
			
			throwTest(i, "value");
			continue;
			
		}
		
	}
	
	console.log("Done!");
	process.exit(0);
	
}

runTests();