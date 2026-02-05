import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const NOTE_UPDATES = [
  {
    id: 'cml9s5ec00023t4xii1bcpqpq', // Transformer - Self-Attention 详解
    content: `## Scaled Dot-Product Attention — Transformer 的核心

注意力机制是 Transformer 的灵魂。理解它的数学原理和设计动机，是深入理解 LLM 的基础。

### 核心公式

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

\`\`\`
Q (Query):  想要查询的信息 (我在找什么?)
K (Key):    每个位置的标识 (我能提供什么?)
V (Value):  每个位置的内容 (我的信息是什么?)

流程:
  1. 计算相似度: QK^T  →  (n × n) 矩阵
  2. 缩放: 除以 √d_k
  3. 归一化: softmax (每行和为 1)
  4. 加权聚合: 乘以 V
\`\`\`

### 为什么除以 √d_k?

\`\`\`
假设 Q, K 的元素来自 N(0, 1):
  q · k = Σ q_i · k_i

根据概率论:
  E[q·k] = 0
  Var[q·k] = d_k  (d_k 个独立项的方差之和)

当 d_k 很大时:
  QK^T 的值可能很大 (正或负)
  → softmax 进入饱和区
  → 梯度接近 0
  → 训练困难

除以 √d_k 后:
  Var[q·k / √d_k] = 1
  → 数值范围稳定
  → softmax 在有效区间
\`\`\`

### 多头注意力 (Multi-Head Attention)

\`\`\`python
def MultiHeadAttention(Q, K, V, d_model, num_heads):
    d_k = d_model // num_heads

    heads = []
    for i in range(num_heads):
        Q_i = Q @ W_Q[i]  # (n, d_k)
        K_i = K @ W_K[i]  # (n, d_k)
        V_i = V @ W_V[i]  # (n, d_k)
        head_i = Attention(Q_i, K_i, V_i)
        heads.append(head_i)

    concat = torch.cat(heads, dim=-1)  # (n, d_model)
    return concat @ W_O
\`\`\`

**多头的意义**:
- 不同的头关注不同类型的依赖关系
- 例: 头 1 关注语法，头 2 关注指代，头 3 关注语义
- 增加模型的表达能力

### Self-Attention vs Cross-Attention

\`\`\`
Self-Attention:
  Q, K, V 都来自同一个序列
  用于: Encoder (BERT), Decoder 的 masked self-attention

Cross-Attention:
  Q 来自一个序列，K, V 来自另一个序列
  用于: Encoder-Decoder attention (翻译任务)
\`\`\`

### 注意力变体对比

| 变体 | 复杂度 | KV Cache | 描述 |
|------|--------|----------|------|
| MHA (Multi-Head) | O(n²d) | 大 | 原始 Transformer |
| MQA (Multi-Query) | O(n²d/h) | 小 | 所有头共享 K, V |
| GQA (Grouped-Query) | 介于两者 | 中 | K, V 分组共享 (LLaMA 2) |
| Flash Attention | O(n²d) | 大 | IO 优化，速度 2-4x |
| Sparse Attention | O(n√n) | 大 | 稀疏模式 (BigBird) |
| Linear Attention | O(nd²) | 取决于实现 | 核化近似 |

### Flash Attention

\`\`\`
核心问题:
  标准 attention 需要 O(n²) 内存存储注意力矩阵
  当 n=4096, d=128 时, 矩阵大小 = 4096² × 4 bytes ≈ 64 MB

Flash Attention 的思路:
  利用 GPU 内存层次结构 (SRAM vs HBM)
  通过分块计算避免存储完整注意力矩阵

技巧:
  1. 分块: 将 Q, K, V 分成小块
  2. 在 SRAM 中计算部分 softmax
  3. 用在线算法正确累积结果
  4. 只存储 O(n) 大小的中间结果

效果:
  - 内存: O(n²) → O(n)
  - 速度: 2-4x 加速
  - 无近似误差 (精确计算)

FlashAttention-2:
  进一步优化并行策略，减少非矩阵乘法操作
\`\`\`

### KV Cache (推理优化)

\`\`\`
自回归生成:
  第 t 步需要 [x_1, ..., x_t] 的 K, V
  但 [x_1, ..., x_{t-1}] 的 K, V 已经算过了!

KV Cache:
  缓存之前 token 的 K, V
  每步只需计算新 token 的 K, V

内存占用:
  KV Cache = 2 × num_layers × seq_len × d_model × 2 bytes
  LLaMA 7B, seq_len=2048: ≈ 1 GB

为什么 MQA/GQA 重要:
  减少 KV Cache 的大小
  MQA: 减少 h 倍 (h = 头数)
  GQA: 减少 h/g 倍 (g = 组数)
\`\`\``,
  },
  {
    id: 'cml9s5ec00025t4xiaed8eknt', // Transformer - 位置编码方案
    content: `## 位置编码方案详解

Transformer 的 self-attention 是置换不变的——打乱输入顺序，输出也会相应打乱。为了让模型理解位置信息，需要显式注入位置编码。

### 正弦位置编码 (Sinusoidal PE)

**原始 Transformer (2017) 的方案**:

\`\`\`
PE(pos, 2i)   = sin(pos / 10000^{2i/d})
PE(pos, 2i+1) = cos(pos / 10000^{2i/d})

pos: 位置 (0, 1, 2, ...)
i:   维度索引 (0, 1, ..., d/2-1)
d:   嵌入维度
\`\`\`

**设计动机**:
\`\`\`
1. 波长几何递增: 10000^{2i/d}
   低维 (i 小): 短波长，编码细粒度位置差异
   高维 (i 大): 长波长，编码大范围位置关系

2. 相对位置可以被表示:
   PE(pos+k) 可以写成 PE(pos) 的线性变换
   理论上模型可以学习注意相对位置

3. 外推能力:
   理论上可以处理比训练时更长的序列
   实际效果有限
\`\`\`

### 可学习位置编码 (Learned PE)

\`\`\`
PE = Embedding(position_id)

GPT/BERT 的选择:
  为每个位置学习一个向量
  位置 0, 1, 2, ..., max_len-1 各有一个嵌入

优点:
  - 更灵活，可以学习任意位置模式
  - 实现简单

缺点:
  - 无法外推: 超过 max_len 的位置没见过
  - 参数量: O(max_len × d)
\`\`\`

### RoPE (Rotary Position Embedding)

**LLaMA、GPT-NeoX 等模型的选择**:

\`\`\`
核心思想: 用旋转编码位置信息

2D 情况下的直觉:
  q = [q_1, q_2] (2D 向量)
  m = 位置
  f(q, m) = R(mθ) · q  (旋转 mθ 角度)

性质:
  <f(q,m), f(k,n)> = <R((m-n)θ)·q, k>
  内积只依赖于相对位置 (m-n)!

高维版本:
  将 d 维向量分成 d/2 组，每组 2D
  每组用不同的旋转频率

优点:
  - 天然编码相对位置
  - 衰减性: 远距离 token 的注意力自然降低
  - 良好的外推能力 (可通过技巧改进)
\`\`\`

**RoPE 的数学形式**:
\`\`\`
f(x, m) = [x_0 cos(mθ_0) - x_1 sin(mθ_0),
           x_0 sin(mθ_0) + x_1 cos(mθ_0),
           x_2 cos(mθ_1) - x_3 sin(mθ_1),
           ...]

θ_i = 10000^{-2i/d}

注意: RoPE 应用在 Q, K 上，不应用在 V 上
\`\`\`

### ALiBi (Attention with Linear Biases)

**BLOOM 模型的选择**:

\`\`\`
思路: 直接在注意力分数上加位置偏置

Attention(Q,K,V) = softmax(QK^T/√d + m·bias)

bias[i][j] = -|i-j|  (线性距离惩罚)
m: 每个头不同的斜率

斜率 m 的选择:
  对于 h 个头: m = 2^{-8/h}, 2^{-8·2/h}, ..., 2^{-8}

优点:
  - 无需额外参数
  - 训练短序列，推理长序列 (强外推能力)
  - 实现简单
\`\`\`

### 位置编码对比总结

| 方法 | 参数量 | 相对位置 | 外推能力 | 使用模型 |
|------|--------|----------|----------|---------|
| Sinusoidal | 0 | 理论上可以 | 有限 | 原始 Transformer |
| Learned | O(L×d) | 否 | 无 | GPT-2, BERT |
| RoPE | 0 | 是 | 好 (可改进) | LLaMA, Qwen |
| ALiBi | 0 | 是 | 最好 | BLOOM, MPT |

### 长度外推技术

\`\`\`
问题: 模型在 2K 上下文训练，能否推理 8K?

Position Interpolation:
  将 [0, 8K] 的位置压缩到 [0, 2K]
  position_id' = position_id × (train_len / target_len)

NTK-Aware Scaling:
  调整 RoPE 的基数
  base' = base × (target_len / train_len)^{dim/(dim-2)}

YaRN (Yet another RoPE extensioN):
  分频带处理: 低频维度用插值，高频维度保持

Streaming LLM:
  只保留初始 token + 滑动窗口
  利用 ALiBi 或 sink token 机制
\`\`\``,
  },
  {
    id: 'cml9s5ec1002at4xiwnvm5r8x', // Generative Models - 生成模型框架对比
    content: `## 生成模型深度对比 — VAE, GAN, Diffusion

生成模型的目标是学习数据分布 $p(x)$，以便能够生成新的、看起来真实的样本。不同的方法对这个问题有截然不同的建模方式。

### VAE (Variational Autoencoder)

**概率框架**:
\`\`\`
假设数据由潜变量生成:
  z ~ p(z) = N(0, I)       # 先验
  x ~ p(x|z)               # 解码器/似然

推断问题:
  p(z|x) = p(x|z)p(z) / p(x)   # 后验
  p(x) = ∫ p(x|z)p(z) dz       # 难以计算!

变分近似:
  用 q(z|x) 近似 p(z|x)
  q(z|x) = N(μ(x), σ²(x))     # 编码器输出 μ, σ
\`\`\`

**ELBO (Evidence Lower Bound)**:
\`\`\`
log p(x) ≥ ELBO = E_q[log p(x|z)] - KL(q(z|x) || p(z))
                  ├── 重构项        └── 正则项

重构项: 希望解码器能从 z 重建 x
正则项: 希望 q(z|x) 接近标准正态

实现:
  Encoder: x → μ(x), log σ²(x)
  重参数化: z = μ + σ ⊙ ε,  ε ~ N(0,I)  # 可导!
  Decoder: z → x̂
  Loss = ||x - x̂||² + KL
\`\`\`

**VAE 的问题**:
- 生成模糊 (倾向于平均)
- 后验坍缩 (decoder 太强时忽略 z)
- KL 项与重构项的平衡难调

### GAN (Generative Adversarial Network)

**对抗框架**:
\`\`\`
两个网络博弈:
  Generator G: 噪声 z → 假样本 G(z)
  Discriminator D: 区分真假

原始目标:
  min_G max_D  E[log D(x)] + E[log(1 - D(G(z)))]

G 的目标: 让 D(G(z)) 接近 1
D 的目标: 让 D(x)=1, D(G(z))=0
\`\`\`

**训练不稳定的原因**:
\`\`\`
1. 模式崩塌 (Mode Collapse):
   G 只生成几种样本，但都能骗过 D

2. 梯度消失:
   当 D 太强时，G 的梯度接近 0

3. 振荡:
   D 和 G 交替占优，不收敛

解决方案:
  WGAN: 用 Wasserstein 距离替代 JS 散度
  Spectral Norm: 对 D 做谱归一化
  Progressive GAN: 渐进式增长分辨率
  StyleGAN: 引入风格控制，生成质量极高
\`\`\`

### Diffusion Model (扩散模型)

**核心思想**: 学习逆转一个渐进加噪过程

\`\`\`
前向过程 (加噪):
  q(x_t | x_{t-1}) = N(x_t; √(1-β_t)·x_{t-1}, β_t·I)

  从 x_0 (真实图像) 逐步加噪到 x_T (纯噪声)
  β_t: 噪声调度，通常从 0.0001 到 0.02

关键性质:
  可以一步跳到任意 t:
  q(x_t | x_0) = N(x_t; √ᾱ_t·x_0, (1-ᾱ_t)·I)
  其中 ᾱ_t = Π_{s=1}^t (1-β_s)
\`\`\`

**反向过程 (去噪)**:
\`\`\`
p_θ(x_{t-1} | x_t) = N(x_{t-1}; μ_θ(x_t, t), σ_t²·I)

训练目标 (简化版):
  L = E_{t,x_0,ε}[||ε - ε_θ(x_t, t)||²]

  ε_θ: 噪声预测网络 (通常是 U-Net)
  让网络学习预测加的噪声

采样:
  x_T ~ N(0, I)
  for t = T, T-1, ..., 1:
      z ~ N(0, I) if t > 1 else z = 0
      x_{t-1} = (x_t - β_t/√(1-ᾱ_t)·ε_θ(x_t,t)) / √(1-β_t) + σ_t·z
\`\`\`

**Diffusion 的优势**:
\`\`\`
1. 训练稳定: 简单的 MSE 损失，没有对抗训练
2. 覆盖多模态: 不会模式崩塌
3. 生成质量高: 目前图像生成 SOTA
4. 理论清晰: 有概率论支撑

缺点:
  采样慢: 需要数百到数千步
  → DDIM, DPM-Solver 等加速方法
\`\`\`

### Stable Diffusion 架构

\`\`\`
在潜空间 (Latent Space) 做扩散:

图像 x → VAE Encoder → 潜表示 z → 扩散过程

优势:
  潜空间维度远小于像素空间
  512×512 图像 → 64×64×4 潜表示
  计算量减少 ~50x

文本条件:
  文本 → CLIP Text Encoder → 文本嵌入
  文本嵌入通过 Cross-Attention 注入 U-Net

Classifier-Free Guidance:
  同时训练有条件和无条件生成
  采样时: ε = ε_uncond + w·(ε_cond - ε_uncond)
  w > 1: 更强调条件 (更符合 prompt，但多样性降低)
\`\`\`

### 生成模型对比总结

| 维度 | VAE | GAN | Diffusion |
|------|-----|-----|-----------|
| 训练 | 稳定 | 不稳定 | 稳定 |
| 采样速度 | 快 | 快 | 慢 |
| 生成质量 | 模糊 | 清晰 | 最佳 |
| 模式覆盖 | 好 | 可能崩塌 | 好 |
| 似然估计 | 有 (ELBO) | 无 | 有 (VLB) |
| 代表应用 | 异常检测 | StyleGAN | Stable Diffusion, DALL-E 3 |`,
  },
  {
    id: 'cml9s5ec2002ft4xiwm1zwm8f', // Text Representation - 嵌入方法演进
    content: `## 文本表示方法演进 — 从词袋到上下文嵌入

文本的向量表示是 NLP 的基础。如何将离散的文本符号转换为连续的向量空间，直接决定了下游任务的效果。

### 第一代: 稀疏表示

**词袋模型 (Bag of Words)**:
\`\`\`
将文档表示为词频向量

文档 = "I love NLP, I love AI"
词表 = [I, love, NLP, AI]
向量 = [2, 2, 1, 1]

问题:
  1. 维度爆炸: 词表可能有几十万词
  2. 忽略顺序: "狗咬人" vs "人咬狗"
  3. 语义缺失: "happy" 和 "joyful" 完全正交
\`\`\`

**TF-IDF**:
\`\`\`
TF-IDF(t, d) = TF(t, d) × IDF(t)

TF(t, d) = 词 t 在文档 d 中的频率
IDF(t) = log(N / DF(t))
  N = 总文档数
  DF(t) = 包含词 t 的文档数

效果:
  常见词 (the, is) → IDF 低 → 权重低
  稀有但重要的词 → IDF 高 → 权重高

仍然是稀疏、高维的表示
\`\`\`

### 第二代: 静态嵌入

**Word2Vec - Skip-gram**:
\`\`\`
核心思想: 用中心词预测上下文

给定中心词 w_c，预测上下文词 w_o:
  P(w_o | w_c) = exp(v_{w_o} · v_{w_c}) / Σ exp(v_w · v_{w_c})

训练目标:
  max Σ_{(c,o)} log P(w_o | w_c)

Negative Sampling (实际使用):
  不需要计算所有词的 softmax
  只对比正样本 vs 随机负样本
  log σ(v_o · v_c) + Σ_{neg} log σ(-v_n · v_c)
\`\`\`

**Word2Vec - CBOW**:
\`\`\`
用上下文预测中心词 (Skip-gram 的反向)

P(w_c | context) = softmax(avg(v_{context}) · v_{w_c})

特点:
  比 Skip-gram 快
  在频繁词上效果更好
\`\`\`

**GloVe (Global Vectors)**:
\`\`\`
基于共现矩阵的矩阵分解

X_{ij} = 词 i 和词 j 共现的次数

目标:
  J = Σ_{i,j} f(X_{ij})(w_i · w_j + b_i + b_j - log X_{ij})²

f(x): 权重函数，防止高频词主导
\`\`\`

**静态嵌入的局限**:
\`\`\`
"bank" 在不同语境中意思不同:
  "river bank" (河岸)
  "bank account" (银行)

但 Word2Vec/GloVe 只有一个 "bank" 向量
→ 无法处理多义词
\`\`\`

### 第三代: 上下文嵌入

**ELMo (2018)**:
\`\`\`
双向 LSTM 语言模型

前向 LM: P(w_t | w_1, ..., w_{t-1})
后向 LM: P(w_t | w_{t+1}, ..., w_n)

ELMo 嵌入 = 加权组合各层表示
  每层捕获不同级别的信息:
    底层: 语法 (词形、词性)
    高层: 语义 (词义、实体)

特点:
  - 首个大规模上下文嵌入
  - 不同语境 → 不同向量
  - 作为特征加入下游模型
\`\`\`

**BERT (2019)**:
\`\`\`
双向 Transformer + 掩码语言模型

预训练任务:
  1. MLM (Masked LM): 预测被 [MASK] 的词
  2. NSP (Next Sentence Prediction): 判断两句是否相邻

输入:
  [CLS] + Sentence A + [SEP] + Sentence B + [SEP]

输出:
  每个 token 都有上下文感知的嵌入
  [CLS] 嵌入代表整个序列

微调:
  分类: [CLS] 嵌入 → 分类头
  序列标注: 每个 token 嵌入 → 标签
  问答: 预测答案的起止位置
\`\`\`

**GPT 系列**:
\`\`\`
单向 Transformer (只看左边上下文)

GPT-1 (2018): 预训练 + 微调范式
GPT-2 (2019): 更大模型，零样本能力
GPT-3 (2020): 175B 参数，上下文学习
GPT-4 (2023): 多模态，推理能力

特点:
  - 生成式预训练
  - 自回归语言模型
  - 通过 prompt 激发能力
\`\`\`

### 现代句子嵌入

\`\`\`
Sentence-BERT (2019):
  孪生网络结构
  对比学习: 正样本对靠近，负样本对远离
  可以高效计算句子相似度

SimCSE (2021):
  简单对比学习
  正样本: 同一句子的两次 dropout
  无监督方法达到有监督效果

E5/BGE (2023):
  指令引导的嵌入模型
  "query: ..." vs "passage: ..."
  针对检索任务优化

OpenAI text-embedding-3:
  API 服务
  支持变长嵌入 (256 到 3072 维)
  截至 2024 年检索基准 SOTA
\`\`\`

### 嵌入维度的选择

\`\`\`
维度越高:
  + 表达能力更强
  - 计算/存储成本更高
  - 可能过拟合

常见选择:
  Word2Vec: 100-300
  BERT-base: 768
  BERT-large: 1024
  OpenAI: 1536 (ada-002), 可变 (ada-003)
  Sentence embedding: 通常 768 或 1024
\`\`\``,
  },
  {
    id: 'cml9s5ec3002kt4xiba19n2dw', // Large Language Models - LLM 训练三阶段
    content: `## LLM 训练流水线 — 从预训练到对齐

大语言模型的训练是一个复杂的多阶段流程，每个阶段都有其独特的目标和挑战。

### Stage 1: 预训练 (Pre-training)

**目标**: 学习语言的统计规律和世界知识

\`\`\`
任务: 下一个 token 预测 (Causal LM)
  P(x_t | x_1, ..., x_{t-1})

数据规模:
  - GPT-3: 300B tokens
  - LLaMA 1: 1.4T tokens
  - LLaMA 2: 2T tokens
  - LLaMA 3: 15T+ tokens

数据来源:
  - Common Crawl (网页)
  - Books (书籍)
  - Wikipedia
  - GitHub (代码)
  - arXiv (论文)
  - 高质量筛选至关重要!
\`\`\`

**训练配置 (以 LLaMA 2 为例)**:
\`\`\`
模型: 7B / 13B / 70B 参数
上下文: 4096 tokens
词表: 32000 (SentencePiece)
优化器: AdamW (β1=0.9, β2=0.95)
学习率: 3e-4 → 3e-5 (cosine decay)
Warmup: 2000 steps
Batch size: 4M tokens
训练时间: ~180 GPU-days (7B)

硬件:
  7B: 数十个 A100
  70B: 数百到数千个 A100
\`\`\`

### Stage 2: 监督微调 (SFT / Supervised Fine-Tuning)

**目标**: 让模型学会遵循指令

\`\`\`
数据格式:
  System: 你是一个有帮助的助手...
  User: 请解释量子力学
  Assistant: 量子力学是...

数据来源:
  - 人工标注 (高质量但昂贵)
  - 模型生成 + 人工筛选
  - Self-Instruct: 用模型生成指令
  - 开源数据集: Alpaca, ShareGPT, FLAN

数据量:
  - 通常 10K - 100K 高质量样本
  - 质量 > 数量
\`\`\`

**高效微调方法**:
\`\`\`
Full Fine-tuning:
  更新所有参数
  效果最好，资源需求最大

LoRA (Low-Rank Adaptation):
  W' = W + BA
  只训练低秩矩阵 B (r × d), A (d × r)
  参数量: 原始的 0.1% - 1%
  常用 r = 8, 16, 64

QLoRA:
  基础模型 4-bit 量化
  LoRA 参数用 BF16
  70B 模型可在单张 48GB GPU 上训练

其他方法:
  Adapter: 在层间插入小网络
  Prefix-tuning: 学习可训练的前缀
  Prompt-tuning: 只学习 soft prompt
\`\`\`

### Stage 3: 对齐 (Alignment)

**目标**: 让模型的行为符合人类偏好

**RLHF (Reinforcement Learning from Human Feedback)**:
\`\`\`
Step 1: 收集偏好数据
  给定 prompt，生成多个回答
  人类标注排序: response A > response B

Step 2: 训练奖励模型 (RM)
  输入: (prompt, response)
  输出: 标量分数
  目标: 让偏好的回答分数更高

Step 3: 用 RL 优化策略
  max E[R(x, y)] - β · KL(π_θ || π_ref)

  R: 奖励模型
  π_θ: 当前策略
  π_ref: SFT 模型 (参考策略)
  β: KL 惩罚系数

  算法: PPO (Proximal Policy Optimization)
\`\`\`

**DPO (Direct Preference Optimization)**:
\`\`\`
跳过奖励模型，直接从偏好数据优化

损失函数:
  L = -log σ(β · (log π_θ(y_w)/π_ref(y_w) - log π_θ(y_l)/π_ref(y_l)))

  y_w: 偏好的回答 (winner)
  y_l: 不偏好的回答 (loser)

优势:
  - 更简单，无需训练 RM
  - 更稳定，避免 RL 的不稳定性
  - 通常效果相当或更好

变体:
  IPO: 修改损失函数，更理论优雅
  KTO: 只需要好/坏标签，不需要成对比较
  ORPO: 结合 SFT 和偏好优化
\`\`\`

### 对齐的核心挑战

\`\`\`
1. 奖励黑客 (Reward Hacking):
   模型找到奖励模型的漏洞
   获得高分但实际质量差
   → KL 惩罚、RLHF-PPO 的 clip

2. 分布偏移:
   偏好数据的分布 vs 实际使用分布
   → 迭代收集在线数据

3. 标注成本:
   人类标注昂贵且主观
   → RLAIF (AI Feedback), Constitutional AI

4. 安全性与有用性的平衡:
   太安全 → 无用
   太有用 → 可能被滥用
   → 细粒度的行为规范
\`\`\``,
  },
  {
    id: 'cml9s5ec80036t4xida68msq0', // RL Fundamentals - RL 核心概念
    content: `## 强化学习核心概念详解

强化学习是机器学习的第三大范式，agent 通过与环境交互，从奖励信号中学习最优策略。

### MDP 框架 (Markov Decision Process)

\`\`\`
五元组: (S, A, P, R, γ)

S: 状态空间 - 所有可能的环境状态
A: 动作空间 - 所有可能的动作
P: 转移概率 - P(s'|s,a)，执行动作后的状态变化
R: 奖励函数 - R(s,a,s')，即时奖励
γ: 折扣因子 - (0 < γ ≤ 1)，未来奖励的重要性

轨迹 (Trajectory):
  τ = (s_0, a_0, r_0, s_1, a_1, r_1, ...)

回报 (Return):
  G_t = r_t + γ·r_{t+1} + γ²·r_{t+2} + ...
      = Σ_{k=0}^∞ γ^k · r_{t+k}
\`\`\`

### 值函数

**状态值函数 V(s)**:
\`\`\`
从状态 s 开始，遵循策略 π 的期望回报

V^π(s) = E_π[G_t | s_t = s]
       = E_π[r_t + γ·V^π(s_{t+1}) | s_t = s]  # Bellman 方程

V*(s) = max_a Q*(s,a)  # 最优值函数
\`\`\`

**动作值函数 Q(s,a)**:
\`\`\`
从状态 s 执行动作 a，然后遵循策略 π 的期望回报

Q^π(s,a) = E_π[G_t | s_t = s, a_t = a]
         = E[r + γ·Q^π(s',a') | s, a]

Q*(s,a) = E[r + γ·max_{a'} Q*(s',a') | s, a]  # 最优 Q 函数
\`\`\`

### Bellman 方程

\`\`\`
递归关系: 值函数可以分解为即时奖励 + 折扣后的未来值

状态值:
  V^π(s) = Σ_a π(a|s) Σ_{s'} P(s'|s,a)[R(s,a,s') + γ·V^π(s')]

最优 Bellman:
  V*(s) = max_a Σ_{s'} P(s'|s,a)[R(s,a,s') + γ·V*(s')]

求解方法:
  1. 动态规划 (已知 P, R)
  2. 蒙特卡洛 (采样估计)
  3. 时序差分 TD (结合两者)
\`\`\`

### 策略类型

\`\`\`
确定性策略: a = π(s)
  给定状态，输出固定动作

随机策略: a ~ π(·|s)
  给定状态，输出动作的概率分布
  有利于探索
\`\`\`

### 探索 vs 利用

\`\`\`
探索 (Exploration): 尝试新动作，获取更多信息
利用 (Exploitation): 选择已知最好的动作

ε-greedy:
  以概率 ε 随机探索
  以概率 1-ε 选择最优动作
  ε 通常随训练递减

Softmax 探索:
  π(a|s) ∝ exp(Q(s,a) / τ)
  温度 τ 控制探索程度

UCB (Upper Confidence Bound):
  选择 Q(s,a) + c·√(log N / N_a)
  N: 总次数, N_a: 动作 a 被选次数
  不确定性高的动作得到探索奖励
\`\`\`

### 算法分类

\`\`\`
按是否需要环境模型:
  Model-free: 直接从经验学习 (Q-Learning, Policy Gradient)
  Model-based: 先学环境模型，再规划 (Dyna, MBPO)

按更新方式:
  On-policy: 用当前策略收集数据 (SARSA, PPO)
  Off-policy: 可以用旧数据 (Q-Learning, SAC)

按学习对象:
  Value-based: 学习 Q 函数，隐式策略 (DQN)
  Policy-based: 直接学习策略 (REINFORCE)
  Actor-Critic: 同时学习两者 (A3C, PPO)
\`\`\`

### Q-Learning vs SARSA

\`\`\`
Q-Learning (Off-policy):
  Q(s,a) ← Q(s,a) + α[r + γ·max_{a'} Q(s',a') - Q(s,a)]

  用最优动作更新，不管实际选了什么
  可以学习到最优策略

SARSA (On-policy):
  Q(s,a) ← Q(s,a) + α[r + γ·Q(s',a') - Q(s,a)]

  a' 是实际执行的动作
  学习当前策略的值函数

区别:
  Cliff Walking 例子:
    Q-Learning: 学到走悬崖边缘 (最短路)
    SARSA: 学到走安全路线 (考虑探索时的风险)
\`\`\`

### 优势函数 (Advantage Function)

\`\`\`
A(s,a) = Q(s,a) - V(s)

含义: 动作 a 比平均水平好多少

作用:
  - 减少策略梯度的方差
  - A > 0: 鼓励该动作
  - A < 0: 抑制该动作

估计方法:
  GAE (Generalized Advantage Estimation):
    A_t = Σ_{l=0}^∞ (γλ)^l · δ_{t+l}
    δ_t = r_t + γV(s_{t+1}) - V(s_t)  # TD 误差

    λ: 偏差-方差权衡
    λ=0: 只用一步 TD (低方差，高偏差)
    λ=1: 蒙特卡洛 (低偏差，高方差)
\`\`\``,
  },
  {
    id: 'cml9s5ec9003bt4xiwlc1mnpm', // Deep RL - Deep RL 核心算法
    content: `## 深度强化学习核心算法

深度学习 + 强化学习 = 可以处理高维状态空间（如图像）的 RL。

### DQN (Deep Q-Network, 2015)

**突破性创新**: 首次用深度神经网络成功玩 Atari 游戏

\`\`\`
三大创新:

1. Experience Replay:
   将 (s, a, r, s') 存入 buffer
   训练时随机采样 mini-batch
   打破样本相关性

2. Target Network:
   Q 网络参数: θ
   Target 网络参数: θ⁻ (定期从 θ 复制)

   L = E[(r + γ·max_{a'} Q(s',a';θ⁻) - Q(s,a;θ))²]

   防止训练目标不稳定

3. CNN 特征提取:
   原始像素 → CNN → Q 值
   端到端学习

训练循环:
  1. ε-greedy 选动作
  2. 执行动作，存储经验
  3. 采样 batch，计算 TD 目标
  4. 梯度下降更新 Q 网络
  5. 定期同步 target 网络
\`\`\`

**DQN 改进**:
\`\`\`
Double DQN:
  解决 Q 值过估计
  用 Q 网络选动作，target 网络评估:
  y = r + γ·Q(s', argmax_{a'} Q(s',a';θ); θ⁻)

Dueling DQN:
  分解 Q = V(s) + A(s,a)
  分别学习状态值和优势

Prioritized Experience Replay:
  按 TD 误差优先采样重要经验
  误差大 → 更多学习价值

Rainbow:
  组合多种改进: Double + Dueling + PER + ...
\`\`\`

### Policy Gradient

**直接优化策略**:
\`\`\`
策略: π_θ(a|s) - 神经网络输出动作概率

目标:
  J(θ) = E_{τ~π_θ}[R(τ)]

策略梯度定理:
  ∇J(θ) = E[Σ_t ∇log π_θ(a_t|s_t) · Ψ_t]

  Ψ_t 可以是:
    G_t: 总回报 (REINFORCE)
    G_t - b(s_t): 加 baseline
    A_t: 优势函数 (Actor-Critic)
\`\`\`

**REINFORCE**:
\`\`\`
最简单的策略梯度算法:

for episode:
    收集轨迹 τ = (s,a,r,...)
    for t in trajectory:
        θ ← θ + α · ∇log π_θ(a_t|s_t) · G_t

问题: 高方差
解决: 加 baseline b(s)
  通常 b(s) = V(s) → 优势函数
\`\`\`

### Actor-Critic

\`\`\`
结合值函数和策略:

Actor: 策略网络 π_θ(a|s)
Critic: 值网络 V_φ(s) 或 Q_φ(s,a)

更新:
  Critic: 最小化 TD 误差
    L_critic = (r + γV(s') - V(s))²

  Actor: 策略梯度
    L_actor = -log π(a|s) · A
    A = r + γV(s') - V(s)

A2C (Advantage Actor-Critic):
  同步更新多个 worker

A3C (Asynchronous A3C):
  异步更新，并行效率高
\`\`\`

### PPO (Proximal Policy Optimization, 2017)

**最实用的深度 RL 算法**:
\`\`\`
核心思想: 限制策略更新幅度

重要性采样比率:
  r_t(θ) = π_θ(a|s) / π_old(a|s)

Clipped 目标:
  L_CLIP = E[min(
    r_t(θ) · A_t,                      # 原始目标
    clip(r_t(θ), 1-ε, 1+ε) · A_t      # 裁剪目标
  )]

  ε 通常取 0.1 或 0.2

为什么有效:
  1. 限制更新幅度，防止策略崩溃
  2. 比 TRPO 简单，不需要二阶优化
  3. 经验上非常稳定

PPO 超参数:
  clip_ratio ε: 0.1-0.2
  learning_rate: 3e-4
  batch_size: 64-2048
  epochs per batch: 3-10
  GAE λ: 0.95
\`\`\`

### SAC (Soft Actor-Critic)

**最大熵强化学习**:
\`\`\`
目标: max E[Σ r + α·H(π(·|s))]

加入熵奖励:
  - 鼓励探索
  - 更鲁棒的策略
  - 避免过早收敛到确定性策略

特点:
  - Off-policy (样本效率高)
  - 自动调节温度 α
  - 连续动作空间效果好
  - 机器人控制的常用选择
\`\`\`

### PPO 在 RLHF 中的应用

\`\`\`
RLHF 目标:
  max E[R(x,y)] - β·KL(π_θ || π_ref)

PPO 优化:
  r_t = R(x,y) - β·log(π_θ(y|x) / π_ref(y|x))

  与标准 PPO 的区别:
    - 奖励来自奖励模型，不是环境
    - KL 惩罚防止偏离太远
    - 每个 response 只有一个奖励 (稀疏)

技术细节:
  - Value head 预测 response 的值
  - GAE 估计优势
  - Clip 防止大更新
  - 通常只做几步 PPO 更新/batch
\`\`\``,
  },
]

