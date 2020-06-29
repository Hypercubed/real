export function Memoize() {
	return (target: Object, propertyKey: string, descriptor: any) => {
		if (descriptor.value != null) {
			descriptor.value = getNewFunction(descriptor.value);
		} else if (descriptor.get != null) {
			descriptor.get = getNewFunction(descriptor.get);
		} else {
			throw 'Only put a Memoize() decorator on a method or get accessor.';
		}
	};
}

function getNewFunction(originalMethod: any) {
  const map = new WeakMap();
	return function (this: any): any {
    if (map.has(this)) {
      return map.get(this);
    }

    const returnedValue = originalMethod.apply(this);
    map.set(this, returnedValue);
		return returnedValue;
	};
}