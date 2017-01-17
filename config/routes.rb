Rails.application.routes.draw do

  get 'users/new'

  get 'list/index'

  get 'welcome/index'

  get '/placelists/all', to: 'placelists#all'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :places
  resources :placelists
  resources :users

  get '/account', to: 'users#show'

  post '/places/:id/visit', to: 'places#toggle_visited'

  # get    '/login',   to: 'sessions#new' delete view
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
 
  root 'welcome#index'
end
