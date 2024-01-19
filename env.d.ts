namespace NodeJS {
    interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        HYGRAPH_CONTENT_URL: string;
        HYGRAPH_API_KEY: string;
    }
}