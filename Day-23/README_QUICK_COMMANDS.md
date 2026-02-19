Quick commands (PowerShell)

# Verify mongosh is available

mongosh --version

# Start MongoDB if needed

net start MongoDB

# Run the insert script

mongosh insert_interns.js

# Connect interactively

mongosh

# then in shell:

# use unify_labs

# db.interns.find().pretty()
