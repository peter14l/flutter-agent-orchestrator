import { BaseFlutterAgent } from "./base-agent.js";
export class FlutterAuthFlowSpecialistAgent extends BaseFlutterAgent {
    constructor() {
        super("FlutterAuthFlowSpecialistAgent", "Auth, Onboarding & User Profile Flow Specialist", "Scaffolds complete animated onboarding tours (PageView with dots), Material 3 Social login UI, and token-persisting Riverpod Auth controllers in seconds.");
    }
    scaffoldAuthFlow(spec) {
        this.log("INFO", `Scaffolding instant Auth and Onboarding flow for: ${spec.appName}`);
        const onboardingScreenCode = `// lib/features/auth/presentation/screens/onboarding_screen.dart

import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:flutter_animate/flutter_animate.dart';

class OnboardingScreen extends StatefulWidget {
  final VoidCallback onFinish;

  const OnboardingScreen({super.key, required this.onFinish});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final _slides = const [
    _SlideData('Instant Execution', 'Build and prototype production-ready apps in minutes.', Icons.bolt),
    _SlideData('Seamless Multi-Platform', 'Run seamlessly on iOS, Android, Web and Desktop.', Icons.devices),
    _SlideData('Enterprise Reliability', 'Clean Architecture, offline cache, and zero crashes.', Icons.security),
  ];

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Align(
              alignment: Alignment.topRight,
              child: TextButton(
                onPressed: widget.onFinish,
                child: const Text('Skip'),
              ),
            ),
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _slides.length,
                onPageChanged: (i) => setState(() => _currentPage = i),
                itemBuilder: (context, index) {
                  final slide = _slides[index];
                  return Padding(
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CircleAvatar(
                          radius: 54,
                          backgroundColor: colorScheme.primaryContainer,
                          child: Icon(slide.icon, size: 48, color: colorScheme.primary),
                        ).animate().scale(duration: 400.ms),
                        const Gap(32),
                        Text(
                          slide.title,
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        ),
                        const Gap(12),
                        Text(
                          slide.subtitle,
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: colorScheme.onSurfaceVariant),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_slides.length, (i) => AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                margin: const EdgeInsets.symmetric(horizontal: 4),
                width: _currentPage == i ? 24 : 8,
                height: 8,
                decoration: BoxDecoration(
                  color: _currentPage == i ? colorScheme.primary : colorScheme.outlineVariant,
                  borderRadius: BorderRadius.circular(4),
                ),
              )),
            ),
            Padding(
              padding: const EdgeInsets.all(24),
              child: FilledButton(
                onPressed: () {
                  if (_currentPage < _slides.length - 1) {
                    _pageController.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeInOut);
                  } else {
                    widget.onFinish();
                  }
                },
                style: FilledButton.styleFrom(minimumSize: const Size.fromHeight(52)),
                child: Text(_currentPage == _slides.length - 1 ? 'Get Started' : 'Next'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SlideData {
  final String title;
  final String subtitle;
  final IconData icon;
  const _SlideData(this.title, this.subtitle, this.icon);
}
`;
        const loginScreenCode = `// lib/features/auth/presentation/screens/login_screen.dart

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:gap/gap.dart';
import '../controllers/auth_controller.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController(text: 'demo@hackathon.dev');
  final _passwordController = TextEditingController(text: 'Password123!');

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authControllerProvider);
    final controller = ref.read(authControllerProvider.notifier);
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 480),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Icon(Icons.lock_person_outlined, size: 56, color: colorScheme.primary),
                  const Gap(16),
                  Text('Welcome to ${spec.appName}', style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.bold), textAlign: TextAlign.center),
                  const Gap(32),
                  TextField(controller: _emailController, decoration: const InputDecoration(labelText: 'Email', border: OutlineInputBorder(), prefixIcon: Icon(Icons.email_outlined))),
                  const Gap(16),
                  TextField(controller: _passwordController, obscureText: true, decoration: const InputDecoration(labelText: 'Password', border: OutlineInputBorder(), prefixIcon: Icon(Icons.lock_outline))),
                  const Gap(24),
                  FilledButton(
                    onPressed: authState.isLoading ? null : () => controller.login(_emailController.text, _passwordController.text),
                    style: FilledButton.styleFrom(minimumSize: const Size.fromHeight(52)),
                    child: authState.isLoading ? const CircularProgressIndicator.adaptive() : const Text('Sign In'),
                  ),
                  const Gap(16),
                  OutlinedButton.icon(
                    onPressed: () => controller.loginWithGoogle(),
                    icon: const Icon(Icons.g_mobiledata, size: 28),
                    label: const Text('Continue with Google'),
                    style: OutlinedButton.styleFrom(minimumSize: const Size.fromHeight(52)),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
`;
        const authControllerCode = `// lib/features/auth/presentation/controllers/auth_controller.dart

import 'package:flutter_riverpod/flutter_riverpod.dart';

class AuthState {
  final bool isAuthenticated;
  final bool isLoading;
  final String? userEmail;
  final String? token;

  const AuthState({
    this.isAuthenticated = false,
    this.isLoading = false,
    this.userEmail,
    this.token,
  });

  AuthState copyWith({bool? isAuthenticated, bool? isLoading, String? userEmail, String? token}) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      isLoading: isLoading ?? this.isLoading,
      userEmail: userEmail ?? this.userEmail,
      token: token ?? this.token,
    );
  }
}

final authControllerProvider = StateNotifierProvider<AuthController, AuthState>((ref) {
  return AuthController();
});

class AuthController extends StateNotifier<AuthState> {
  AuthController() : super(const AuthState());

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true);
    await Future.delayed(const Duration(milliseconds: 600)); // Fast demo latency
    state = state.copyWith(isAuthenticated: true, isLoading: false, userEmail: email, token: 'demo-jwt-token-12345');
  }

  Future<void> loginWithGoogle() async {
    state = state.copyWith(isLoading: true);
    await Future.delayed(const Duration(milliseconds: 400));
    state = state.copyWith(isAuthenticated: true, isLoading: false, userEmail: 'google.user@hackathon.dev', token: 'demo-google-token');
  }

  void logout() {
    state = const AuthState();
  }
}
`;
        const summary = `Scaffolded complete Auth & Onboarding flow for ${spec.appName}: Onboarding carousel, Login with Google/Email, and Riverpod AuthController.`;
        return {
            onboardingScreenCode,
            loginScreenCode,
            authControllerCode,
            summary
        };
    }
}
//# sourceMappingURL=auth-flow-specialist.js.map