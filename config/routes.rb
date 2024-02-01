Rails.application.routes.draw do
  get 'user/dashboard'
  get 'user/profile'
  get 'mapping/new'
  root 'home#index'
  devise_for :users

  get 'data/clients', to: 'data#clients'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
