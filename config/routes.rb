Rails.application.routes.draw do

# Placelist routes - index, create, show, update, destroy and all
# Place route - create
  resources :placelists, only: [:create] do
    resources :places, only: [:create]
  end
  resources :placelists, only: [ :index, :show, :update, :destroy ]

# Place routes - index, destroy and toggle_visited
  resources :places, only: [:index, :destroy]
  post '/places/:id/visit', to: 'places#toggle_visited'

 
# User routes -create, update and show
  get '/account', to: 'users#show'
  resources :users, only: [:create, :update]

# Session routes - create, destroy
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

# Admin routes - all users, all placelists
  get '/admin/users', to: 'users#index'
  get '/admin/placelists', to: 'placelists#all'

# Root route 
  root 'welcome#index'
end
