import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterBridgeSpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterBridgeSpecialistAgent", "Full-Stack API Bridge & Cross-Platform Client Engineer", "Generates type-safe Dio REST clients, matching Dart DTO models, Riverpod network providers, and WebSocket realtime streams.");
    }
    generateBridge(spec) {
        this.log("INFO", `Generating Flutter API client bridge for: ${spec.serviceName}`);
        const service = spec.serviceName;
        const lowerService = service.toLowerCase();
        const baseUrl = spec.baseUrl || "https://api.example.com";
        const dartModelsCode = `// lib/core/network/models/${lowerService}_models.dart

class ${service}Dto {
${spec.models[0] ? Object.entries(spec.models[0].fields).map(([k, v]) => `  final ${v} ${k};`).join("\n") : "  final String id;\n  final String title;"}

  const ${service}Dto({
${spec.models[0] ? Object.entries(spec.models[0].fields).map(([k]) => `    required this.${k},`).join("\n") : "    required this.id,\n    required this.title,"}
  });

  factory ${service}Dto.fromJson(Map<String, dynamic> json) {
    return ${service}Dto(
${spec.models[0] ? Object.entries(spec.models[0].fields).map(([k, v]) => `      ${k}: json['${k}'] as ${v},`).join("\n") : "      id: json['id'] as String,\n      title: json['title'] as String,"}
    );
  }

  Map<String, dynamic> toJson() {
    return {
${spec.models[0] ? Object.entries(spec.models[0].fields).map(([k]) => `      '${k}': ${k},`).join("\n") : "      'id': id,\n      'title': title,"}
    };
  }
}
`;
        const dioClientCode = `// lib/core/network/clients/${lowerService}_api_client.dart

import 'package:dio/dio.dart';
import '../models/${lowerService}_models.dart';

class ${service}ApiClient {
  final Dio dio;
  final String baseUrl;

  ${service}ApiClient({
    required this.dio,
    this.baseUrl = '${baseUrl}',
  });

${spec.endpoints.map(e => `  Future<${e.responseType}> ${e.name}(${e.requestType ? `${e.requestType} request` : ""}) async {
    final response = await dio.${e.method.toLowerCase()}(
      '$baseUrl/api/v1/${lowerService}/${e.path.replace(/^\//, "")}',
      ${e.requestType ? "data: request.toJson()," : ""}
    );
    return response.data;
  }`).join("\n\n")}
}
`;
        const riverpodProvidersCode = `// lib/core/network/providers/${lowerService}_api_providers.dart

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../clients/${lowerService}_api_client.dart';

final ${lowerService}ApiClientProvider = Provider<${service}ApiClient>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: '${baseUrl}',
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Accept': 'application/json'},
    ),
  );

  dio.interceptors.add(
    LogInterceptor(
      requestBody: true,
      responseBody: true,
    ),
  );

  return ${service}ApiClient(dio: dio);
});
`;
        const webSocketStreamCode = `// lib/core/network/realtime/${lowerService}_websocket_service.dart

import 'dart:async';
import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

final ${lowerService}RealtimeStreamProvider = StreamProvider.autoDispose<Map<String, dynamic>>((ref) async* {
  final channel = WebSocketChannel.connect(Uri.parse('wss://api.example.com/ws/${lowerService}'));
  ref.onDispose(() => channel.sink.close());

  await for (final message in channel.stream) {
    if (message is String) {
      yield jsonDecode(message) as Map<String, dynamic>;
    }
  }
});
`;
        const summary = `Generated full-stack Flutter API bridge: Dio REST client, JSON DTOs, Riverpod providers, and WebSocket realtime subscription.`;
        return {
            serviceName: service,
            dioClientCode,
            dartModelsCode,
            riverpodProvidersCode,
            webSocketStreamCode,
            summary
        };
    }
}
//# sourceMappingURL=bridge-specialist.js.map