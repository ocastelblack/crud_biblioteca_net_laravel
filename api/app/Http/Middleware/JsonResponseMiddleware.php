<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class JsonResponseMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

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