export const deepCloneObject = (obj: unknown) => {
  if (!obj) return null;
  return JSON.parse(JSON.stringify(obj));
};
