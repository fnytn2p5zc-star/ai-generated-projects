import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const NOTE_UPDATES = [
  {
    id: 'cml9s5ecb003gt4xi8xbnoasr', // MLOps - MLOps 全景
    content: `## MLOps 全景 — 从实验到生产

MLOps 是将 ML 模型从实验环境可靠地部署到生产环境的工程实践。它结合了 DevOps 的理念和 ML 特有的挑战。

### ML 生命周期

\`\`\`
       ┌─────── 反馈循环 ────────┐
       ↓                         ↑
数据收集 → 数据处理 → 特征工程 → 训练 → 评估 → 部署 → 监控
                      ↑                            ↓
                      └──────── 重新训练 ←─────────┘
\`\`\`

### 实验管理与追踪

\`\`\`
需要追踪的内容:
  - 代码版本 (git commit)
  - 数据版本 (数据集 hash)
  - 超参数
  - 指标 (训练/验证/测试)
  - 模型 artifacts
  - 环境 (依赖版本)

工具对比:

| 工具 | 类型 | 特点 |
|------|------|------|
| MLflow | 开源 | 模型注册，本地/远程部署 |
| Weights & Biases | SaaS | 可视化强，团队协作 |
| Neptune.ai | SaaS | 企业级，元数据管理 |
| DVC | 开源 | 数据版本控制，Git-like |
| Kubeflow | 开源 | K8s 原生，流水线 |

MLflow 示例:
  import mlflow
  with mlflow.start_run():
      mlflow.log_param("lr", 0.001)
      mlflow.log_metric("accuracy", 0.95)
      mlflow.sklearn.log_model(model, "model")
\`\`\`

### 模型部署方式

\`\`\`
1. REST API (Flask/FastAPI)
   最通用，适合大多数场景
   延迟: 中等 (10-100ms)

   from fastapi import FastAPI
   app = FastAPI()
   @app.post("/predict")
   def predict(data: Input):
       return model.predict(data)

2. gRPC (Triton Inference Server)
   高性能，低延迟
   延迟: 低 (<10ms)
   支持批处理、动态批处理

3. Serverless (AWS Lambda, Cloud Functions)
   按需付费，自动扩展
   冷启动问题 (数秒延迟)
   适合低频调用

4. Edge 部署 (ONNX, TFLite, Core ML)
   设备端推理，无网络延迟
   隐私保护
   需要模型压缩/量化

5. 批处理 (Spark, Airflow)
   定时任务，处理大量数据
   不需要实时响应
\`\`\`

### 推理优化技术

\`\`\`
1. 量化 (Quantization)
   FP32 → FP16: 2x 内存减少，通常无精度损失
   FP16 → INT8: 再 2x 减少，轻微精度损失
   INT8 → INT4: 适合 LLM，需要特殊技术

   工具: TensorRT, ONNX Runtime, bitsandbytes

2. 剪枝 (Pruning)
   移除不重要的权重/神经元
   结构化剪枝 vs 非结构化剪枝
   可能需要重新训练

3. 知识蒸馏 (Distillation)
   大模型 (Teacher) → 小模型 (Student)
   Student 学习 Teacher 的软标签
   例: DistilBERT 比 BERT 小 40%，保留 97% 性能

4. 算子融合 (Operator Fusion)
   合并连续计算，减少内存访问
   例: Conv + BN + ReLU → 单个融合算子

5. KV Cache (LLM 特有)
   缓存注意力计算
   自回归生成时避免重复计算
\`\`\`

### 推理引擎对比

| 引擎 | 场景 | 特点 |
|------|------|------|
| TensorRT | NVIDIA GPU | 最快，需要 NVIDIA |
| vLLM | LLM 推理 | PagedAttention，高吞吐 |
| llama.cpp | CPU/边缘 | 纯 C++，跨平台 |
| ONNX Runtime | 通用 | 跨框架，多后端 |
| Triton | 生产服务 | 动态批处理，多模型 |

### 监控与可观测性

\`\`\`
需要监控的指标:

系统指标:
  - 延迟 (p50, p95, p99)
  - 吞吐量 (QPS)
  - 错误率
  - GPU/CPU 利用率
  - 内存使用

模型指标:
  - 预测分布漂移
  - 特征分布漂移
  - 准确率/业务指标

数据漂移检测:
  - KS 检验 (连续变量)
  - 卡方检验 (离散变量)
  - PSI (Population Stability Index)

告警:
  - 延迟超过阈值
  - 错误率上升
  - 数据漂移超过阈值
  → 触发重新训练流水线
\`\`\``,
  },
  {
    id: 'cml9s5ecc003lt4xigp3m2jmf', // RAG - RAG 架构与优化
    content: `## RAG 系统深度指南

RAG (Retrieval-Augmented Generation) 通过检索外部知识来增强 LLM 的生成能力，解决知识过时和幻觉问题。

### 基础架构

\`\`\`
Naive RAG 流程:

1. 索引 (Indexing):
   文档 → 分块 → Embedding → 存入向量库

2. 检索 (Retrieval):
   查询 → Embedding → 向量搜索 → Top-K 文档

3. 生成 (Generation):
   [系统提示 + 检索到的文档 + 用户问题] → LLM → 回答

Prompt 模板:
  """
  基于以下上下文回答问题。如果上下文中没有答案，请说不知道。

  上下文:
  {retrieved_documents}

  问题: {question}
  """
\`\`\`

### 文档分块策略

\`\`\`
1. 固定大小分块
   chunk_size = 512 tokens
   overlap = 50-100 tokens
   简单，但可能切断语义

2. 按结构分块
   按段落、章节、标题分割
   保持语义完整
   大小不均

3. 递归分割
   先按大结构分，再按小结构分
   LangChain RecursiveCharacterTextSplitter:
     separators = ["\\n\\n", "\\n", " ", ""]

4. 语义分块
   用嵌入模型检测语义边界
   当相邻句子相似度低于阈值时分割
   计算成本高

最佳实践:
  - chunk_size: 256-1024 tokens
  - overlap: 10-20%
  - 针对内容类型调整
\`\`\`

### 向量检索详解

**Embedding 模型选择**:
\`\`\`
开源模型:
  - BGE (BAAI): 中文最佳
  - E5 (Microsoft): 多语言支持
  - GTE (Alibaba): 平衡性能

商业 API:
  - OpenAI text-embedding-3-large
  - Cohere embed-v3
  - Voyage AI

评估: MTEB 基准 (Massive Text Embedding Benchmark)
\`\`\`

**向量索引类型**:
\`\`\`
| 索引 | 时间复杂度 | 空间 | 精度 | 场景 |
|------|-----------|------|------|------|
| Flat | O(n) | 1x | 100% | n < 10K |
| IVF | O(√n) | 1x | 95-99% | 10K-1M |
| HNSW | O(log n) | 1.5x | 99%+ | 任意规模 |
| PQ | O(n/压缩率) | 0.1x | 90-95% | 内存受限 |

常用组合:
  IVF + PQ: 内存效率 + 速度
  HNSW + PQ: 高召回 + 压缩
\`\`\`

### Advanced RAG 技术

**1. 查询改写 (Query Rewriting)**:
\`\`\`
用 LLM 改写用户查询，提高检索效果

原始: "Python 怎么并发"
改写: "Python 并发编程方法 threading asyncio multiprocessing"

Multi-Query:
  生成多个查询变体，合并检索结果
\`\`\`

**2. HyDE (Hypothetical Document Embedding)**:
\`\`\`
先让 LLM 生成假设性答案，用它来检索

流程:
  Query → LLM 生成假设答案 → Embed 答案 → 检索

原理:
  假设答案的嵌入更接近真实答案文档
  比直接用 query 效果更好
\`\`\`

**3. 重排序 (Reranking)**:
\`\`\`
对 Top-K 结果用 Cross-Encoder 重排

Bi-Encoder (向量检索):
  分别编码 query 和 doc，计算余弦相似度
  快速，但语义交互有限

Cross-Encoder (重排序):
  [query, doc] 一起编码
  更准确，但慢
  通常对 Top-20~50 重排

工具: Cohere Rerank, BGE Reranker
\`\`\`

**4. 多路召回**:
\`\`\`
结合多种检索方式:
  - 向量检索: 语义相似
  - 关键词检索 (BM25): 精确匹配
  - 知识图谱: 结构化知识

混合检索 (Hybrid Search):
  score = α * vector_score + (1-α) * bm25_score
  α 通常 0.5-0.7
\`\`\`

**5. Self-RAG**:
\`\`\`
模型自主决定:
  - 是否需要检索
  - 检索结果是否相关
  - 回答是否得到支持

输出特殊 token:
  [Retrieve]: Yes/No
  [Relevant]: Yes/No
  [Supported]: Fully/Partially/No

减少不必要的检索，提高质量
\`\`\`

### 向量数据库选型

| 数据库 | 类型 | 特点 | 适用 |
|--------|------|------|------|
| Pinecone | 托管 | 开箱即用，自动扩展 | 快速上手 |
| Milvus | 开源 | 功能全面，大规模 | 生产环境 |
| Weaviate | 开源 | 多模态，GraphQL | 复杂查询 |
| Chroma | 开源 | 轻量，嵌入式 | 本地开发 |
| Qdrant | 开源 | 高性能，过滤友好 | 生产环境 |
| pgvector | PG 扩展 | 已有 PG 集成 | 简单场景 |

### 评估 RAG 系统

\`\`\`
检索评估:
  - Recall@K: Top-K 中相关文档的比例
  - MRR: 第一个相关文档的排名倒数
  - NDCG: 考虑位置的相关性

生成评估:
  - 忠实度 (Faithfulness): 答案是否基于上下文
  - 相关性 (Relevance): 答案是否回答问题
  - 幻觉率: 生成不在上下文中的内容

评估框架:
  - RAGAS: 自动评估 RAG 质量
  - Trulens: 可观测性 + 评估
\`\`\``,
  },
  {
    id: 'cml9s5ecd003qt4xijbguygtt', // Distributed Training - 分布式训练全景
    content: `## 分布式训练深度指南

训练大模型需要跨多个 GPU 甚至多台机器，分布式训练技术是突破单卡限制的关键。

### 为什么需要分布式

\`\`\`
单卡限制:
  - 内存: A100 80GB，但 70B 模型需要 ~140GB (FP16 + Adam)
  - 速度: 单卡训练 GPT-3 需要 355 年

分布式目标:
  - 突破内存限制
  - 加速训练
  - 提高吞吐量
\`\`\`

### 数据并行 (Data Parallelism)

\`\`\`
最简单的分布式策略:

原理:
  每个 GPU 持有完整模型副本
  不同 GPU 处理不同 mini-batch
  梯度 AllReduce 同步后更新

PyTorch DDP:
  model = DDP(model, device_ids=[rank])
  # 自动处理梯度同步

通信模式:
  Ring-AllReduce: 带宽利用率高
  每个 GPU 发送 + 接收 2 * (N-1) / N 的数据
  N 是 GPU 数量

问题:
  模型必须能放进单卡
  → 大模型不适用
\`\`\`

### 模型并行

**张量并行 (Tensor Parallelism)**:
\`\`\`
将单个层的权重切分到多个 GPU

线性层示例:
  Y = XA
  A = [A1, A2]  (列切分)
  Y = [XA1, XA2]  各 GPU 分别计算

Attention 切分:
  按 head 切分，每个 GPU 计算部分 head
  最后 AllReduce

通信:
  每层前向 + 反向各需要 AllReduce
  通信量 = O(batch × hidden_dim)
  适合单机多卡 (NVLink 高带宽)

工具: Megatron-LM
\`\`\`

**流水线并行 (Pipeline Parallelism)**:
\`\`\`
将模型的不同层分配到不同 GPU

简单切分:
  GPU 0: Layer 0-11
  GPU 1: Layer 12-23
  GPU 2: Layer 24-35
  GPU 3: Layer 36-47

问题: 流水线气泡
  当 GPU 0 在计算时，GPU 1-3 空闲
  利用率 = 1/N (N 是 pipeline 阶段数)

解决: 微批次 (Micro-batching)
  将 batch 分成多个 micro-batch
  流水线式处理，减少气泡

GPipe: 同步流水线
1F1B: 交错前向/反向，内存更优

通信:
  只在阶段边界通信
  适合跨机器 (带宽需求低)
\`\`\`

### ZeRO (Zero Redundancy Optimizer)

\`\`\`
DeepSpeed 的核心技术，消除数据并行中的冗余

内存占用分析 (fp16 训练):
  参数: 2 bytes/param
  梯度: 2 bytes/param
  优化器状态 (Adam): 12 bytes/param
    - fp32 参数副本: 4 bytes
    - fp32 动量: 4 bytes
    - fp32 方差: 4 bytes
  总计: 16 bytes/param

ZeRO 阶段:

ZeRO-1: 分片优化器状态
  每个 GPU 只存 1/N 的优化器状态
  内存: 16 → 4 + 12/N bytes/param

ZeRO-2: + 分片梯度
  梯度在 AllReduce 后立即分片
  内存: 4 + 12/N → 2 + 14/N bytes/param

ZeRO-3: + 分片参数
  参数按需 AllGather
  内存: 2 + 14/N → 16/N bytes/param
  通信量增加 1.5x

DeepSpeed 配置:
  {
    "zero_optimization": {
      "stage": 3,
      "offload_param": {"device": "cpu"},
      "offload_optimizer": {"device": "cpu"}
    }
  }
\`\`\`

### 混合精度训练

\`\`\`
前向/反向: FP16 或 BF16
权重更新: FP32

FP16:
  范围: ±65504
  精度: 约 3 位小数
  问题: 梯度下溢 → 需要 Loss Scaling

BF16 (Brain Float 16):
  范围: 与 FP32 相同
  精度: 约 2 位小数
  优势: 不需要 Loss Scaling

Loss Scaling:
  前向: loss = loss * scale
  反向: 梯度自动放大
  更新: 梯度除以 scale
  动态调整 scale: 上溢时减小，稳定时增大

PyTorch AMP:
  scaler = GradScaler()
  with autocast():
      output = model(input)
      loss = criterion(output, target)
  scaler.scale(loss).backward()
  scaler.step(optimizer)
  scaler.update()
\`\`\`

### 3D 并行

\`\`\`
组合多种并行策略:

数据并行 × 张量并行 × 流水线并行

例: 1024 GPU 训练
  DP = 64 (数据并行度)
  TP = 8  (张量并行度，单机 8 卡)
  PP = 2  (流水线阶段)
  64 × 8 × 2 = 1024

设计原则:
  TP: 单机内，利用 NVLink
  PP: 跨机器，容忍网络延迟
  DP: 最外层，扩展吞吐
\`\`\`

### 训练规模估算

\`\`\`
内存需求 (混合精度 + Adam):
  ~10-16 bytes/param

7B 模型:
  参数: 7B × 2 = 14 GB
  梯度: 14 GB
  优化器: 7B × 12 = 84 GB
  激活: 取决于 batch size 和序列长度
  总计: ~120-200 GB

70B 模型:
  需要 ~8+ 张 A100 80GB

训练 tokens/秒:
  MFU (Model FLOPs Utilization) × 硬件 FLOPS / (6 × params)

  MFU 通常 30-50%
  A100: 312 TFLOPS (BF16)
  70B 模型: ~1000 tokens/秒/A100
\`\`\``,
  },
  {
    id: 'cml9s5ece003vt4xitxz4r4gb', // AI Alignment - AI 对齐核心概念
    content: `## AI 对齐与安全核心概念

AI 对齐是确保 AI 系统的行为符合人类意图和价值观的研究领域。随着 AI 能力的增强，这变得越来越重要。

### 对齐问题的层次

\`\`\`
1. Outer Alignment (外部对齐):
   目标规范是否正确反映人类意图？
   例: 奖励函数是否捕获了我们真正想要的？

2. Inner Alignment (内部对齐):
   模型是否真正优化了我们指定的目标？
   mesa-optimization: 模型内部可能形成不同的目标

3. Scalable Oversight (可扩展监督):
   如何监督能力超越人类的 AI？
   人类可能无法评估超人类 AI 的输出
\`\`\`

### 对齐技术谱系

**RLHF (Reinforcement Learning from Human Feedback)**:
\`\`\`
流程:
  1. 人类标注偏好: A > B
  2. 训练奖励模型
  3. 用 RL 优化策略

优点:
  - 实践验证有效 (ChatGPT, Claude)
  - 可以优化难以形式化的目标

缺点:
  - 奖励黑客
  - 人类偏好可能不一致
  - 标注成本高
\`\`\`

**Constitutional AI (CAI)**:
\`\`\`
Anthropic 的方法:

1. 定义宪法原则 (Constitution):
   "回答应该是有帮助、无害、诚实的"
   "避免帮助非法活动"
   ...

2. AI 自我批评和修正:
   生成 → 批评 → 修订

3. RLAIF: 用 AI 反馈替代人类反馈
   让另一个 AI 根据宪法打分

优点:
  - 减少人类标注
  - 原则可解释
  - 可扩展
\`\`\`

**DPO (Direct Preference Optimization)**:
\`\`\`
简化 RLHF，直接从偏好数据优化:

L = -log σ(β · (log π(y_w)/π_ref(y_w) - log π(y_l)/π_ref(y_l)))

优点:
  - 不需要奖励模型
  - 更稳定
  - 简单实现
\`\`\`

### 可解释性方法

**事后解释 (Post-hoc)**:
\`\`\`
SHAP (SHapley Additive exPlanations):
  基于博弈论的特征归因
  每个特征的贡献 = Shapley 值

LIME (Local Interpretable Model-agnostic):
  在预测点附近用简单模型近似
  解释局部决策

Attention 可视化:
  看模型"关注"哪些输入
  注意: attention ≠ explanation
\`\`\`

**机制解释 (Mechanistic Interpretability)**:
\`\`\`
目标: 理解模型内部的计算机制

方法:
  Probing: 探测中间表示包含的信息
  Circuit Analysis: 追踪特定行为的计算路径
  Sparse Autoencoders: 分解激活为可解释特征

发现:
  - 某些 neuron 对应特定概念
  - 存在"间接对象识别"电路
  - 复制行为可以被定位

局限:
  - 规模问题: 大模型难以完全解释
  - 分布式表示: 概念可能跨多个神经元
\`\`\`

### 安全评估与红队测试

\`\`\`
评估基准:
  TruthfulQA: 真实性 (避免幻觉)
  BBQ: 偏见和公平性
  ToxiGen: 有害内容生成
  XSTest: 过度拒绝测试

红队测试 (Red Teaming):
  专门尝试让模型产生有害输出
  越狱攻击: 绕过安全护栏
  对抗性 prompt: 精心构造的输入

常见攻击类型:
  1. 角色扮演: "假设你是一个邪恶的 AI..."
  2. 编码/语言: 用 base64 或其他语言绕过
  3. 多轮对话: 逐步诱导
  4. 间接注入: 通过检索的文档注入指令
\`\`\`

### 未来挑战

\`\`\`
1. 超人类对齐:
   当 AI 能力超越人类时，如何验证对齐？
   Debate, IDA 等方法

2. 欺骗性对齐:
   模型可能假装对齐来通过评估
   需要更深入的解释性

3. 多智能体:
   多个 AI 系统交互时的对齐问题
   协调、竞争、涌现行为

4. 价值锁定:
   AI 的价值观应该如何随人类演变？
   避免锁定到特定时代的价值观
\`\`\``,
  },
  {
    id: 'cml9s5ecf0040t4xig9jxy31z', // Agentic AI - AI Agent 架构
    content: `## AI Agent 深度解析

AI Agent 是能够自主感知环境、做出决策并采取行动的系统。随着 LLM 能力的提升，构建可靠的 AI Agent 成为可能。

### Agent 核心架构

\`\`\`
基本循环:

while not task_complete:
    # 感知
    observation = perceive(environment)

    # 思考
    thought = llm.reason(
        observation,
        memory,
        available_tools
    )

    # 决策
    action = llm.plan(thought)

    # 执行
    result = execute(action)

    # 更新
    memory.update(observation, action, result)
\`\`\`

### ReAct 模式

\`\`\`
Reason + Act 的交替:

示例:
  Question: 乔布斯的生日是哪一天？

  Thought: 我需要查询乔布斯的个人信息
  Action: search("Steve Jobs birthday")
  Observation: Steve Jobs was born on February 24, 1955

  Thought: 我找到了答案
  Action: finish("1955年2月24日")

提示模板:
  Answer the following questions as best you can.
  Use the following format:

  Question: the input question
  Thought: reason about what to do
  Action: the action to take, one of [{tools}]
  Action Input: the input to the action
  Observation: the result of the action
  ... (repeat Thought/Action/Observation)
  Thought: I now know the final answer
  Final Answer: the final answer
\`\`\`

### Agent 核心组件

**1. LLM Core (推理引擎)**:
\`\`\`
选择:
  GPT-4: 最强推理能力
  Claude: 长上下文、安全
  开源: LLaMA, Mistral (需要微调)

关键能力:
  - 指令遵循
  - 推理规划
  - 工具使用
  - 自我纠错
\`\`\`

**2. Memory (记忆系统)**:
\`\`\`
短期记忆:
  当前对话上下文
  最近的观察和行动
  上下文窗口限制

长期记忆:
  向量数据库存储历史经验
  检索相关记忆辅助决策

工作记忆:
  当前任务状态
  中间计算结果

实现:
  - 滑动窗口 (最近 K 轮)
  - 摘要压缩 (用 LLM 总结历史)
  - 向量检索 (相关性召回)
\`\`\`

**3. Tools (工具系统)**:
\`\`\`
工具定义 (Function Calling):
  {
    "name": "search",
    "description": "Search the web for information",
    "parameters": {
      "type": "object",
      "properties": {
        "query": {"type": "string"}
      },
      "required": ["query"]
    }
  }

常用工具:
  - 搜索引擎 (Google, Bing)
  - 代码执行器 (Python REPL)
  - 数据库查询
  - API 调用
  - 文件操作
  - 浏览器控制

工具选择:
  LLM 根据任务描述选择合适的工具
  参数提取和格式化
\`\`\`

**4. Planning (规划系统)**:
\`\`\`
简单规划:
  ReAct: 每步重新规划

分解规划:
  复杂任务 → 子任务列表 → 依次执行

Tree of Thought:
  多分支探索 → 评估 → 选择最优

Plan-and-Solve:
  先生成完整计划 → 然后执行

自我反思:
  执行后检查结果 → 必要时重新规划
\`\`\`

### Multi-Agent 模式

\`\`\`
1. Supervisor (监督者模式):
   一个主 Agent 协调多个专业 Agent
   主: 任务分配、结果整合
   专: 代码、搜索、分析...

2. Debate (辩论模式):
   多个 Agent 就问题辩论
   各自提出观点、反驳、达成共识
   提高推理可靠性

3. Pipeline (流水线模式):
   Agent A → Agent B → Agent C
   每个 Agent 处理特定阶段
   例: 研究 → 写作 → 审核

4. Swarm (蜂群模式):
   动态路由到最合适的 Agent
   根据任务类型自动选择
   OpenAI Swarm 框架
\`\`\`

### 核心挑战

\`\`\`
1. 幻觉与可靠性:
   Agent 可能基于错误信息行动
   需要验证、确认机制

2. 错误累积:
   长链推理中错误级联放大
   需要自我纠错、回溯能力

3. 成本控制:
   每个 action 都是 API 调用
   复杂任务可能需要大量 token

4. 安全性:
   工具调用的权限控制
   防止恶意使用
   沙箱执行

5. 评估:
   如何评估 Agent 的整体能力
   基准: AgentBench, WebArena
\`\`\`

### 实用框架

| 框架 | 特点 | 适用 |
|------|------|------|
| LangChain | 生态丰富，集成多 | 快速原型 |
| LlamaIndex | RAG 优化 | 知识密集任务 |
| AutoGPT | 全自主 | 实验性 |
| CrewAI | Multi-Agent | 团队协作 |
| OpenAI Assistants | 官方支持 | 简单场景 |`,
  },
  {
    id: 'cml9s5ecg0045t4xijxip01bj', // Multimodal - 多模态与基础模型前沿
    content: `## 多模态学习与基础模型前沿

多模态学习将视觉、语言、音频等不同模态统一在同一框架下，是通向通用人工智能的关键一步。

### 模态扩展演进

\`\`\`
时间线:
  2020: GPT-3 (纯文本，175B)
  2021: CLIP (图文对齐), Codex (代码)
  2022: Whisper (语音), DALL-E 2 (图像生成)
  2023: GPT-4V (多模态理解), LLaVA
  2024: GPT-4o (原生多模态), Sora (视频)
  2025+: 世界模型？

趋势:
  分离 → 统一
  理解 → 生成
  单模态 → 全模态
\`\`\`

### CLIP: 视觉-语言对齐基石

\`\`\`
架构:
  图像 → Vision Encoder (ViT/ResNet) → 图像嵌入
  文本 → Text Encoder (Transformer) → 文本嵌入

对比学习:
  正对: 匹配的图文对 → 相似度↑
  负对: 不匹配的图文对 → 相似度↓

训练数据: 4 亿图文对 (网络爬取)

零样本分类:
  类别 → 文本描述 → 文本嵌入
  图像 → 图像嵌入
  预测 = argmax 相似度

应用:
  - 图像搜索
  - 零样本分类
  - 多模态 LLM 的视觉编码器
  - Stable Diffusion 的文本编码器
\`\`\`

### 多模态 LLM 架构模式

\`\`\`
1. 后期融合 (Late Fusion):
   视觉编码器 (冻结) → 投影层 → LLM

   例: LLaVA
     CLIP ViT → MLP → LLaMA

   优点: 简单，可以复用现有模型
   缺点: 模态交互有限

2. 早期融合 (Early Fusion):
   所有模态统一 tokenize → 单一 Transformer

   例: Gemini
     图像 patch + 文本 token → 统一序列

   优点: 深度模态交互
   缺点: 需要从头训练

3. 交叉注意力 (Cross-Attention):
   视觉特征通过 cross-attention 注入 LLM

   例: Flamingo
     视觉 token 作为 prefix
     在 LLM 层间插入 cross-attention

4. 适配器 (Adapter):
   冻结 LLM，只训练轻量适配模块

   例: BLIP-2
     Q-Former: 学习从视觉提取语言相关特征
\`\`\`

### Stable Diffusion 深入

\`\`\`
组件:
  1. Text Encoder (CLIP): 文本 → 条件嵌入
  2. U-Net: 在潜空间去噪
  3. VAE: 潜空间 ↔ 像素空间

潜空间扩散:
  优势: 512×512 图像 → 64×64×4 潜表示
  计算量减少 ~50x

Classifier-Free Guidance:
  同时训练有条件和无条件生成
  推理: ε = ε_uncond + w·(ε_cond - ε_uncond)
  w > 1: 更符合 prompt

控制方法:
  ControlNet: 条件控制 (边缘、深度、姿态)
  IP-Adapter: 图像提示
  LoRA: 风格微调
\`\`\`

### 世界模型 (World Models)

\`\`\`
目标: 学习环境的内部模型，在"想象"中规划

组件:
  感知编码器: 观测 → 潜空间 z
  动态模型: z_{t+1} = f(z_t, a_t)
  奖励预测: r = g(z_t, a_t)

Sora 作为世界模型:
  "A promising path towards building general purpose
   simulators of the physical world" - OpenAI

能力:
  - 3D 一致性
  - 物理模拟 (流体、碰撞)
  - 长程一致性
  - 相机运动

局限:
  - 物理不完全正确
  - 复杂交互可能出错
  - 计算成本极高
\`\`\`

### 开放问题

\`\`\`
1. 统一表示:
   如何高效统一不同模态？
   离散 token vs 连续表示
   模态特定处理 vs 通用处理

2. 涌现能力:
   多模态是否带来新的涌现能力？
   跨模态推理的本质是什么？

3. 评估:
   多模态理解的全面评估基准
   当前基准可能低估/高估能力

4. 效率:
   多模态推理的计算成本
   图像/视频 token 数量爆炸
   需要高效的表示和注意力机制

5. 对齐:
   多模态场景的安全对齐
   图像注入攻击
   有害内容生成
\`\`\``,
  },
  {
    id: 'cml9s5ec6002wt4xilgjajjm8', // Image Understanding - 目标检测演进
    content: `## 目标检测架构深度演进

目标检测是计算机视觉的核心任务，需要同时定位和分类图像中的物体。

### 检测任务定义

\`\`\`
输入: 图像 (H × W × 3)
输出: 每个物体的
  - 边界框: (x_min, y_min, x_max, y_max)
  - 类别: class_id
  - 置信度: confidence

评估指标:
  IoU (Intersection over Union):
    IoU = Area(Intersection) / Area(Union)
    IoU > 0.5 通常认为检测正确

  mAP (mean Average Precision):
    对每个类别计算 AP
    mAP = mean(AP_i)

  推理速度: FPS
\`\`\`

### 两阶段检测器

**R-CNN (2014)**:
\`\`\`
流程:
  1. Selective Search 生成 ~2000 候选区域
  2. 每个区域 resize 后过 CNN
  3. SVM 分类 + 边框回归

问题: 每个区域独立过 CNN，极慢 (~47s/图)
\`\`\`

**Fast R-CNN (2015)**:
\`\`\`
改进:
  1. 整图先过 CNN，得到特征图
  2. RoI Pooling: 从特征图提取候选区域特征
  3. FC 分类 + 回归

共享特征计算，快 10x
瓶颈: Selective Search 仍是 CPU 操作
\`\`\`

**Faster R-CNN (2016)**:
\`\`\`
创新: Region Proposal Network (RPN)

RPN:
  在特征图上滑动 3×3 窗口
  每个位置预测 k 个 anchor 的:
    - objectness (是否有物体)
    - 边框调整

Anchor:
  预定义的参考框
  不同尺度 + 不同比例
  例: 3 尺度 × 3 比例 = 9 anchors/位置

训练:
  RPN loss + Detection loss 联合训练
  端到端，5 FPS
\`\`\`

**Mask R-CNN (2017)**:
\`\`\`
扩展: 检测 + 实例分割

在 Faster R-CNN 基础上:
  添加 Mask Branch: 预测每个 RoI 的像素级 mask

RoI Align:
  改进 RoI Pooling 的量化问题
  双线性插值，保持像素对齐

输出: box + class + mask
\`\`\`

### 单阶段检测器

**YOLO v1 (2016)**:
\`\`\`
You Only Look Once:
  将检测重构为回归问题

流程:
  1. 将图像分成 S×S 网格
  2. 每个网格预测 B 个框 + C 个类别概率
  3. 输出 = S × S × (B × 5 + C)
     5 = (x, y, w, h, confidence)

优点: 实时 (45 FPS)
缺点: 小物体检测差，定位不够精确
\`\`\`

**YOLOv8 (2023)**:
\`\`\`
改进:
  Anchor-free: 不再使用预定义 anchor
  解耦头: 分类和回归分开
  更强的数据增强: Mosaic, MixUp

架构:
  Backbone: CSPDarknet (特征提取)
  Neck: PANet (多尺度融合)
  Head: 解耦的分类 + 回归头

性能:
  YOLOv8-n: 3.2M 参数, 37.3 mAP, 480 FPS
  YOLOv8-x: 68.2M 参数, 53.9 mAP, 280 FPS
\`\`\`

**DETR (2020)**:
\`\`\`
Detection Transformer:
  完全基于 Transformer 的检测器

架构:
  CNN Backbone → Transformer Encoder → Transformer Decoder → FFN

关键设计:
  Object Queries: 可学习的查询向量 (100 个)
  每个 query 学习检测一个物体
  匈牙利匹配: 预测与 GT 的最优匹配

优点:
  - 不需要 NMS
  - 不需要 anchor
  - 端到端

缺点:
  - 训练慢 (500 epochs)
  - 小物体检测弱
\`\`\`

### 关键技术

**NMS (Non-Maximum Suppression)**:
\`\`\`
问题: 多个框检测同一物体
解决: 保留置信度最高的，抑制高重叠的

while boxes:
    选择置信度最高的框 B
    移除所有与 B 的 IoU > threshold 的框

Soft-NMS: 不直接删除，而是降低置信度
\`\`\`

**FPN (Feature Pyramid Network)**:
\`\`\`
问题: 不同尺度的物体需要不同分辨率的特征

FPN:
  自底向上: 提取多尺度特征 (C2-C5)
  自顶向下: 上采样高层特征
  横向连接: 融合相邻层特征

结果: P2-P5 多尺度特征金字塔
小物体用高分辨率特征 (P2)
大物体用低分辨率特征 (P5)
\`\`\``,
  },
  {
    id: 'cml9s5ec70031t4xilgppnbxn', // Vision-Language - 多模态架构总览
    content: `## 视觉-语言模型深度解析

视觉-语言模型 (VLM) 将计算机视觉和自然语言处理结合，实现跨模态理解和推理。

### CLIP 深入理解

\`\`\`
训练方式:
  对比学习 on 图文对

InfoNCE Loss:
  L = -log(exp(sim(I_i, T_i)/τ) / Σ_j exp(sim(I_i, T_j)/τ))

  正对: (I_i, T_i) 相似度↑
  负对: (I_i, T_j) j≠i 相似度↓
  τ: 温度参数

数据规模:
  WIT: 4亿图文对
  清洗和去重很重要

模型变体:
  CLIP ViT-B/32: 151M 参数
  CLIP ViT-L/14: 428M 参数
  OpenCLIP: 开源复现，更多变体
\`\`\`

**CLIP 的应用**:
\`\`\`
1. 零样本分类:
   类别 → "a photo of a {class}" → 文本嵌入
   图像 → 图像嵌入
   预测 = argmax(图像嵌入 · 文本嵌入)

2. 图像检索:
   文本查询 → 在图像库中找最相似的

3. 多模态 LLM 的视觉编码器:
   LLaVA, BLIP 等都使用 CLIP 视觉编码器

4. Stable Diffusion 的条件:
   文本 → CLIP 文本编码器 → 条件嵌入
\`\`\`

### LLaVA 架构

\`\`\`
Large Language and Vision Assistant:

组件:
  Vision Encoder: CLIP ViT-L/14 (冻结)
  Projector: 简单 MLP
  LLM: Vicuna (LLaMA 微调)

训练:
  Stage 1: 只训练 Projector
    数据: 图文描述对
    让 LLM "看懂"视觉特征

  Stage 2: 全量微调
    数据: 视觉对话、推理、OCR...
    LLM + Projector 一起训练

输入处理:
  图像 → ViT → patch embeddings (576 个)
  → Projector → visual tokens
  与文本 tokens 拼接
\`\`\`

### GPT-4V 能力分析

\`\`\`
能力:
  - 图像理解: 场景描述、物体识别
  - OCR: 读取图像中的文字
  - 图表理解: 解析数据可视化
  - 空间推理: 物体位置关系
  - 视觉问答: 基于图像回答问题
  - 多图推理: 跨多个图像推理

局限:
  - 可能产生幻觉
  - 复杂空间关系理解有限
  - 精确计数困难
  - 小文字 OCR 不完美
\`\`\`

### 视觉 Agent

\`\`\`
GUI Agent:
  输入: 屏幕截图
  输出: 鼠标/键盘操作

架构:
  Screen → VLM → Action (click, type, scroll...)

SoM (Set-of-Mark):
  在截图上标记可交互元素
  "Click on button [3]"

应用:
  - 网页自动化
  - 桌面应用操作
  - 软件测试

挑战:
  - 准确定位 UI 元素
  - 长流程规划
  - 错误恢复
\`\`\`

### 图像生成评估

\`\`\`
自动指标:
  FID (Fréchet Inception Distance):
    真实图像和生成图像的特征分布距离
    越低越好

  CLIP Score:
    图像与文本的 CLIP 相似度
    衡量图文一致性

  IS (Inception Score):
    多样性 + 清晰度
    但可能被欺骗

人工评估:
  - 图像质量
  - 文本对齐
  - 创意性
  - 真实感

基准:
  PartiPrompts: 复杂 prompt 评估
  DrawBench: 组合性评估
\`\`\`

### 视频理解

\`\`\`
挑战:
  - Token 数量爆炸: 1分钟视频 = 1800 帧
  - 时序建模: 理解动作和事件
  - 长程依赖: 跨多帧推理

方法:
  1. 稀疏采样: 每秒取 1-2 帧
  2. 时序压缩: 用 3D CNN 或时序 Transformer
  3. 分层处理: 先理解片段，再理解全视频

模型:
  VideoLLaMA: LLaVA + 时序建模
  Video-ChatGPT: 视频对话
  Gemini 1.5 Pro: 原生长视频理解

能力:
  - 视频问答
  - 动作识别
  - 视频摘要
  - 时间定位 (temporal grounding)
\`\`\``,
  },
]

async function main() {
  console.log('Expanding AI Engineering & Frontier notes...\n')

  for (const update of NOTE_UPDATES) {
    const note = await prisma.note.update({
      where: { id: update.id },
      data: { content: update.content },
      include: { task: { select: { title: true } } },
    })
    console.log(`  ✓ Updated: [${note.task.title}] ${note.title} (${update.content.length} chars)`)
  }

  console.log('\nDone!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
