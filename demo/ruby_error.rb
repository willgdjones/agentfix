def process_user(user)
  # This will cause a NoMethodError because user is nil
  puts "User: " + user.name.upcase
end

user = nil
process_user(user)

