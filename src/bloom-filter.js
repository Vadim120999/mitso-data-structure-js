class BloomFilter {
  constructor(size = 18) {
    this.size = size;
    this.bitArray = new Array(size).fill(false);
  }

  createStore(size) {
    const store = new Array(size).fill(false);

    return {
      getValue(index) {
        return store[index];
      },
      setValue(index, value) {
        store[index] = value;
      },
    };
  }

  hash1(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }
  

  hash2(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }

  hash3(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) + hash + str.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }

  getHashValues(str) {
    return [this.hash1(str), this.hash2(str), this.hash3(str)].map(value => value % this.size);
  }  
  
  insert(str) {
    const hashValues = this.getHashValues(str);
    hashValues.forEach((hash) => {
      this.bitArray[hash] = true;
    });
  }

  mayContain(str) {
    const hashValues = this.getHashValues(str);
    return hashValues.every((hash) => this.bitArray[hash]);
  }
}

module.exports = BloomFilter;
