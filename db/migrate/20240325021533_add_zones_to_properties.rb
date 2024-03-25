class AddZonesToProperties < ActiveRecord::Migration[7.0]
  def change
    add_column :properties, :zones, :string, array: true, default: []
  end
end
