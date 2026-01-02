def greet(user):
    # This will cause a KeyError because 'name' is missing
    return "Hello, " + user["nmae"]

data = {"name": "Alice"}
print(greet(data))

