# 测试说明

本项目使用 Jest 作为测试框架。

## 运行测试

```bash
# 运行所有测试
pnpm test

# 监听模式运行测试
pnpm test:watch

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

## 测试文件

- `closest.test.ts` - 测试 closest 函数的功能
- `delegate.test.ts` - 测试事件委托功能

## 测试环境

- 测试框架：Jest
- 测试环境：jsdom（模拟浏览器环境）
- TypeScript 支持：ts-jest
