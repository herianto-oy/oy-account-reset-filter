/** @odoo-module */
import { patch } from "@web/core/utils/patch";
import { AccountReport } from "@account_reports/components/account_report/account_report";
import { browser } from "@web/core/browser/browser";

patch(AccountReport.prototype, {
    async filterReset(ev) {
        browser.sessionStorage.removeItem(this.controller.sessionOptionsID());
        const searchText = this.rootRef.el.querySelector('.o_searchview_input');
        if(searchText){
            delete this.controller.lines_searched;
            this.controller.deleteOption("filter_search_bar");
            searchText.value = "";
        }
        await this.controller.load(this.env);
    },

    filterResetOnClick(ev) {
        this.filterReset(ev);
    }
})