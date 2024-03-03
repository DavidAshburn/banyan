class CreateFleets < ActiveRecord::Migration[7.0]
  def change
    create_table :fleets do |t|
      t.string :name
      t.string :plate, default: ""
      t.string :serial, default: ""
      t.string :fleettype, default: "Vehicle"
      t.string :fuel, default: ""
      t.jsonb :renewables, default: {}
      t.jsonb :docs, default: {}
      t.integer :user_id

      t.timestamps
    end
  end
end
