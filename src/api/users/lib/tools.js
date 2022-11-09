import jwt from "jsonwebtoken";

export const createAccessToken = (payload) =>
  new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 week" },
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
    jwt.verify(accessToken, process.env.REFRESH_SECRET, (err, originalPayload) => {
      if (err) rej(err);
      else res(originalPayload);
    });
  });