class DataController < ApplicationController
  before_action :authenticate_user!

  def user

    trees = 0
    current_user.clients.each {|client| client.properties.each{|prop| trees += prop.trees.count}}

    @user_data = {
      email: current_user.email,
      clients: current_user.clients.count,
      jobs: current_user.jobs.count,
      trees: trees
    }
    respond_to do |format|
      format.json { render json: @user_data }
    end
  end

  def client
    @client = Client.find(params[:cid])
    @count = @client.properties.count

    @data = {client:@client, property_count:@count}

    respond_to do |format|
      format.json { render json: @data}
    end
  end

  def clients
    clients = current_user.clients
    @clientdata = clients.map {|client| [client, client.properties]}

    respond_to do |format|
      format.json { render json: @clientdata}
    end
  end

  def profile
    @profile = current_user.profile

    respond_to do |format|
      format.json { render json: @profile }
    end
  end

  def proptrees
    @property = Property.find(params[:pid])
    @proptrees = @property.trees
    @jobs = @property.jobs

    respond_to do |format|
      format.json { render json: [@property, @proptrees, @jobs]}
    end
  end

  def newjob
    property = Property.find(params[:pid])
    profile = current_user.profile

    @newjobdata = {property: property, profile: profile, trees: property.trees, client:property.client}
    respond_to do |format|
      format.json { render json: @newjobdata}
    end
  end

  def jobtrees

    thisjob = Job.find(params[:jid])
    property = thisjob.property

    #we use keys to get the treeids
    jobtrees = thisjob.trees.keys.map{|item| Tree.find(item.to_i)}

    @jobdata = {trees:jobtrees,property:property,work:thisjob.trees,job:thisjob}
    respond_to do |format|
      format.json { render json: @jobdata}
    end
  end

  def propjobs
    @propjobs = Property.find(params[:pid]).jobs

    respons_to do |format|
      format.json { render json: @propjobs }
    end
  end

  def jobs
    alljobs = current_user.jobs.order(:start)

    @jobs = alljobs.map{|job| {job:job, property:job.property, client:job.property.client}}
    respond_to do |format|
      format.json { render json: @jobs}
    end
  end

  def dashboard
    jobs = current_user.jobs.order(:start)
    job_data = jobs.map{|job| {
      job:job,
      latitude:job.property.latitude,
      longitude:job.property.longitude,
      client:job.property.client,
      property:job.property
      }}

    trees = 0
    current_user.clients.each {|client| client.properties.each{|prop| trees += prop.trees.count}}

    user_data = {
      email: current_user.email,
      clients: current_user.clients.count,
      jobs: current_user.jobs.count,
      trees: trees
    }

    clients = current_user.clients
    client_data = clients.map {|client| [client, client.properties]}

    datapack = {
      jobs:job_data, user:user_data, clients:client_data
    };

    respond_to do |format|
      format.json { render json: datapack}
    end

  end

  #unused right now but may come in handy
  def geojson
    treedata = Property.find(params[:pid]).trees

    @features = []

    treedata.each do |tree|
      @features.push({
        type:"Feature",
        properties: {
          description:
            "<div class='grid p-2 gap-2 w-40'><p>#{tree.species}</p><p>#{tree.dbh} DBH</p><p>#{tree.crown} crown</p></div>"
        },
        geometry: {
          type: "Point",
          coordinates: [tree.longitude, tree.latitude]
        }
      })
    end

    @geojson = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: @features,
      }
    }
    respond_to do |format|
      format.json { render json: @geojson }
    end

  end

  def getcalendar
    @data = [];

    current_user.jobs.each do |job|
      fullday = false;
      if(job.est_hours >= 8)
          fullday = true;
      end
      @data.push({
        title: Property.find(job.property_id).address,
        start: job.start,
        end: job.end,
        id: job.id,
        allDay: fullday,
      })
    end

    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def getdebug

    @debug = [];

    current_user.jobs.each do |job|
      @debug.push({
        title: Property.find(job.property_id).address,
        start: job.start,
        end: job.end,
        fullDay: false,
      })
    end

    respond_to do |format|
      format.json { render json: @debug }
    end
  end

  def userprofile
    profile = current_user.profile
    fleets = current_user.fleets

    profiledata = {profile:profile, fleets:fleets}
    respond_to do |format|
      format.json { render json: profiledata }
    end
  end


end
