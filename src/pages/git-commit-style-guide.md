---
layout: post
title: Git Commit 风格指南
category: guide
date: 2020-04-14
lang: zh
pageOrder: 10
---


## 说明

我们的所有项目都使用 Git 做版本管理，本文档用于规范我们的 commit 风格。主要内容参考了 Conventional Commits 和 Angular Contributing Guide，按照我们的情况进行了增删。

## Commit

* Commit message 都 **应该「SHOULD」** 包括三个部分：Header，Body 和 Footer。
* 每个 Commit **应该「SHOULD」** 只包含一个简单的逻辑改动，**不应该「SHOULD NOT」** 在一个 Commit 里包含多个逻辑改动。
* 比如，一个 Commit 修复了一个 Bug，又优化了一个特性的性能，就 **应该「SHOULD」** 将其拆分。
* 但 **不应该「SHOULD NOT」** 将一个逻辑改动拆分 Commit。例如一个功能的实现及其对应的测试 **应该「SHOULD」** 一并 Commit。
* Commit **应该「SHOULD」** 尽早、尽快 Push。出问题时，短小、完整的提交更容易发现并修正。
* **不应该「SHOULD NOT」** 每 Commit 一次就 Push 一次，多积攒几个 Commit 后一次性 Push，这样可以避免在进行一次 Push 后发现代码中还有小错误。
* Commit 的所有内容都使用 ASCII 字符，**不允许「MUST NOT」** 使用中文或者 emoji，这样最大化兼容性，也便于程序处理。

### 格式

每次提交，Commit message 都 **应该「SHOULD」** 包括三个部分：Header，Body 和 Footer。

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是 **必须「MUST」** 的，Body 和 Footer **可以「MAY」** 省略。

不管是哪一个部分，任何一行都 **不允许「MUST NOT」** 超过72个字符（或100个字符）。这是为了避免自动换行影响美观。

下面是一个完整的示例：

```
feat(auth): increase length of new API key

the length is increased from 24 to 32 for new API keys

close #12
```

### 各部分说明

#### Header

Header 部分只有一行，包括三个字段：type **必须「MUST」** 、scope **可选「OPTIONAL」** 和 subject **必须「MUST」**。

以下为可用的 commit type 及意义。

| type       | 说明                                                                          |
|------------|-------------------------------------------------------------------------------|
| `feat`     | feature - 所有实现新功能、新行为的 commit 都属这个类型                        |
| `fix`      | 修正缺陷的 commit                                                             |
| `chore`    | 日常维护性的改动，例如 linter 的配置、依赖变更等                                   |
| `test`     | 与测试有关的改动                                                              |
| `refactor` | 不改变行为的对代码结构的改进                                                  |
| `style`    | 对代码风格的修正（仅限缩进、空行一类的简单改动，对结构有影响的用 `refactor`） |
| `cosm`     | cosmetic - 不改变行为的对界面的纯视觉上的改动                                 |
| `docs`     | 对文档的改进，包括对外文档和代码注释                                          |
| `build`    | 和构建流程、持续集成等有关的改动                                              |

`docs` 是指针对其他项目成员的注释和文档。如果这个项目就是文档性质的，比如静态博客、SDK 文档，那么新增针对外部用户的内容就应该算是 feature，使用 `feat`。

- scope
  - scope 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
- subject
  - subject 是 commit 目的的简短描述，不超过 50 个字符。
  - 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
  - 第一个字母小写
  - 结尾不加句号（.）

#### Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例。

```
More detailed explanatory text, if necessary.  Wrap it to
about 72 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

有两个注意点。

1. 使用第一人称现在时，比如使用 change 而不是 changed 或 changes。
2. 应该说明代码变动的动机，以及与以前行为的对比。

#### Footer

Footer 部分只用于两种情况。

##### 不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以 `BREAKING CHANGE` 开头，后面是对变动的描述、以及变动理由和迁移方法。

```
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

##### 关闭 Issue

如果当前 commit 针对某个 issue，那么可以在 Footer 部分关闭这个 issue 。

```
Closes #234
```

也可以一次关闭多个 issue 。

```
Closes #123, #245, #992
```

##### Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以 `revert:` 开头，后面跟着被撤销 Commit 的 Header。

```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

Body部分的格式是固定的，必须写成 `This reverts commit <hash>.`，其中的 `hash` 是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个 release 里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的 `Reverts` 小标题下面。

使用 VSCode 的用户可以参考「[如何使用 Visual Studio Code 作为 Git 的默认编辑器][]」(中文参考：[1](https://cstsinghua.github.io/2016/11/17/Git%E5%91%BD%E4%BB%A4%E4%BD%BF%E7%94%A8%E9%81%87%E5%88%B0%E7%9A%84%E9%82%A3%E4%BA%9B%E5%9D%91/),[2](https://www.w3xue.com/exp/article/201811/8984.html)) 和 「[设置 commit message 模版][]」(中文参考：[1](https://gist.github.com/jmaxhu/8e7fb69a7dcec1b9b953#gistcomment-1721035))来提高 `git commit` 体验。

#### Template

为了方便与提高 commit 效率，你可以下载 [git-commit-template](https://github.com/unionmusic/open-resource/raw/main/static/git-commit-template.txt) 到本地

然后执行下面的命令:

```sh
git config --global commit.template your-path/.git-commit-template.txt
```

应用到 Git, 这样每次执行 `git commit` 命令就会显示 template

#### Tools

或者你可以使用 [commitizen](https://github.com/commitizen/cz-cli) 来格式化你的 git commit message

可参考:

* [用工具思路来规范化 git commit message](https://github.com/pigcan/blog/issues/15)

## 忽略特殊文件

有些时候，我们必须把某些文件放到 Git 工作目录中，但又不能提交它们，比如保存了数据库密码的配置文件或私有密钥。

所以我们 **必须「MUST」** 在 Git 工作区的根目录下创建一个 `.gitignore` 文件，然后把要忽略的文件名填进去，Git 就会自动忽略这些文件。

不过我们不需要从头写 `.gitignore` 文件，GitHub 已经为我们准备了各种配置文件，只需要组合一下就可以使用。

所有配置文件可以直接在线浏览：[github/gitignore][]

使用 VSCode 的用户可以安装 [gitignore-generator][]

忽略文件的原则是：

1. **必须「MUST」** 忽略操作系统自动生成的文件，比如缩略图等；
2. **必须「MUST」** 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的 `.class` 文件；
3. **必须「MUST」** 忽略带有敏感信息的配置文件，比如存放口令/密码的配置文件。

[语义化版本]: https://semver.org/lang/zh-CN/
[如何使用 Visual Studio Code 作为 Git 的默认编辑器]: https://stackoverflow.com/a/36644561/9930299
[设置 commit message 模版]: https://codeinthehole.com/tips/a-useful-template-for-commit-messages/
[github/gitignore]: https://github.com/github/gitignore
[gitignore-generator]: https://marketplace.visualstudio.com/items?itemName=piotrpalarz.vscode-gitignore-generator