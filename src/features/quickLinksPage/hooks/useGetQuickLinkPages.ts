import { useGetQuickLinksQuery } from "../ApiSlice"

export const useGetQuickLinkPages = () => {
    const {
        data,
        error,
        isLoading
    } = useGetQuickLinksQuery(undefined, {
        pollingInterval: 60000,
    });

    return {
        quickLinkPages: data,
        error,
        isFetchingQuickLinkPages: isLoading,
    }
}