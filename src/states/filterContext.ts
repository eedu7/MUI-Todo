import * as React from "react";

import type { FilterContextType } from "../types.ts";

export const FilterContext = React.createContext<FilterContextType>({
    filter: "all",
    handleFilterChange: () => {},
});
