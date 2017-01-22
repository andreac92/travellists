class Place < ApplicationRecord
	belongs_to :travelist
	validates :name, presence: true,
					 length: { minimum: 3 }
end
