<?php
namespace App\Exports;

use App\Models\Loan;
use Rap2hpoutre\FastExcel\FastExcel;
use OpenSpout\Common\Entity\Style\Style;
use OpenSpout\Common\Entity\Style\Border;
use OpenSpout\Common\Entity\Style\BorderPart;
use OpenSpout\Common\Entity\Style\Color;
use Illuminate\Support\Facades\DB;

class LoanExport
{
    public function export($filters)
    {
        $loans = Loan::query()
            ->select(
                'users.name as usuario',
                'products.títulos as libro',
                'loans.loan_date as fecha_prestamo',
                'loans.return_date as dia_devolucion'
            )
            ->join('users', 'loans.user_id', '=', 'users.id')
            ->join('products', 'loans.product_id', '=', 'products.id');

        if (!empty($filters['user_id'])) {
            $loans->where('user_id', $filters['user_id']);
        }

        if (!empty($filters['book_id'])) {
            $loans->where('product_id', $filters['book_id']);
        }

        if (!empty($filters['date_from'])) {
            $loans->where('loan_date', '>=', $filters['date_from']);
        }

        if (!empty($filters['date_to'])) {
            $loans->where('return_date', '<=', $filters['date_to']);
        }

        $loansData = $loans->get();

        // Crear estilo para el encabezado
        $headerStyle = (new Style())
            ->setFontBold()
            ->setFontSize(14)
            ->setFontColor(Color::BLACK)
            ->setBackgroundColor(Color::LIGHT_BLUE);

        return (new FastExcel($this->prepareData($loansData)))
            ->headerStyle($headerStyle)
            ->download('reporte_prestamos_libros.xlsx');
    }

    private function prepareData($loansData)
    {
        $header = [
            ['Reporte de Préstamos de Libros'],
            ['Usuario', 'Libro', 'Fecha Préstamo', 'Día Devolución']
        ];

        $rows = $loansData->map(function ($loan) {
            return [
                $loan->usuario,
                $loan->libro,
                $loan->fecha_prestamo,
                $loan->dia_devolucion ?? 'Pendiente'
            ];
        })->toArray();

        return array_merge($header, $rows);
    }
}