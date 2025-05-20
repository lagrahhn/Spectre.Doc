---
title: 快速开始
icon: object-group
order: 2
category:
  - 指南
tag:
  - 布局
---

### 快速开始

<!-- The fastest way of getting started using Spectre.Console is to install the NuGet package. -->
安装 `Spectre.Console` 的 NuGet 包。

```
dotnet add package Spectre.Console
dotnet add package Spectre.Console.Cli
```

<!-- After that you will need to reference the `Spectre.Console` and `Spectre.Console.Cli` namespaces. Once that is done, you can start using all the available features. -->
之后，只需要引用 `Spectre.Console` 和 `Spectre.Console.Cli` 命名空间。完成后，你就可以开始使用所有可用的功能。

```c#
using Spectre.Console;

public static class Program
{
    public static void Main(string[] args)
    {
        AnsiConsole.Markup("[underline red]Hello[/] World!");
    }
}
```
