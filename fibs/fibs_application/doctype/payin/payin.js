// Copyright (c) 2019, Sione Taumoepeau and contributors
// For license information, please see license.txt

frappe.provide("fibs.payin");

frappe.ui.form.on('PayIn', {

	onload: function(frm) {
		fibs.payin.setup_queries(frm);
	},

	total_pos_amount: function(frm){

		frm.set_value("total", frm.doc.total_pos_amount + frm.doc.total_entry_payment);
	},

	total_entry_payment: function(frm){
		frm.set_value("total", frm.doc.total_pos_amount + frm.doc.total_entry_payment);
	},

	total_cash: function(frm){

		frm.set_value("grand_total", frm.doc.total_cash + frm.doc.total_cheques);
	},

	total_cheques: function(frm){

		frm.set_value("grand_total", frm.doc.total_cash + frm.doc.total_cheques);
	}
	
});

$.extend(fibs.payin, {
	setup_queries: function(frm) {

	frm.fields_dict['pos_closing_voucher_table'].grid.get_field("receipt_document").get_query = function(doc, cdt, cdn) {
		return {
			filters: [
				['POS Closing Voucher', 'docstatus', '=', 1],
				['POS Closing Voucher', 'payin', '=', 0]
			]
			}
		},
	frm.fields_dict['payment_entry_table'].grid.get_field("receipt_document").get_query = function(doc, cdt, cdn) {
		return {
			filters: [
				['Payment Entry', 'docstatus', '=', 1],
				['Payment Entry', 'payment_type', '=', 'Receive'],
				['Payment Entry', 'payin', '=', 0]
			]
			}
		}
	}
});

frappe.ui.form.on("Payin POS Closing Voucher", "receipt_document", function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	frappe.call({
		"method": "frappe.client.get",
		args: {
				doctype: "POS Closing Voucher",
				name : d.receipt_document,
				filters : {
					docstatus:1
				}			
			},
				callback: function (data) {
				frappe.model.set_value(d.doctype, d.name, "posting_date",  data.message["posting_date"]);
				frappe.model.set_value(d.doctype, d.name, "cashier", data.message["user"]);
				frappe.model.set_value(d.doctype, d.name, "payin", "1");
				frappe.model.set_value(d.doctype, d.name, "total_voucher", data.message["total_amount"]);
			}
	})
});

frappe.ui.form.on("Payin Payment Entry", "receipt_document", function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	frappe.call({
		"method": "frappe.client.get",
		args: {
				doctype: "Payment Entry",
				name : d.receipt_document,
				filters : {
					docstatus:1
				}			
			},
				callback: function (data) {
				frappe.model.set_value(d.doctype, d.name, "posting_date",  data.message["posting_date"]);
				frappe.model.set_value(d.doctype, d.name, "cashier", data.message["owner"]);
				frappe.model.set_value(d.doctype, d.name, "payin", "1");
				frappe.model.set_value(d.doctype, d.name, "total_payment", data.message["paid_amount"]);
			}
	})
});



frappe.ui.form.on("Denomination Table", "qty", function(frm, cdt, cdn){
	var d = locals[cdt][cdn];
	
	frappe.model.set_value(d.doctype, d.name, "total", d.denomination * d.qty);
  
	var totalcash = 0;
	frm.doc.cash_details.forEach(function(d) { totalcash += d.total; });
  
	frm.set_value("total_cash", totalcash);
  
});
  
frappe.ui.form.on("Cheques Details", "amount", function(frm, cdt, cdn){
	var d = locals[cdt][cdn];

	var totalcheques = 0;
	frm.doc.cheques_details.forEach(function(d) { totalcheques += d.amount; });

	frm.set_value("total_cheques", totalcheques);
	 
});

frappe.ui.form.on("Payin POS Closing Voucher", "receipt_document", function(frm, cdt, cdn){
	var d = locals[cdt][cdn];

	var totalpayment = 0;
	frm.doc.pos_closing_voucher_table.forEach(function(d) { totalpayment += d.total_voucher; });

	frm.set_value("total_pos_amount", totalpayment);
	 
});

frappe.ui.form.on("Payin Payment Entry", "receipt_document", function(frm, cdt, cdn){
	var d = locals[cdt][cdn];

	var totalpayment = 0;
	frm.doc.payment_entry_table.forEach(function(d) { totalpayment += d.total_payment; });

	frm.set_value("total_entry_payment", totalpayment);
	 
});