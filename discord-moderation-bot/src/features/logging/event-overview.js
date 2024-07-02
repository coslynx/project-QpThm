const fs = require('fs');
const path = require('path');

const eventOverview = {
  getRecentEvents: () => {
    try {
      const logsPath = path.join(__dirname, 'moderation-logs.js');
      const logs = fs.readFileSync(logsPath, 'utf8');
      // Parse and return recent events from logs
      return JSON.parse(logs).slice(0, 10);
    } catch (error) {
      console.error('Error reading moderation logs:', error);
      return [];
    }
  },
  
  clearLogs: () => {
    try {
      const logsPath = path.join(__dirname, 'moderation-logs.js');
      // Clear logs
      fs.writeFileSync(logsPath, '[]', 'utf8');
      console.log('Moderation logs cleared successfully.');
    } catch (error) {
      console.error('Error clearing moderation logs:', error);
    }
  }
};

module.exports = eventOverview;