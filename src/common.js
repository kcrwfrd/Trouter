export const isObject = (x) => x !== null && typeof x === 'object'
export const isString = (x) => typeof(x) === 'string'

export function defer() {
  let resolve, reject;

  let promise = new Promise((resolveFn, rejectFn) => {
    resolve = resolveFn
    reject = rejectFn
  })

  return { resolve, reject, promise}
}
