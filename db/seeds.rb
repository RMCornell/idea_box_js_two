# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Idea.delete_all

Idea.create([
  { title: "Idea One", body: "Body One", quality: 1 },
  { title: "Idea Two", body: "Body Two", quality: 1 }

])
