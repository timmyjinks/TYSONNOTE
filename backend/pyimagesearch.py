from io import BytesIO

import pytesseract
from PIL import Image


def image_to_string(image_bytes: bytes) -> str:
    image = Image.open(BytesIO(image_bytes))
    text = pytesseract.image_to_string(image)
    return text
