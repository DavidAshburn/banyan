class JobsController < ApplicationController
  before_action :set_job, only: %i[ show edit update destroy ]

  # GET /jobs or /jobs.json
  def index
    @jobs = Job.all
  end

  # GET /jobs/1 or /jobs/1.json
  def show
    @jobid = @job.id
    @property = @job.property
    @vehicles = @job.vehicles || []
    @equipment = @job.equipment || []

    #job.trees is an array of Tree ids
    @jobtrees = @job.trees.map{|item| Tree.find(item)}
  end

  # GET /jobs/new
  def new
    @job = Job.new
    @pid = params[:pid]
    @profile = current_user.profile
    @vehicles = current_user.profile.vehicles
    @equipment = current_user.profile.equipment

  end

  # GET /jobs/1/edit
  def edit
  end

  # POST /jobs or /jobs.json
  def create
    @job = Job.new(job_params)
    @job.trees = params['job']['trees']
    @job.vehicles = params['job']['vehicles']
    @job.equipment = params['job']['equipment']

    respond_to do |format|
      if @job.save
        format.html { redirect_to @job, notice: "Job was successfully created." }
        format.json { render :show, status: :created, location: @job }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /jobs/1 or /jobs/1.json
  def update
    respond_to do |format|
      if @job.update(job_params)
        format.html { redirect_to user_dashboard_path, notice: "Job was successfully updated." }
        format.json { render :show, status: :ok, location: @job }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /jobs/1 or /jobs/1.json
  def destroy
    @job.destroy

    respond_to do |format|
      format.html { redirect_to user_dashboard_path, notice: "Job was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_job
      @job = Job.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def job_params
      params.require(:job).permit(
        :start,
        :end,
        :invoiced,
        :paid,
        :estimator,
        :foreman,
        :notes,
        :trees,
        :equipment,
        :vehicles,
        :crew_size,
        :est_hours,
        :price,
        :property_id,
        :user_id
        )
    end
end
