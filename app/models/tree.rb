class Tree < ApplicationRecord
  belongs_to :property

  validates :property_id, presence: true
  validates :species, presence: true
  validates :dbh, presence: true
end
