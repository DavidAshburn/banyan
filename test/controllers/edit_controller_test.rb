require "test_helper"

class EditControllerTest < ActionDispatch::IntegrationTest
  test "should get locupdate" do
    get edit_locupdate_url
    assert_response :success
  end
end
