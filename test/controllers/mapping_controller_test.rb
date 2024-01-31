require "test_helper"

class MappingControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get mapping_new_url
    assert_response :success
  end
end
