"use client"
import Image from "next/image"
import { useGetQuickLinksQuery } from "../../ApiSlice"
import { BaseButton } from "@/features/common/components/form/BaseButton"

const Heading = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h2 className={`${className} text-3xl font-bold`}>{children}</h2>
)

const Description = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <p className={`${className} text-lg`}>{children}</p>
)

const LatestRelease = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`${className} flex flex-col items-center justify-center`}>
        <Heading className="text-xl">Latest Release</Heading>
        {children}
    </div>
)

const MediaLinkView = ({ mediaLink, className }: { mediaLink: MediaLink, className?: string }) => (
    <div className={`mediaLink ${className}`}>
        <BaseButton
            onClick={() => window.open(mediaLink.href, "_blank", "noopener noreferrer nofollow")}
            backgroundColor={mediaLink.linkColor.hex}
            leftComponent={<img src={mediaLink.icon.url} width={25} height={25} alt={`Icon for AWVRE's ${mediaLink.title}`} />}
        >
            <p className="font-bold">{mediaLink.text ?? mediaLink.title}</p>
        </BaseButton>
    </div>
)

export const QuickLinksPageView = () => {
    const {
        data,
        error,
        isLoading,
    } = useGetQuickLinksQuery()

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{JSON.stringify(error)}</div>

    if (!data) return <div>no data</div>

    return (
        <div className="flex flex-col">
            <Image
                width={150}
                height={150}
                priority
                src={data.profileImage.url}
                alt="AWVRE Profile Image"
                className="rounded-full overflow-hidden"
                style={{ objectFit: "contain", width: "75vw", height: "75vw", maxWidth: 250, maxHeight: 250, alignSelf: "center" }}
            />
            <Heading
                className="mt-5 self-center"
            >{data.heading}</Heading>
            <Description
                className="mt-5 text-center"
            >{data.description}</Description>
            <LatestRelease
                className="mt-5"
            >
                <div dangerouslySetInnerHTML={{ __html: data.latestRelease }} className="mt-5"></div>
            </LatestRelease>
            {data.mediaLinks.map((mediaLink, index) => (
                <MediaLinkView
                    key={index}
                    mediaLink={mediaLink}
                    className="mt-5"
                />
            ))}
        </div>
    )
}