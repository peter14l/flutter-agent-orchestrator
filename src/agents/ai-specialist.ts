import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterAiModuleSpec {
  featureName: string;
  provider: "google-generative-ai" | "flutter-ai-local" | "tflite";
  systemInstruction?: string;
}

export interface FlutterAiModuleResult {
  serviceCode: string;
  providerCode: string;
  widgetCode: string;
  pubspecDependencies: Record<string, string>;
  summary: string;
}

export class FlutterAiSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterAiSpecialistAgent",
      "On-Device & Generative AI Specialist for Flutter",
      "Scaffolds google_generative_ai SDK integration, streaming StreamProviders, and interactive chat / generation widgets."
    );
  }

  public scaffoldAiModule(spec: FlutterAiModuleSpec): FlutterAiModuleResult {
    this.log("INFO", `Scaffolding Flutter AI module for: ${spec.featureName}`);

    const feature = spec.featureName;
    const lowerFeature = feature.toLowerCase();

    const serviceCode = `// lib/features/${lowerFeature}/data/services/${lowerFeature}_ai_service.dart

import 'package:google_generative_ai/google_generative_ai.dart';

class ${feature}AiService {
  final String apiKey;
  late final GenerativeModel _model;

  ${feature}AiService({required this.apiKey}) {
    _model = GenerativeModel(
      model: 'gemini-1.5-flash',
      apiKey: apiKey,
      generationConfig: GenerationConfig(
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      ),
      systemInstruction: Content.system(
        '${spec.systemInstruction || "You are a helpful AI assistant built directly inside a Flutter application."}',
      ),
    );
  }

  Future<String> generateText(String prompt) async {
    final response = await _model.generateContent([Content.text(prompt)]);
    return response.text ?? 'No response';
  }

  Stream<String> generateStreamingText(String prompt) async* {
    final stream = _model.generateContentStream([Content.text(prompt)]);
    await for (final response in stream) {
      if (response.text != null) {
        yield response.text!;
      }
    }
  }
}
`;

    const providerCode = `// lib/features/${lowerFeature}/presentation/providers/${lowerFeature}_ai_providers.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/services/${lowerFeature}_ai_service.dart';

final ${lowerFeature}AiServiceProvider = Provider<${feature}AiService>((ref) {
  const apiKey = String.fromEnvironment('GEMINI_API_KEY', defaultValue: '');
  return ${feature}AiService(apiKey: apiKey);
});

class ${feature}AiState {
  final bool isGenerating;
  final String responseText;
  final String? error;

  const ${feature}AiState({
    this.isGenerating = false,
    this.responseText = '',
    this.error,
  });

  ${feature}AiState copyWith({
    bool? isGenerating,
    String? responseText,
    String? error,
  }) {
    return ${feature}AiState(
      isGenerating: isGenerating ?? this.isGenerating,
      responseText: responseText ?? this.responseText,
      error: error,
    );
  }
}

final ${lowerFeature}AiControllerProvider =
    StateNotifierProvider.autoDispose<${feature}AiController, ${feature}AiState>((ref) {
  return ${feature}AiController(aiService: ref.watch(${lowerFeature}AiServiceProvider));
});

class ${feature}AiController extends StateNotifier<${feature}AiState> {
  final ${feature}AiService aiService;

  ${feature}AiController({required this.aiService}) : super(const ${feature}AiState());

  Future<void> askAi(String prompt) async {
    state = state.copyWith(isGenerating: true, responseText: '', error: null);
    try {
      final stream = aiService.generateStreamingText(prompt);
      await for (final chunk in stream) {
        state = state.copyWith(responseText: state.responseText + chunk);
      }
      state = state.copyWith(isGenerating: false);
    } catch (e) {
      state = state.copyWith(isGenerating: false, error: e.toString());
    }
  }
}
`;

    const widgetCode = `// lib/features/${lowerFeature}/presentation/widgets/${lowerFeature}_ai_view.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../providers/${lowerFeature}_ai_providers.dart';

class ${feature}AiView extends ConsumerStatefulWidget {
  const ${feature}AiView({super.key});

  @override
  ConsumerState<${feature}AiView> createState() => _${feature}AiViewState();
}

class _${feature}AiViewState extends ConsumerState<${feature}AiView> {
  late final TextEditingController _textController;

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController();
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final aiState = ref.watch(${lowerFeature}AiControllerProvider);
    final controller = ref.read(${lowerFeature}AiControllerProvider.notifier);

    return Column(
      children: [
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Text(
              aiState.responseText.isEmpty
                  ? 'Ask me anything...'
                  : aiState.responseText,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
          ),
        ),
        if (aiState.isGenerating) const LinearProgressIndicator(),
        Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _textController,
                  decoration: const InputDecoration(
                    hintText: 'Type your message...',
                    border: OutlineInputBorder(),
                  ),
                ),
              ),
              const Gap(8),
              IconButton.filled(
                icon: const Icon(Icons.send),
                onPressed: aiState.isGenerating
                    ? null
                    : () {
                        if (_textController.text.trim().isNotEmpty) {
                          controller.askAi(_textController.text.trim());
                          _textController.clear();
                        }
                      },
              ),
            ],
          ),
        ),
      ],
    );
  }
}
`;

    const pubspecDependencies = {
      "google_generative_ai": "^0.4.6"
    };

    const summary = `Scaffolded Google Generative AI streaming module with Riverpod controller and reactive chat view.`;

    return {
      serviceCode,
      providerCode,
      widgetCode,
      pubspecDependencies,
      summary
    };
  }
}
