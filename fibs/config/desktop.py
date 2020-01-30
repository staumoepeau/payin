<<<<<<< HEAD
# coding=utf-8

=======
# -*- coding: utf-8 -*-
>>>>>>> d0dcbbc716bf5c16d531cac15379c2f5d4aeb11c
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		# Modules
		{
			"module_name": "Fibs Application",
			"category": "Modules",
<<<<<<< HEAD
			"label": _("Payin"),
			"color": "#3498db",
			"icon": "fa fa-check-square-o",
			"type": "module",
			"description": "Payin Application."
=======
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
>>>>>>> d0dcbbc716bf5c16d531cac15379c2f5d4aeb11c
		},
	]
