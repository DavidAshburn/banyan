class CreateProptypes < ActiveRecord::Migration[7.0]
  def change
    create_table :proptypes do |t|
      t.string :label

      t.timestamps
    end
  end
end
