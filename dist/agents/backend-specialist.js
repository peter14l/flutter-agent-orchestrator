import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterBackendSpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterBackendAndStateSpecialistAgent", "Flutter Clean Architecture & State Engineer", "Scaffolds Clean Architecture repositories, Dio/Supabase remote data sources, Drift/Hive local caching, and Riverpod/Bloc business controllers.");
    }
    scaffoldBackend(spec) {
        this.log("INFO", `Scaffolding Clean Architecture for ${spec.featureName} using ${spec.backendProvider}`);
        const feature = spec.featureName;
        const snakeName = feature.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
        const entityName = spec.entities[0]?.name || feature;
        const entityCode = `// lib/features/${snakeName}/domain/entities/${snakeName}_entity.dart

class ${entityName}Entity {
  final String id;
  final String name;
  final String description;
  final DateTime updatedAt;

  const ${entityName}Entity({
    required this.id,
    required this.name,
    required this.description,
    required this.updatedAt,
  });
}
`;
        const modelCode = `// lib/features/${snakeName}/data/models/${snakeName}_model.dart

import '../../domain/entities/${snakeName}_entity.dart';

class ${entityName}Model extends ${entityName}Entity {
  const ${entityNameModelMapping(entityName)}
  );

  factory ${entityName}Model.fromJson(Map<String, dynamic> json) {
    return ${entityName}Model(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      description: json['description'] as String? ?? '',
      updatedAt: json['updated_at'] != null
          ? DateTime.parse(json['updated_at'] as String)
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'updated_at': updatedAt.toIso8601String(),
    };
  }
}
`;
        const repositoryInterfaceCode = `// lib/features/${snakeName}/domain/repositories/${snakeName}_repository.dart

import '../entities/${snakeName}_entity.dart';

abstract class ${entityName}Repository {
  Future<List<${entityName}Entity>> fetchAll();
  Future<${entityName}Entity> fetchById(String id);
  Future<${entityName}Entity> create(${entityName}Entity entity);
  Future<void> delete(String id);
}
`;
        const remoteDataSourceCode = `// lib/features/${snakeName}/data/datasources/${snakeName}_remote_data_source.dart

import 'package:dio/dio.dart';
import '../models/${snakeName}_model.dart';

abstract class ${entityName}RemoteDataSource {
  Future<List<${entityName}Model>> getItems();
  Future<${entityName}Model> createItem(${entityName}Model model);
}

class ${entityName}RemoteDataSourceImpl implements ${entityName}RemoteDataSource {
  final Dio dio;

  ${entityName}RemoteDataSourceImpl({required this.dio});

  @override
  Future<List<${entityName}Model>> getItems() async {
    final response = await dio.get('/api/v1/${snakeName}');
    final list = response.data as List<dynamic>;
    return list.map((e) => ${entityName}Model.fromJson(e as Map<String, dynamic>)).toList();
  }

  @override
  Future<${entityName}Model> createItem(${entityName}Model model) async {
    final response = await dio.post('/api/v1/${snakeName}', data: model.toJson());
    return ${entityName}Model.fromJson(response.data as Map<String, dynamic>);
  }
}
`;
        const repositoryImplCode = `// lib/features/${snakeName}/data/repositories/${snakeName}_repository_impl.dart

import '../../domain/entities/${snakeName}_entity.dart';
import '../../domain/repositories/${snakeName}_repository.dart';
import '../datasources/${snakeName}_remote_data_source.dart';
import '../models/${snakeName}_model.dart';

class ${entityName}RepositoryImpl implements ${entityName}Repository {
  final ${entityName}RemoteDataSource remoteDataSource;

  ${entityName}RepositoryImpl({required this.remoteDataSource});

  @override
  Future<List<${entityName}Entity>> fetchAll() async {
    return await remoteDataSource.getItems();
  }

  @override
  Future<${entityName}Entity> fetchById(String id) async {
    final all = await remoteDataSource.getItems();
    return all.firstWhere((e) => e.id == id);
  }

  @override
  Future<${entityName}Entity> create(${entityName}Entity entity) async {
    final model = ${entityName}Model(
      id: entity.id,
      name: entity.name,
      description: entity.description,
      updatedAt: entity.updatedAt,
    );
    return await remoteDataSource.createItem(model);
  }

  @override
  Future<void> delete(String id) async {
    // remote delete implementation
  }
}
`;
        const stateNotifierCode = `// lib/features/${snakeName}/presentation/providers/${snakeName}_providers.dart

import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../domain/repositories/${snakeName}_repository.dart';
import '../../domain/entities/${snakeName}_entity.dart';
import '../../data/datasources/${snakeName}_remote_data_source.dart';
import '../../data/repositories/${snakeName}_repository_impl.dart';

final dioProvider = Provider<Dio>((ref) {
  return Dio(BaseOptions(
    baseUrl: 'https://api.example.com',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
  ));
});

final ${snakeName}RemoteDataSourceProvider = Provider<${entityName}RemoteDataSource>((ref) {
  return ${entityName}RemoteDataSourceImpl(dio: ref.watch(dioProvider));
});

final ${snakeName}RepositoryProvider = Provider<${entityName}Repository>((ref) {
  return ${entityName}RepositoryImpl(
    remoteDataSource: ref.watch(${snakeName}RemoteDataSourceProvider),
  );
});

final ${snakeName}ListProvider = FutureProvider.autoDispose<List<${entityName}Entity>>((ref) async {
  final repository = ref.watch(${snakeName}RepositoryProvider);
  return repository.fetchAll();
});
`;
        const fileTree = {
            [`lib/features/${snakeName}/domain/entities/${snakeName}_entity.dart`]: entityCode,
            [`lib/features/${snakeName}/data/models/${snakeName}_model.dart`]: modelCode,
            [`lib/features/${snakeName}/domain/repositories/${snakeName}_repository.dart`]: repositoryInterfaceCode,
            [`lib/features/${snakeName}/data/datasources/${snakeName}_remote_data_source.dart`]: remoteDataSourceCode,
            [`lib/features/${snakeName}/data/repositories/${snakeName}_repository_impl.dart`]: repositoryImplCode,
            [`lib/features/${snakeName}/presentation/providers/${snakeName}_providers.dart`]: stateNotifierCode,
        };
        const summary = `
### 🏗️ Flutter Clean Architecture Scaffold (${spec.backendProvider.toUpperCase()}):
- **Domain Layer**: Pure Dart entities and repository contracts with zero framework dependencies.
- **Data Layer**: Dio remote data source with JSON serialization DTO models and repository implementations.
- **Presentation / DI Layer**: Declarative Riverpod providers chained for zero-boilerplate dependency injection.
    `.trim();
        return {
            featureName: feature,
            entityCode,
            modelCode,
            repositoryInterfaceCode,
            repositoryImplCode,
            remoteDataSourceCode,
            stateNotifierCode,
            fileTree,
            summary
        };
    }
}
function entityNameModelMapping(name) {
    return `${name}Model({
    required super.id,
    required super.name,
    required super.description,
    required super.updatedAt,
  }`;
}
//# sourceMappingURL=backend-specialist.js.map