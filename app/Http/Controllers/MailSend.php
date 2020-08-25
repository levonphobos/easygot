<?php

namespace App\Http\Controllers;

use App\Mail\SendMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use Nexmo\Laravel\Facade\Nexmo;
use Importer;


class MailSend extends Controller
{
    function mailsend()
    {
        $details = [
            'title' => 'Title: Mail From EasyGot',
            'body' => 'Body: Testing Mail'
        ];
        Mail::to('sargsyanlevon4@gmail.com')->send(new SendMail($details));
    }

    function smssend()
    {
        Nexmo::message()->send([
            'to' => '0037495090226',
            'from' => '16105552344',
            'text' => 'Helloooo!!!'
        ]);
    }

    function readfile(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|mimes:doc,docx,txt,xlsx,csv'
        ]);
        $file = $request->file('file');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $savePath = public_path('/storage/docs/');
        $file->move($savePath, $filename);

        $excel = Importer::make('Excel');
        $excel->load($savePath . $filename);
        $collection = $excel->getCollection();

        return response($collection);

    }
}
