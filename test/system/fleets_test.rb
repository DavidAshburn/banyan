require "application_system_test_case"

class FleetsTest < ApplicationSystemTestCase
  setup do
    @fleet = fleets(:one)
  end

  test "visiting the index" do
    visit fleets_url
    assert_selector "h1", text: "Fleets"
  end

  test "should create fleet" do
    visit fleets_url
    click_on "New fleet"

    fill_in "Docs", with: @fleet.docs
    fill_in "Milespergallon", with: @fleet.milespergallon
    fill_in "Name", with: @fleet.name
    fill_in "Plate", with: @fleet.plate
    fill_in "Renewables", with: @fleet.renewables
    fill_in "Serial", with: @fleet.serial
    fill_in "Fleettype", with: @fleet.fleettype
    click_on "Create Fleet"

    assert_text "Fleet was successfully created"
    click_on "Back"
  end

  test "should update Fleet" do
    visit fleet_url(@fleet)
    click_on "Edit this fleet", match: :first

    fill_in "Docs", with: @fleet.docs
    fill_in "Milespergallon", with: @fleet.milespergallon
    fill_in "Name", with: @fleet.name
    fill_in "Plate", with: @fleet.plate
    fill_in "Renewables", with: @fleet.renewables
    fill_in "Serial", with: @fleet.serial
    fill_in "Fleettype", with: @fleet.fleettype
    click_on "Update Fleet"

    assert_text "Fleet was successfully updated"
    click_on "Back"
  end

  test "should destroy Fleet" do
    visit fleet_url(@fleet)
    click_on "Destroy this fleet", match: :first

    assert_text "Fleet was successfully destroyed"
  end
end
