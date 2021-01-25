# Copyright (c) 2013, Sione Taumoepeau and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

def execute(filters=None):
    columns, data = [], []
    
    columns = ["Item Code::200", "Item Name::200", "Item Group:Link/Item Group:180", "Barcode:Data:200","Amount:Currency:160"]
    if filters:
        data = frappe.db.sql("""SELECT `t1`.`item_code`, 
				  `t1`.`item_name`, 
				  `t2`.`item_group`,
				  `t3`.barcode,
				  `t1`.`price_list_rate`
				FROM `tabItem Price` AS `t1`
				LEFT JOIN `tabItem` AS `t2` ON `t1`.`item_code` = `t2`.`item_code`
				LEFT JOIN `tabItem Barcode` AS `t3` ON `t1`.`item_code` = `t3`.`parent`
				WHERE `price_list` = '{0}'
				ORDER BY `t1`.`item_code` ASC;""".format(filters.price_list), as_list = True)
    else:
        data = frappe.db.sql("""SELECT `t1`.`item_code`, 
				  `t1`.`item_name`, 
				  `t2`.`item_group`,
				  `t3`.barcode,
				  `t1`.`price_list_rate`
				FROM `tabItem Price` AS `t1`
				LEFT JOIN `tabItem` AS `t2` ON `t1`.`item_code` = `t2`.`item_code`
				LEFT JOIN `tabItem Barcode` AS `t3` ON `t1`.`item_code` = `t3`.`parent`
				ORDER BY `t1`.`item_code` ASC;""", as_list = True)
            
    return columns, data