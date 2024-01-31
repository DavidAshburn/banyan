require "test_helper"

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get dashboard" do
    get user_dashboard_url
    assert_response :success
  end

  test "should get profile" do
    get user_profile_url
    assert_response :success
  end
end
