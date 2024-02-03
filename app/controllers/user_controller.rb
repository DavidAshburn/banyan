class UserController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @username = current_user.profile.name
  end

  def profile
  end
end
