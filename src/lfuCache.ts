import { CacheEntry } from "./types";

class LFUCache<T> {

    private maxSize: number;
    private cache: Map<string, CacheEntry<T>>;
    private frequencyMap: Map<number, number>;

    constructor(maxSize: number = 100) {
        this.maxSize = maxSize;
        this.cache = new Map();
        this.frequencyMap = new Map();
    }

    get(key: string): T | null {

        const entry = this.cache.get(key);
        if (!entry) return null;

        const newFrequency = entry.frequency + 1;
        this.cache.set(key, { value: entry.value, frequency: newFrequency });

        this.frequencyMap.set(entry.frequency, (this.frequencyMap.get(entry.frequency) || 1) - 1);
        if (this.frequencyMap.get(newFrequency) === 0) {
            this.frequencyMap.delete(newFrequency);
        }

        this.frequencyMap.set(newFrequency, (this.frequencyMap.get(newFrequency) || 0) + 1);

        return entry.value;
    }

    set(key: string, value: T): void {
        if (this.cache.has(key)) {
            // update existing key
            const entry = this.cache.get(key)!
            const newFrequency = entry.frequency + 1
            this.cache.set(key, { value, frequency: newFrequency });

            this.frequencyMap.set(entry.frequency, (this.frequencyMap.get(entry.frequency) || 1) - 1);
            if (this.frequencyMap.get(newFrequency) === 0) {
                this.frequencyMap.delete(newFrequency);
            }

            this.frequencyMap.set(newFrequency, (this.frequencyMap.get(newFrequency) || 0) + 1);
        } else {
            if (this.cache.size >= this.maxSize) {
                this.evict();
            }
            this.cache.set(key, { value, frequency: 1 });
            this.frequencyMap.set(1, (this.frequencyMap.get(1) || 0) + 1);
        }
    }

    private evict(): void {
        if (this.frequencyMap.size === 0) return;

        const minFrequency = Math.min(...this.frequencyMap.keys());

        for (const [key, entry] of this.cache.entries()) {
            if (entry.frequency === minFrequency) {
                this.cache.delete(key);
                this.frequencyMap.set(minFrequency, this.frequencyMap.get(minFrequency)! - 1);
                if (this.frequencyMap.get(minFrequency)! === 0) {
                    this.frequencyMap.delete(minFrequency);
                }
                break;
            }
        }
    }
}