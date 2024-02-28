class CreateFleets < ActiveRecord::Migration[7.0]
  def change
    create_table :fleets do |t|
      t.string :name
      t.string :plate
      t.string :serial
      t.string :fleettype, default: "Vehicle"
      t.jsonb :renewables, default: {}
      t.jsonb :docs, default: {}
      t.integer :milespergallon, default: 25
      t.integer :user_id

      t.timestamps
    end
  end
end
