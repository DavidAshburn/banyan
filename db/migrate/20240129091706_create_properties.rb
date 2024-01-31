class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.string :name, default: ''
      t.string :contact_name, default: ''
      t.string :phone, default: ''
      t.string :email, default: ''
      t.string :address, default: ''
      t.string :property_type, default: ''
      t.string :parking, default: ''
      t.string :tree_access, default: ''
      t.integer :client_id

      t.timestamps
    end
  end
end
