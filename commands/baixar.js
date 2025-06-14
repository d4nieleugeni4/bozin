import zipfile
import os

# Caminho do arquivo ZIP enviado
zip_path = "/mnt/data/bozin-main.zip"
extract_path = "/mnt/data/bozin-main"

# Extrair o conteúdo do ZIP
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extract_path)

# Listar arquivos extraídos para entender a estrutura
extracted_files = []
for root, dirs, files in os.walk(extract_path):
    for file in files:
        extracted_files.append(os.path.join(root, file))

extracted_files
