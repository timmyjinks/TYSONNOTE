import re

import torch
from doctr.io import DocumentFile
from doctr.models import ocr_predictor

import aiinator

model = ocr_predictor(pretrained=True)


def image_to_string(image_bytes: bytes) -> str:
    doc = DocumentFile.from_images(image_bytes)
    text = model(doc).render()
    return text
