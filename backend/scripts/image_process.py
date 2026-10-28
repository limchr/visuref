import os
from PIL import Image
from io import BytesIO

def optimize_images(
    root_dir,
    target_size_kb=500,
    max_long_edge=2048,
    min_quality=25,
    initial_quality=95,
    step=5
):
    """
    Recursively optimize all JPG/JPEG images in root_dir.
    - Resize long edge to max_long_edge while preserving aspect ratio
    - Strip all metadata
    - Apply chroma subsampling 4:2:0
    - Adjust quality iteratively to reach target_size_kb
    - Overwrite original files
    """

    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.lower().endswith((".jpg", ".jpeg")):
                continue

            infile = os.path.join(dirpath, filename)
            try:
                with Image.open(infile) as img:
                    img = img.convert("RGB")  # ensure no alpha channel

                    # Resize while keeping aspect ratio
                    width, height = img.size
                    if width >= height:
                        new_width = max_long_edge
                        new_height = int(height * (new_width / width))
                    else:
                        new_height = max_long_edge
                        new_width = int(width * (new_height / height))
                    img = img.resize((new_width, new_height), Image.LANCZOS)

                    # Try compressing iteratively
                    quality = initial_quality
                    buffer = BytesIO()

                    while True:
                        buffer = BytesIO()
                        img.save(
                            buffer,
                            format="JPEG",
                            quality=quality,
                            optimize=True,
                            progressive=True,
                            subsampling=2,  # 4:2:0 chroma subsampling
                        )

                        size_kb = buffer.tell() / 1024
                        if size_kb <= target_size_kb or quality <= min_quality:
                            break
                        quality -= step

                    # Save final version (overwrite, stripped metadata)
                    with open(infile, "wb") as f:
                        f.write(buffer.getvalue())

                    print(f"[OK] {infile}")
                    print(
                        f" → size: {size_kb:.0f} KB, quality: {quality}, subsampling: 4:2:0, resized: {new_width}x{new_height}"
                    )

            except Exception as e:
                print(f"[ERROR] {infile}: {e}")


# Example usage:

if __name__ == '__main__':
    optimize_images("./data/image_gallery/")