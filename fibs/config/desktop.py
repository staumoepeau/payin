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
			"color": "blue",
			"description": "Payin Application",
		},

				{
			"module_name": "Wharf Management",
			"color": "blue",
			"icon": "octicon octicon-tools",
			"type": "module",
			"link": "modules/Wharf Management",
			"label": _("Ports Management")
		},
	]
