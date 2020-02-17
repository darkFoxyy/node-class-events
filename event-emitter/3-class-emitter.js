'use strict';

class EventEmitter {
    constructor() {
        this.events = new Map();
        this.wrappers = new Map();
    }

    on(name, fn) {
        console.log('ON. this.events :', this.events)
        const event = this.events.get(name);
        console.log('ON. event :', event)
        if (event) event.add(fn);
        else this.events.set(name, new Set([fn]));
        console.log('ON. event after :', event)
        console.log('ON. this.events after :', this.events)
    }

    once(name, fn) {
        const wrapper = (...args) => {
            this.remove(name, wrapper);
            fn(...args);
        };
        this.wrappers.set(fn, wrapper);
        console.log('ONCE. this.wrappers :', this.wrappers)
        console.log('ONCE. wrapper :', wrapper)
        this.on(name, wrapper);
    }

    emit(name, ...args) {
        const event = this.events.get(name);
        if (!event) return;
        for (const fn of event.values()) {
            fn(...args);
        }
    }

    remove(name, fn) {
        const event = this.events.get(name);
        if (!event) return;
        if (event.has(fn)) {
            event.delete(fn);
            return;
        }
        console.log('REMOVE. wrappers :', this.wrappers)
        const wrapper = this.wrappers.get(fn);
        console.log('REMOVE. wrapper :', wrappers)
        if (wrapper) {
            event.delete(wrapper);
            if (event.size === 0) this.events.delete(name);
        }
    }

    clear(name) {
        if (name) this.events.delete(name);
        else this.events.clear();
    }

    count(name) {
        const event = this.events.get(name);
        return event ? event.size : 0;
    }

    listeners(name) {
        const event = this.events.get(name);
        return new Set(event);
    }

    names() {
        return [...this.events.keys()];
    }
}

// Usage

const ee = new EventEmitter();

// on and emit

// ee.on('e1', data => {
//     console.dir(data);
// });

// ee.emit('e1', { msg: 'e1 ok' });

// once

// ee.once('e2', data => {
//     console.dir(data);
// });

// ee.emit('e2', { msg: 'e2 ok' });
// ee.emit('e2', { msg: 'e2 not ok' });

// remove

const f3 = data => {
    console.dir(data);
};

ee.on('e3', f3);
// ee.on('e3', () => { });
// ee.on('e3', () => { });
console.log('e3 count :', ee.count('e3'))
// ee.remove('e3', f3);
ee.once('e3', data => console.log('ONCE E3 :', data))


ee.emit('e3', { msg: 'e3 not ok' });

// count

// ee.on('e4', () => { });
// ee.on('e4', () => { });
// ee.on('e4', () => { });
// ee.on('e4', () => { });
// console.log('e4 count :', ee.count('e4'));

// clear

// ee.clear('e4');
// ee.emit('e4', { msg: 'e4 not ok' });
// ee.emit('e1', { msg: 'e1 ok' });

// ee.clear();
// ee.emit('e1', { msg: 'e1 not ok' });

// listeners and names

// ee.on('e5', () => { });
// ee.on('e5', () => { });
// ee.on('e6', () => { });
// ee.on('e7', () => { });

// console.log('listeners', ee.listeners('e5'));
// console.log('names', ee.names());