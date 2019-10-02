# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Fibs Application",
			"category": "Modules",
			"color": "#3498db",
			"icon": "octicon octicon-note",
			"type": "module",
			"label": _("Fibs Application"),
			"description": "Payin Application",
			"onboard_present": 1
		},
	]
