# Contributing to Beej

Thank you for your interest in contributing to `Beej`. We welcome contributions that help improve the project. This document will guide you through the process.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [1. Reporting Issues](#1-reporting-issues)
  - [2. Setting Up the Project](#2-setting-up-the-project)
  - [3. Making Changes](#3-making-changes)
  - [4. Submitting Pull Requests (PRs)](#4-submit-pull-requestsprs)
- [Style Guide](#style-guide)
- [Community Support](#community-support)

---

## Code of Conduct

By participating in this project, you agree to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please respect all contributors and help maintain a welcoming community.

## How to Contribute

### 1. Reporting Issues

If you find a bug, have a feature request, or encounter any documentation errors, please open an issue:

1. Navigate to the **Issues** tab.
2. Click on **New Issue**.
3. Select an appropriate issue template or use **Bug Report** or **Feature Request** labels.
4. Provide a clear and concise description, including steps to reproduce the issue if applicable.

### 2. Setting Up the Project

To start contributing, follow these steps to set up the project locally.

#### Prerequisites

- Node.js (version 18 or higher)
- Git

#### Steps

1. **Fork the Repository**: Click the **Fork** button on the top right to create your own copy of the repository.
2. **Clone Your Fork**: Clone the forked repository to your local machine:
   ```bash
   git clone https://github.com/Thanka-Digital/beej.git
   ```
3. **Navigate to the Project Directory**:

```bash
cd beej
```

4. **Install Dependencies**:

```bash
pnpm install
```

5. **Test run the project**:

```bash
pnpm dev
```

> [!Tip]
>
> When testing the templates we are currently using the `__tests__` folder which is ignored by git as test folder.

### 3. Making Changes

1. **Create a New Branch**: Always create a new branch for your work to keep your changes isolated from the `main` branch

```bash
git checkout -b feature/your-feature-name
```

2. **Make Your Changes**: Edit the code or documentation as needed.
3. **Test Your Changes**: Always test your changes before commiting and pushing.
4. **Commit changes and Push to your forked repo**: Write clear, consice commit messages.

```bash
git add .
git commit -m "feat: description of feature"
```

```bash
git push origin feature/your-feature-name
```

### 4. Submit Pull Requests(PRs)

1. Submit the **PR** to our repo into `dev` branch
2. **Wait for Review**: A maintainer will review your PR and may request changes. Please address andy feeback promptly.

---

## Style Guide

To maintain code consistency, please adhere to the following style guidelines:

- **Naming**: Use clear and descriptive names for variables, functions, and files.
- **Code Formatting**: Follow our code style as enforced by ESLint/Prettier.
- **Comments**: Keep comments relevant and as concise as possible better to write readable code than to comment.

## Community Support

For any questions or help, please reach out in the Discussions section.

> [!Tip]
>
> We are creating a discord server very soon for dicussion and chats

Thank you for your contributions! 🙌
