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
    const response = await fetch('https://telegra.ph/' + url.pathname + url.search, { 
        method: request.method,
        headers: request.headers,
        body: request.body,
    });

    // 获取图片的URL
    const imageUrl = await response.text();

    // 生成Markdown链接
    const markdownLink = `![Image](${imageUrl})`;

    return new Response(markdownLink, { status: 200, headers: { "Content-Type": "text/plain" } });
}
