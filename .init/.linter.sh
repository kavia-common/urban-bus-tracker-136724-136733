#!/bin/bash
cd /home/kavia/workspace/code-generation/urban-bus-tracker-136724-136733/bus_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

