class Job < ApplicationRecord

  belongs_to :property
  belongs_to :user

  validates :property_id, presence: true
  validates :user_id, presence: true
  validates :estimator, presence: true
  validates :start, presence: true
  validates :end, presence: true
  validates :price, presence: true
end
