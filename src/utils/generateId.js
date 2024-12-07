const { nanoid } = require("nanoid")

const generateId = async () => {
  const id = nanoid(16);
  return id;
};

module.exports = generateId;
