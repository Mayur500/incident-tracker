const { z } = require("zod");

const createIncidentSchema = z.object({
  title: z.string().min(5),
  service: z.string().min(2),
  severity: z.enum(["SEV1", "SEV2", "SEV3", "SEV4"]),
  status: z.enum(["OPEN", "MITIGATED", "RESOLVED"]).optional(),
  owner: z.string().optional(),
  summary: z.string().optional(),
});

const updateIncidentSchema = z.object({
  title: z.string().min(5).optional(),
  service: z.string().min(2).optional(),
  severity: z.enum(["SEV1", "SEV2", "SEV3", "SEV4"]).optional(),
  status: z.enum(["OPEN", "MITIGATED", "RESOLVED"]).optional(),
  owner: z.string().optional(),
  summary: z.string().optional(),
});

module.exports = {
  createIncidentSchema,
  updateIncidentSchema,
};