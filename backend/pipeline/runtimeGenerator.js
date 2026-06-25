function runtimeGenerator(schema) {

const pages =
schema.ui?.pages || [];

return {
generatedApp: {
pageCount: pages.length,


  pages: pages.map(page => ({
    name: page.name,

    route:
      "/" +
      page.name
        .toLowerCase()
        .replace(/\s+/g, "-")
  }))
}


};
}

module.exports = runtimeGenerator;
