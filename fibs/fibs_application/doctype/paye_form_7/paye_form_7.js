// Copyright (c) 2021, Sione Taumoepeau and contributors
// For license information, please see license.txt

frappe.ui.form.on('PAYE Form 7', {
	// refresh: function(frm) {

	// }
	update_table: function(frm){
		frappe.call({
            method: "fibs.fibs_application.doctype.paye_form_7.paye_form_7.get_table_details",
            args: {
                "posting_date": frm.doc.posting_date,
				"paye_period": frm.doc.paye_period,
				"paye_year": frm.doc.paye_year,
            },
            callback: function(r) {
                if (r.message) {
                    $.each(r.message, function(i, item) {
                        var item_row = frm.add_child("paye_form_7_table")
//                        console.log(item)
                        item_row.tin = item.employee
//                            item_row.employee_name = item.employee_name,
//                            item_row.total_salary_for_period = item.total_salary_for_period,
//							item_row.total_benefits_for_period = item.total_benefits_for_period,
//							item_row.tax_deducted = item.tax_deducted,
//							item_row.net_amount = item.net_amount
                    });
                }
                frm.save()
                frm.refresh()
            }
        });

	}
});
