# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in fibs/__init__.py
from fibs import __version__ as version

setup(
	name='fibs',
	version=version,
	description='App for Pay-in and POS for Friendly Island Bookshop',
	author='Sione Taumoepeau',
	author_email='sione.taumoepeau@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
