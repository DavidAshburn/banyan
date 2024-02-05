class DataController < ApplicationController
  before_action :authenticate_user!

  def clients

    clients = current_user.clients
    @clientdata = clients.map {|client| [client, client.properties]}

    respond_to do |format|
      format.json { render json: @clientdata}
    end
  end

  def jobtrees

    job = Job.find(params[:jid])

    #job.trees is an array of Tree ids
    @jobtrees = job.trees.map{|item| Tree.find(item)}
    #@jobtrees = @json.trees.map{ |x| Tree.find(x) }

    respond_to do |format|
      format.json { render json: @jobtrees}
    end
  end

  def proptrees
    property = Property.find(params[:pid])
    @proptrees = property.trees

    respond_to do |format|
      format.json { render json: @proptrees}
    end
  end
  def jobs
    alljobs = current_user.jobs.order(:start)

    @jobs = alljobs.map{|job| {job:job, property:job.property, client:job.property.client}}
    respond_to do |format|
      format.json { render json: @jobs}
    end
  end

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

  def jobsdash
    @data = current_user.jobs.map{|job| {latitude:job.property.latitude, longitude:job.property.longitude}}

    respond_to do |format|
      format.json { render json: @data }
    end
  end
end
