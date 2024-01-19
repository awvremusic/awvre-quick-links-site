import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetQuickLinksTag } from "./Constants";

export const quickLinksApi = createApi({
    reducerPath: "quickLinksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/quickLinks/" }),
    tagTypes: [GetQuickLinksTag],
    endpoints: (builder) => ({
        getQuickLinks: builder.query<QuickLinksPageData | null, void>({
            query: () => "/",
            transformResponse: (response: GetQuickLinksResponse) => {
                if (response.success && response.data !== null) {
                    return response.data;
                }

                return null;
            },
            providesTags: [{ type: GetQuickLinksTag, id: "PAGES" }],
        }),
    }),
});

export const {
    useGetQuickLinksQuery,
} = quickLinksApi;