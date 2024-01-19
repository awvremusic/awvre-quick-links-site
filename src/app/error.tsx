'use client' // Error components must be Client Components

import Image from 'next/image'
import { useEffect } from 'react'

const ExternalLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} rel="noopener nofollow noreferrer" target="_blank" className='font-bold underline-offset-2'>{children}</a>
);

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <Image
                width={150}
                height={150}
                priority
                src="/images/clipped_image_awvre.png"
                alt="AWVRE Profile Image"
                style={{
                    objectFit: 'contain',
                    width: '75vw',
                    height: '75vw',
                    maxWidth: 500,
                    maxHeight: 500,
                }}
            />
            <h2 className='text-2xl font-bold' style={{ fontFamily: "Noto Sans JP, sans-serif" }}>Something went wrong!</h2>
            <p style={{ fontFamily: "Noto Sans JP, sans-serif" }} className='my-5 text-center'>You can best find AWVRE on his frequently used links</p>
            <div className="flex flex-col justify-center items-center">
                <ExternalLink href="https://www.instagram.com/awvremusic/">Instagram</ExternalLink>
                <ExternalLink href="https://soundcloud.com/awvre">SoundCloud</ExternalLink>
                <ExternalLink href="https://discordapp.com/users/awvreshiru/">Discord</ExternalLink>
            </div>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className='my-10'
            >
                Try again?
            </button>
        </div>
    )
}