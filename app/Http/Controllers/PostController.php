<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Resources\Post as PostResource;
use App\Http\Resources\PostCollection;

use Illuminate\Http\Request;

class PostController extends Controller
{

    function index($id){
        $posts = Post::where('user_id', $id)->orderBy('id', 'desc')->paginate(4);
        return response()->json($posts);
    }

    function show(){
        $posts = Post::all();
        return new PostCollection($posts);
    }

    function create(Request $request)
    {
        $data = [
            'title' => $request->title,
            'content' => $request->context,
            'type' => $request->type,
            'user_id' => $request->user_id,
        ];

        $post = Post::create($data);
        return new PostResource($post);
    }

    function getPosts(){
        $posts = Post::where('user_id', 6)->paginate(5);

        return response()->json($posts);
    }
}
