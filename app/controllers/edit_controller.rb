class EditController < ApplicationController
  def locupdate
    @prop = Property.find(params[:pid])

    respond_to do |format|
      if @prop.update(latitude:params[:lat]) && @prop.update(longitude:params[:lng])
        format.json { render @prop, status: :ok, location: @prop }
      else
        format.json { render json: @property.errors, status: :unprocessable_entity }
      end
    end
  end
end
