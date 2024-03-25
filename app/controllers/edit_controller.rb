class EditController < ApplicationController
  def addzone
    @prop = Property.find(params[:pid])
    newzones = @prop.zones
    newzones.push(params[:zname])

    respond_to do |format|
      if @prop.update(zones:newzones)
        format.json { render @prop, status: :ok}
      else
        format.json { render json: @prop.errors, status: :unprocessable_entity }
      end
    end
  end

  def removezone
    @prop = Property.find(params[:pid])
    newzones = @prop.zones.select {|zone| zone != params[:zname]}

    respond_to do |format|
      if @prop.update(zones:newzones)
        @prop.trees.each {|tree|
          treezones = tree.zones - [params[:zname]]
          tree.update(zones:treezones)
        }
        format.json { render @prop, status: :ok}
      else
        format.json { render json: @prop.errors, status: :unprocessable_entity }
      end
    end
  end

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

  def profileworktypes
    @profile = current_user.profile
    @updated = @profile.worktypes
    @updated.push(params[:name])

    respond_to do |format|
      if @profile.update(worktypes:@updated)
        format.json { render @profile, status: :ok, location: user_profile_path }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def profileremovespecies
    @profile = current_user.profile
    updatedspecies = @profile.species.select{|species| species != params[:name]};

    respond_to do |format|
      if @profile.update(species:updatedspecies)
        format.json { render @profile, status: :ok, location: user_profile_path }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def profileremoveworktypes
    @profile = current_user.profile
    updatedwork = @profile.worktypes.select{|work| work != params[:name]};

    respond_to do |format|
      if @profile.update(worktypes:updatedwork)
        format.json { render @profile, status: :ok, location: user_profile_path }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def completejob
    @job = Job.find(params[:jobid])
    @job.trees.entries.each{|workline|
      tree = Tree.find_by_id(workline[0])
      fullhistory = tree.history
      fullhistory[Time.now.strftime("%d/%m/%Y %H:%M")] = workline[1];
      tree.update_attribute(:history, fullhistory)
    }

    respond_to do |format|
      if @job.update(completed:true)
        format.html { redirect_back_or_to user_dashboard_path }
        format.json { render @job, status: :ok }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def invoicejob
    @job = Job.find(params[:jobid])

    respond_to do |format|
      if @job.update(invoiced:true)
        format.html { redirect_back_or_to user_dashboard_path }
        format.json { render @job, status: :ok }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end

  def paidjob
    @job = Job.find(params[:jobid])

    respond_to do |format|
      if @job.update(paid:true)
        format.html { redirect_back_or_to user_dashboard_path }
        format.json { render @job, status: :ok }
      else
        format.json { render json: @profile.errors, status: :unprocessable_entity }
      end
    end
  end
end
