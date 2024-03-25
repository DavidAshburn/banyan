json.extract! property, :id, :created_at, :updated_at, :address,
  :latitude, :longitude, :phone, :email, :parking, :tree_access,
  :contact_name, :property_type, :client_id, :zones
json.url property_url(property, format: :json)
