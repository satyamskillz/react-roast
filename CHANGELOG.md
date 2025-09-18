# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2025-09-18

### Added

-   Added `CHANGELOG.md` to document project updates and version history.

### Changed

-   Updated README to enhance examples and clarify self-host and hosted usage instructions.
-   Enhanced README with additional sections and examples for better clarity.

### Fixed

-   Clear previous screenshots before taking new ones in `takeScreenshot` function.
-   Update click handling to ignore specified class names and switch to pointerdown event.
-   Add `avoidElementClassName` to WidgetButton and WidgetPopper for improved styling.
-   Update console and debugger drop settings to respect production environment.
-   Reset all states on toggle and update cursor style for better user interaction.

## [1.4.0] - 2025-07-31

### Added

-   Email input and validation to WidgetForm.
-   User data management in context and hooks.
-   PersonManager for session storage.
-   Notification component with customizable messages and styles.

### Changed

-   Enhanced submitRoastToDB and sendRoast methods to include user data.

### Fixed

-   Added missing name prop to Textarea and adjusted padding.

## [1.3.4] - 2025-06-30

### Fixed

-   Enhanced screenshot functionality to ignore specified elements.

## [1.3.3] - 2025-06-27

### Fixed

-   Made handleClick asynchronous to await screenshot capture.

## [1.3.2] - 2025-06-24

### Fixed

-   Adjusted padding-left for WidgetButton component.

## [1.3.1] - 2025-06-24

### Fixed

-   Minor bug fixes and improvements.

## [1.3.0] - 2025-06-24

### Added

-   IslandHidden state for visibility control.
-   ToastProvider and ToastContext for customizable toast notifications.
-   AutoGrowTextarea for dynamic message input.
-   getBackgroundColor utility function.

### Changed

-   Refactored WidgetButton, WidgetProvider, ToastProvider, WidgetForm, and types for clarity and flexibility.

## [1.2.0] - 2025-06-05

### Added

-   New dependencies: clsx, react-device-detect, react-hot-toast.
-   Toaster for notifications.
-   ApiInstance for image upload and roast submission.

### Changed

-   Enhanced WidgetForm component and loading state management.
-   Improved className handling and styling consistency.

## [1.1.0] - 2025-03-19

### Added

-   Hook for custom button.
-   Support for modern colors.

### Changed

-   Replaced setActive with toggleActive in WidgetButton.

## [1.0.5] - 2025-03-02

### Fixed

-   Corrected line break syntax in README.md.

## [1.0.4] - 2025-02-25

### Added

-   PeerDependencies for react and react-dom in package.json.

## [1.0.3] - 2025-02-21

### Changed

-   Updated .gitignore and .npmignore.
-   Enhanced Rollup configuration for production builds.

## [1.0.2] - 2025-02-20

### Added

-   Additional demo link in README.

### Changed

-   Improved code comments.

## [1.0.0] - Initial Release

### Added

-   Initial stable release.
