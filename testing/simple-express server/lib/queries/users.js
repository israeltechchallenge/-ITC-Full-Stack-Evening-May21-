const SQL = require('@nearform/sql');
const { query } = require('../mysql');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');

const createUser = async (email, password) => {
  const password_hash = await bcrypt.hash(password, 10);
  const id = uuid();
  await query(SQL`INSERT INTO users (id, email, password_hash)
                  VALUES (${id}, ${email}, ${password_hash})`);
  return id;
}

exports.createUser = createUser;

const authenticateUser = async (email, password) => {
  const [user] = await query(
    SQL`SELECT * FROM users WHERE email = ${email}`
  );
  const isValidPass = await bcrypt.compare(password, user.password_hash);
  if (isValidPass) {
    return user;
  }
}

exports.authenticateUser = authenticateUser;