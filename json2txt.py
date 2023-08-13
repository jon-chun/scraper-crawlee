import os
import glob
import json
from bs4 import BeautifulSoup
from urllib.parse import urlparse

# The directory that contains the JSON files
json_dir = '.\storage\datasets\default'
output_dir = '.\websites'

# If the output directory doesn't exist, create it
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Loop over every JSON file in the directory
for json_file in glob.glob(os.path.join(json_dir, '*.json')):
    # Open the JSON file and load its contents into a Python dictionary
    print(f'Processing file: {json_file}')
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Create a BeautifulSoup object and specify the parser
    soup = BeautifulSoup(data['html'], 'html.parser')

    # Find all text within the HTML using the .stripped_strings generator
    text = ' '.join(soup.stripped_strings)

    # Parse the URL to create a filename-safe string
    website_name = urlparse(data['url']).netloc.replace('.', '_')

    # Create a filename for the output text
    output_file = os.path.join(output_dir, f'{website_name}.txt')

    # Write the text to the output file
    print(f'                 {output_file}')
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(text)