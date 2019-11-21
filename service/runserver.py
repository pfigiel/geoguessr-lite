"""
This script runs the service application using a development server.
"""

from os import environ
from service import app

app.run(port = 5000, debug = True)
