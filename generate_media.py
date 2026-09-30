from pathlib import Path
import json

images_folder = Path("images")

extensions = {
    ".jpg", ".jpeg", ".png", ".webp", ".gif",
    ".mp4", ".webm", ".mov"
}

files = [
    file.name
    for file in images_folder.iterdir()
    if file.is_file() and file.suffix.lower() in extensions
]

files.sort(key=lambda file: int(Path(file).stem))

with open("media.json", "w", encoding="utf-8") as f:
    json.dump(files, f, indent=4)

print(f"{len(files)} médias trouvés.")