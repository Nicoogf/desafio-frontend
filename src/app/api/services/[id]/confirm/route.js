
import { NextResponse } from 'next/server';
import { MongoDBConnection } from '@/utils/mongodb';
import User from '@/models/User';

export async function POST(request, { params }) {
    MongoDBConnection()
    try {
        const body = await request.json();
        const { user_id, service_id } = body;

        
        const user = await User.findById(user_id);

        if (!user) {
            return NextResponse.json([ 'No se encontró cliente con ese usuario' ], { status: 404 });
        }

        return NextResponse.json({ message: 'Usuario verificado correctamente', user },{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error en la verificación del usuario' }, { status: 500 });
    }
}