# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Fibs Application",
			"category": "Modules",
			"label": _("Fibs Application"),
			"type": "module",
			"link": "modules/Fibs Application",
			"icon": "octicon octicon-book",
			"color": "#3498db",
			"description": "Payin Application",
			"onboard_present": 1
		},
	]
