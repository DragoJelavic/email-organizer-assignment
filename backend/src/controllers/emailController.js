const Email = require('../models/Email');

class EmailController {
  async list(req, reply) {
    try {
      const emails = await Email.query().orderBy(
        'created_at',
        'desc'
      );
      return reply.send(emails);
    } catch (error) {
      return reply
        .status(500)
        .send({ error: 'Failed to fetch emails' });
    }
  }

  async get(req, reply) {
    try {
      const email = await Email.query().findById(req.params.id);
      if (!email) {
        return reply.status(404).send({ error: 'Email not found' });
      }
      return reply.send(email);
    } catch (error) {
      return reply
        .status(500)
        .send({ error: 'Failed to fetch email' });
    }
  }

  async create(req, reply) {
    try {
      const email = await Email.query().insert({
        ...req.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return reply.status(201).send(email);
    } catch (error) {
      return reply
        .status(400)
        .send({ error: 'Failed to create email' });
    }
  }

  async update(req, reply) {
    try {
      const email = await Email.query().patchAndFetchById(
        req.params.id,
        {
          ...req.body,
          updated_at: new Date().toISOString(),
        }
      );
      if (!email) {
        return reply.status(404).send({ error: 'Email not found' });
      }
      return reply.send(email);
    } catch (error) {
      return reply
        .status(400)
        .send({ error: 'Failed to update email' });
    }
  }

  async delete(req, reply) {
    try {
      const deleted = await Email.query().deleteById(req.params.id);
      if (!deleted) {
        return reply.status(404).send({ error: 'Email not found' });
      }
      return reply.status(204).send();
    } catch (error) {
      return reply
        .status(500)
        .send({ error: 'Failed to delete email' });
    }
  }
}

module.exports = new EmailController();