const NEW_NOTES = [
  {
    taskTitle: 'Transformer Architecture',
    title: 'Transformer 完整架构详解',
    content: `## Transformer 完整架构

### Encoder-Decoder 结构

\`\`\`
原始 Transformer (机器翻译):

Encoder:
  输入 → Embedding + PE → [Multi-Head Attention → Add&Norm → FFN → Add&Norm] × N

Decoder:
  输出 → Embedding + PE → [Masked MHA → Add&Norm → Cross-Attention → Add&Norm → FFN → Add&Norm] × N → Linear → Softmax

现代 LLM (GPT 系列):
  只用 Decoder，去掉 Cross-Attention
  自回归生成
\`\`\`

### Feed-Forward Network (FFN)

\`\`\`
FFN(x) = GELU(x W_1 + b_1) W_2 + b_2

通常 d_ff = 4 × d_model
例: d_model = 768 → d_ff = 3072

作用:
  - 非线性变换
  - 存储知识 (研究表明 FFN 像 key-value 存储)
  - 位置无关的处理

变体:
  GLU (Gated Linear Unit):
    FFN(x) = (x W_1) ⊙ σ(x W_gate) W_2
  SwiGLU (LLaMA 使用):
    FFN(x) = (Swish(x W_1) ⊙ (x W_gate)) W_2
\`\`\`

### Layer Normalization

\`\`\`
Pre-LN (现代默认):
  x' = x + Attention(LN(x))
  x'' = x' + FFN(LN(x'))

  优点: 训练更稳定，可以省略 warmup

Post-LN (原始 Transformer):
  x' = LN(x + Attention(x))
  x'' = LN(x' + FFN(x'))

  需要更小的学习率和 warmup

RMSNorm (LLaMA):
  只做缩放，不做偏移
  更快，效果相当
\`\`\``,
  },
  {
    taskTitle: 'Large Language Models',
    title: '涌现能力与扩展定律',
    content: `## LLM 涌现能力与 Scaling Laws

### 涌现能力 (Emergent Abilities)

\`\`\`
定义: 小模型完全没有，大模型突然出现的能力

例子:
  - 多步算术推理 (8B+ 参数)
  - 上下文学习 (few-shot, 10B+)
  - 思维链推理 (Chain-of-Thought, 100B+)
  - 代码生成 (62B+)

特点:
  - 不是渐进提升，而是突然"涌现"
  - 难以预测何时出现
  - 可能是评估指标的问题 (非线性度量)
\`\`\`

### Scaling Laws

\`\`\`
Kaplan et al. (2020):
  L ∝ N^{-0.076}  (参数数量)
  L ∝ D^{-0.095}  (数据量)
  L ∝ C^{-0.050}  (计算量)

  Loss 与三者都是幂律关系

Chinchilla (2022):
  最优配置: 数据和参数量等比例扩展
  每个参数应该对应 ~20 tokens

  重新训练 70B 模型:
    原始 Gopher: 280B 参数, 300B tokens
    Chinchilla: 70B 参数, 1.4T tokens
    效果相当，推理快 4x

LLaMA 的策略:
  超过 Chinchilla 最优训练
  7B 模型训练 1T+ tokens
  推理效率优先
\`\`\`

### 上下文学习 (In-Context Learning)

\`\`\`
Zero-shot:
  "翻译成英语: 你好"

One-shot:
  "你好 → Hello
   再见 → "

Few-shot:
  "你好 → Hello
   再见 → Goodbye
   谢谢 → "

神奇之处:
  - 不更新参数，只靠输入
  - 示例数量增加，效果提升
  - 类似于"隐式梯度下降"

理论解释:
  - Attention 可以实现梯度下降
  - 模型在"内部微调"
  - 与元学习的联系
\`\`\``,
  },
]

async function main() {
  console.log('Expanding advanced topic notes...\n')

  for (const update of NOTE_UPDATES) {
    const note = await prisma.note.update({
      where: { id: update.id },
      data: { content: update.content },
      include: { task: { select: { title: true } } },
    })
    console.log(`  ✓ Updated: [${note.task.title}] ${note.title} (${update.content.length} chars)`)
  }

  for (const newNote of NEW_NOTES) {
    const task = await prisma.task.findFirst({ where: { title: newNote.taskTitle } })
    if (!task) {
      console.log(`  ✗ Task not found: ${newNote.taskTitle}`)
      continue
    }
    await prisma.note.create({
      data: { taskId: task.id, title: newNote.title, content: newNote.content },
    })
    console.log(`  + New: [${newNote.taskTitle}] ${newNote.title} (${newNote.content.length} chars)`)
  }

  console.log('\nDone!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
