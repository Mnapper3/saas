Rails.application.routes.draw do
  root to: "pages#home"
  get '/about' => 'pages#about'
  resources :contacts, only: [:create]
  get 'contact-us' => 'contacts#new'
end
