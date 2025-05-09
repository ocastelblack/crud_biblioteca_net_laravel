<?php
// ===================== BookController.php =====================//
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'títulos' => 'required|string|max:255',
            'autores' => 'required|string|max:255',
            'generos' => 'required|string|max:100',
            'disponibilidad' => 'required|integer|min:1',
        ]);

        return Product::create($data);
    }

    public function show($id)
    {
        $product = Product::find($id);
        return $product;
    }

    public function update(Request $request, $id)
    {
        $book = Product::findOrfail($request->id);
        $book->títulos = $request->títulos;
        $book->autores = $request->autores;
        $book->generos = $request->generos;
        $book->disponibilidad = $request->disponibilidad;

        $book->save();
        return $book;
    }

    public function destroy($id)
    {
        $product = Product::destroy($id);
        return $product;
    }
}
