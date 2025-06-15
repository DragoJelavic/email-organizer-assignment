const { SalesAssistant } = require('./SalesAssistant');
const { FollowUpAssistant } = require('./FollowUpAssistant');

class AssistantFactory {
  static createAssistant(type) {
    switch (type) {
      case 'SALES':
        return new SalesAssistant();
      case 'FOLLOWUP':
        return new FollowUpAssistant();
      case 'OTHER':
        // For OTHER type, we'll use the FollowUpAssistant as a default
        return new FollowUpAssistant();
      default:
        throw new Error(`Unknown assistant type: ${type}`);
    }
  }
}

module.exports = { AssistantFactory };
