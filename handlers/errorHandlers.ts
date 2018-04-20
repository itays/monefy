// tslint:disable-next-line:no-any
export const catchErrors = function(fn: any) {
  // tslint:disable-next-line:no-any
  return function(req: any, res: any, next: any) {
    return fn(req, res, next).catch(next);
  };
};