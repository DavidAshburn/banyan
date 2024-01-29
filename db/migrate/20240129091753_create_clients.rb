class CreateClients < ActiveRecord::Migration[7.0]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :contact_name
      t.string :phone
      t.string :email
      t.string :mail_address
      t.text :notes
      t.integer :user_id

      t.timestamps
    end
  end
end
