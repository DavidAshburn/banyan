class CreateClients < ActiveRecord::Migration[7.0]
  def change
    create_table :clients do |t|
      t.string :name
      t.string :contact_name, default: ''
      t.string :phone, default: ''
      t.string :email, default: ''
      t.string :mail_address
      t.text :notes, default: ''
      t.integer :user_id

      t.timestamps
    end
  end
end
