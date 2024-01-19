import { usePublishChangesMutation } from "../ApiSlice";

export const usePublishQuickLinksPage = () => {
    const [publishPage, { isLoading: isPublishing }] = usePublishChangesMutation();

    const publishQuickLinksPage = async (payload: PublishQuickLinksPagePayload) => {
        await publishPage(payload);
    }

    return {
        publishQuickLinksPage,
        isPublishing,
    }
}