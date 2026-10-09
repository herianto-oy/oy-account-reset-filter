# Reset Filters for Accounting Reports

Adds a **Reset** button next to the filters of the Odoo accounting reports
(General Ledger, Balance Sheet, Profit and Loss, ...). One click clears the
filters stored in the browser session, empties the search bar and reloads the
report with its default options.

## Requirements

- Odoo 18.0 Enterprise (`account_reports`)

Other versions live in their own branch: `18.0`, `19.0`, `20.0`.

## Installation

1. Add this repository to your `addons_path`.
2. Update the apps list and install **Reset Filters for Accounting Reports**.

No configuration is needed.

## Usage

Open any report from *Accounting > Reporting*, change the filters, then click
**Reset**.

## Tests

The module ships a browser tour (`oy_account_reset_filter`) run by
`tests/test_reset_filter_tour.py`:

```
odoo-bin -d <db> -u oy_account_reset_filter --test-tags /oy_account_reset_filter --stop-after-init
```

It needs Chrome and the `websocket-client` Python package.

## License

LGPL-3
