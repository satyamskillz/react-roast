# React Roast

A React widget to get feedback

## Purpose

React Roast is an open-source app inspector that allows users to select elements on a webpage, capture their state (including screenshots), and send the details to a desired channel. This tool is useful for UI/UX testing, feedback collection, and debugging user interfaces.

### **Demo** — [RoastNest.com](https://roastnest.com)

## Features

✅ Select any element on a webpage\
✅ Capture element position, size, and a screenshot\
✅ Supports React-based frameworks like Next.js\
✅ Supports self-host and customization\
✅ Lightweight and easy to integrate\
✅ Written in Typescript and build using rollup

## Installation

```sh npm
npm install react-roast
```

or

```sh yarn
yarn add react-roast
```

## Local Usage

Wrap your app with `WidgetProvider` provided by `react-roast`. The provider should be in client side and mode should be set to `local` and onFormSubmit should be defined.

### React Example

```tsx
import WidgetProvider, { FormDataProps } from "react-roast";

export default function App() {
	const handleSubmit = async ({ message, screenshot }: FormDataProps): Promise<boolean> => {
		// Must return boolean value.

		try {
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

### NextJS App Example

```tsx
"use client";

import WidgetProvider, { FormDataProps } from "react-roast";
import { ReactNode } from "react";

export default function ReactRoastProvider({ children: ReactNode }) {
	const handleSubmit = async ({ message, screenshot }: FormDataProps): Promise<boolean> => {
		// Must return boolean value.

		try {
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

In app/layout.tsx

```tsx
export default function RootLayout({ children }) {
	return (
		<html>
			<ReactRoastProvider>
				<body>{children}</body>
			</ReactRoastProvider>
		</html>
	);
}
```

## Widget Props

### Widget Provider Props

| Property       | Type                | Description                                        |
| -------------- | ------------------- | -------------------------------------------------- |
| `mode`         | `local` or `remote` | Defines if the widget operates locally or remotely |
| `children`     | `ReactNode`         | Nested components inside the provider              |
| `disable`      | `boolean`           | Disable the widget                                 |
| `onFormSubmit` | `function`          | Callback function for form submission              |
| `customize`    | `object`            | Customization options                              |

### Widget Customize Props

You can customize the widget by passing `customize` props with the following options:

| Property                        | Type              | Description                          |
| ------------------------------- | ----------------- | ------------------------------------ |
| `form.className`                | `string`          | Custom class for the form            |
| `form.messageInput.placeholder` | `string`          | Placeholder text for message input   |
| `form.submitButton.label`       | `string`          | Label for submit button              |
| `form.cancelButton.label`       | `string`          | Label for cancel button              |
| `island.direction`              | `left` or `right` | Position of the floating button      |
| `island.className`              | `string`          | Custom class for the floating button |
| `island.label`                  | `string`          | Label for the floating button        |

### Form Data Props

| Property     | Type     | Description                                      |
| ------------ | -------- | ------------------------------------------------ |
| `message`    | `string` | The message input by the user.                   |
| `screenshot` | `Blob`   | The captured screenshot of the selected element. |

## Contribution

Contributions are welcome! If you would like to improve react roast, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make changes and commit them.
4. Submit a pull request.

Please ensure your contributions align with the project’s coding standards and best practices. If You want help, [contact here](https://x.com/satyamskillz)

## License

MIT License.
