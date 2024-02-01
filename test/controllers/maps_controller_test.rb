require "test_helper"

class MapsControllerTest < ActionDispatch::IntegrationTest
  test "should get find" do
    get maps_find_url
    assert_response :success
  end
end
