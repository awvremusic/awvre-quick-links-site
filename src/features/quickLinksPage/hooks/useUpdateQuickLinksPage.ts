import { usePublishAsset } from "@/features/app/hooks/usePublishAsset";
import { useUpdateQuickLinksMutation } from "../ApiSlice";
import { usePublishQuickLinksPage } from "./usePublishQuickLinksPage";
import { useUploadAsset } from "@/features/app/hooks/useUploadAsset";
import { usePublishMediaLinkMutation } from "@/features/mediaLinks/ApiSlice";

export const useUpdateQuickLinksPage = () => {
    const {
        publishQuickLinksPage,
        isPublishing,
    } = usePublishQuickLinksPage();

    const {
        uploadAsset,
        isUploadingAsset,
    } = useUploadAsset();

    const {
        isPublishingAsset,
        publishAsset,
    } = usePublishAsset();

    const [updatePage, { isLoading: isUpdatingPage }] = useUpdateQuickLinksMutation();

    const [publishMediaLink, { isLoading: publishingMediaLink }] = usePublishMediaLinkMutation();

    const updateQuickLinksPage = async (payload: UpdateQuickLinksPagePayload) => {
        if (payload.profileImageFile) {
            try {
                const data = await uploadAsset(
                    payload.profileImageFile,
                ).unwrap();

                if (data) {
                    const assetId = data.data?.id ?? "";
                    await publishAsset({
                        assetId: assetId,
                    });
                    payload.profileImageId = assetId;
                }
            } catch (error) {
                console.log(error);
            }
        }

        await updatePage(payload);

        if (payload.connectedMediaLinkIds.length || payload.disconnectedMediaLinkIds.length) {
            for (const id of payload.connectedMediaLinkIds) {
                await publishMediaLink({
                    mediaLinkId: id,
                });
            }

            for (const id of payload.disconnectedMediaLinkIds) {
                await publishMediaLink({
                    mediaLinkId: id,
                });
            }
        }


        await publishAsset({
            assetId: payload.profileImageId,
        });

        await publishQuickLinksPage({
            id: payload.id,
        });
    }

    return {
        updateQuickLinksPage,
        isUpdating: isUpdatingPage || isPublishing || isUploadingAsset || isPublishingAsset,
    }
}