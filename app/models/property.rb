class Property < ApplicationRecord
  belongs_to :client
  has_many :trees
  has_many :jobs


end