import jwt from "jsonwebtoken";

export const createAccessToken = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "15 minute" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    )
  );

export const verifyAccessToken = (accessToken) =>
  new Promise((res, rej) => {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, originalPayload) => {
      if (err) rej(err);
      else res(originalPayload);
    });
  });

export const createAccessRefreshToken = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.REFRESH_SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    )
  );

export const verifyAccessRefreshToken = (accessToken) =>
  new Promise((res, rej) => {
    jwt.verify(
      accessToken,
      process.env.REFRESH_SECRET,
      (err, originalPayload) => {
        if (err) rej(err);
        else res(originalPayload);
      }
    );
  });



export const createTokens = async (user) => {
  const accessToken = await createAccessToken({
    _id: user._id,
    role: user.role,
  });

  const refreshToken = await createAccessRefreshToken({_id: user._id})

  user.refreshToken = refreshToken
  await user.save()
  return {accessToken,refreshToken}
};
