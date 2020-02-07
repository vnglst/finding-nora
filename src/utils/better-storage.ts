export const localStore = storageFactory(localStorage);
export const sessionStore = storageFactory(sessionStorage);

// source: https://gist.github.com/MichalZalecki/70a831304b0e83afbc0fbad3e8577068
export function storageFactory(storage: Storage): Storage {
  let inMemoryStorage: { [key: string]: string } = {};
  const length = 0;

  function isSupported() {
    try {
      const testKey = "__some_random_key_to_test_if_storage_is_supported__";
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clear(): void {
    if (isSupported()) {
      storage.clear();
    } else {
      inMemoryStorage = {};
    }
  }

  function getItem(name: string): string | null {
    if (isSupported()) {
      return storage.getItem(name);
    }

    if (Object.prototype.hasOwnProperty.call(inMemoryStorage, name)) {
      return inMemoryStorage[name];
    }
    return null;
  }

  function key(index: number): string | null {
    if (isSupported()) {
      return storage.key(index);
    } else {
      return Object.keys(inMemoryStorage)[index] || null;
    }
  }

  function removeItem(name: string): void {
    if (isSupported()) {
      storage.removeItem(name);
    } else {
      delete inMemoryStorage[name];
    }
  }

  function setItem(name: string, value: string): void {
    if (isSupported()) {
      storage.setItem(name, value);
    } else {
      inMemoryStorage[name] = String(value);
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    length
  };
}
