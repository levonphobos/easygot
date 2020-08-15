<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', 'UserController@register');
Route::post('/login', 'UserController@login');

Route::prefix('{id}')->middleware('test')->group(function () {
    Route::get('', 'UserController@index');
    Route::get('posts', 'PostController@index');
    Route::post('posts', 'PostController@create');
    Route::post('settings', 'UserController@update');
});

Route::get('/posts/pagination', 'PostController@getPosts');
//Route::get('/test', 'PostController@show')->middleware('test');
Route::get('/send/mail', 'MailSend@mailsend');
Route::get('/send/sms', 'MailSend@smssend');
