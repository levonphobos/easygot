<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Nexmo\Laravel\Facade\Nexmo;

class MailSend extends Controller
{
    function mailsend(){
        $details = [
            'title' => 'Title: Mail From EasyGot',
            'body' => 'Body: Testing Mail'
        ];
        Mail::to('sargsyanlevon4@gmail.com')->send(new SendMail($details));
    }

    function smssend(){
        Nexmo::message()->send([
            'to'   => '0037495090226',
            'from' => '16105552344',
            'text' => 'Helloooo!!!'
        ]);
    }
}
