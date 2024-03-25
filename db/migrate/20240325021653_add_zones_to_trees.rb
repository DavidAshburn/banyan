class AddZonesToTrees < ActiveRecord::Migration[7.0]
  def change
    add_column :trees, :zones, :string, array: true, default: []
  end
end
