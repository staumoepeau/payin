from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("PAY In"),
			"items": [
				{
					"type": "doctype",
					"name": "PayIn",
					"description": _("PAY In."),
					"onboard": 1,
				},

			]
		},
	]
