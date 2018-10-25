


export const flatten = (arr: any[]) => {
  function* _inner(a: any): any {
      for (let element of a) {
          if (Array.isArray(element)) yield* _inner(element);
          else yield element;
      }
  }
  return [..._inner(arr)];
}
