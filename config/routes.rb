Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get '/about' => 'pages#about'
  resources :contacts, only: [:create]
  get 'contact-us' => 'contacts#new'
end
