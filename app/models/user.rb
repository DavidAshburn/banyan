class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :clients
  has_one :profile
  has_many :jobs
  has_many :fleets
  has_many :properties, through: :clients

  before_create :build_default_profile

  private
  def build_default_profile
    profile = build_profile
    true
  end

end
