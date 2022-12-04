export declare function input(path: string): string;
export declare function input(path: string, ...seperators: []): string;
export declare function input(path: string, ...seperators: [string]): string[];
export declare function input(path: string, ...seperators: [string, string]): string[][];
export declare function input(path: string, ...seperators: [string, string, string]): string[][][];

declare interface Array<T> {
    by(n: number): Generator<unknown, undefined, T[]>;
}

declare interface Array<T extends string | number> {
    sum(): T;
}

declare interface Generator<T, TReturn, TNext> {
    by(n: number): Generator<unknown, undefined, TNext[]>;
    map<TOut>(fn: (val: TNext) => TOut): Generator<unknown, undefined, TOut>;
    filter<TOut>(fn: (val: TNext) => boolean): Generator<unknown, undefined, TOut>;
    find(fn: (val: TNext) => boolean): TNext;
    reduce<TOut>(fn: (acc: TOut, val: TNext) => TNext, acc: TOut): TOut;
    collect(): TNext[];
}

declare interface Generator<T, TReturn, TNext extends string | number> {
    sum(): TNext;
}
