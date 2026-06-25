const express = require("express");
const router = express.Router();

const clarificationEngine = require("../pipeline/clarificationEngine");
const extractIntent = require("../pipeline/intentExtractor");
const systemDesigner = require("../pipeline/systemDesigner");
const schemaGenerator = require("../pipeline/schemaGenerator");
const validateSchema = require("../pipeline/validator");
const repairSchema = require("../pipeline/repairEngine");
const runtimeGenerator = require("../pipeline/runtimeGenerator");

router.post("/", async (req, res) => {
try {


const startTime = Date.now();

const { prompt } = req.body;

// Stage 0 - Clarification Engine
const clarification =
  clarificationEngine(prompt);

if (clarification.needsClarification) {
  return res.json({
    needsClarification: true,
    questions: clarification.questions
  });
}

// Stage 1 - Intent Extraction
const intent = await extractIntent(prompt);

// Stage 2 - System Design
const architecture = await systemDesigner(intent);

// Stage 3 - Schema Generation
const schema = await schemaGenerator(architecture);

// Stage 4 - Validation
const validation = validateSchema(schema);

// Stage 5 - Repair + Revalidation
let repairedSchema = schema;
let repairApplied = false;
let revalidation = validation;

if (!validation.valid) {

  repairedSchema = repairSchema(
    schema,
    validation.errors
  );

  repairApplied = true;

  revalidation = validateSchema(
    repairedSchema
  );
}

// Stage 6 - Runtime Generation
const runtime =
  runtimeGenerator(repairedSchema);

const latencyMs =
  Date.now() - startTime;

res.json({
  intent,
  architecture,
  schema,
  validation,
  repairApplied,
  repairedSchema,
  revalidation,
  runtime,

  metrics: {
    latencyMs,
    validationPassed:
      revalidation.valid,
    repairApplied,
    pipelineStages: 7,
    retryCount: 0
  }
});


} catch (err) {


console.error(err);

res.status(500).json({
  error: err.message
});


}
});

module.exports = router;
