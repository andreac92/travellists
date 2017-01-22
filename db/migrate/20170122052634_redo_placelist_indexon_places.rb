class RedoPlacelistIndexonPlaces < ActiveRecord::Migration[5.0]
  def change
  	remove_index :places, column: :placelist_id
  	add_reference :places, :travelist, foreign_key: true
  end
end
