import { logger } from '../../config';

class MockController {
  delegate(ctx, next) {
    try {
      const action = ctx.request.body;
      logger.info(`[TERAVOZ] Evento recebido. Delegando call_id ${action.call_id} para o destination ${action.destination}.`);
      ctx.body = JSON.parse('{"status": "ok"}');
    } catch (error) {
      logger.error(error);
      ctx.body = JSON.parse(`{"status": "error", "error": "${error}"}`);
    }
  }
}

module.exports = MockController;
