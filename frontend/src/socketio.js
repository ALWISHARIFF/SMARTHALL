let dynamicMiddleware = null;
let initedDynamicMiddleware = null;

const setupDynamicMiddleware = (store) => (next) => (action) => {
  if (dynamicMiddleware && !initedDynamicMiddleware) {
    console.log(dynamicMiddleware);
    initedDynamicMiddleware = dynamicMiddleware(store);
  }
  if (initedDynamicMiddleware) {
    return initedDynamicMiddleware(next)(action);
  }
  return next(action);
};

const unsetMiddleware = () => {
  dynamicMiddleware = null;
  initedDynamicMiddleware = null;
};

const setMiddleware = (middleware) => {
  dynamicMiddleware = middleware;
  initedDynamicMiddleware = null;
  return true;
};

export default setupDynamicMiddleware;
export { setMiddleware, unsetMiddleware };
