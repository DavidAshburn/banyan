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

    job = Job.find(params[:job_id])

    @treesout = job.trees.map{ |x| Tree.find(x) }

    respond_to do |format|
      format.json { render json: @treesout}
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
end
