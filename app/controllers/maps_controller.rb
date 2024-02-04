class MapsController < ApplicationController
  before_action :authenticate_user!

  def job
    @target = params[:target]
    @jobid = params[:jobid]
  end

  def edit
    @target = params[:target]
    @pid = params[:property]
  end

end
