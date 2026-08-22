import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterMockFactorySpec {
  domainName: string;
  itemCount?: number;
  fields: Record<string, "name" | "email" | "price" | "date" | "status" | "avatar" | "title" | "uuid" | "boolean" | "number">;
}

export interface FlutterMockFactoryResult {
  factoryCode: string;
  mockRepositoryCode: string;
  summary: string;
}

export class FlutterMockFactorySpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterMockFactorySpecialistAgent",
      "Demo Data & Mock Factory Specialist",
      "Generates realistic, domain-rich mock data factories, fake entities, and in-memory mock repositories for instant hackathon UI prototyping."
    );
  }

  public generateFactory(spec: FlutterMockFactorySpec): FlutterMockFactoryResult {
    this.log("INFO", `Generating rapid mock data factory for domain: ${spec.domainName}`);

    const domain = spec.domainName.charAt(0).toUpperCase() + spec.domainName.slice(1);
    const snakeDomain = spec.domainName.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
    const count = spec.itemCount || 10;

    const factoryCode = `// lib/core/mock/factories/${snakeDomain}_mock_factory.dart

import 'dart:math';

class ${domain}MockModel {
${Object.entries(spec.fields).map(([k, type]) => {
  if (type === "price" || type === "number") return `  final double ${k};`;
  if (type === "boolean") return `  final bool ${k};`;
  if (type === "date") return `  final DateTime ${k};`;
  return `  final String ${k};`;
}).join("\n")}

  const ${domain}MockModel({
${Object.entries(spec.fields).map(([k]) => `    required this.${k},`).join("\n")}
  });
}

class ${domain}MockFactory {
  static final _random = Random(42); // Deterministic seed for consistent demos

  static List<${domain}MockModel> generateList({int count = ${count}}) {
    return List.generate(count, (index) => generateSingle(index));
  }

  static ${domain}MockModel generateSingle(int index) {
    return ${domain}MockModel(
${Object.entries(spec.fields).map(([k, type]) => {
  if (type === "name") return `      ${k}: _names[index % _names.length],`;
  if (type === "email") return `      ${k}: 'user\${index + 1}@example.com',`;
  if (type === "price") return `      ${k}: (15.0 + (_random.nextDouble() * 250)).roundToDouble(),`;
  if (type === "number") return `      ${k}: (_random.nextInt(100) + 1).toDouble(),`;
  if (type === "date") return `      ${k}: DateTime.now().subtract(Duration(days: index * 2, hours: index * 3)),`;
  if (type === "status") return `      ${k}: _statuses[index % _statuses.length],`;
  if (type === "avatar") return `      ${k}: 'https://i.pravatar.cc/150?img=\${(index % 70) + 1}',`;
  if (type === "boolean") return `      ${k}: index % 2 == 0,`;
  if (type === "uuid") return `      ${k}: 'id-\${index + 1000}',`;
  return `      ${k}: '${domain} Item #\${index + 1}',`;
}).join("\n")}
    );
  }

  static const _names = ['Alex Rivera', 'Elena Rostova', 'Marcus Vance', 'Samantha Chen', 'David Kim', 'Aria Montgomery'];
  static const _statuses = ['Active', 'Completed', 'Pending', 'In Review'];
}
`;

    const mockRepositoryCode = `// lib/core/mock/repositories/mock_${snakeDomain}_repository.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../factories/${snakeDomain}_mock_factory.dart';

final mock${domain}RepositoryProvider = Provider<Mock${domain}Repository>((ref) {
  return Mock${domain}Repository();
});

class Mock${domain}Repository {
  List<${domain}MockModel> _items = ${domain}MockFactory.generateList();

  Future<List<${domain}MockModel>> getItems() async {
    // Realistic simulated network delay
    await Future.delayed(const Duration(milliseconds: 350));
    return List.unmodifiable(_items);
  }

  Future<void> addItem(${domain}MockModel item) async {
    await Future.delayed(const Duration(milliseconds: 200));
    _items = [item, ..._items];
  }
}
`;

    const summary = `Generated mock factory for ${domain} (${count} deterministic demo items) and simulated Riverpod mock repository.`;

    return {
      factoryCode,
      mockRepositoryCode,
      summary
    };
  }
}
