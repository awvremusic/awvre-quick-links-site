export class QuickLinksPage {
    private readonly heading: string;
    private readonly mediaLinks: string[];
    private readonly latestRelease: string;
    private readonly profileImage: {
        id: string,
        url: string,
    };
    private readonly description: string;

    constructor(data: Partial<QuickLinksPageData>) {
        const {
            heading = "",
            mediaLinks = [],
            latestRelease = "",
            profileImage = {
                id: "",
                url: "",
            },
            description = "",
        } = data;

        this.heading = heading;
        this.mediaLinks = mediaLinks.map((mediaLink: { id: string }) => mediaLink.id);
        this.latestRelease = latestRelease;
        this.profileImage = profileImage;
        this.description = description;
    }

    public getHeading(): string {
        return this.heading;
    }

    public getMediaLinks(): string[] {
        return this.mediaLinks;
    }

    public getLatestReleaseHtml(): string {
        return this.latestRelease;
    }

    public getProfileImageUrl(): string {
        return this.profileImage.url;
    }

    public getProfileImageId(): string {
        return this.profileImage.id;
    }

    public getDescription(): string {
        return this.description;
    }
}