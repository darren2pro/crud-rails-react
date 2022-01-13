Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "beers/index"
      get "beers/:id", to: "beers#show"
      post "beers/", to: "beers#create"
      delete "beers/:id", to: "beers#destroy"
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "beers#index"
  get "*path", to: "beers#index", via: :all

end
