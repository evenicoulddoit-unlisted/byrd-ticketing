import os

import dj_database_url

from .base import *


DEBUG = False

SECRET_KEY = os.getenv('SECRET_KEY')

DATABASES['default'] = dj_database_url.config(conn_max_age=500)
