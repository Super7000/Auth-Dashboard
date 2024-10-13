// app/api/data/pie_chat/route.ts
import { supabase } from '@/app/lib/superbass';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const headers = new Headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });

    // Open a new event stream
    const stream = new ReadableStream({
        async start(controller) {
            const sendData = (data: string) => {
                controller.enqueue(`data: ${data}\n\n`);
            };

            const { data, error } = await supabase
                .from('chat_data')
                .select('*')
                .eq('type', 'pie_chat'); // Fetch specific rows with type 'pie_chat'
            if (error) {
                sendData(JSON.stringify({ error: 'Failed to fetch initial data' }));
                controller.close();
                return;
            }
            sendData(JSON.stringify(data[0]));

            const channel = supabase
                .channel('public:chat_data')
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'chat_data',
                }, (payload) => {
                    if (payload.new && 'type' in payload.new && payload.new.type === 'pie_chat')
                        sendData(JSON.stringify(payload.new)); // Send the filtered event payload to clients
                })
                .subscribe();

            // Stop subscription if client disconnects
            req.signal.onabort = () => {
                supabase.removeChannel(channel); // Clean up the channel
                controller.close();
            };
        },
    });

    return new NextResponse(stream, { headers });
}

export async function PUT(req: NextRequest) {
    const data = await req.json();
    await supabase.from('chat_data').update({ data: data }).eq('type', 'pie_chat');
    return NextResponse.json({ message: 'Success' });
}