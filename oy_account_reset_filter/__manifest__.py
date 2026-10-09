# -*- coding: utf-8 -*-
{
    'name': "Reset Filters for Accounting Reports",

    'summary': "Reset all the filters of any accounting report in one click.",

    'description': """
        Adds a Reset button to the accounting reports: one click clears the filters
        of the session, empties the search bar and reloads the default options.
    """,
    'author': "OY",
    'website': "https://www.linkedin.com/in/herianto-oy/",
    'support': "herianto.oy@gmail.com",
    'category': 'Accounting/Accounting',
    'version': '19.0.1.0.0',
    'license': 'LGPL-3',
    'depends': ['base', 'account_reports'],
    'installable': True,
    'application': True,
    'images': ['static/description/banner.png'],
    'assets': {
        'web.assets_backend': [
            'oy_account_reset_filter/static/src/**/*',
        ],
        'web.assets_tests': [
            'oy_account_reset_filter/static/tests/tours/**/*',
        ],
    }
}
