// Copyright (c) 2019, Sione Taumoepeau and contributors
// For license information, please see license.txt

frappe.provide("fibs.payin");

frappe.ui.form.on('PayIn', {

	refresh: function(frm){

//		if (frm.doc.docstatus == 1 && frappe.user.has_role("Sales Master Manager") && frm.doc.status != "PayIn" && frm.doc.status != "Approve") {
//			cur_frm.add_custom_button(__('Approved'),function() {
//				cur_frm.events.update_status_approved(cur_frm);
//			}, __('Action'));
//			cur_frm.page.set_inner_btn_group_as_primary(__('Action'));
//		}

//		if (frm.doc.docstatus == 1 && frappe.user.has_role("Accounts User") && !frappe.user.has_role("Sales Master Manager") && frm.doc.status == "Approve") {
//			cur_frm.add_custom_button(__('Comfirmed PayIn'),function() {
//				cur_frm.events.update_status_payin(cur_frm);
//			}, __('Action'));
//			cur_frm.page.set_inner_btn_group_as_primary(__('Action'));
//		}

	},

//	update_status_approved: function(frm){
//		frappe.call({
//			method: "update_status_approve",
//			doc: frm.doc,
//		})
	//	frappe.throw(__("PayIn have been Approved"));
//		location.reload(true);
//	},

//	update_status_payin: function(frm){
//		frappe.call({
//			method: "update_status_payin",
//			doc: frm.doc,
//		});
	//	frappe.throw(__("PayIn have been Confirmed"));
//		location.reload(true);

//	},

	on_submit: function(frm){
		cur_frm.refresh();
	},

	onload: function(frm) {
		fibs.payin.setup_queries(frm);
	},

	total_pos_amount: function(frm){
		
		if (!frm.doc.total_entry_payment || frm.doc.total_entry_payment == ""){
			var total_entry_payment = 0;
		}
		if (!frm.doc.total_pos_amount || frm.doc.total_pos_amount == ""){
			var total_pos_amount = 0;
		}

		var total_amount = flt(frm.doc.total_pos_amount + total_entry_payment)
		frm.set_value("total", total_amount);
		cur_frm.refresh();
	},

	total_entry_payment: function(frm){

		if (!frm.doc.total_entry_payment || frm.doc.total_entry_payment == ""){
			var total_entry_payment = 0;
		}
		if (!frm.doc.total_pos_amount || frm.doc.total_pos_amount == ""){
			var total_pos_amount = 0;
		}

		var total_amount = flt(frm.doc.total_pos_amount + frm.doc.total_entry_payment)
		frm.set_value("total", total_amount);
		cur_frm.refresh();
	},

	total_cash: function(frm){
		
		if (!frm.doc.total_cheques || frm.doc.total_cheques == ""){
			var total_cheques = 0;
		}
		if (!frm.doc.total_cash || frm.doc.total_cash == ""){
			var total_cash = 0;
		}
		var grand_amount = flt(frm.doc.total_cash + total_cheques)
		frm.set_value("grand_total", grand_amount);
		cur_frm.refresh();
	},

	total_cheques: function(frm){

		if (!frm.doc.total_cheques || frm.doc.total_cheques == ""){
			var total_cheques = 0;
		}
		if (!frm.doc.total_cash || frm.doc.total_cash == ""){
			var total_cash = 0;
		}

		var grand_amount = flt(frm.doc.total_cash + frm.doc.total_cheques)
		frm.set_value("grand_total", grand_amount);
		cur_frm.refresh();
	},
	
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



frappe.ui.form.on("Denomination Table", {
	qty: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		
		frappe.model.set_value(d.doctype, d.name, "total", d.denomination * d.qty);
	
		var totalcash = 0;
		frm.doc.cash_details.forEach(function(d) { totalcash += d.total; });
	
		frm.set_value("total_cash", totalcash);
		cur_frm.refresh();
	},

	cash_details_remove: function(frm, cdt, cdn){
		var totalcash = 0;
		frm.doc.cash_details.forEach(function(d) { totalcash += d.total; });
	
		frm.set_value("total_cash", totalcash);
		cur_frm.refresh();
	}
  
});
  
frappe.ui.form.on("Cheques Details", {
	amount: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];

		var totalcheques = 0;
		frm.doc.cheques_details.forEach(function(d) { totalcheques += d.amount; });

		frm.set_value("total_cheques", totalcheques);
		cur_frm.refresh();
	},

	cheques_details_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var totalcheques = 0;
		frm.doc.cheques_details.forEach(function(d) { totalcheques += d.amount; });

		frm.set_value("total_cheques", totalcheques);
		cur_frm.refresh();
	}
});

frappe.ui.form.on("Payin POS Closing Voucher", {
	total_voucher: function(frm, cdt, cdn){
	var d = locals[cdt][cdn];

	var totalpos = 0;
	frm.doc.pos_closing_voucher_table.forEach(function(d) { totalpos += d.total_voucher; });

	frm.set_value("total_pos_amount", totalpos);
	cur_frm.refresh();
	},
	
	pos_closing_voucher_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var totalpos = 0;;
		frm.doc.pos_closing_voucher_table.forEach(function(d) { totalpos += d.total_voucher; });
		frm.set_value("total_pos_amount", totalpos);
		cur_frm.refresh();
			}
});

frappe.ui.form.on("Payin Payment Entry", {
	total_payment: function(frm, cdt, cdn){
	var d = locals[cdt][cdn];

	var totalpayment = 0;
	frm.doc.payment_entry_table.forEach(function(d) { totalpayment += d.total_payment; });

	frm.set_value("total_entry_payment", totalpayment);
	cur_frm.refresh();
	},
	
	payment_entry_table_remove: function(frm, cdt, cdn){
		var d = locals[cdt][cdn];
		var totalpayment = 0;
		frm.doc.payment_entry_table.forEach(function(d) { totalpayment += d.total_payment; });
		frm.set_value("total_entry_payment", totalpayment);
		cur_frm.refresh();
	}
});