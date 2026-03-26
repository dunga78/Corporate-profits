# 企业利润与税费计算器 - 本地运行指南

这是一个使用 React 和 Vite 构建的现代 Web 应用程序。由于它依赖于模块化 JavaScript 和资源加载，**直接双击 `index.html` 文件是无法运行的**。

请按照以下步骤在您的本地电脑上运行此程序：

### 1. 安装环境
确保您的电脑上安装了 [Node.js](https://nodejs.org/)（建议安装 LTS 版本）。

### 2. 安装依赖
打开终端（Windows 的 PowerShell 或 CMD，Mac 的 Terminal），进入项目根目录，运行以下命令：

```bash
npm install
```

### 3. 启动程序
运行以下命令启动本地开发服务器：

```bash
npm run dev
```

### 4. 访问页面
启动成功后，终端会显示一个地址（通常是 `http://localhost:3000`）。在浏览器中打开该地址即可看到计算器。

---

### 为什么不能直接打开 index.html？
现代前端框架（如 React）使用 ES Modules 和构建工具。浏览器出于安全考虑（CORS 策略），不允许直接从本地文件系统（`file://` 协议）加载这些模块。必须通过一个本地服务器（`http://` 协议）来提供服务。
