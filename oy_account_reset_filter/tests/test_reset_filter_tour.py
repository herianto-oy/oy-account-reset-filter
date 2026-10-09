# -*- coding: utf-8 -*-
from freezegun import freeze_time

import odoo.tests
from odoo import fields
from odoo.tests import tagged

from odoo.addons.account_reports.tests.common import TestAccountReportsCommon


@tagged('post_install', '-at_install')
class TestResetFilterTour(TestAccountReportsCommon, odoo.tests.HttpCase):

    @freeze_time('2017-07-11')
    def test_tour_reset_filter(self):
        move = self.env['account.move'].create({
            'move_type': 'entry',
            'date': fields.Date.from_string('2017-07-10'),
            'journal_id': self.company_data['default_journal_sale'].id,
            'line_ids': [
                (0, 0, {'debit': 1000.0, 'credit': 0.0, 'name': '2017_1_1',
                        'account_id': self.company_data['default_account_receivable'].id}),
                (0, 0, {'debit': 0.0, 'credit': 1000.0, 'name': '2017_1_2',
                        'account_id': self.company_data['default_account_revenue'].id}),
            ],
        })
        move.action_post()

        self.start_tour("/odoo", 'oy_account_reset_filter', login=self.env.user.login)
