<?php

namespace App\Http\Controllers;

use App\Events\NewMessage;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $message = Message::all();
        event(new NewMessage(["data" => $message]));
        return response()->json(['success' => true, 'msg' => "Message created Successfully.", "data" => $message], 200);
    }
    public function store(Request $request)
    {
        Message::create(['message'=> $request->message]);
        $message = Message::all();
        event(new NewMessage(["data" => $message]));
        return response()->json(['success' => true, 'msg' => "Message created Successfully.", "data" => $message], 200);
    }
}
