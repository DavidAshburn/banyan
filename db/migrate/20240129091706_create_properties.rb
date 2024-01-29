class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.string :name
      t.string :contact_name
      t.string :phone
      t.string :email
      t.string :address
      t.string :type
      t.string :parking
      t.string :tree_access
      t.integer :client_id

      t.timestamps
    end
  end
end
