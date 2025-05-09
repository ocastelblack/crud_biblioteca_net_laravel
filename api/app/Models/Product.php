<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'títulos',
        'autores',
        'generos',
        'disponibilidad',
    ];

    public function loans()
    {
        return $this->hasMany(Loan::class);
    }
}
