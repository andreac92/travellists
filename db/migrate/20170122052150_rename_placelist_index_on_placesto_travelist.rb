class RenamePlacelistIndexOnPlacestoTravelist < ActiveRecord::Migration[5.0]
  def change
  	rename_index :places, "index_places_on_placelist_id", "index_places_on_travelist_id"
  end
end
