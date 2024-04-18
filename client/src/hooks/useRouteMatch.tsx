import { matchPath, useLocation } from "react-router-dom";

export const useRouteMatch = (patterns: readonly string[]) => {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);

        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }
};
