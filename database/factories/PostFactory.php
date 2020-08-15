<?php

use \App\Models\Post;
use \App\Models\User;

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    static $order = 1;
    return [
        'title' => $faker->title,
        'content'=> $faker->text,
        'type'=> 'suggest - ' . $order++,
        'user_id'=> 6,
    ];
});
