#create_table "users", force: :cascade do |t|
#  //integer "id", auto-increment, primary key, unique, notnull
#  string "email", default: "", null: false
#  string "encrypted_password", default: "", null: false
#  string "reset_password_token"
#  datetime "reset_password_sent_at"
#  datetime "remember_created_at"
#  integer "role"
#  integer "parent"
#  datetime "created_at", null: false
#  datetime "updated_at", null: false
#  string "time_zone"
#  index ["email"], name: "index_users_on_email", unique: true
#  index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
#end


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
    profile = build_profile(
      worktypes:["Reduction","Crown Clean","Structure Prune","Removal","Full Removal","Fertilization","Insecticide"]
      )
    true
  end

end
