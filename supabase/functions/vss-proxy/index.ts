import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const VSS_API_URL = "https://vss-api-qgrhjnqzr.brevlab.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    console.log(`VSS Proxy - Action: ${action}, Method: ${req.method}`);

    if (!action) {
      return new Response(
        JSON.stringify({ error: "Action parameter is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let response: Response;

    switch (action) {
      case "upload": {
        // Forward file upload to VSS
        const formData = await req.formData();
        console.log("Uploading file to VSS...");
        
        response = await fetch(`${VSS_API_URL}/v1/files`, {
          method: "POST",
          body: formData,
        });
        break;
      }

      case "file-info": {
        const fileId = url.searchParams.get("file_id");
        if (!fileId) {
          return new Response(
            JSON.stringify({ error: "file_id is required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        console.log(`Getting file info for: ${fileId}`);
        response = await fetch(`${VSS_API_URL}/v1/files/${fileId}`);
        break;
      }

      case "captions": {
        const body = await req.json();
        console.log("Generating captions...", body.file_id);
        
        response = await fetch(`${VSS_API_URL}/v1/files/${body.file_id}/summarize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: body.prompt,
            enable_chat: true,
          }),
        });
        break;
      }

      case "summarize": {
        const body = await req.json();
        console.log("Summarizing video...", body.file_id);
        
        response = await fetch(`${VSS_API_URL}/v1/files/${body.file_id}/summarize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: body.prompt,
            enable_chat: true,
          }),
        });
        break;
      }

      case "chat": {
        const body = await req.json();
        console.log("Chat completion...", body.file_id);
        
        response = await fetch(`${VSS_API_URL}/v1/chat/completions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "nvidia/vila",
            messages: body.messages,
            file_id: body.file_id,
            max_tokens: 1024,
            stream: false,
          }),
        });
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`VSS API error (${response.status}):`, errorText);
      return new Response(
        JSON.stringify({ error: `VSS API error: ${response.status}`, details: errorText }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("VSS Response:", JSON.stringify(data).substring(0, 200));

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("VSS Proxy error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
