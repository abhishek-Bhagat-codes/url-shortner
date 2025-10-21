const users = {};

function addLoginUser(sessionId, user) {
  users[sessionId] = user;
}

function checkLoginUser(sessionId) {
  return users[sessionId] || null;
}

function removeLoginUser(sessionId) {
  delete users[sessionId];
}

module.exports = {
    addLoginUser,
    checkLoginUser,
    removeLoginUser
}