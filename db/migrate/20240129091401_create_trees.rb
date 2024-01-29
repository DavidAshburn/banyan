class CreateTrees < ActiveRecord::Migration[7.0]
  def change
    create_table :trees do |t|
      t.float :lat
      t.float :lon
      t.integer :dbh
      t.string :crown
      t.string :history, array: true, default: []
      t.string :hazards, array: true, default: []
      t.string :pictures, array: true, default: []
      t.string :species
      t.boolean :removed, default: false
      t.boolean :ground, default: false
      t.text :notes
      t.integer :property_id

      t.timestamps
    end
  end
end
