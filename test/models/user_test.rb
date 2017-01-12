require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "Jane Doe", email: "jane@doe.com", password: "a_password", password_confirmation: "a_password")
  end

  test "User is valid" do
    assert @user.valid?
  end

  test "No name is invalid" do
    @user.name = "     "
    assert_not @user.valid?
  end

  test "Invalid email is detected" do
  	@user.email = "not@email"
  	assert_not @user.valid?
  end

   test "Email address can't be used twice" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email
    @user.save
    assert_not duplicate_user.valid?
  end

   test "Short passwords are invalid" do
    @user.password = @user.password_confirmation = "no"
    assert_not @user.valid?
  end
end
