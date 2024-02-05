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
						},
						{
							"type": "doctype",
							"name": "POS Closing Voucher",
						},
						

				]
			},
			{
				"label": _("Payroll Reports"),
				"items": [
						{
							"type": "report",
							"name": "FIBS Salary Register",
							"is_query_report": True,
							"doctype": "Salary Slip"
						},
						{
							"type": "report",
							"name": "FIBS Bank File",
							"is_query_report": True,
							"doctype": "Salary Slip"
						},
						{
							"type": "report",
							"name": "FIBS PAYE",
							"is_query_report": True,
							"doctype": "Salary Slip"
						},
						{
							"type": "doctype",
							"name": "Timesheet",
						},

				]
			},
	]
