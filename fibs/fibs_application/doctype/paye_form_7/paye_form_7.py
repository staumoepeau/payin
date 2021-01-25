# -*- coding: utf-8 -*-
# Copyright (c) 2021, Sione Taumoepeau and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class PAYEForm7(Document):
	pass


@frappe.whitelist()
def get_table_details(posting_date, paye_period, paye_year):
    return frappe.db.sql("""SELECT tss.employee, tss.employee_name,
    SUM(tss.gross_pay) AS "net_amount"
    FROM `tabSalary Slip` tss
    WHERE month(tss.posting_date) = '08'
    GROUP BY tss.employee""", as_list=True)