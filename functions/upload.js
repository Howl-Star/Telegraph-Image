export async function onRequestPost(context) {  
    const {   
        request,
        env,
        params,
        waitUntil,
        next,
        data,
    } = context;
    
    const url = new URL(request.url);
    const response = await fetch('https://telegra.ph' + url.pathname + url.search, {
        method: request.method,
        headers: request.headers,
        body: request.body,
    });

    const responseText = await response.text();
    const imageUrlMatch = responseText.match(/https:\/\/telegra\.ph\/file\/[^"]+/);

    if (!imageUrlMatch) {
        return new Response("Image upload failed", { status: 500 });
    }

    const imageUrl = imageUrlMatch[0];

    const markdownLink = `![Image](${imageUrl})`;

    return new Response(markdownLink, { status: 200, headers: { "Content-Type": "text/plain" } });
}
