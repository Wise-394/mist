import db from "./pool.js";

export const checkConnection = async () => {
  try {
    const { rows } = await db.query("SELECT NOW()");
    console.log("Connection is working", rows[0].now);
  } catch (err) {
    console.log("cant connect to db", err);
  }
};
