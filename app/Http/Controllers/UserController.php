<?php

namespace App\Http\Controllers;

use App\Http\Resources\User as UserResource;
use App\Http\Resources\UserCollection;
use App\Models\User;

use Faker\Provider\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    function index(Request $request, $id){
        $user = User::findOrFail($id);
        if($request->header('Authorization') === $user->password){
            return new UserResource($user);
        } else{
            return new UserResource($user);
        }

    }

    function register(Request $request)
    {
        $checkEmail = User::all()->where('email', $request->email)->first();
        if ($checkEmail) {
            return response(['errorEmail' => 'This Email Is Already Taken'], 401);
        }

        $request->validate([
            'name' => 'required|alpha|min:2',
            'email' => 'required|email',
            'category' => 'required',
            'password' => 'required|min:8',
            'photo' => 'required|mimes:jpg,jpeg,png',
        ]);

        $uploadFile = $request->photo;
        $ext = $request->file('photo')->getClientOriginalExtension();
        $filename = 'image_' . time() . '.' . $ext;
        Storage::disk('uploads')->put($filename, file_get_contents($uploadFile));


        $userData = [
            'name' => $request->name,
            'email' => $request->email,
            'category' => $request->category,
            'password' => bcrypt($request->password),
            'photo' => $filename
        ];

        $user = User::create($userData);
        return new UserResource($user);
    }

    function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            return new UserResource($user);
        } else {
            return response(['errorLogin' => 'Invalid Email Or Password'], 401);
        }
    }

    function update(Request $request, $id){
        $user = User::findOrFail($id);
        Storage::disk('uploads')->delete($user->photo);

        $uploadFile = $request->photo;
        $ext = $request->file('photo')->getClientOriginalExtension();
        $filename = 'image_' . time() . '.' . $ext;
        Storage::disk('uploads')->put($filename, file_get_contents($uploadFile));

        $userData = [
            'photo' => $filename
        ];

        $user->update($userData);

        return $user->photo;

    }
}
