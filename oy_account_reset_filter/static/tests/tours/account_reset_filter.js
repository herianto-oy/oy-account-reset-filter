/** @odoo-module **/

import { registry } from "@web/core/registry";

// Report options saved in the browser session by the accounting reports.
function sessionReportOptions() {
    const reportOptions = [];
    for (let i = 0; i < window.sessionStorage.length; i++) {
        try {
            const options = JSON.parse(window.sessionStorage.getItem(window.sessionStorage.key(i)));
            if (options && options.report_id) {
                reportOptions.push(options);
            }
        } catch {
            // not a JSON entry, ignore
        }
    }
    return reportOptions;
}

function visibleLines(text) {
    return [...document.querySelectorAll('.line_name')].filter(
        (el) => el.offsetParent !== null && el.textContent.includes(text)
    );
}

// Lines hidden by the search are either kept in the DOM (hidden) or not rendered
// at all depending on the version, so poll on what the user actually sees.
async function waitUntil(condition, message) {
    for (let i = 0; i < 50; i++) {
        if (condition()) {
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.error(message);
}

registry.category("web_tour.tours").add('oy_account_reset_filter', {
    url: '/odoo/action-account_reports.action_account_report_general_ledger',
    steps: () => [
        {
            content: "the reset button is displayed next to the filters",
            trigger: '.o_account_reset_filter',
        },
        {
            content: "both accounts are displayed by default",
            trigger: '.line_name:contains("121000")',
        },
        // Reset of a report option
        {
            content: "open the extra options",
            trigger: '#filter_extra_options button',
            run: 'click',
        },
        {
            content: "include the draft entries",
            trigger: '.dropdown-item:contains("Draft Entries")',
            run: 'click',
        },
        {
            content: "the option is stored in the session",
            trigger: '.line_name:contains("121000")',
            async run() {
                await waitUntil(
                    () => sessionReportOptions().some((options) => options.all_entries),
                    "The draft entries option should be stored in the session options."
                );
            },
        },
        {
            content: "reset the filters",
            trigger: '.o_account_reset_filter',
            run: 'click',
        },
        {
            content: "the option is back to its default value",
            trigger: '.line_name:contains("121000")',
            async run() {
                await waitUntil(
                    () => {
                        const reportOptions = sessionReportOptions();
                        return reportOptions.length && !reportOptions.some((options) => options.all_entries);
                    },
                    "The draft entries option should be reset to its default value."
                );
            },
        },
        // Reset of the search bar
        {
            content: "click search",
            trigger: '.o_searchview_input',
            run: 'click',
        },
        {
            content: "filter on the product sales account",
            trigger: '.o_searchview_input',
            run: "edit Product Sales",
        },
        {
            content: "the receivable line is filtered out",
            trigger: '.line_name:contains("400000 Product Sales")',
            async run() {
                await waitUntil(
                    () => !visibleLines("121000").length,
                    "The receivable line should be filtered out by the search."
                );
            },
        },
        {
            content: "reset the filters again",
            trigger: '.o_account_reset_filter',
            run: 'click',
        },
        {
            content: "the receivable line is displayed again",
            trigger: '.line_name:contains("121000")',
        },
        {
            content: "the search bar is cleared",
            trigger: '.line_name:contains("400000 Product Sales")',
            async run() {
                await waitUntil(
                    () => document.querySelector('.o_searchview_input').value === "",
                    "The search bar should be empty after the reset."
                );
                await waitUntil(
                    () => !sessionReportOptions().some((options) => options.filter_search_bar),
                    "The search filter should be removed from the session options."
                );
            },
        },
    ]
});
