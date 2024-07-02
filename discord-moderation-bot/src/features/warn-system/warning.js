const warning = {
  users: [],
  
  addWarning: function(user, reason) {
    const timestamp = new Date();
    this.users.push({ user, reason, timestamp });
  },
  
  getWarnings: function(user) {
    return this.users.filter((warning) => warning.user === user);
  },
  
  clearWarnings: function(user) {
    this.users = this.users.filter((warning) => warning.user !== user);
  }
};

module.exports = warning;