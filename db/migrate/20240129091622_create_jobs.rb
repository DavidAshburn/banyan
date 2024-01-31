class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.datetime :sched_start
      t.datetime :schedend
      t.datetime :start
      t.datetime :end
      t.boolean :invoived
      t.boolean :paid
      t.string :estimator, default: ''
      t.string :foreman, default: ''
      t.text :notes
      t.text :work, default: "{}"
      t.string :equipment, array: true, default: []
      t.integer :crew_size
      t.integer :est_hours
      t.integer :property_id

      t.timestamps
    end
  end
end
