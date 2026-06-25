const { z } = require("zod");

const AppSchema = z.object({
database: z.object({
tables: z.array(z.any())
}),

api: z.object({
endpoints: z.array(z.any())
}),

ui: z.object({
pages: z.array(z.any())
}),

auth: z.object({
roles: z.array(z.any())
})
});

module.exports = AppSchema;
