class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.datetime :start
      t.datetime :end
      t.boolean :completed, default: false
      t.boolean :invoiced, default: false
      t.boolean :paid, default: false
      t.string :estimator
      t.string :foreman, default: ''
      t.text :notes, default: ""
      t.jsonb :trees, default: {}
      t.string :equipment, array: true, default: []
      t.string :vehicles, array: true, default: []
      t.integer :crew_size, default: 0
      t.integer :est_hours, default: 0
      t.integer :price
      t.integer :property_id
      t.integer :user_id

      t.timestamps
    end
  end
end
