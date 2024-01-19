type MediaLink = {
    id: string,
    text: string,
    title: string,
    href: string,
    icon: {
        id: string,
        url: string,
    },
    iconSlug: string,
    linkColor: {
        hex: string,
    }
}

type QuickLinksPageData = {
    heading: string,
    mediaLinks: MediaLink[],
    latestRelease: string,
    profileImage: {
        id: string,
        url: string,
    },
    description: string,
}

type QuickLinkPageQueryResponse = {
    data: {
        quickLinksPages: QuickLinksPageData[]
    }
};

type GetQuickLinksResponse = {
    data: QuickLinksPageData | null;
    error: string | null;
    success: boolean;
};