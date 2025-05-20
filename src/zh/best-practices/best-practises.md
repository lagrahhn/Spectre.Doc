---
title: 最佳实践
icon: object-group
order: 2
category:
  - 指南
tag:
  - 布局
---

# 最佳实践

Spectre.Console 使开发者编写控制台应用程序变得更加容易。它被设计为易于使用且灵活。

## 输出

Spectre.Console 提供了多种输出方法和函数，但它们依赖于用户的控制台来渲染。

许多因素决定了控制台可以渲染的内容：

  * 输出文本的编码。
  * 控制台字体。
  * 控制台窗口大小。
  * 代码页。
  * 终端本身。
  * 控制台的背景颜色。

Spectre.Console 可以自动检测其中的一些项目。而有些项目只能由用户配置，无法自动检测。

Spectre.Console 可以检测以下项目：

  * 输出编码：内置的组件将使用检测到的编码作为备选方案，例如，如果一个 `Table` 被配置为使用圆角边框，但用户的输出编码不支持扩展的 ASCII 字符，则会使用备用字符。
  * 窗口大小：在写入屏幕时，Spectre.Console 会知道写满宽度时的字符数。
  * 大多数终端：Spectre.Console 会尝试检测正在运行的控制台，并匹配其[功能(暂无对应页)](/api/Spectre.Console/Capabilities)。

不能自动检测的项目：

  * 控制台字体：Spectre.Console 将假设用户终端已有一个相对现代且等宽的字体。如果用户的控制台字体不是等宽的，则某些内容的输出(如 `Table`)将是不正确的。支持的字符也可能因字体而异，特别是对于一些现代特性，如 Powerline 字符和 NerdFonts。
  * 背景颜色和配置的前景颜色。

### 输出最佳实践

**应该**在多个终端中测试您的应用程序。在 Windows 上，内置的 `cmd.exe` 和 `Windows Terminal` 都适用于各种功能。

**不应该**在代码中硬编码表情符号和扩展 Unicode 字符作为默认输出字符串。无法保证用户的控制台支持这些字符，而且 Spectre.Console 也无法自动回退。为了确保对各种终端的广泛支持，请允许用户选择是否使用扩展 Unicode 字符，或者根据应用程序类型，允许用户自定义输出并手动配置这些字符。

**不应该**假设用户的背景颜色是黑色。它可以是任何颜色，包括白色。虽然 Spectre.Console 允许您使用多达 24 位的颜色，但不要假设它们在用户的控制台上显示得美观。如果您坚持使用标准的 16 种 ANSI 颜色，Spectre.Console 会让您的终端使用用户终端主题中配置的颜色。如果您使用 8 位或 24 位颜色作为前景文本，建议您也设置适当的背景颜色以匹配。

**应该**在通过 Markup 输出任何用户输入或任何外部数据时，使用 [`Markup.Escape`(暂未有该文档)](/api/Spectre.Console/Markup/e35ae760) 方法对数据进行转义。否则，包含 `[` 或 `]` 的任何用户输入都可能导致渲染时出现运行时错误。

**考虑**用
[`MarkupInterpolated`(未实现)](/api/Spectre.Console/AnsiConsole/e39ddb49) 和 [`MarkupLineInterpolated`(未实现)](/api/Spectre.Console/AnsiConsole/f807e7f9) 替换 `Markup` 和 `MarkupLine`。这两种方法都会自动转义插值字符串中的所有数据。当与 `Table` 和 `Tree` 等组件一起工作时，考虑使用 [`Markup.FromInterpolated`(未实现)](/api/Spectre.Console/Markup/288e31b4) 从插值字符串生成 `IRenderable`。

### 实时渲染最佳实践

Spectre.Console 有多种 [实时渲染功能(未实现)](live) 的组件。这些组件可用于显示在用户控制台上更新和刷新的数据。为此，组件渲染有一个渲染循环，该循环向屏幕写入内容，然后擦除之前的输出再重新写入。

**应该**尽量保持单线程上的渲染逻辑尽可能简单。在实时渲染过程中渲染额外内容可能会导致渲染损坏。

**不应该**同时使用多个实时渲染组件。像前面的提示一样，显示 `Status` 控件和 `Progress` 是不受支持的，并且可能导致渲染错误。

**应该**在 `Start` 方法中创建额外的工作线程，**但是**在主线程上渲染。对于进度条等内容，可以从 `Start` 方法创建多个线程或任务以并发执行。为了确保正确渲染，请确保更新组件的调用是在主线程上完成的。

### 单元测试最佳实践

对于控制台输出的测试，Spectre.Console 有一个可以注入到应用程序中的 [`IAnsiConsole`](/api/Spectre.Console/IAnsiConsole)。[Spectre.Console.Test](https://www.nuget.org/packages/Spectre.Console.Testing/) NuGet 包包含用于捕获控制台输出以进行验证的实用工具。有关进一步指导，请参阅 [单元测试(未实现)](cli/unit-testing) 页面。

### 用于最佳实践的分析器

Spectre.Console 有一个 [分析器](https://www.nuget.org/packages/Spectre.Console.Analyzer)，有助于防止上述编写控制台输出时的一些常见错误，例如同时使用多个实时渲染组件，或在 `IAnsiConsole` 可用时使用静态 `AnsiConsole` 类。

### 原生 AOT 支持

将您的应用程序发布为原生 AOT 与 Spectre.Console 会产生一个自包含的应用程序，并且已经 ahead-of-time(AOT) 编译为原生代码。原生 AOT 应用程序具有更快的启动时间和更小的内存占用。这些应用程序可以在没有安装 .NET 运行时的机器上运行。

要在您的应用程序中启用 AOT 支持，请在项目文件中添加 `<PublishAot>true</PublishAot>`。

```xml
<PropertyGroup>
    <PublishAot>true</PublishAot>
</PropertyGroup>
```

当前 Spectre.Console 对 AOT 的支持：

  * ☑️ Spectre.Console
  * ❌ Spectre.Console.Cli
  * ☑️ Spectre.Console.Json
  * ☑️ Spectre.Console.ImageSharp

Spectre.Console.Cli 依赖于反射并在运行时发现类型，因此目前不支持 AOT。

Spectre.Console 支持 AOT，但有以下限制：

  * `WriteException` 将输出简单的堆栈跟踪，并忽略设置的任何 `ExceptionFormats`。

### 配置 Windows 终端以支持 Unicode 和 Emoji

Windows 终端支持 Unicode 和 Emoji。然而，Powershell 和 cmd.exe 等 shell 不支持。关于这两者的区别，请参见 [What's the difference between a console, a terminal and a shell](https://www.hanselman.com/blog/whats-the-difference-between-a-console-a-terminal-and-a-shell)。

对于 PowerShell，以下命令将启用 Unicode 和 Emoji 支持。您可以将其添加到 `profile.ps1` 文件中：

```powershell
[console]::InputEncoding = [console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
```

对于 cmd.exe，需要执行以下步骤以启用 Unicode 和表情符号支持：

  1. 运行 `intl.cpl`。
  2. 单击“管理”选项卡。
  3. 单击“更改系统区域设置”按钮。
  4. 选中“使用 Unicode UTF-8 以支持全球语言”复选框。
  5. 重启。

您还需要确保您的控制台应用程序配置为使用支持 Unicode 和表情符号的字体，例如 Cascadia Code。


