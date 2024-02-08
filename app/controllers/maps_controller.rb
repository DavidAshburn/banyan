class MapsController < ApplicationController
  before_action :authenticate_user!

  def job
    @jobid = params[:jobid]
  end

  def edit
    @pid = params[:pid]
    @property = Property.find(params[:pid])
  end

end
