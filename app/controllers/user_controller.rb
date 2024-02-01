class UserController < ApplicationController
  before_action :authenticate_user!

  def dashboard
    @user = current_user
    
  end

  def profile
  end
end
