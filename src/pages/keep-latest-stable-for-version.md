---
layout: post
title: 保持使用最新的稳定版本
lang: zh
category: management
pageOrder: 5
---


## 前言

我们以往（2019 年以前）的项目与基建，由于多方面但管理不完善，导致后续维护几乎无法进行，这些项目与基建到现在仍然保持启动时的依赖。我们在 2019 年中改变了这一状态，我们开始使用 LTS 版本，这提高了可维护性。

但我们在实践中发现 LTS 版本升级也是一个很麻烦的事情。比如我们有一个项目启动时使用的是 Laravel 5.5，不到半年，Laravel 6 发布了，我们在升级到 6.0 版本的时候遇到了很多问题，花费了近 3 天的时间进行升级。我们认识到 LTS 版本升级花费了太多的时间与精力，而我们应该把时间与精力用在更有价值的事情上。

## 改变

我们在放弃以往选用 LTS 版本的策略，要求 Infra 团队提供最新的稳定版本的系统与软件，要求业务开发团队使用最新的依赖包，让升级成为日常，来避免跨大版本升级。

在基础设施上我们使用 Terraform / Ansible 来解决系统与软件的升级问题，在项目开发中，我们使用 Dependabot 来管理项目的依赖升级，每周扫描一次。

## 更多

作出改变之后，我们再也不需要在升级的时候花费过多的时间与精力，依赖升级如同常规的 PR Review，配合 CI/CD 只需要花个几分钟就可以处理完毕。