class MapsController < ApplicationController
  before_action :authenticate_user!

  def job
    @target = params[:target]
    @trees = Property.find(params[:property]).trees
  end

  def edit
    @target = params[:target]
    @pid = params[:property]
  end

end
