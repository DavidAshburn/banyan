class FleetsController < ApplicationController
  before_action :set_fleet, only: %i[ show edit update destroy ]

  # GET /fleets or /fleets.json
  def index
    @fleets = Fleet.all
  end

  # GET /fleets/1 or /fleets/1.json
  def show
  end

  # GET /fleets/new
  def new
    @fleet = Fleet.new
  end

  # GET /fleets/1/edit
  def edit
  end

  # POST /fleets or /fleets.json
  def create
    @fleet = Fleet.new(fleet_params)
    @fleet.user_id = current_user.id

    respond_to do |format|
      if @fleet.save
        format.html { render json: current_user.fleets, notice: "Fleet was successfully created." }
        format.json { render :show, status: :created, location: @fleet }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @fleet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fleets/1 or /fleets/1.json
  def update
    respond_to do |format|
      if @fleet.update(fleet_params)
        format.html { render json: @fleet, notice: "Fleet was successfully updated." }
        format.json { render :show, status: :ok, location: @fleet }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @fleet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fleets/1 or /fleets/1.json
  def destroy
    @fleet.destroy

    respond_to do |format|
      format.html { render json: current_user.fleets, notice: "Fleet was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fleet
      @fleet = Fleet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def fleet_params
      params.require(:fleet).permit(:name, :plate, :serial, :renewables, :docs, :fuel, :milespergallon, :fleettype, :user_id)
    end
end
