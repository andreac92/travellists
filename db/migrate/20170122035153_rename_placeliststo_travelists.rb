class RenamePlaceliststoTravelists < ActiveRecord::Migration[5.0]
  def change
  	rename_table :placelists, :travelists
  end
end
