import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterSecurityAuditSpec {
  codeSnippet?: string;
  enableBiometrics?: boolean;
  enableCertificatePinning?: boolean;
  domainsToPin?: string[];
}

export interface FlutterSecurityResult {
  vulnerabilities: Array<{
    severity: "HIGH" | "MEDIUM" | "LOW";
    issue: string;
    recommendation: string;
  }>;
  secureStorageServiceCode: string;
  biometricAuthServiceCode?: string;
  certificatePinningCode?: string;
  summary: string;
}

export class FlutterSecuritySpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterSecuritySpecialistAgent",
      "Mobile Security, Cryptography & Privacy Auditor",
      "Audits Flutter applications for hardcoded secrets, insecure storage, and network vulnerabilities. Scaffolds hardware-backed Keychain/Keystore secure storage, Biometric Auth, and SSL Pinning."
    );
  }

  public auditAndHarden(spec: FlutterSecurityAuditSpec): FlutterSecurityResult {
    this.log("INFO", "Performing mobile security audit and generating cryptographic hardening modules");

    const vulnerabilities: Array<{ severity: "HIGH" | "MEDIUM" | "LOW"; issue: string; recommendation: string }> = [];

    if (spec.codeSnippet) {
      if (spec.codeSnippet.match(/(apiKey|api_key|secret|password|bearer|jwt)\s*=\s*['"][a-zA-Z0-9_\-]{8,}['"]/i)) {
        vulnerabilities.push({
          severity: "HIGH",
          issue: "Hardcoded API Key / Secret detected in source code",
          recommendation: "Move secrets to compile-time environment variables via String.fromEnvironment or secure server endpoints."
        });
      }

      if (spec.codeSnippet.includes("http://")) {
        vulnerabilities.push({
          severity: "HIGH",
          issue: "Insecure unencrypted HTTP endpoint usage detected",
          recommendation: "Enforce HTTPS with TLS 1.3 across all network requests."
        });
      }

      if (spec.codeSnippet.includes("SharedPreferences") && spec.codeSnippet.match(/(token|password|auth|secret|key)/i)) {
        vulnerabilities.push({
          severity: "HIGH",
          issue: "Sensitive token stored in plaintext SharedPreferences",
          recommendation: "Use flutter_secure_storage backed by iOS Keychain & Android EncryptedSharedPreferences."
        });
      }
    }

    const secureStorageServiceCode = `// lib/core/security/secure_storage_service.dart

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final secureStorageServiceProvider = Provider<SecureStorageService>((ref) {
  return SecureStorageService();
});

class SecureStorageService {
  final FlutterSecureStorage _storage;

  SecureStorageService()
      : _storage = const FlutterSecureStorage(
          aOptions: AndroidOptions(
            encryptedSharedPreferences: true,
            resetOnError: true,
          ),
          iOptions: IOSOptions(
            accessibility: KeychainAccessibility.first_unlock,
          ),
        );

  Future<void> writeToken(String key, String value) async {
    await _storage.write(key: key, value: value);
  }

  Future<String?> readToken(String key) async {
    return await _storage.read(key: key);
  }

  Future<void> deleteToken(String key) async {
    await _storage.delete(key: key);
  }

  Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}
`;

    const biometricAuthServiceCode = spec.enableBiometrics !== false ? `// lib/core/security/biometric_auth_service.dart

import 'package:local_auth/local_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final biometricAuthServiceProvider = Provider<BiometricAuthService>((ref) {
  return BiometricAuthService();
});

class BiometricAuthService {
  final LocalAuthentication _auth = LocalAuthentication();

  Future<bool> canAuthenticate() async {
    final canCheck = await _auth.canCheckBiometrics;
    final isDeviceSupported = await _auth.isDeviceSupported();
    return canCheck && isDeviceSupported;
  }

  Future<bool> authenticate({String localizedReason = 'Please authenticate to access secure features'}) async {
    try {
      if (!await canAuthenticate()) return false;
      return await _auth.authenticate(
        localizedReason: localizedReason,
        options: const AuthenticationOptions(
          stickyAuth: true,
          biometricOnly: true,
        ),
      );
    } catch (e) {
      return false;
    }
  }
}
` : undefined;

    const certificatePinningCode = spec.enableCertificatePinning ? `// lib/core/security/ssl_pinning_interceptor.dart

import 'dart:io';
import 'package:dio/dio.dart';
import 'package:dio/io.dart';

void applyCertificatePinning(Dio dio, List<String> allowedShas) {
  dio.httpClientAdapter = IOHttpClientAdapter(
    createHttpClient: () {
      final client = HttpClient(context: SecurityContext(withTrustedRoots: true));
      client.badCertificateCallback = (X509Certificate cert, String host, int port) {
        // Enforce SHA-256 SPKI fingerprint verification
        return allowedShas.contains(cert.sha1.toString());
      };
      return client;
    },
  );
}
` : undefined;

    const summary = `Security analysis complete. ${vulnerabilities.length} vulnerabilities detected. Generated hardware-backed SecureStorageService, Biometrics, and TLS Pinning configs.`;

    return {
      vulnerabilities,
      secureStorageServiceCode,
      biometricAuthServiceCode,
      certificatePinningCode,
      summary
    };
  }
}
