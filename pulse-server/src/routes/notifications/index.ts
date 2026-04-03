import { FastifyPluginAsync } from "fastify";
import { CreateNotificationDto } from "../../../models/dtos/notifications";
import {
  NotificationChannel,
  NotificationPriority,
  NotificationStatus,
} from "../../../models/enums";

// JSON Schema for Fastify: validates request bodies before the handler runs (keeps types and runtime in sync with CreateNotificationDto).
const createNotificationSchema = {
  body: {
    type: "object",
    required: ["recipientId", "channel", "idempotencyKey"],
    properties: {
      recipientId: { type: "string", format: "uuid" },
      channel: { type: "string", enum: Object.values(NotificationChannel) },
      priority: { type: "string", enum: Object.values(NotificationPriority) },
      status: { type: "string", enum: Object.values(NotificationStatus) },
      templateId: { type: "string", format: "uuid" },
      subject: { type: "string" },
      body: { type: "string" },
      metadata: { type: "object", additionalProperties: true },
      idempotencyKey: { type: "string", maxLength: 64 },
      maxAttempts: { type: "integer", minimum: 1, maximum: 10 },
      scheduledAt: { type: "string", format: "date-time" },
    },
    additionalProperties: false,
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        status: { type: "string" },
      },
    },
  },
};

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    "/",
    {},
    async (request, reply) => {
      return {
        message: "",
      };
    },
  );

  fastify.post<{ Body: CreateNotificationDto }>(
    "/",
    { schema: createNotificationSchema },
    async (request, reply) => {
      // Placeholder: enqueue or persist notification, then return created id + status.
      return reply.code(201).send({ id: "abc", status: "PENDING" });
    },
  );

};

export default root;
