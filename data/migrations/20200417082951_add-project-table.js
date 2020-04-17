
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', tbl => {
      tbl.increments();
      tbl.string("name", 128)
        .unique()
        .notNullable();
      tbl.text('description', 255);
      tbl.boolean("completed").defaultTo(false);
  })
  .createTable('tasks', tbl => {
      tbl.increments();
      tbl.text('description', 255).notNullable();
      tbl.text('notes');
      tbl.boolean("completed").defaultTo(false);
      //foreign key
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
  })
  .createTable('resources', tbl => {
      tbl.increments();
      tbl.string("name").notNullable();
      tbl.text('description', 255);
    })
  .createTable("project-resources", tbl => {
      //foreign keys
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      tbl.integer('resources_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
  })
};

exports.down = function(knex) {
  return knex.schema
        .dropTableIfExists("project-resources")
        .dropTableIfExists("resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("projects");
};
