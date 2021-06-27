interface UltraPromiseConfigs {
	
	resolveTimeout?: number;
	rejectTimeout?: number;
	
	usedTimeout?: string | false;
	
	useTryCatch?: boolean;
	
	runMustCalled?: boolean;
	
	finallyPriority?: number
	
}

type PromiseFn = (this: {

	toFinish(...args: any[]): true;

}, resolve: Function, reject: Function) => any;

declare class UltraPromise {
	
	constructor(configs?: UltraPromiseConfigs | PromiseFn, fn?: PromiseFn);
	
	public config(configsObject: UltraPromiseConfigs): this;
	public run(): true;
	public then(fn: PromiseFn): this;
	public catch(fn: (error: any) => void): this;
	public finally(fn: (error: any, ...args: any[]) => void): this;
	public finish(fn: Function): this;
	
	public toFinish(...args: any[]): true;
	
	private _setIntervalToRunMainFn(): void;
	private _setTimeout(fn: Function): void;
	private _makeResolveReject(fn: Function): void;
	private _resolve(): void;
	private _reject(err: any): void;
	private _done(err: any, ...args: any[]): void;
	
}

declare namespace ultraPromiseW {}

declare const ultraPromiseW: {
	
	(configs?: UltraPromiseConfigs | (() => void), fn?: PromiseFn): typeof ultraPromiseW;
	
	run(): true;
	
	finish(fn: Function): typeof ultraPromiseW;
	
	config(configsObject: UltraPromiseConfigs): typeof ultraPromiseW;
	
	then(fn: PromiseFn): typeof ultraPromiseW;
	catch(fn: (error: any) => void): typeof ultraPromiseW;
	finally(fn: (error: any, ...args: any[]) => void): typeof ultraPromiseW;
	
	switchToUltraPromise(): typeof ultraPromiseW;
	switchToPromise(): typeof ultraPromiseW;
	
}

declare namespace ultraPromiseWrapper {}

declare const ultraPromiseWrapper: {
	
	(configs?: UltraPromiseConfigs | PromiseFn, fn?: PromiseFn): typeof ultraPromiseWrapper;
	
	run(): true;
	
	finish(fn: Function): typeof ultraPromiseWrapper;
	
	config(configsObject: UltraPromiseConfigs): typeof ultraPromiseWrapper;
	
	then(fn: PromiseFn): typeof ultraPromiseWrapper;
	catch(fn: (error: any) => void): typeof ultraPromiseWrapper;
	finally(fn: (error: any, ...args: any[]) => void): typeof ultraPromiseWrapper;
	
}

declare namespace ultraPromise {}

declare const ultraPromise: {

	default: typeof UltraPromise;
	ultraPromiseW: typeof ultraPromiseW;
	ultraPromiseWrapper: typeof ultraPromiseWrapper;
	
}

export = ultraPromise;