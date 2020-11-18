/// <reference lib="es2015.symbol" />

declare module 'doublylinked' {

    type Maybe<T> = T | void;

    export namespace DoublyLinked {
        export interface Node {
            value: any;
            readonly prev?: Node;
            readonly next?: Node;

            remove(): void;
        }
    }

    export default class DoublyLinked<T = any> {
        constructor(...element: T[]);

        readonly cursor: DoublyLinked.Node;

        readonly head: DoublyLinked.Node;

        readonly length: number;

        readonly tail: DoublyLinked.Node;

        concat(...element: T[]): DoublyLinked;

        entries(): IterableIterator<[number, T]>;

        keys(): IterableIterator<number>;

        values(): IterableIterator<T>;

        every(callback: (element: T, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): boolean;

        everyRight(callback: (element: T, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): boolean;

        filter(callback: (element: T, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): DoublyLinked;

        find(callback: (element: T, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): T;

        forEach(callback: (element: T, index?: number, thisArg?: any) => void, thisArg?: any): void;

        forEachRight(callback: (element: T, index?: number, thisArg?: any) => void, thisArg?: any): void;

        includes(element: T, fromIndex?: number): boolean;

        insert(...element: T[]): number;

        join(separator): string;

        map(callback: (element: T, index?: number, thisArg?: any) => void): DoublyLinked;

        next(): T;

        pop(): T;

        prev(): T;

        push(...element: T[]): number;

        reduce(callback: (accumulator: any, element: T, index?: number, thisArg?: any) => any, initialValue?: any): any;

        reduceRight(callback: (accumulator: any, element: T, index?: number, thisArg?: any) => any, initialValue?: any): any;

        remove(element: T, fromIndex?: number): any;

        reset(): DoublyLinked;

        reverse(): DoublyLinked;

        shift(): T;

        slice(start?: number, end?: number): T[];

        some(callback: (element: T, index?: number, thisArg?: any) => boolean, thisArg?: any): boolean;

        someRight(callback: (element: T, index?: number, thisArg?: any) => boolean, thisArg?: any): boolean;

        toArray(): T[];

        toString(): string;

        unshift(...element: T[]): number;

    }

}
