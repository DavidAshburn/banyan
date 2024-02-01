class MapsController < ApplicationController
  before_action :authenticate_user!

  def find
    @target = params[:target]
    @trees = Property.find(params[:property]).trees.as_json
  end
end
