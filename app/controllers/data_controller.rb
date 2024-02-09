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

    respond_to do |format|
      format.json { render json: [@property, @proptrees]}
    end
  end

  def jobtrees

    thisjob = Job.find(params[:jid])
    property = thisjob.property

    #job.trees is an array of Tree ids
    jobtrees = thisjob.trees.map{|item| Tree.find(item)}
    #@jobtrees = @json.trees.map{ |x| Tree.find(x) }

    @jobdata = {trees:jobtrees,property:property}
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

  def jobsdash
    @data = current_user.jobs.map{|job| {latitude:job.property.latitude, longitude:job.property.longitude}}

    respond_to do |format|
      format.json { render json: @data }
    end
  end

  def getdebug

    @debug = Client.all.map{|client| {
      name: client.name,
      contact_name: client.contact_name,
      phone: client.phone,
      email: client.email,
      mail_address: client.mail_address,
      notes: client.notes,
    } }

    respond_to do |format|
      format.json { render json: @debug }
    end
  end
end
