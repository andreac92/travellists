class Place < ApplicationRecord
	belongs_to :placelist
	validates :name, presence: true,
					 length: { minimum: 3 }
end
