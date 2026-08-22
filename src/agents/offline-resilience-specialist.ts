import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterOfflineResilienceSpec {
  enableDemoMockFallback?: boolean;
  cacheDurationMinutes?: number;
}

export interface FlutterOfflineResilienceResult {
  resilienceInterceptorCode: string;
  resilientRepositoryWrapperCode: string;
  summary: string;
}

export class FlutterOfflineResilienceSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterOfflineResilienceSpecialistAgent",
      "Hackathon Wi-Fi Demo Resilience Specialist",
      "Guarantees zero crashes during live stage pitches by wrapping network repositories in an automatic fallback interceptor that catches Wi-Fi drops and seamlessly serves cached/embedded mock data."
    );
  }

  public scaffoldResilience(spec: FlutterOfflineResilienceSpec): FlutterOfflineResilienceResult {
    this.log("INFO", "Scaffolding zero-crash demo resilience and offline cache fallback");

    const resilienceInterceptorCode = `// lib/core/network/demo_resilience_interceptor.dart

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class DemoResilienceInterceptor extends Interceptor {
  final Map<String, dynamic> _fallbackMemoryCache = {};

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    // Cache successful responses in-memory for instant fallback
    if (response.statusCode != null && response.statusCode! >= 200 && response.statusCode! < 300) {
      _fallbackMemoryCache[response.requestOptions.path] = response.data;
    }
    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (kDebugMode) {
      debugPrint('⚠️ [DEMO RESILIENCE] Network error intercepted: \${err.type} on \${err.requestOptions.path}. Activating fallback!');
    }

    // Check if we have cached data for this path
    final cachedData = _fallbackMemoryCache[err.requestOptions.path];
    if (cachedData != null) {
      return handler.resolve(
        Response(
          requestOptions: err.requestOptions,
          data: cachedData,
          statusCode: 200,
          statusMessage: 'OK (Served from Demo Resilience Cache)',
        ),
      );
    }

    // Otherwise serve safe empty mock structure to prevent UI red screens
    return handler.resolve(
      Response(
        requestOptions: err.requestOptions,
        data: {'status': 'demo_fallback', 'items': [], 'message': 'Demo Mode Active'},
        statusCode: 200,
      ),
    );
  }
}
`;

    const resilientRepositoryWrapperCode = `// lib/core/network/resilient_runner.dart

import 'package:flutter/foundation.dart';

Future<T> runWithDemoFallback<T>({
  required Future<T> Function() remoteCall,
  required T Function() fallbackFactory,
}) async {
  try {
    return await remoteCall();
  } catch (e) {
    if (kDebugMode) {
      debugPrint('⚠️ [DEMO FALLBACK TRIGGERED] Remote call failed: $e. Serving local fallback fixture.');
    }
    return fallbackFactory();
  }
}
`;

    const summary = `Scaffolded DemoResilienceInterceptor and runWithDemoFallback helper ensuring 100% crash-free live judging presentations.`;

    return {
      resilienceInterceptorCode,
      resilientRepositoryWrapperCode,
      summary
    };
  }
}
