class Client < ApplicationRecord
  belongs_to :user
  has_many :properties

  validates :name, presence: true
  validates :mail_address, presence: true
  validates :user_id, presence: true
end
