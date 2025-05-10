<?php
// ===================== LoanController.php =====================
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Exports\LoanExport;

class LoanController extends Controller
{
    public function index()
    {
        return Loan::with(['user', 'product:id,títulos'])
            ->get(['id', 'user_id', 'product_id', 'loan_date', 'return_date'])
            ->map(function ($loan) {
                return [
                    'id' => $loan->id,
                    'user_name' => $loan->user->name,
                    'book_title' => $loan->product->títulos,
                    'loan_date' => $loan->loan_date,
                    'return_date' => $loan->return_date,
                ];
            });
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'loan_date' => 'required|date',
        ]);

        $book = Product::find($data['product_id']);

        if ($book->disponibilidad < 1) {
            return response(['error' => 'No hay copias disponibles'], 400);
        }

        $book->decrement('disponibilidad');
        return Loan::create($data);
    }

     public function returnBook(Request $request, $loan_id)
    {
        // Buscar el préstamo por ID
        $loan = Loan::find($loan_id);

        if (!$loan) {
            return response(['error' => 'Préstamo no encontrado'], 404);
        }

        // Actualizar la fecha de devolución
        $loan->return_date = now();
        $loan->save();

        // Actualizar la disponibilidad del producto
        $product = Product::find($loan->product_id);

        if ($product) {
            $product->increment('disponibilidad');
        }

        return response([
            'message' => 'Producto devuelto con éxito',
            'loan' => $loan,
            'product' => $product
        ]);
    }

    public function topBooks()
    {
        $topBooks = Loan::join('products', 'loans.product_id', '=', 'products.id')
            ->select('products.id', 'products.títulos as title', DB::raw('COUNT(loans.id) as total'))
            ->groupBy('products.id', 'products.títulos')
            ->orderByDesc('total')
            ->limit(10)
            ->get();

        return response()->json($topBooks);
    }

    public function topUsers()
    {
        $topUsers = DB::table('loans')
            ->join('users', 'loans.user_id', '=', 'users.id')
            ->select('users.name as user', DB::raw('COUNT(loans.id) as total'))
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        return response()->json($topUsers);
    }

    public function exportLoans(Request $request)
    {
        $filters = $request->only(['user_id', 'book_id', 'date_from', 'date_to']);

        return (new LoanExport)->export($filters);
    }


    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
