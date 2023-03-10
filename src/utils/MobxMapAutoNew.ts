export class MobxMapAutoNew<K, V> {
    private data: Map<K, V>;

    constructor(readonly fnBuild: (key: K) => V) {
        this.data = new Map();
    }

    get(key: K): V {
        const value = this.data.get(key);
        if (typeof value !== 'undefined') {
            return value;
        }

        const newValue = this.fnBuild(key);
        this.data.set(key, newValue);
        return newValue;
    }

    delete(key: K) {
        this.data.delete(key);
    }

    get size(): number {
        return this.data.size;
    }

    getAllKeys(): K[] {
        return Array.from(this.data.keys());
    }
}
