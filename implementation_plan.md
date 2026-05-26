# Implementation Plan - Unit Testing for My Tel-U Mobile

This plan outlines the creation of unit tests for four key modules in the My Tel-U mobile application to ensure reliability, especially after recent migrations and bug fixes.

## User Review Required

> [!IMPORTANT]
> The "Core Module (Encryption Mechanism)" mentioned in the request (for SSO password and Auth Token) seems to be missing its implementation in the current codebase, or it's partially implemented as `decryptDirectory` and `encryptData` (for KTM). I will create a dedicated `EncryptionHelper` in `lib/core/utils/helper/` to handle sensitive data encryption/decryption as requested, and then test it.

## Proposed Changes

### 1. Core Module (Encryption Mechanism)
We will implement and test a robust encryption/decryption mechanism using AES (from the `encrypt` package) to secure sensitive data like SSO passwords and Auth Tokens.

#### [NEW] [encryption_helper.dart](file:///d:/Codes/FlutterProjects/my-telu-mobile-flutter/lib/core/utils/helper/encryption_helper.dart)
- Implement `encryptString` and `decryptString` using AES-CBC or AES-CTR.
- Use keys from `Env`.

#### [NEW] [encryption_helper_test.dart](file:///d:/Codes/FlutterProjects/my-telu-mobile-flutter/test/core/utils/helper/encryption_helper_test.dart)
- Test consistency: `decrypt(encrypt(text)) == text`.
- Test with different sensitive data strings.

---

### 2. Check-in Module (Logika Perjalanan Dinas)
We will test the `CheckinBloc` to ensure that "Perjalanan Dinas" inputs correctly update the state and include the necessary business trip data.

#### [NEW] [checkin_bloc_test.dart](file:///d:/Codes/FlutterProjects/my-telu-mobile-flutter/test/features/checkin_employee/presentation/bloc/checkin_bloc_test.dart)
- Mock `PostCheckInUseCase` and `PutCheckinUsecase`.
- Test `PostCheckinEvent` with `CheckinCategoryEnum.perjalananDinas`.
- Verify the `CheckinSucceed` state contains the expected data.

---

### 3. Student Grade Module (Parsing Data Akademik)
We will test the `TakAndIkkModel` to ensure it correctly parses JSON data from the API, especially handling potential nulls or performance-optimized response formats.

#### [NEW] [tak_ikk_model_test.dart](file:///d:/Codes/FlutterProjects/my-telu-mobile-flutter/test/features/student_grade/data/models/tak_ikk_model_test.dart)
- Test `TakAndIkkModel.fromJson` with valid JSON.
- Test with missing fields or null values (ensuring default '0' values).
- Test with numeric values (ensuring they are converted to strings).

---

### 4. Modul KTM Digital (Logika Status Pengguna)
We will test the `KtmCubit` to ensure the logic for determining 'Alumni' vs 'Mahasiswa' status is correct based on the user's SSO roles.

#### [NEW] [ktm_cubit_test.dart](file:///d:/Codes/FlutterProjects/my-telu-mobile-flutter/test/features/ktm/presentation/cubit/ktm_cubit_test.dart)
- Test `encodeKtmData` with a user having a single role (e.g., 'Mahasiswa').
- Test `encodeKtmData` with a user having multiple roles (e.g., 'Mahasiswa' and 'Alumni').
- Verify the emitted `KtmState` has the correct `status` label.

## Verification Plan

### Automated Tests
- Run all newly created tests using:
  ```bash
  flutter test test/core/utils/helper/encryption_helper_test.dart
  flutter test test/features/checkin_employee/presentation/bloc/checkin_bloc_test.dart
  flutter test test/features/student_grade/data/models/tak_ikk_model_test.dart
  flutter test test/features/ktm/presentation/cubit/ktm_cubit_test.dart
  ```
- Run all tests in the project to ensure no regressions:
  ```bash
  flutter test
  ```

### Manual Verification
- None required as this task is purely for unit testing.
