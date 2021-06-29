# ultra-promise [![NPM version][npm-image]][npm-url]

Function execution task scheduler.

# Description

A utility to help you solve a sequence of task-functions.

# Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [Examples](#examples)
* [Contacts](#contacts)

<div id='install'></div>

# Install

```bash
$ npm install ultra-promise
```

<div id='usage'></div>

# Usage

```javascript

const UltraPromise = require("ultra-promise").default;

UltraPromise((resolve, reject) => {

	setTimeout(() => resolve(123), 1000);

}).then((result, resolve) => {

	setTimeout(() => resolve(result + 333, 789), 1000);

}).finish((firstFinalResult, secondFinalResult) => {

	console.log(123, firstFinalResult, secondFinalResult); //123 456 789

});

```

<div id='api'></div>

# API

Types: [HERE!](https://github.com/StormExecute/ultra-promise/blob/master/index.d.ts)

### (new?) UltraPromise(configs?: UltraPromiseConfigs | PromiseFn, fn?: PromiseFn) => UltraPromiseInstance
The main function that launches the scheduler. Called with the new operator only if the original UltraPromise is exported (default exports the wrapper).

### UltraPromiseInstance.config(configs: UltraPromiseConfigs) => UltraPromiseInstance
Sets the settings for UltraPromise.

### UltraPromiseInstance.then(fn: PromiseFn) => UltraPromiseInstance
Allows you to set subsequent functions.

### UltraPromiseInstance.catch(fn: (error: any) => void) => UltraPromiseInstance
Sets a one-time error handler that is called when reject is called. A repeated call will replace the existing handler. It can only take one error argument, unlike subsequent methods.

### UltraPromiseInstance.finally(fn: (error: any, ...args: any[]) => void) => UltraPromiseInstance
Sets up a one-time handler that is called in any case, whether there was an error or not.

### UltraPromiseInstance.finish(fn: Function) => UltraPromiseInstance
Installs final handlers. Can be called multiple times, each handler will be called in turn. Can also act as a multiple error handler if the first argument is called "$error". 

### UltraPromiseInstance.run() => true
Forcibly starts the process of performing the assigned tasks.

### PromiseFn(this: { toFinish(...args: any[]): true }, resolve: Function, reject: Function) => any
The task function that is passed to then and the beginning. resolve lets you move on to the next task, reject jumps directly to the error handler. It is also possible to jump directly to the final handlers using this.toFinish . 

<div id='examples'></div>

# Examples

## Instant start with configs

```javascript

const { UltraPromise } = require("ultra-promise");

new UltraPromise({ runMustCalled: true }, resolve => {

	resolve(true, true, true);

}).finish((t1, t2, t3) => {

	console.log(t1, t2, t3); //true true true

}).run();

```

## Instant finish

```javascript

const { UltraPromise } = require("ultra-promise");

new UltraPromise(resolve => {

	resolve(true, true, true);

}).then(function(t1, t2, t3, resolve) {

	this.toFinish(t1, t2, t3);
	resolve(t1, t2, t3, true, true);

}).then((t1, t2, t3, t4, t5, resolve) => {

	resolve(t1, t2, t3, t4, t5, true);

}).finish((...args) => {

	console.log(args.length); //3

});

```

## Example with await

```javascript

const { UltraPromiseW } = require("ultra-promise");

async function test() {

	const result = await UltraPromiseW(resolve => {
	
		setTimeout(() => resolve(1), 100);
	
	}).then((one, resolve) => {
	
		setTimeout(() => resolve(one, 2), 100);
	
	}).then((one, two, resolve) => {
	
		setTimeout(() => resolve(one, two, 3), 100);
	
	});
	
	console.log(...result); //1 2 3

}

test();

```

<div id='contacts'></div>

# Contacts

**Yandex Mail** - vladimirvsevolodovi@yandex.ru

**Github** - https://github.com/StormExecute/

# Platforms

**Github** - https://github.com/StormExecute/ultra-promise/

**NPM** - https://www.npmjs.com/package/ultra-promise/

# License

**MIT** - https://mit-license.org/

[npm-url]: https://www.npmjs.com/package/ultra-promise
[npm-image]: https://img.shields.io/npm/v/ultra-promise.svg