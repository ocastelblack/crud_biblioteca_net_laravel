<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
         $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

    public function show($id)
    {
        $user = User::find($id);
        return $user;
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrfail($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->bcrypt($request['password']);

        $user->save();
        return $user;
    }

    public function destroy($id)
    {
        $user = User::destroy($id);
        return $user;
    }
}
