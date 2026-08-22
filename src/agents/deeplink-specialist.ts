import { BaseFlutterAgent } from "./base-agent.js";

export interface FlutterDeepLinkSpec {
  customScheme: string;
  domainHost: string;
  routes: Array<{
    path: string;
    screenName: string;
    parameters?: string[];
  }>;
}

export interface FlutterDeepLinkResult {
  goRouterConfigCode: string;
  androidAssetLinksJson: string;
  appleAppSiteAssociationJson: string;
  fcmNotificationHandlerCode: string;
  summary: string;
}

export class FlutterDeepLinkSpecialistAgent extends BaseFlutterAgent {
  constructor() {
    super(
      "FlutterDeepLinkSpecialistAgent",
      "Deep Linking & Push Notification Routing Engineer",
      "Configures go_router URI matching, Android App Links (assetlinks.json), iOS Universal Links (apple-app-site-association), and FCM push notification routing."
    );
  }

  public configureRouting(spec: FlutterDeepLinkSpec): FlutterDeepLinkResult {
    this.log("INFO", `Configuring deep links and push notification routes for scheme: ${spec.customScheme}`);

    const goRouterConfigCode = `// lib/core/routing/app_router.dart

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    debugLogDiagnostics: true,
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const Scaffold(body: Center(child: Text('Home'))),
      ),
${spec.routes.map(r => `      GoRoute(
        path: '${r.path}',
        builder: (context, state) {
          ${r.parameters ? r.parameters.map(p => `final ${p} = state.pathParameters['${p}'] ?? '';`).join("\n          ") : ""}
          return const Scaffold(body: Center(child: Text('${r.screenName}')));
        },
      ),`).join("\n")}
    ],
  );
});
`;

    const androidAssetLinksJson = JSON.stringify([
      {
        relation: ["delegate_permission/common.handle_all_urls"],
        target: {
          namespace: "android_app",
          package_name: `com.example.${spec.customScheme.toLowerCase()}`,
          sha256_cert_fingerprints: ["14:6D:E9:01:07:52:68:4E:9F:55:5E:F0:47:A9:73:91:0E:0E:97:AE:EB:52:10:E5:58:12:E6:4D:79:47:AB:E8"]
        }
      }
    ], null, 2);

    const appleAppSiteAssociationJson = JSON.stringify({
      applinks: {
        apps: [],
        details: [
          {
            appID: `TEAMID.com.example.${spec.customScheme.toLowerCase()}`,
            paths: spec.routes.map(r => `${r.path.replace(/:[a-zA-Z0-9_]+/g, "*")}`)
          }
        ]
      }
    }, null, 2);

    const fcmNotificationHandlerCode = `// lib/core/notifications/fcm_notification_service.dart

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

final notificationServiceProvider = Provider<NotificationService>((ref) {
  return NotificationService();
});

class NotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;

  Future<void> initNotifications(GoRouter router) async {
    await _fcm.requestPermission(alert: true, badge: true, sound: true);

    // Foreground message handler
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      // Show local notification banner
    });

    // Notification tap handler (Direct deep link routing)
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      final route = message.data['route'];
      if (route != null) {
        router.push(route.toString());
      }
    });
  }
}
`;

    const summary = `Configured deep linking for ${spec.customScheme}://${spec.domainHost} with ${spec.routes.length} routes, Android assetlinks.json, iOS Universal Links, and FCM push router.`;

    return {
      goRouterConfigCode,
      androidAssetLinksJson,
      appleAppSiteAssociationJson,
      fcmNotificationHandlerCode,
      summary
    };
  }
}
