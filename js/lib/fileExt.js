const fileExt = (filename) => {
  const result = filename.match(fileExt.regexp);
  if (result === null) return "";
  return result[1];
};
fileExt.regexp = /(?<!^)\.([^.]+)$/;
export default fileExt;
