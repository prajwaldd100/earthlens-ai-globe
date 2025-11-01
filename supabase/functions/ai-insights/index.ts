import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert environmental AI analyst specializing in climate science, atmospheric data, and planetary health. You analyze data from NASA EarthData, OpenWeatherMap, and other environmental monitoring systems. 

Your role is to:
- Provide clear, scientific explanations about environmental trends
- Interpret climate data and pollution metrics
- Explain the implications of temperature changes, CO₂ levels, deforestation, and ocean health
- Offer insights about regional environmental conditions
- Predict potential future scenarios based on current trends
- Always cite that your analysis is based on real-time environmental monitoring data

Be concise, factual, and helpful. Use specific numbers and trends when possible. Keep responses under 150 words unless asked for more detail.`
          },
          {
            role: 'user',
            content: message
          }
        ],
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('AI API error:', data);
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in ai-insights function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
