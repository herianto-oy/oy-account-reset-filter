import { patch } from "@web/core/utils/patch";
import { AccountReport } from "@account_reports/components/account_report/account_report";

patch(AccountReport.prototype, {
    async filterReset() {
        const controller = this.controller;
        window.sessionStorage.removeItem(controller.sessionOptionsID());
        const searchText = this.rootRef()?.querySelector(".o_searchview_input");
        if (searchText) {
            searchText.value = "";
        }
        // Drop cached options/data so the report is reloaded with its default options.
        controller.reportOptionsMap = {};
        controller.reportInformationMap = {};
        controller.lastOpenedSectionByReport = {};

        // Load the options the same way as when the report is opened, so that the
        // defaults computed only on opening (e.g. the journals filter) are restored too.
        const optionsInfo = await controller.loadReportOptions(controller.actionReportId, false, false, true);
        const options = await optionsInfo.options;
        const cacheKey = controller.getCacheKey(options["sections_source_id"], options["report_id"]);
        controller.reportOptionsMap[cacheKey] = options;
        controller.saveSessionOptions(options);
        await controller.displayReport(options["report_id"]);
    },
});
