# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = [
        line.strip()
        for line in f
        if line.strip() and not line.startswith("#")
    ]

from fibs import __version__ as version

setup(
    name="fibs",
    version=version,
    description="App for Pay-in and POS for Friendly Island Bookshop",
    author="Sione Taumoepeau",
    author_email="sione.taumoepeau@gmail.com",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
)
