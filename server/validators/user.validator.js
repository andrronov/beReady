export const userValidator = () => {
  const registration = (body) =>
    body(["username", "password"]).isLength({
      min: 3,
      max: 32,
    });

  return {
    registration,
  };
};
