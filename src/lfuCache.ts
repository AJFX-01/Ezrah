class LFUCache {
    constructor(maxSize: number = 100) {
        this.maxSize = maxSize;
        this.cache = new Map();
        this.frequencyMap = new Map();
    }

    get(key : string) {
        if (!this.cache.has(key)) return null;

        const { value : string, frequency: number } = this.cache.get(key);
        this.cache.set(key, { value, frequency : frequency + 1 });
        this.frequencyMap.set(frequency, (this.frequencyMap.get(frequency) || 1) - 1);

        if (this.frequencyMap.get(frequency) === 0) {
            this.frequencyMap.delete(frequency);
        }

        return value;
    }

    set
}