# Engineering Guidelines & Code Quality Rules: PulseFit

## 1. Architectural Constraints
1. **Zero Business Logic in UI**: Widgets must only render UI and dispatch events. All logic resides in Controllers/Notifiers.
2. **Immutability First**: State objects must be immutable. Never mutate state variables directly.
3. **No Forced Glassmorphism**: Use clean Material 3 solid surfaces with tonal elevation (`surfaceContainer`). Only apply frosted glass/blur if explicitly specified in feature tickets.
4. **8-Point Spatial Rhythm**: Margin and padding must follow 8-pt increments (8, 16, 24, 32dp).

## 2. Security & Error Handling
1. **No Hardcoded Secrets**: Secrets must be loaded via compile-time environment configs or secure remote endpoints.
2. **Secure Token Storage**: Use `flutter_secure_storage` backed by Android EncryptedSharedPreferences & iOS Keychain.
3. **Resource Disposal**: Always dispose `TextEditingController`, `AnimationController`, and streams in `dispose()` or Riverpod `ref.onDispose()`.

## 3. Testing Standards
- Unit test all business logic repositories with `mocktail`.
- Widget test critical user paths using `testWidgets` and `pumpAndSettle`.
