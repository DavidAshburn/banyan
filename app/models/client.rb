class Client < ApplicationRecord
  belongs_to :user
  has_many :properties

  valdates :name, presence: true
  valdates :mail_address, presence: true
  valdates :user_id, presence: true
end
