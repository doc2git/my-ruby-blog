require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test "should get dindex" do
    get welcome_dindex_url
    assert_response :success
  end

end
