<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate(['title' => 'required|string|max:255']);
        // Assuming single user or shared tasks for this mini-module as per spec "Mini Task Management"
        // If user-specific, we'd do: $request->user()->tasks()->create(...)
        return Task::create($data);
    }

    public function update($id)
    {
        $task = Task::findOrFail($id);
        $task->completed = !$task->completed;
        $task->save();
        return $task;
    }

    public function destroy($id)
    {
        Task::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
