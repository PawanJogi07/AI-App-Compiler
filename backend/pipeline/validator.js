const AppSchema = require("../schemas/appSchema");

function validateSchema(schema) {

// Step 1: Zod Schema Validation
const result = AppSchema.safeParse(schema);

if (!result.success) {
return {
valid: false,
errors: [
{
type: "SCHEMA_VALIDATION_FAILED",
details: result.error.issues
}
]
};
}

const errors = [];

// Step 2: DB Tables
const tables = schema.database?.tables || [];

const contactTable = tables.find(
table => table.name === "Contact"
);

const dbFields =
contactTable?.columns?.map(
col => col.name
) || [];

// Step 3: API Validation
const endpoints =
schema.api?.endpoints || [];

endpoints.forEach(endpoint => {


if (endpoint.requestBody) {

  Object.keys(
    endpoint.requestBody
  ).forEach(field => {

    if (
      field !== "username" &&
      field !== "password" &&
      !dbFields.includes(field)
    ) {

      errors.push({
        type: "API_DB_MISMATCH",
        field
      });

    }

  });

}


});

return {
valid: errors.length === 0,
errors
};
}

module.exports = validateSchema;
