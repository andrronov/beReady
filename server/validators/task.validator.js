export const taskValidator = () => {
  const add = (body) => body(["title", "description"]).isLength({ min: 1 });

  return { add };
};
