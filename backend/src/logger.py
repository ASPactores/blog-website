import logging
from sys import stdout

logger = logging.getLogger("blog-app-logs")
handler = logging.StreamHandler(stdout)
handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)-8s %(message)s'))
logger.addHandler(handler)
logger.setLevel(logging.INFO)
