import { useEffect, useReducer } from "react";
import { QuickLinksPage } from "../businessObjects/QuickLinksPage";
import { useUpdateQuickLinksPage } from "./useUpdateQuickLinksPage";
import { useGetQuickLinkPages } from "./useGetQuickLinkPages";

type QuickLinksPageDataState = {
    pages: Record<string, QuickLinksPage>;
    currentVersion: string;
    currentPage: QuickLinksPage | null;
    heading: string;
    description: string;
    connectedMediaLinkIds: string[];
    disconnectedMediaLinkIds: string[];
    originalMediaLinkIds: string[];
    profileImageUrl: string;
    profileImageFile: File | null;
    displayLive: boolean;
    latestReleaseHtml: string;
    hasPageChanged: boolean;
}

type UpdateCurrentVersion = {
    type: "UPDATE_CURRENT_VERSION";
    payload: string;
}

type UpdateQuickLinksPagePayload = Partial<{
    heading: string;
    description: string;
    connectedMediaLinkIds: string[];
    disconnectedMediaLinkIds: string[];
    profileImageUrl: string;
    profileImageFile: File | null;
    displayLive: boolean;
    latestReleaseHtml: string;
}>;

type UpdateQuickLinksPage = {
    type: "UPDATE_QUICK_LINKS_PAGE";
    payload: UpdateQuickLinksPagePayload;
}

type CreateNewQuickLinksPage = {
    type: "CREATE_NEW_QUICK_LINKS_PAGE";
}

type UpdateQuickLinkPages = {
    type: "UPDATE_QUICK_LINKS_PAGES";
    payload: {
        data: QuickLinksPageData[]
        startingId?: string;
    };
}

type UpdatePageToCurrentVersion = {
    type: "UPDATE_PAGE_TO_CURRENT_VERSION";
}

type QuickLinksPageDataAction = UpdateCurrentVersion
    | UpdateQuickLinksPage
    | CreateNewQuickLinksPage
    | UpdateQuickLinkPages
    | UpdatePageToCurrentVersion;


