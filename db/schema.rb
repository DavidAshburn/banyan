# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_02_23_083606) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clients", force: :cascade do |t|
    t.string "name"
    t.string "contact_name", default: ""
    t.string "phone", default: ""
    t.string "email", default: ""
    t.string "mail_address"
    t.text "notes", default: ""
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jobs", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.boolean "invoiced", default: false
    t.boolean "paid", default: false
    t.string "estimator"
    t.string "foreman", default: ""
    t.text "notes", default: ""
    t.jsonb "trees", default: {}
    t.string "equipment", default: [], array: true
    t.string "vehicles", default: [], array: true
    t.integer "crew_size", default: 0
    t.integer "est_hours", default: 0
    t.integer "price"
    t.integer "property_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "invoicedate"
    t.datetime "paiddate"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "name", default: ""
    t.string "preferred_contact_email", default: ""
    t.string "species", default: [], array: true
    t.string "vehicles", default: [], array: true
    t.string "equipment", default: [], array: true
    t.string "worktypes", default: [], array: true
    t.boolean "prefers_dark", default: false
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "properties", force: :cascade do |t|
    t.string "name", default: ""
    t.string "contact_name", default: ""
    t.string "phone", default: ""
    t.string "email", default: ""
    t.string "address"
    t.float "latitude"
    t.float "longitude"
    t.string "property_type", default: ""
    t.string "parking", default: ""
    t.string "tree_access", default: ""
    t.integer "client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "proptypes", force: :cascade do |t|
    t.string "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trees", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.integer "dbh"
    t.string "crown", default: ""
    t.string "history", default: [], array: true
    t.string "hazards", default: [], array: true
    t.string "pictures", default: [], array: true
    t.string "species"
    t.boolean "removed", default: false
    t.boolean "ground", default: false
    t.text "notes", default: ""
    t.integer "property_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "role"
    t.integer "parent"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "time_zone"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
