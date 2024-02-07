class Property < ApplicationRecord
  belongs_to :client
  has_many :trees
  has_many :jobs

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :address, presence: true
  validates :client_id, presence: true

end
