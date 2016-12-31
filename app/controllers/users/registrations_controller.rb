class Users::RegistrationsController < Devise::RegistrationsController
#extend deafult behavior so users signing up with pro account save with a special stripe subscription function
#else user signs up normally
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
#if pro user pass validations, then calls stripe, and stripe sets up a subscription, and charges customers card
          resource.save_with_subscription
        else
#normal style save for basic
          resource.save
        end
      end
    end
  end
end