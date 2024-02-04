class Job < ApplicationRecord
  belongs_to :property
  belongs_to :user

  serialize :work, Hash
end
