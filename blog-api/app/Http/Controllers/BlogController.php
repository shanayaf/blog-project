<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    // GET /api/blogs
    public function index()
    {
        return Blog::with('user')->latest()->get();
    }

    // POST /api/blogs
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $blog = Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => Auth::id(),
        ]);

        return response()->json($blog, 201);
    }

   
    public function show($id)
    {
        $blog = Blog::with('user')->findOrFail($id);
        return response()->json($blog);
    }

   
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $blog->update($request->only('title', 'content'));

        return response()->json($blog);
    }

   
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);

        if ($blog->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $blog->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
