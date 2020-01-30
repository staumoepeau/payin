// Copyright (c) 2019, Sione Taumoepeau and contributors
// For license information, please see license.txt


frappe.listview_settings['PayIn'] = {
	add_fields: ["status"],
	has_indicator_for_draft: 1,
	get_indicator: function(doc) {

		if(doc.docstatus==0){
			if(doc.status=="Open"){
				return [__("Open"), "orange", "status,=,Open"];
			} 
		} else if(doc.status=== "Approve"){
			return [__("Approve"), "blue", "status,=,Approve"];
			
		} else if (doc.status === "Review"){
			return [__("Review"), "orange", "status,=,Review"];

		} else if (doc.status === "PayIn"){
				return [__("PayIn"), "green", "status,=,PayIn"];

		} else if (doc.status === "Rejected"){
			return [__("Rejected"), "black", "status,=,Rejected"];

		}
	}
};