function reducer(state: QuickLinksPageDataState, action: QuickLinksPageDataAction) {
    const hasPageChanged = (newState: QuickLinksPageDataState): boolean => {
        if (newState.currentPage !== null) {
            return newState.heading !== newState.currentPage.getHeading()
                || newState.description !== newState.currentPage.getDescription()
                || newState.connectedMediaLinkIds !== newState.currentPage.getMediaLinks()
                || newState.disconnectedMediaLinkIds.length !== 0
                || JSON.stringify(newState.connectedMediaLinkIds) !== JSON.stringify(newState.currentPage.getMediaLinks())
                || newState.profileImageUrl !== newState.currentPage.getProfileImageUrl()
                || newState.displayLive !== newState.currentPage.getDisplayLive()
                || newState.latestReleaseHtml !== newState.currentPage.getLatestReleaseHtml();
        }

        return false;
    }

    switch (action.type) {
        case "UPDATE_CURRENT_VERSION": {
            return {
                ...state,
                currentVersion: action.payload,
            };
        }
        case "UPDATE_PAGE_TO_CURRENT_VERSION": {
            const currentPage = state.pages[state.currentVersion] ?? null;
            return {
                ...state,
                currentPage: currentPage,
                heading: currentPage?.getHeading() ?? "",
                description: currentPage?.getDescription() ?? "",
                connectedMediaLinkIds: currentPage?.getMediaLinks() ?? [],
                disconnectedMediaLinkIds: [],
                originalMediaLinkIds: currentPage?.getMediaLinks() ?? [],
                profileImageUrl: currentPage?.getProfileImageUrl() ?? "",
                profileImageFile: null,
                displayLive: currentPage?.getDisplayLive() ?? false,
                latestReleaseHtml: currentPage?.getLatestReleaseHtml() ?? "",
                hasPageChanged: false,
            }
        }
        case "UPDATE_QUICK_LINKS_PAGE": {
            const { payload } = action;

            const newState = {
                ...state,
                heading: payload.heading ?? state.heading,
                description: payload.description ?? state.description,
                connectedMediaLinkIds: payload.connectedMediaLinkIds ?? state.connectedMediaLinkIds,
                disconnectedMediaLinkIds: payload.disconnectedMediaLinkIds ?? state.disconnectedMediaLinkIds,
                profileImageUrl: payload.profileImageUrl ?? state.profileImageUrl,
                profileImageFile: payload.profileImageFile ?? state.profileImageFile,
                displayLive: payload.displayLive ?? state.displayLive,
                latestReleaseHtml: payload.latestReleaseHtml ?? state.latestReleaseHtml,
            };

            const hasChanged = hasPageChanged(newState);

            return {
                ...newState,
                hasPageChanged: hasChanged,
            };
        }
        case "CREATE_NEW_QUICK_LINKS_PAGE": {
            return state;
        }
        case "UPDATE_QUICK_LINKS_PAGES": {
            const { payload } = action;

            const pages: Record<string, QuickLinksPage> = {}

            payload.data.forEach((page) => {
                const newPage = new QuickLinksPage(page);
                pages[newPage.getVersionId()] = newPage;
            });

            let currentPage = Object.values(pages)[0] ?? null;

            let pageMatchingStartingId = null;
            if (payload.startingId) {
                pageMatchingStartingId = Object.values(pages).find((page) => page.getId() === payload.startingId);

                if (pageMatchingStartingId) {
                    currentPage = pageMatchingStartingId;
                }
            }

            return {
                ...state,
                pages: pages,
                currentVersion: currentPage?.getVersionId() ?? "",
                currentPage: currentPage,
                heading: currentPage?.getHeading() ?? "",
                description: currentPage?.getDescription() ?? "",
                connectedMediaLinkIds: currentPage?.getMediaLinks() ?? [],
                disconnectedMediaLinkIds: [],
                originalMediaLinkIds: currentPage?.getMediaLinks() ?? [],
                profileImageUrl: currentPage?.getProfileImageUrl() ?? "",
                profileImageFile: null,
                displayLive: currentPage?.getDisplayLive() ?? false,
                latestReleaseHtml: currentPage?.getLatestReleaseHtml() ?? "",
                hasPageChanged: false,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export const useQuickLinksPagesData = (startingId?: string) => {
    const {
        isUpdating,
        updateQuickLinksPage,
    } = useUpdateQuickLinksPage();

    const {
        quickLinkPages,
        isFetchingQuickLinkPages
    } = useGetQuickLinkPages();

    const [state, dispatch] = useReducer(reducer, {
        pages: {},
        currentVersion: "",
        currentPage: null,
        heading: "",
        description: "",
        connectedMediaLinkIds: [],
        disconnectedMediaLinkIds: [],
        originalMediaLinkIds: [],
        profileImageUrl: "",
        profileImageFile: null,
        displayLive: false,
        latestReleaseHtml: "",
        hasPageChanged: false,
    });

    useEffect(() => {
        if (quickLinkPages?.length === 0) {
            return;
        }

        dispatch({
            type: "UPDATE_QUICK_LINKS_PAGES",
            payload: {
                data: quickLinkPages ?? [],
                startingId: startingId,
            },
        });
    }, [startingId, quickLinkPages]);

    const updatePage = (payload: UpdateQuickLinksPagePayload) => {
        dispatch({
            type: "UPDATE_QUICK_LINKS_PAGE",
            payload,
        });
    }

    const switchVersion = (versionId: string) => {
        dispatch({
            type: "UPDATE_CURRENT_VERSION",
            payload: versionId,
        });
        dispatch({
            type: "UPDATE_PAGE_TO_CURRENT_VERSION",
        });
    }

    const sendUpdatePageRequest = async () => {
        await updateQuickLinksPage({
            id: state.currentPage?.getId() ?? "",
            heading: state.heading,
            description: state.description,
            connectedMediaLinkIds: state.connectedMediaLinkIds,
            disconnectedMediaLinkIds: state.disconnectedMediaLinkIds,
            profileImageId: state.currentPage?.getProfileImageId() ?? "",
            profileImageFile: state.profileImageFile,
            displayLive: state.displayLive,
            latestReleaseHtml: state.latestReleaseHtml,
        });
    }

    return {
        ...state,
        isLoading: isFetchingQuickLinkPages,
        updatePage,
        switchVersion,
        isUpdating,
        sendUpdatePageRequest,
    };
};