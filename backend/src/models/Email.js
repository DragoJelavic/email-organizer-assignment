const { Model } = require('objection');

class Email extends Model {
  static get tableName() {
    return 'emails';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['to', 'subject', 'body'],
      properties: {
        id: { type: 'integer' },
        to: { type: 'string', format: 'email' },
        subject: { type: 'string', minLength: 1, maxLength: 200 },
        body: { type: 'string', minLength: 1 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      },
    };
  }
}

module.exports = Email;
