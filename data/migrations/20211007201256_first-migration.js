
exports.up = async function(knex) {
  await knex.schema
    .createTable('recipes', table => {
        table.increments('recipe_id')
        table.string('recipe_name', 128).notNullable()
        table.date('recipe_created_at')
    })
    .createTable('steps', table => {
        table.increments('step_id')
        table.integer('step_number').notNullable()
        table.string('step_instruction', 128)
        table.integer('recipe_id')
            .unsigned()
            .notNullable()
            .references('recipe_id')
            .inTable('recipes')
    })
    .createTable('ingredients', table => {
        table.increments('ingredient_id')
        table.string('ingredient_name', 128)
    })
    .createTable('step_ingredients', table => {
        table.increments('step+ingredient_id')
        table.integer('step_id')
            .unsigned()
            .notNullable()
            .references('step_id')
            .inTable('steps')
        table.integer('ingredient_id')
            .unsigned()
            .notNullable()
            .references('ingredient_id')
            .inTable('ingredients')
        table.decimal('quantity')
    })
};

exports.down = async function(knex) {
  await knex.schema 
    .dropTableIfExists('step_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes')
};
