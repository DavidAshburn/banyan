json.extract! fleet, :id, :name, :plate, :serial, :renewables, :docs, :created_at, :updated_at
json.url fleet_url(fleet, format: :json)
