class CreateConfigurations < ActiveRecord::Migration[7.0]
  def change
    create_table :configurations do |t|
      t.string :tree_species, array: true, default: []
      t.string :vehicles, array: true, default: []
      t.string :equipment, array: true, default: []

      t.timestamps
    end
  end
end
