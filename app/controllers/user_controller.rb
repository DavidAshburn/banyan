class UserController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @username = current_user.email
  end

  def profile
  end

  def configuration

  end
end
