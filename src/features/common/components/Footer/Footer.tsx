'use client';
import { AWVRE_GREEN } from "../../Constants"

export type FooterProps = {
    text?: string;
    animationDuration?: number;
    backgroundColor?: string;
}

export const Footer = ({ text = "Made with ❤️ by AWVRE", animationDuration = 750, backgroundColor = AWVRE_GREEN }: FooterProps) => (
    <footer className=" py-10 flex-row-reverse justify-center align-middle">
        <p className="text-center font-bold">{text}</p>
        <style jsx global>{`
        @keyframes background-slide-x {
            0% {
              background-position: 0 0;
            }
          
            100% {
              background-position: 100% 0;
            }
          }

            footer {
                position: relative;
                overflow: hidden;
                width: 100vw;
            }

            footer::before {
                content: "";
                display: block;
                background-image: url("/images/itsawvreb-tch.svg");
                background-size: cover;
                background-blend-mode: overlay;
                background-color: ${backgroundColor};
                z-index: -1;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
                height: 60%;
                opacity: 0.3;
                margin: auto;
                animation: background-slide-x ${animationDuration}s linear infinite;
                transition: background-position 0.5s ease-in-out;
            }

            footer::after {
                content: "";
                display: block;
                background-color: ${AWVRE_GREEN};
                z-index: -2;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            #its-awvre-tag {
                width: 200px;
            }
        `}</style>
    </footer>
)