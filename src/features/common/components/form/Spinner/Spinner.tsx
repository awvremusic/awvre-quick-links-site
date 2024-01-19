export type SpinnerProps = {
    className?: string
    width?: number
    height?: number
}

export const Spinner = ({ className, width, height }: SpinnerProps) => {
    return (
        <div>
            <svg id="Group_10" name="Group 10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width ?? 251.65} height={height ?? 251.65} viewBox="0 0 251.65 251.65" className={className}>
                <defs>
                    <clipPath id="clipPath">
                        <rect id="Rectangle_7" name="Rectangle 7" width="251.65" height="251.65" fill="none" />
                    </clipPath>
                    <clipPath id="clipPath-3">
                        <rect id="Rectangle_5" name="Rectangle 5" width="251.65" height="200.77" transform="translate(0 50.88)" fill="none" />
                    </clipPath>
                </defs>
                <g id="Group_9" name="Group 9" clipPath="url(#clipPath)">
                    <g id="Group_8" name="Group 8">
                        <g id="Group_7" name="Group 7" clipPath="url(#clipPath)">
                            <g id="Group_6" name="Group 6" opacity="0.5">
                                <g id="Group_5" name="Group 5">
                                    <g id="Group_4" name="Group 4" clipPath="url(#clipPath-3)">
                                        <path id="Path_4" name="Path 4" d="M251.65,125.82A125.825,125.825,0,1,1,24.74,50.88L52.91,79.05a86.617,86.617,0,1,0,145.84-.01L226.9,50.88a125.245,125.245,0,0,1,24.75,74.94" fill="#fff" />
                                    </g>
                                </g>
                            </g>
                            <path id="Path_5" name="Path 5" d="M226.9,50.88,198.75,79.04a86.648,86.648,0,0,0-145.84.01L24.74,50.88a125.845,125.845,0,0,1,202.16,0" fill="#fff" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    )
}
