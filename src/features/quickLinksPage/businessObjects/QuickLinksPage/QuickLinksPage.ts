export class QuickLinksPage {
    private readonly id: string;
    private readonly heading: string;
    private readonly displayLive: boolean;
    private readonly versionId: string;
    private readonly mediaLinks: string[];
    private readonly latestRelease: string;
    private readonly profileImage: HygraphImage;
    private readonly description: string;
    private readonly updatedAt: string;
    private readonly publishedAt: string;

    constructor(data: Partial<QuickLinksPageData>) {
        const {
            id = "",
            heading = "",
            displayLive = false,
            versionId = "",
            mediaLinks = [],
            latestRelease = "",
            profileImage = {
                id: "",
                url: "",
            },
            description = "",
            updatedAt = "",
            publishedAt = "",
        } = data;

        this.id = id;
        this.heading = heading;
        this.displayLive = displayLive;
        this.versionId = versionId;
        this.mediaLinks = mediaLinks.map((mediaLink: { id: string }) => mediaLink.id);
        this.latestRelease = latestRelease;
        this.profileImage = profileImage;
        this.description = description;
        this.updatedAt = updatedAt;
        this.publishedAt = publishedAt;
    }

    public getId(): string {
        return this.id;
    }

    public getHeading(): string {
        return this.heading;
    }

    public getDisplayLive(): boolean {
        return this.displayLive;
    }

    public getVersionId(): string {
        return this.versionId;
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

    public getUpdatedAt(): string {
        return this.updatedAt;
    }

    public getPublishedAt(): string {
        return this.publishedAt;
    }

    public isOutdated(): boolean {
        if (this.publishedAt === "") {
            return false;
        }

        return this.updatedAt > this.publishedAt;
    }
}