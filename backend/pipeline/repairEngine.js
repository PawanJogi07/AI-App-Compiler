function repairSchema(schema, errors) {

errors.forEach(error => {


if (
  error.type === "API_DB_MISMATCH"
) {

  const contactTable =
    schema.database.tables.find(
      table => table.name === "Contact"
    );

  if (contactTable) {

    contactTable.columns.push({
      name: error.field,
      type: "string"
    });

  }

}


});

return schema;
}

module.exports = repairSchema;
