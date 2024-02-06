class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :clients
  has_one :profile, dependent: :destroy
  has_one :configuration, dependent: :destroy
  has_many :jobs

  before_create :build_default_profile
  before_create :build_default_configuration

  private
  def build_default_profile
    profile = build_profile
    true
  end
  def build_default_configuration
    configuration = build_configuration
    true
  end
end
