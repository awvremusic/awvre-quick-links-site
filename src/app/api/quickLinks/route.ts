import axios, { AxiosError, AxiosResponse } from "axios";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const quickLinksUrl = process.env.HYGRAPH_CONTENT_URL ?? "";
    const quickLinksApiKey = process.env.HYGRAPH_API_KEY ?? "";
    const response = await axios.post(quickLinksUrl, JSON.stringify({
        query: `
  {
    quickLinksPages(where: {displayLive: true}) {
      id
      heading
        mediaLinks {
            id
            text
            title
            href
            icon {
                id
                url
            }
            iconSlug
            linkColor {
                hex
            }
        }
      latestRelease
      profileImage {
        id
        url
      }
      description
    }
  }
  `,
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + quickLinksApiKey,
        },
    }).then((response: AxiosResponse<QuickLinkPageQueryResponse>) => {
        console.log(response.data)
        return response.data.data.quickLinksPages[0];
    }).catch((error: AxiosError) => {
        console.log(error.response?.data);
        return null
    });

    if (response === null) {
        return new Response(JSON.stringify({
            error: 'Error fetching quick links data',
            data: null,
            success: false,
        }), {
            status: 400,
        });
    }

    return new Response(JSON.stringify({
        error: null,
        data: response,
        success: true,
    }), {
        status: 200,
    });
}