# -*- coding: utf-8 -*-
# Copyright (c) 2019, Sione Taumoepeau and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
# import frappe
from frappe.model.document import Document

class PayIn(Document):
	
	def validate(self):

		if not self.total_cash:
			self.total_cash = 0
		
		if not self.total_cheques:
			self.total_cheques = 0
			self.grand_total = self.total_cash + self.total_cheques