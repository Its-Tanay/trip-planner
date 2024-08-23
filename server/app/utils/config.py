import os
import configparser

def load_config():
    config = configparser.ConfigParser()
    
    base_path = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    config_path = os.path.join(base_path, 'config.ini')

    config.read(config_path)

    return {
        'DEBUG': True,
        'DB_URL': config['LOCAL'].get("DB_URL", 'default_db_url_here')
    }