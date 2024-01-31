class CreateTrees < ActiveRecord::Migration[7.0]
  def change
    create_table :trees do |t|
      t.float :lat
      t.float :lon
      t.integer :dbh
      t.string :crown, default: ''
      t.string :history, array: true, default: []
      t.string :hazards, array: true, default: []
      t.string :pictures, array: true, default: []
      t.string :species, default: ''
      t.boolean :removed, default: false
      t.boolean :ground, default: false
      t.text :notes, default: ''
      t.integer :property_id

      t.timestamps
    end
  end
end
