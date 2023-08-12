# 项目配置

## 安装 pnpm 使用 pnpm 初始化项目

```
npm install -g pnpm
pnpm init
```

## 使用 pnpm workspace

创建 `pnpm-workspace.yaml`

```yaml
packages:
  - "packages/*"
```

packages 中的的所有文件夹变为工作区

## 开发规范

### 代码规范

#### lint

安装

```
pnpm i eslint -D -w
```

初始化

```
npx eslint --init
```

手动安装需要下载的包
