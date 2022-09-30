# Generate CSS auth token if none exist yet
# This is required as to not have to authenticate with the browser every time.

filename=./tokens/token
if test -f "$filename";
then
  echo "$filename found. Continuing with existing token."
else
  echo "$filename has not been found"
  node css-generate-token/cli -o ./tokens/token
fi

# Retrieve all data from the Solid pod recursively and store it locally as N3 files 

node solid-fetch-all-data/cli -t ./tokens/token -o ./data/solid/

# Apply the reasoning process over these files

