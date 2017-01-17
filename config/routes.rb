Rails.application.routes.draw do

# Placelist routes - index, create, show, update, destroy and all
  resources :placelists, only: [:index, :create :show, :update, :destroy]
  # get '/placelists', to: 'placelists#index'

  # post '/placelists', to: 'placelists#create'

  # get '/placelists/:id', to: 'placelists#show'

  # patch '/placelists/:id', to: 'placelists#update'

  # delete '/placelists/:id', to: 'placelists#destroy'

# Place routes - index, create, destroy and toggle_visited

  get '/places', to: 'places#index'

  post '/placelists/:placelist_id/places', to: 'places#create'

  delete '/placelists/:placelist_id/places/:id', to: 'places#destroy'

  post '/placelists/:placelist_id/places/:id/visit', to: 'places#toggle_visited'
  
# User routes - index, create, update and show
  get '/account', to: 'users#show'

  get '/admin/users', to: 'users#index'

  post '/users', to: 'users#create'

  patch '/users/:id', to: 'users#update'

# Session routes - create, destroy
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

# Admin routes - all users, all placelists
  get '/admin/users', to: 'users#index'

  get '/admin/placelists', to: 'placelists#all'

# Root route 
  root 'welcome#index'
end
