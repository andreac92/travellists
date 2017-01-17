class AddUserToPlacelists < ActiveRecord::Migration[5.0]
  def change
    add_reference :placelists, :user, foreign_key: true
  end
end
