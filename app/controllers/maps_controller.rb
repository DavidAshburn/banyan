class MapsController < ApplicationController
  before_action :authenticate_user!

  def find
    @target = params[:target]
    @trees = Property.find(params[:property]).trees.as_json
  end

  def job
    @target = params[:target]
    @trees = Property.find(params[:property]).trees.as_json
  end

  def edit
    @target = params[:target]
    @treejson = Property.find(params[:property]).trees.as_json
    @trees = Property.find(params[:property]).trees
    @pid = params[:property]
  end

end
