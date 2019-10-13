# -*- coding: utf-8 -*-
# Copyright (c) 2019, Sione Taumoepeau and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.utils import cstr, flt, fmt_money, formatdate
from frappe import msgprint, _, scrub
from frappe.model.document import Document

class PayIn(Document):
	
	def validate(self):
		if not self.total_cash:
			self.total_cash = 0
		
		if not self.total_pos_amount:
			self.total_pos_amount = 0
		
		if not self.total_entry_payment:
			self.total_entry_payment = 0

		if not self.total_cheques:
			self.total_cheques = 0
			self.grand_total = self.total_cash + self.total_cheques
		
#		self.check_balance()

	def on_submit(self):
#		self.validate_grand_total()
		self.make_payin_entries()
		self.update_pos()
		self.update_payment_entry()

	
#	def validate_grand_total(self):
#		if self.different_amount:
#			frappe.throw(_("Grand Total must be equal to Total. The difference is {0}")
#				.format(self.different_amount))

#	def check_balance(self):
#		self.different_amount = flt(self.total, self.precision("total")) - \
#			flt(self.grand_total, self.precision("grand_total"))


	def make_payin_entries(self):
		doc = frappe.new_doc("Payment Entry")
		doc.update({
					"docstatus" : 1,
					"mode_of_payment" : "Payin",
					"payment_type" : "Internal Transfer",
					"paid_from" : "Undeposit Funds - FIBs",
					"paid_from_account_currency" : "TOP",
					"paid_to" : self.account_no,
					"paid_to_account_currency" : "TOP",
					"paid_amount" : self.grand_total,
					"received_amount" : self.grand_total			
				})
		doc.insert()
		doc.submit()
	
	def update_payment_entry(self):
		for d in self.get("payment_entry_table"):
			frappe.db.sql("""Update `tabPayment Entry` set payin=1 where name=%s""", (d.receipt_document))

	def update_pos(self):
		for d in self.get("pos_closing_voucher_table"):
			frappe.db.sql("""Update `tabPOS Closing Voucher` set payin=1 where name=%s""", (d.receipt_document))

