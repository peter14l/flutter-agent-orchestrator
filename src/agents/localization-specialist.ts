import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterLocalizationSpec {
  defaultLocale?: string;
  supportedLocales: string[];
  stringKeys: Record<string, { en: string; es?: string; ar?: string; description?: string }>;
}

export interface FlutterLocalizationResult {
  l10nYaml: string;
  arbEnJson: string;
  arbEsJson?: string;
  arbArJson?: string;
  localeProviderCode: string;
  summary: string;
}

export class FlutterLocalizationSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterLocalizationSpecialistAgent",
      "Internationalization (i18n) & Localization (l10n) Specialist",
      "Extracts UI strings into standard ARB localization bundles, generates l10n.yaml, supports Right-to-Left (RTL) languages, and scaffolds dynamic locale switching."
    );
  }

  public generateLocalization(spec: FlutterLocalizationSpec): FlutterLocalizationResult {
    this.log("INFO", `Generating multi-language localization bundle for locales: [${spec.supportedLocales.join(", ")}]`);

    const l10nYaml = `arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
nullable-getter: false
`;

    // 1. English ARB
    const enObj: Record<string, any> = { "@@locale": "en" };
    for (const [k, v] of Object.entries(spec.stringKeys)) {
      enObj[k] = v.en;
      if (v.description) {
        enObj[`@${k}`] = { description: v.description };
      }
    }
    const arbEnJson = JSON.stringify(enObj, null, 2);

    // 2. Spanish ARB
    let arbEsJson: string | undefined;
    if (spec.supportedLocales.includes("es")) {
      const esObj: Record<string, any> = { "@@locale": "es" };
      for (const [k, v] of Object.entries(spec.stringKeys)) {
        esObj[k] = v.es || v.en;
      }
      arbEsJson = JSON.stringify(esObj, null, 2);
    }

    // 3. Arabic ARB (RTL)
    let arbArJson: string | undefined;
    if (spec.supportedLocales.includes("ar")) {
      const arObj: Record<string, any> = { "@@locale": "ar" };
      for (const [k, v] of Object.entries(spec.stringKeys)) {
        arObj[k] = v.ar || v.en;
      }
      arbArJson = JSON.stringify(arObj, null, 2);
    }

    const localeProviderCode = `// lib/core/localization/locale_provider.dart

import 'dart:ui';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final localeProvider = StateNotifierProvider<LocaleNotifier, Locale>((ref) {
  return LocaleNotifier();
});

class LocaleNotifier extends StateNotifier<Locale> {
  static const _localeKey = 'selected_locale_code';

  LocaleNotifier() : super(const Locale('en')) {
    _loadSavedLocale();
  }

  Future<void> _loadSavedLocale() async {
    final prefs = await SharedPreferences.getInstance();
    final savedCode = prefs.getString(_localeKey);
    if (savedCode != null) {
      state = Locale(savedCode);
    }
  }

  Future<void> setLocale(Locale newLocale) async {
    state = newLocale;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_localeKey, newLocale.languageCode);
  }

  bool get isRtl => state.languageCode == 'ar' || state.languageCode == 'he';
}
`;

    const summary = `Generated l10n.yaml, English ARB with ${Object.keys(spec.stringKeys).length} keys, and RTL-ready dynamic LocaleNotifier.`;

    return {
      l10nYaml,
      arbEnJson,
      arbEsJson,
      arbArJson,
      localeProviderCode,
      summary
    };
  }
}
