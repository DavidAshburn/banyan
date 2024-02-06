class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :name, default: ""
      t.string :preferred_contact_email, default: ""
      t.string :species, array: true, default: []
      t.string :vehicles, array: true, default: []
      t.string :equipment, array: true, default: []
      t.boolean :prefers_dark, default: false

      t.integer :user_id
      t.timestamps
    end
  end
end
