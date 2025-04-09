export default {
    async fetch(request, env) {
        const apiKey = env.EIA_API_KEY;

        const url = new URL(request.url);
        const seriesId = url.searchParams.get("series_id");
        if (!seriesId) {
            return new Response("Missing series_id", { status: 400 });
        }

        const apiUrl = `https://api.eia.gov/series/?api_key=${apiKey}&series_id=${seriesId}`;
        const response = await fetch(apiUrl);
        const data = await response.text();

        return new Response(data, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}
