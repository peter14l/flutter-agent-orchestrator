import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterObservabilitySpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterObservabilitySpecialistAgent", "Telemetry, Crash Reporting & Performance Profiler", "Scaffolds Sentry / Firebase Crashlytics crash reporting, type-safe custom analytics event taxonomy, and network/rendering latency tracking.");
    }
    scaffoldObservability(spec) {
        this.log("INFO", `Scaffolding observability and telemetry for provider: ${spec.provider}`);
        const events = spec.customEventNames || ["screen_view", "user_login", "button_click", "purchase_completed"];
        const initCode = `// lib/core/observability/observability_init.dart

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

Future<void> initObservability(Widget appRunner) async {
  if (kReleaseMode) {
    await SentryFlutter.init(
      (options) {
        options.dsn = const String.fromEnvironment('SENTRY_DSN');
        options.tracesSampleRate = 1.0;
        options.profilesSampleRate = 1.0;
        options.attachScreenshot = true;
        options.attachViewHierarchy = true;
      },
      appRunner: () => runApp(DefaultAssetBundle(bundle: SentryAssetBundle(), child: appRunner)),
    );
  } else {
    runApp(appRunner);
  }
}
`;
        const analyticsServiceCode = `// lib/core/observability/analytics_service.dart

import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final analyticsServiceProvider = Provider<AnalyticsService>((ref) {
  return AnalyticsService();
});

class AnalyticsService {
  void logEvent(String name, [Map<String, dynamic>? parameters]) {
    if (kDebugMode) {
      debugPrint('[ANALYTICS] Event: $name | Params: $parameters');
    }
    // Forward to Sentry / Firebase Analytics backend
  }

${events.map(ev => `  void track${ev.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}([Map<String, dynamic>? params]) {
    logEvent('${ev}', params);
  }`).join("\n\n")}
}
`;
        const performanceInterceptorCode = spec.enablePerformanceMonitoring !== false ? `// lib/core/observability/dio_performance_interceptor.dart

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class PerformanceDioInterceptor extends Interceptor {
  final _stopwatchMap = <RequestOptions, Stopwatch>{};

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    _stopwatchMap[options] = Stopwatch()..start();
    super.onRequest(options, handler);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    final sw = _stopwatchMap.remove(response.requestOptions);
    if (sw != null) {
      sw.stop();
      if (kDebugMode) {
        debugPrint('[HTTP LATENCY] \${response.requestOptions.method} \${response.requestOptions.path} took \${sw.elapsedMilliseconds}ms');
      }
    }
    super.onResponse(response, handler);
  }
}
` : undefined;
        const pubspecDependencies = {
            "sentry_flutter": "^8.12.0"
        };
        const summary = `Scaffolded ${spec.provider} crash monitoring, type-safe analytics events (${events.length} tracked), and HTTP latency interceptors.`;
        return {
            initCode,
            analyticsServiceCode,
            performanceInterceptorCode,
            pubspecDependencies,
            summary
        };
    }
}
//# sourceMappingURL=observability-specialist.js.map