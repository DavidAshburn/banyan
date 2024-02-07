class Property < ApplicationRecord
  belongs_to :client
  has_many :trees
  has_many :jobs

  valdates :latitude, presence: true
  valdates :longitude, presence: true
  valdates :address, presence: true
  valdates :client_id, presence: true

end