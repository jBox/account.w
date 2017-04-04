import { allProjects, summaryFilters } from "./common";
import { createSelector } from "reselect";

export const project = createSelector(
    allProjects,
    summaryFilters,
    (allProjects, filters) => {
        return allProjects[filters.date];
    }
)