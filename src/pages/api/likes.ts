import type { APIRoute } from 'astro';
import clientPromise from '../../mongodb';
import 'dotenv/config';

interface LikesDocument {
  _id: string;
  likes: number;
}

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const likesCollection = db.collection<LikesDocument>("likes");
    
    const likesDoc = await likesCollection.findOne({ _id: "counter" });
    const likes = likesDoc ? likesDoc.likes : 0;
    
    return new Response(JSON.stringify({ likes }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error in GET /api/likes:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return new Response(JSON.stringify({ error: 'Failed to fetch likes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

export const POST: APIRoute = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");
    const likesCollection = db.collection<LikesDocument>("likes");
    
    const result = await likesCollection.updateOne(
      { _id: "counter" },
      { $inc: { likes: 1 } },
      { upsert: true }
    );
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error in POST /api/likes:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return new Response(JSON.stringify({ error: 'Failed to update likes' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}; 