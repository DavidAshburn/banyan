class AddTimestampsToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :invoicedate, :datetime
    add_column :jobs, :paiddate, :datetime
  end
end
