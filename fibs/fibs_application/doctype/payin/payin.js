// Copyright (c) 2019, Sione Taumoepeau and contributors
// For license information, please see license.txt

frappe.ui.form.on('PayIn', {
	refresh: function(frm) {

	  },
	
	onload: function(frm){
	},

	total_cash: function(frm){

		frm.set_value("grand_total", frm.doc.total_cash + frm.doc.total_cheques);
	},

	total_cheques: function(frm){

		frm.set_value("grand_total", frm.doc.total_cash + frm.doc.total_cheques);
	}
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