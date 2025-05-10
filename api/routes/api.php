<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\LoanController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas de Usuarios
Route::controller(UserController::class)->group(function() {
    Route::get('/users','index');
    Route::post('/user','store');
    Route::get('/user/{id}','show');
    Route::put('/user/{id}','update');
    Route::delete('/user/{id}','destroy');
});
// Rutas de Libros
Route::controller(ProductController::class)->group(function() {
    Route::get('/books','index');
    Route::post('/books','store');
    Route::get('/book/{id}','show');
    Route::put('/book/{id}','update');
    Route::delete('/book/{id}','destroy');
});

// Rutas de Préstamos
Route::controller(LoanController::class)->group(function() {
    Route::get('/loans','index');
    Route::post('/loan','store');
    Route::post('/loans/{loan}/return','returnBook');
    Route::get('/loans/top-books','topBooks');
    Route::get('/top-users','topUsers');
    Route::get('/loans/export','exportLoans');
});