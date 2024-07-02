const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

const LOG_FILE_PATH = path.join(__dirname, 'moderation_logs.txt');

const logModerationAction = (action, user, reason, moderator) => {
  const timestamp = DateTime.local().toISO();
  const logEntry = `[${timestamp}] ${moderator} ${action} ${user} for: ${reason}\n`;

  fs.appendFile(LOG_FILE_PATH, logEntry, (err) => {
    if (err) {
      console.error('Error logging moderation action:', err);
    }
  });
};

module.exports = {
  logModerationAction,
};