#!/bin/bash

# Find all relevant files

files=`find ./data/ -type f -name '*.n3'`

# Evaluate them with the EYE reasoner

eye --nope --quiet --blogic $files
