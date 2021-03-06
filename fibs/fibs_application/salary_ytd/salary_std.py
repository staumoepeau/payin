# -*- coding: utf-8 -*-
# Copyright (c) 2019, Sione Taumoepeau and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

def calculate_ytd(doc, method):
    salaries = frappe.get_all(
    "Salary Slip",
    fields=["*"],
    filters={'employee': doc.employee,
             'status': 'Submitted'},
#            'end_date': ("<",  doc.end_date)},
    order_by='end_date'
  )

    salary_structure = frappe.get_doc('Salary Structure', doc.salary_structure)
    salary_year_to_date = salary_structure.salary_year_to_date
    salary_structure_dict = {}


    for item in salary_year_to_date:
        salary_structure_dict[item.salary_component] = {
            'abbr': item.abbr,
            'salary_component': item.salary_component,
            'amount': 0.0
        }

    if len(salaries) > 0:
        prev_salary = salaries[-1]
        prev_salary_db = frappe.get_doc('Salary Slip', prev_salary.get('name'))

    if len(prev_salary_db.salary_year_to_date) > 0:
        for item in prev_salary_db.salary_year_to_date:
            if item.salary_component in salary_structure_dict:
                salary_structure_dict[item.salary_component]['amount'] += item.amount
    else:
        for item in prev_salary_db.earnings:
            if item.salary_component in salary_structure_dict:
                salary_structure_dict[item.salary_component]['amount'] += item.amount

        for item in prev_salary_db.deductions:
            if item.salary_component in salary_structure_dict:
                salary_structure_dict[item.salary_component]['amount'] += item.amount

        for item in doc.earnings:
            if item.salary_component in salary_structure_dict:
                salary_structure_dict[item.salary_component]['amount'] += item.amount

        for item in doc.deductions:
            if item.salary_component in salary_structure_dict:
                salary_structure_dict[item.salary_component]['amount'] += item.amount

    if len(doc.salary_year_to_date) == 0:
        for item in salary_structure_dict.values():
            doc.append('salary_year_to_date', item)
    else:
        for item in doc.salary_year_to_date:
            if item.salary_component in salary_structure_dict:
                item.amount = salary_structure_dict[item.salary_component]['amount']
