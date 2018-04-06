puts "testing"

# Use what you just learned about Ruby data types, methods and string interpolation; hop in irb; and get through as many of the following questions as you can:

# Declare a constant that contains your name

# Declare a variable that contains your age

# Write a method that accepts two parameters: an age and a name

# This method should interpolate the age and name into a string that says, "Hi there, my name is _____ and I'm ________"; print the string to the screen
# Call the method

# Create an array my_friends and add the names of your best friends to the array

# Write a method that accepts one parameter: list_of_friends

# Using string interpolation, write some code in this method that will print out a list of your friends as a string. The output should be as follows: "Hi there, these are my friends: __________".


name_constant = "ilya"
@age = 22

def newmethod(age = "20" ,name = "bobbert")
   put "Hi" + age + "I am"+ name
end

newmethod