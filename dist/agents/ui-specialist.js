import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterUISpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterUISpecialistAgent", "Flutter UI/UX & Widget Engineer", "Designs production-grade Flutter widgets, Material 3 responsive layouts (Mobile/Web/Desktop), Riverpod/Bloc state integration, and fluid animations.");
    }
    designScreen(spec) {
        this.log("INFO", `Designing Flutter screen: ${spec.screenName} for platforms: [${spec.targetPlatforms.join(", ")}]`);
        const rawName = spec.screenName.replace(/(Screen|View|Page)$/i, "");
        const baseName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
        const snakeName = rawName.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
        const screenClassName = `${baseName}Screen`;
        const controllerClassName = `${baseName}Controller`;
        const stateClassName = `${baseName}State`;
        const modelClassName = `${baseName}Item`;
        const modelCode = `// lib/features/${snakeName}/domain/models/${snakeName}_item.dart

class ${modelClassName} {
  final String id;
  final String title;
  final String subtitle;
  final bool isCompleted;
  final DateTime createdAt;

  const ${modelClassName}({
    required this.id,
    required this.title,
    required this.subtitle,
    this.isCompleted = false,
    required this.createdAt,
  });

  ${modelClassName} copyWith({
    String? id,
    String? title,
    String? subtitle,
    bool? isCompleted,
    DateTime? createdAt,
  }) {
    return ${modelClassName}(
      id: id ?? this.id,
      title: title ?? this.title,
      subtitle: subtitle ?? this.subtitle,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
    );
  }
}
`;
        const stateHolderCode = `// lib/features/${snakeName}/presentation/controllers/${snakeName}_controller.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../domain/models/${snakeName}_item.dart';

class ${stateClassName} {
  final bool isLoading;
  final List<${modelClassName}> items;
  final String? errorMessage;
  final String searchQuery;

  const ${stateClassName}({
    this.isLoading = false,
    this.items = const [],
    this.errorMessage,
    this.searchQuery = '',
  });

  ${stateClassName} copyWith({
    bool? isLoading,
    List<${modelClassName}>? items,
    String? errorMessage,
    String? searchQuery,
  }) {
    return ${stateClassName}(
      isLoading: isLoading ?? this.isLoading,
      items: items ?? this.items,
      errorMessage: errorMessage,
      searchQuery: searchQuery ?? this.searchQuery,
    );
  }
}

final ${snakeName}ControllerProvider =
    StateNotifierProvider.autoDispose<${controllerClassName}, ${stateClassName}>((ref) {
  return ${controllerClassName}();
});

class ${controllerClassName} extends StateNotifier<${stateClassName}> {
  ${controllerClassName}() : super(const ${stateClassName}()) {
    loadItems();
  }

  Future<void> loadItems() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      // Simulated async service call
      await Future.delayed(const Duration(milliseconds: 600));
      final sampleItems = [
        ${modelClassName}(
          id: '1',
          title: 'High Priority Task',
          subtitle: 'Active item with high impact',
          isCompleted: false,
          createdAt: DateTime.now(),
        ),
        ${modelClassName}(
          id: '2',
          title: 'Infrastructure Optimization',
          subtitle: 'Multi-platform pipeline tuning',
          isCompleted: true,
          createdAt: DateTime.now(),
        ),
      ];
      state = state.copyWith(isLoading: false, items: sampleItems);
    } catch (e) {
      state = state.copyWith(isLoading: false, errorMessage: e.toString());
    }
  }

  void updateSearchQuery(String query) {
    state = state.copyWith(searchQuery: query);
  }

  void toggleItemStatus(String id) {
    final updated = state.items.map((item) {
      if (item.id == id) {
        return item.copyWith(isCompleted: !item.isCompleted);
      }
      return item;
    }).toList();
    state = state.copyWith(items: updated);
  }
}
`;
        const widgetCode = `// lib/features/${snakeName}/presentation/screens/${snakeName}_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:gap/gap.dart';
import '../controllers/${snakeName}_controller.dart';
import '../../domain/models/${snakeName}_item.dart';

class ${screenClassName} extends ConsumerWidget {
  const ${screenClassName}({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final uiState = ref.watch(${snakeName}ControllerProvider);
    final controller = ref.read(${snakeName}ControllerProvider.notifier);
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('${baseName}'),
        centerTitle: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh data',
            onPressed: () => controller.loadItems(),
          ),
        ],
      ),
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            final isDesktop = constraints.maxWidth > 800;
            final horizontalPadding = isDesktop ? constraints.maxWidth * 0.15 : 16.0;

            return Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 1200),
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: horizontalPadding, vertical: 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Search Bar
                      SearchBar(
                        hintText: 'Search items...',
                        leading: const Icon(Icons.search),
                        onChanged: controller.updateSearchQuery,
                        elevation: const WidgetStatePropertyAll(1),
                      ).animate().fadeIn(duration: 300.ms),
                      const Gap(16),

                      // Content Area
                      Expanded(
                        child: Builder(
                          builder: (context) {
                            if (uiState.isLoading) {
                              return const Center(child: CircularProgressIndicator.adaptive());
                            }

                            if (uiState.errorMessage != null) {
                              return Center(
                                child: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(Icons.error_outline, size: 48, color: colorScheme.error),
                                    const Gap(12),
                                    Text(
                                      uiState.errorMessage!,
                                      style: theme.textTheme.bodyMedium?.copyWith(color: colorScheme.error),
                                      textAlign: TextAlign.center,
                                    ),
                                    const Gap(16),
                                    FilledButton.icon(
                                      onPressed: () => controller.loadItems(),
                                      icon: const Icon(Icons.refresh),
                                      label: const Text('Try Again'),
                                    ),
                                  ],
                                ),
                              );
                            }

                            final filteredItems = uiState.items.where((item) {
                              if (uiState.searchQuery.isEmpty) return true;
                              return item.title.toLowerCase().contains(uiState.searchQuery.toLowerCase()) ||
                                  item.subtitle.toLowerCase().contains(uiState.searchQuery.toLowerCase());
                            }).toList();

                            if (filteredItems.isEmpty) {
                              return Center(
                                child: Text(
                                  'No items found',
                                  style: theme.textTheme.bodyLarge?.copyWith(color: colorScheme.onSurfaceVariant),
                                ),
                              );
                            }

                            return ListView.separated(
                              itemCount: filteredItems.length,
                              separatorBuilder: (context, index) => const Gap(10),
                              itemBuilder: (context, index) {
                                final item = filteredItems[index];
                                return Card(
                                  elevation: 0,
                                  color: colorScheme.surfaceContainerHighest.withValues(alpha: 0.6),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                    side: BorderSide(
                                      color: colorScheme.outlineVariant.withValues(alpha: 0.5),
                                    ),
                                  ),
                                  child: ListTile(
                                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                    leading: Checkbox.adaptive(
                                      value: item.isCompleted,
                                      onChanged: (_) => controller.toggleItemStatus(item.id),
                                    ),
                                    title: Text(
                                      item.title,
                                      style: theme.textTheme.titleMedium?.copyWith(
                                        decoration: item.isCompleted ? TextDecoration.lineThrough : null,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    subtitle: Text(
                                      item.subtitle,
                                      style: theme.textTheme.bodySmall?.copyWith(
                                        color: colorScheme.onSurfaceVariant,
                                      ),
                                    ),
                                    trailing: const Icon(Icons.chevron_right),
                                    onTap: () => controller.toggleItemStatus(item.id),
                                  ),
                                ).animate().fadeIn(delay: (index * 50).ms).slideY(begin: 0.1, end: 0);
                              },
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
`;
        const explanation = `
### 🎨 Flutter UI & Widget Design:
1. **Responsive & Adaptive**: Uses \`LayoutBuilder\` and \`ConstrainedBox\` to gracefully scale across Mobile (iOS/Android), Web, and Desktop (macOS/Windows/Linux).
2. **Material 3 Standards**: Integrates M3 \`SearchBar\`, \`surfaceContainerHighest\` elevation tokens, and \`.adaptive\` widgets.
3. **State Management**: Reactive \`ConsumerWidget\` bound to \`StateNotifierProvider.autoDispose\` ensuring automatic disposal when navigated away.
4. **Fluid Animations**: Decorated with \`flutter_animate\` staggered transitions for modern micro-interactions.
5. **Memory & Rendering**: 100% const constructors applied across static trees for minimal widget rebuild overhead.
    `.trim();
        return {
            screenName: screenClassName,
            widgetCode,
            stateHolderCode,
            modelCode,
            filePaths: {
                view: `lib/features/${snakeName}/presentation/screens/${snakeName}_screen.dart`,
                controller: `lib/features/${snakeName}/presentation/controllers/${snakeName}_controller.dart`,
                model: `lib/features/${snakeName}/domain/models/${snakeName}_item.dart`
            },
            explanation
        };
    }
}
//# sourceMappingURL=ui-specialist.js.map