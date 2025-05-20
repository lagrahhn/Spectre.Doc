---
title: Quick Start
icon: object-group
order: 2
category:
  - 指南
tag:
  - 布局
---
### Quick Start

The fastest way of getting started using `Spectre.Console` is to install the NuGet package.

```
dotnet add package Spectre.Console
dotnet add package Spectre.Console.Cli
```

After that you will need to reference the `Spectre.Console` and `Spectre.Console.Cli` namespaces. Once that is done, you can start using all the available features.

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