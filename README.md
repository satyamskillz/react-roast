# React Roast

A React widget to get feedback

---

## Table of Contents

-   [Purpose](#purpose)
-   [Demo](#demo)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
    -   [Self-host Usage](#self-host-usage)
    -   [Hosted Usage](#hosted-usage)
-   [Examples](#examples)
    -   [Self-Host Example for React](#self-host-example-for-react)
    -   [Self-Host Example for Nextjs](#self-host-example-for-nextjs)
-   [Props](#props)
    -   [Widget Provider Props](#widget-provider-props)
    -   [Widget Customize Props](#widget-customize-props)
    -   [Default Customization](#default-customization)
    -   [Form Data Props](#form-data-props)
-   [Hooks](#hooks)
    -   [useReactRoast](#usereactroast)
-   [Contribution](#contribution)
-   [License](#license)

---

## Purpose

React Roast is an open-source app inspector that allows users to select elements on a webpage, capture their state (including screenshots), and send the details to a desired channel. This tool is useful for UI/UX testing, feedback collection, and debugging user interfaces.

## Demo

**Live Demo:** [RoastNest.com](https://roastnest.com) | [Growati.com](https://growati.com)

![Roastnest Widget Demo](https://github.com/user-attachments/assets/41e555a5-e7b1-47c7-8aba-59fd5065f9eb)

## Features

-   🖱️ Select any element on a webpage
-   📸 Capture element position, size, and a screenshot
-   📝 Collect feedback with customizable forms
-   🔔 Supports notifications and user rewards
-   ⚛️ Supports React-based frameworks like Next.js
-   🏠 Self-host and customize widget appearance and behavior
-   ⚡ Lightweight and easy to integrate
-   🟦 Written in Typescript and built using rollup
-   🌐 Works in both local and remote modes
-   🛠️ Imperative control via `useReactRoast` hook
-   🖼️ Flexible screenshot options: full page or selected element
-   📤 Easily send feedback to your backend or channels (Slack, Discord, etc.)

## Installation

```sh
npm install react-roast
```

or

```sh
yarn add react-roast
```

## Usage

To use React Roast, wrap your application with the `WidgetProvider` component from `react-roast`. Make sure to use the provider on the client side, set the `mode` prop to `local`, and implement the `onFormSubmit` callback to handle form submissions.

### Self-host Usage

1. Install the `react-roast` npm package.
2. Import and wrap your app with the `WidgetProvider` component.
3. Set `mode="local"` and implement the `onFormSubmit` callback to process feedback data.
4. Store feedback data in your preferred backend or database, and return a boolean status.
5. Optionally, use the `customize` prop to adjust the widget’s appearance and behavior.

### Hosted Usage

1. Sign in to [RoastNest](https://roastnest.com).
2. Add your site and obtain a unique `siteId`.
3. Install the `react-roast` npm package.
4. Import and wrap your app with the `WidgetProvider` component.
5. Set `mode="remote"` and provide your `siteId` to connect your site or app.
6. Optionally, use the `customize` prop to tailor the widget for your site.

## Examples

### Self-Host Example for React

```tsx
import WidgetProvider, { FormDataProps } from "react-roast";

export default function App() {
    const handleSubmit = async ({ message, email, screenshotBlobs }: FormDataProps): Promise<boolean> => {
        // Must return boolean value.
        try {
            // Send feedback data to your backend
            // Or send to you channel (e.g., Slack, Discord)
            return true;
        } catch (e) {
            return false;
        }
    };
    return (
        <WidgetProvider mode="local" onFormSubmit={handleSubmit}>
            <Main />
        </WidgetProvider>
    );
}
```

### Self-Host Example for Next.js

```tsx
// app/RoastProvider.tsx

"use client";
import WidgetProvider, { FormDataProps } from "react-roast";
import { ReactNode } from "react";

export default function RoastProvider({ children }: { children: ReactNode }) {
    const handleSubmit = async ({ message, email, screenshotBlobs }: FormDataProps): Promise<boolean> => {
        try {
            // Send feedback data to your backend
            // Or send to you channel (e.g., Slack, Discord)
            return true;
        } catch (e) {
            return false;
        }
    };
    return (
        <WidgetProvider mode="local" onFormSubmit={handleSubmit}>
            {children}
        </WidgetProvider>
    );
}
```

```tsx
// app/layout.tsx

import RoastProvider from "./RoastProvider";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body>
                <RoastProvider>{children}</RoastProvider>
            </body>
        </html>
    );
}
```

## Props

### Widget Provider Props

| Property       | Type                | Description                                                            |
| -------------- | ------------------- | ---------------------------------------------------------------------- |
| `mode`         | `local` or `remote` | Defines if the widget operates locally or remotely                     |
| `children`     | `ReactNode`         | Nested components inside the provider                                  |
| `onFormSubmit` | `function`          | Callback for form submission. Returns a boolean for success/failure.   |
| `customize`    | `object`            | Customization options for widget appearance and behavior. See below.   |
| `siteId`       | `string`            | Optional site identifier, useful for remote mode or multi-site setups. |

### Widget Customize Props

Customize the widget by passing the `customize` prop with these options:

| Property                              | Type      | Description                                                         |
| ------------------------------------- | --------- | ------------------------------------------------------------------- |
| `form.className`                      | `string`  | Custom CSS class for the form container                             |
| `form.errorMessage`                   | `string`  | Error message shown when submission fails                           |
| `form.successMessage`                 | `string`  | Success message shown when submission succeeds                      |
| `form.messageInput.className`         | `string`  | Custom CSS class for the message input field                        |
| `form.messageInput.placeholder`       | `string`  | Placeholder text for the message input field                        |
| `form.submitButton.label`             | `string`  | Label text for the submit button                                    |
| `form.submitButton.className`         | `string`  | Custom CSS class for the submit button                              |
| `form.cancelButton.label`             | `string`  | Label text for the cancel button                                    |
| `form.cancelButton.className`         | `string`  | Custom CSS class for the cancel button                              |
| `island.placement`                    | `string`  | Position of the island button (`left-center`, `right-bottom`, etc.) |
| `island.className`                    | `string`  | Custom CSS class for the island button                              |
| `island.label`                        | `string`  | Label text for the island button                                    |
| `island.switchButton.className`       | `string`  | Custom CSS class for the switch button inside the island            |
| `island.switchButton.thumb.className` | `string`  | Custom CSS class for the thumb of the switch button                 |
| `notifications.enable`                | `boolean` | Enable or disable notifications                                     |
| `notifications.messages`              | `array`   | Array of notification message objects                               |
| `notifications.messages.type`         | `string`  | Type of notification message (`info`, `hint`, `offer`, etc.)        |
| `notifications.messages.message`      | `string`  | Text content of the notification message                            |

**Example usage:**

```tsx
<WidgetProvider
    mode="local"
    onFormSubmit={handleSubmit}
    customize={{
        form: {
            className: "custom-form",
            errorMessage: "Submission failed!",
            successMessage: "Feedback sent!",
            messageInput: {
                className: "custom-input",
                placeholder: "Type your feedback...",
            },
            submitButton: {
                label: "Send",
                className: "custom-submit",
            },
            cancelButton: {
                label: "Cancel",
                className: "custom-cancel",
            },
        },
        island: {
            placement: "right-center",
            className: "custom-island",
            label: "Roast",
            switchButton: {
                className: "custom-switch",
                thumb: {
                    className: "custom-thumb",
                },
            },
        },
        notifications: {
            enable: true,
            messages: [
                { type: "info", message: "Feedback sent!" },
                { type: "hint", message: "Something went wrong." },
            ],
        },
    }}
>
    <Main />
</WidgetProvider>
```

### Default Customization

The widget comes with sensible defaults. You can override any part using the `customize` prop.

```typescript
const defaultCustomize = {
    form: {
        messageInput: {
            placeholder: "Don't be nice, Just Roast!",
        },
        submitButton: { label: "Roast it" },
        cancelButton: { label: "Cancel" },
        errorMessage: "Failed to submit message",
        successMessage: "Message Submitted",
    },
    island: {
        label: "Roast Mode",
        placement: "left-center",
    },
    notifications: {
        enable: true,
        messages: [
            { message: "✨ Feedback help us improve!", type: "info" },
            { message: "👈 Click here to share feedback", type: "hint" },
            { message: "🎁 Give feedback and get discount", type: "offer" },
            { message: "💎 You’ve earned discount! Redeem them now.", type: "reward" },
            { message: "⭐ Users love this feature!", type: "social" },
            { message: "⏰ Last chance! discount ends in 2 days.", type: "urgent" },
        ],
    },
};
```

### Form Data Props

| Property          | Type                | Description                            |
| ----------------- | ------------------- | -------------------------------------- |
| `email`           | `string` (optional) | The user's email address, if provided. |
| `message`         | `string`            | The message input by the user.         |
| `screenshotBlobs` | `ScreenshotBlobs`   | Array of screenshot blobs (see below). |

**ScreenshotBlobs structure:**

```typescript
// ScreenshotBlobs type
Array<{
    blob: Blob;
    type: "full-screenshot" | "selected-screenshot";
}>;
```

-   `blob`: The captured screenshot as a Blob object.
-   `type`: Indicates if the screenshot is of the full page or a selected element.

**Example FormDataProps usage:**

```typescript
interface FormDataProps {
    email?: string;
    message: string;
    screenshotBlobs: ScreenshotBlobs;
}
```

## Hooks

### useReactRoast

The `useReactRoast` hook provides imperative control and utility functions for the widget. Use it inside your components to interact with the widget programmatically.

**Returned values:**

| Property                | Type       | Description                                       |
| ----------------------- | ---------- | ------------------------------------------------- |
| `isWidgetActive`        | `boolean`  | Whether the widget is currently active            |
| `toggleWidget`          | `function` | Toggle the widget's active state                  |
| `avoidElementClassName` | `string`   | CSS class name to exclude elements from selection |
| `setIslandVisiblity`    | `function` | Show or hide the widget island button             |
| `setUser`               | `function` | Set or update the user data                       |

**Usage Example:**

```tsx
import { useReactRoast } from "react-roast";

function WidgetControls() {
    const { isWidgetActive, toggleWidget, setIslandVisiblity, setUser } = useReactRoast();

    return (
        <div>
            <button onClick={toggleWidget}>{isWidgetActive ? "Deactivate" : "Activate"} Widget</button>
            <button onClick={() => setIslandVisiblity(false)}>Hide Island</button>
            <button onClick={() => setUser({ email: "user@example.com" })}>Set User</button>
        </div>
    );
}
```

## Contribution

Contributions are welcome! If you would like to improve React Roast, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make changes and commit them.
4. Submit a pull request.

Please ensure your contributions align with the project’s coding standards and best practices. If you want help, [contact here](https://x.com/satyamskillz)

## License

MIT License.
