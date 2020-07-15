/// <reference lib="es2015.symbol" />

declare module 'doublylinked' {

    type Maybe<T> = T | void;

    class Node {
        value: any;
        readonly prev?: Node;
        readonly next?: Node;
    }

    export default class DoublyLinked {
        constructor(...element: any[]);

        readonly cursor: Node;

        readonly head: Node;

        readonly length: number;

        readonly tail: Node;

        concat(...element: any[]): DoublyLinked;

        entries(): IterableIterator<[number, any]>;

        keys(): IterableIterator<number>;

        values(): IterableIterator<any>;

        every(callback: (element: any, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): boolean;

        everyRight(callback: (element: any, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): boolean;

        filter(callback: (element: any, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): DoublyLinked;

        find(callback: (element: any, index?: number, thisArg?: any) => Maybe<boolean>, thisArg?: any): any;

        forEach(callback: (element: any, index?: number, thisArg?: any) => void, thisArg?: any): void;

        forEachRight(callback: (element: any, index?: number, thisArg?: any) => void, thisArg?: any): void;

        includes(element: any, fromIndex?: number): boolean;

        insert(...element: any[]): number;

        join(separator): string;

        map(callback: (element: any, index?: number, thisArg?: any) => void): DoublyLinked;

        next(): any;

        pop(): any;

        prev(): any;

        push(...element: any[]): number;

        reduce(callback: (accumulator: any, element: any, index?: number, thisArg?: any) => any, initialValue?: any): any;

        reduceRight(callback: (accumulator: any, element: any, index?: number, thisArg?: any) => any, initialValue?: any): any;

        remove(element: any, fromIndex?: number): any;

        reset(): DoublyLinked;

        reverse(): DoublyLinked;

        shift(): any;

        some(callback: (element: any, index?: number, thisArg?: any) => boolean, thisArg?: any): boolean;

        someRight(callback: (element: any, index?: number, thisArg?: any) => boolean, thisArg?: any): boolean;

        toArray(): any[];

        toString(): string;

        unshift(...element: any[]): number;

    }

}