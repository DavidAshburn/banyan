class UserController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @username = current_user.email
  end

  def profile
    @profile = current_user.profile
  end

  def calendar
  end

  def fleet
  end
end
