// app/api/data/pie_chat/route.ts
import { supabase } from '@/app/lib/superbass';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const { data, error } = await supabase.from('chat_data').select('data').eq('type', 'pie_chat');
    if (error) console.log(error);
    return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
    const data = await req.json();
    await supabase.from('chat_data').update({ data: data }).eq('type', 'pie_chat');
    return NextResponse.json({ message: 'Success' });
}