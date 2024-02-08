class MapsController < ApplicationController
  before_action :authenticate_user!

  def job
    @jobid = params[:jobid]

    @thisjob = Job.find(params[:jobid])
    @property = @thisjob.property

    #job.trees is an array of Tree ids
    @jobtrees = @thisjob.trees.map{|item| Tree.find(item)}
  end

  def edit
    @pid = params[:pid]
    @property = Property.find(params[:pid])
  end

end
