# coding=utf-8

from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		# Modules
		{
			"module_name": "Fibs Application",
			"category": "Modules",
			"label": _("Payin"),
			"color": "#3498db",
			"icon": "fa fa-check-square-o",
			"type": "module",
			"description": "Payin Application."
		},
	]
