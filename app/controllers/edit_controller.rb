class EditController < ApplicationController
  def locupdate
    @prop = Property.find(params[:pid])

    respond_to do |format|
      if @prop.update(latitude:params[:lat]) && @prop.update(longitude:params[:lng])
        format.json { render @prop, status: :ok, location: @prop }
      else
        format.json { render json: @prop.errors, status: :unprocessable_entity }
      end
    end
  end

  def profilespecies
    @profile = current_user.profile
    @updated = @profile.species
    @updated.push(params[:name])

    respond_to do |format|
      if @profile.update(species:@updated)
        format.json { render @profile, status: :ok }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def profilevehicles
    @profile = current_user.profile
    @updated = @profile.vehicles
    @updated.push(params[:name])

    respond_to do |format|
      if @profile.update(vehicles:@updated)
        format.json { render @profile, status: :ok, location: user_profile_path }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def profileequipment
    @profile = current_user.profile
    @updated = @profile.equipment
    @updated.push(params[:name])

    respond_to do |format|
      if @profile.update(equipment:@updated)
        format.json { render @profile, status: :ok, location: user_profile_path }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end


end
