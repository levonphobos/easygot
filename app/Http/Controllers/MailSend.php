<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailSend extends Controller
{
    function mailsend(){
        $details = [
            'title' => 'Title: Mail From EasyGot',
            'body' => 'Body: Testing Mail'
        ];
        Mail::to('sargsyanlevon4@gmail.com')->send(new SendMail($details));
    }
}
