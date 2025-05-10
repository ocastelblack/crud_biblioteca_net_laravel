<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class JsonResponseMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Excluir la ruta de exportación del middleware
        if ($request->is('api/loans/export')) {
            return $next($request);
        }

        $response = $next($request);

        if ($response instanceof \Symfony\Component\HttpFoundation\StreamedResponse) {
            return $response; // Permitir que la descarga del archivo continúe sin modificación
        }

        // Si la respuesta ya es JSON, no hacer nada
        if ($response instanceof JsonResponse) {
            return $response;
        }

        // Si la respuesta es una redirección, no envolverla en JSON
        if ($response->isRedirection()) {
            return $response;
        }

        return response()->json(['data' => $response->getContent()], $response->status());
    }
}