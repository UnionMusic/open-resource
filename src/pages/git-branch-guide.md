---
layout: post
title: 代码分支管理指南
category: guide
date: 2020-04-14
lang: zh
pageOrder: 10
---


## 说明

这是 UnionMusic 开发团队约定和遵循的 Git 分支管理规范，意在规范开发团队的工作流程，

## 版本

版本号 **应该「SHOULD」** 符合 [语义化版本] 规范，其形式为 `{major}.{minor}.{patch}[-{pre-release-type}.{pre-release}]`

其中 `major`、`minor`、`patch` 和 `{pre-release}` **必须「MUST」** 为十进制数字，且随版本发布递增。

`{pre-release-type}` **必须「MUST」** 选择以下关键词之一：

* `alpha` 表示内部测试版本，不建议任何非参与开发人员所在团队使用，在 `alpha` 版本期间会不断增加新的功能并修复已有 BUG
* `beta` 表示公开测试版本，不建议稳定项目使用，在 `beta` 版本期间会酌情增加新功能，修复已知 BUG
* `rc` 表示候选发布版本，推荐各项目使用，在 `rc` 期间不得增加任何新功能，仅修复 BUG。如果 `rc` 版本未发现任何 BUG，则此版本直接转为正式发布版

## 分支

我们的 repo 仅有 main 与 release 分支。

main 对应目前的开发分支，所有的 pull request 都应该发到这个分支。

release 是当前发布的分支，在这个分支只能增加从 main cherry-pick 过来的 commit。详见本文后面的说明。

## 发布流程

* 确保所有要发布的 pull request 都已经 merge 到 main；
* 使用 main branch 的代码进行测试，如果发现 bug，把对应的 bugfix merge 到 main；
* 删除旧的 release branch，并从当前的 main 创建新的 release branch；
* 在 GitHub 上从 release branch 发起新的 build 并发布；
* 发布完成后在当前的 release branch 打上对应版本的 tag。

## Bugfix 流程

这里的 bugfix 指的是修复已经发布的程序（release branch）中的缺陷。main 里的 bug **应该「SHOULD」** 直接 merge bugfix 到 main。

* 如果此缺陷在 main 中还存在，**应该「SHOULD」** 先 merge bugfix 到 main，否则跳到下一步；
* 在 release branch 从 main cherry-pick 修复该缺陷的一个或多个 commit；
* 在 GitHub 上发布当前 release branch；
* 发布完成后在当前的 release branch 打上递增的 tag。

## 其他

* 并不是每个 bug 都有专门发布 bugfix 版的必要，对于不紧急的 bug，**可以「MAY」** 在 main 里 fix 后随下一个版本发布。