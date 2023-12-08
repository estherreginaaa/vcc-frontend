'use client';
import * as React from 'react';
const mounted = typeof window !== 'undefined';

const useLocalStorage = <T extends unknown>(key: string, initialValue: T) => {
	const [storedValue, setStoredValue] = React.useState<T>(() => {
		if (!mounted) return initialValue;

		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			if (mounted) window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue] as const;
};

export default useLocalStorage;
