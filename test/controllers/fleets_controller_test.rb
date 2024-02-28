require "test_helper"

class FleetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fleet = fleets(:one)
  end

  test "should get index" do
    get fleets_url
    assert_response :success
  end

  test "should get new" do
    get new_fleet_url
    assert_response :success
  end

  test "should create fleet" do
    assert_difference("Fleet.count") do
      post fleets_url, params: { fleet: { docs: @fleet.docs, milespergallon: @fleet.milespergallon, name: @fleet.name, plate: @fleet.plate, renewables: @fleet.renewables, serial: @fleet.serial } }
    end

    assert_redirected_to fleet_url(Fleet.last)
  end

  test "should show fleet" do
    get fleet_url(@fleet)
    assert_response :success
  end

  test "should get edit" do
    get edit_fleet_url(@fleet)
    assert_response :success
  end

  test "should update fleet" do
    patch fleet_url(@fleet), params: { fleet: { docs: @fleet.docs, milespergallon: @fleet.milespergallon, name: @fleet.name, plate: @fleet.plate, renewables: @fleet.renewables, serial: @fleet.serial, fleettype: @fleet.fleettype } }
    assert_redirected_to fleet_url(@fleet)
  end

  test "should destroy fleet" do
    assert_difference("Fleet.count", -1) do
      delete fleet_url(@fleet)
    end

    assert_redirected_to fleets_url
  end
end
