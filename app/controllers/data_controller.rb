class DataController < ApplicationController

  def clients

    @clients = current_user.clients

    respond_to do |format|
      format.json { render json: @clients}
    end
  end
end
