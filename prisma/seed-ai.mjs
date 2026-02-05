import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ─── Category Groups ─────────────────────────────────────────
const CATEGORY_GROUPS = [
  { name: 'AI 基础', position: 0, categoryNames: ['数学基础', '机器学习'] },
  { name: 'AI 核心领域', position: 1, categoryNames: ['深度学习', '自然语言处理', '计算机视觉', '强化学习'] },
  { name: 'AI 工程与实践', position: 2, categoryNames: ['AI 系统工程', 'AI 前沿与安全'] },
]

// ─── Categories ───────────────────────────────────────────────
const CATEGORIES = [
  { name: '数学基础', color: '#3B82F6', position: 0 },
  { name: '机器学习', color: '#10B981', position: 1 },
  { name: '深度学习', color: '#8B5CF6', position: 2 },
  { name: '自然语言处理', color: '#F59E0B', position: 3 },
  { name: '计算机视觉', color: '#EF4444', position: 4 },
  { name: '强化学习', color: '#EC4899', position: 5 },
  { name: 'AI 系统工程', color: '#06B6D4', position: 6 },
  { name: 'AI 前沿与安全', color: '#F97316', position: 7 },
]

// ─── Quests ───────────────────────────────────────────────────
const QUESTS = [
  // ── 数学基础 ──
  {
    categoryName: '数学基础',
    title: 'Linear Algebra for AI',
    description: '掌握 AI/ML 所需的线性代数核心概念：向量空间、矩阵分解、特征值与 SVD，理解它们在降维、推荐系统和深度学习中的应用。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解向量空间、线性变换、基变换',
      '掌握矩阵分解：LU、QR、SVD、Cholesky',
      '理解特征值分解与 PCA 的关系',
      '应用矩阵微积分于反向传播',
    ],
    resources: [
      { title: 'MIT 18.06 Linear Algebra (Gilbert Strang)', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course' },
      { title: 'Mathematics for Machine Learning (Book)', url: 'https://mml-book.github.io/', type: 'book' },
      { title: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'video' },
    ],
    milestones: [
      { title: '向量空间与线性变换', completed: false },
      { title: '矩阵分解技术', completed: false },
      { title: 'SVD 与 PCA 推导', completed: false },
      { title: '矩阵微积分与 Jacobian', completed: false },
    ],
    notes: [
      {
        title: '核心概念：矩阵分解',
        content: `## 矩阵分解总览

| 分解 | 形式 | 用途 |
|------|------|------|
| EVD | $A = Q\\Lambda Q^{-1}$ | 特征分析、PCA |
| SVD | $A = U\\Sigma V^T$ | 降维、推荐、压缩 |
| QR  | $A = QR$ | 最小二乘、数值稳定 |
| Cholesky | $A = LL^T$ | 正定矩阵、高斯过程 |

## SVD 在 ML 中的应用

1. **PCA**: 对中心化数据矩阵做 SVD，取前 k 个奇异值对应的方向
2. **推荐系统**: 低秩矩阵近似 $A \\approx U_k \\Sigma_k V_k^T$
3. **文本分析**: LSA (Latent Semantic Analysis) 就是对 TF-IDF 矩阵做 SVD

## 关键性质

- 正交矩阵 $Q^TQ = I$，保持向量长度和角度
- 特征值的迹 = 矩阵的迹 $\\text{tr}(A) = \\sum \\lambda_i$
- 奇异值 $\\sigma_i = \\sqrt{\\lambda_i(A^TA)}$`,
      },
      {
        title: '矩阵微积分速查',
        content: `## 矩阵微积分 — 反向传播的数学基础

### 标量对向量求导

$$\\frac{\\partial}{\\partial \\mathbf{x}} \\mathbf{a}^T\\mathbf{x} = \\mathbf{a}$$

$$\\frac{\\partial}{\\partial \\mathbf{x}} \\mathbf{x}^TA\\mathbf{x} = (A + A^T)\\mathbf{x}$$

### 链式法则（向量形式）

$$\\frac{\\partial L}{\\partial \\mathbf{x}} = \\frac{\\partial \\mathbf{y}}{\\partial \\mathbf{x}}^T \\frac{\\partial L}{\\partial \\mathbf{y}}$$

其中 $\\frac{\\partial \\mathbf{y}}{\\partial \\mathbf{x}}$ 是 Jacobian 矩阵。

### 在神经网络中

对于线性层 $\\mathbf{y} = W\\mathbf{x} + \\mathbf{b}$：

- $\\frac{\\partial L}{\\partial W} = \\frac{\\partial L}{\\partial \\mathbf{y}} \\mathbf{x}^T$
- $\\frac{\\partial L}{\\partial \\mathbf{x}} = W^T \\frac{\\partial L}{\\partial \\mathbf{y}}$
- $\\frac{\\partial L}{\\partial \\mathbf{b}} = \\frac{\\partial L}{\\partial \\mathbf{y}}$`,
      },
    ],
  },
  {
    categoryName: '数学基础',
    title: 'Probability & Statistics',
    description: '概率论与数理统计是 ML 的理论基石：贝叶斯推断、概率分布、参数估计、假设检验。理解不确定性建模对所有 ML 方法至关重要。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '掌握常用概率分布及其性质',
      '理解贝叶斯定理与贝叶斯推断',
      '掌握 MLE 与 MAP 估计',
      '理解大数定律与中心极限定理',
    ],
    resources: [
      { title: 'Harvard Stat 110: Probability', url: 'https://projects.iq.harvard.edu/stat110', type: 'course' },
      { title: 'Pattern Recognition and Machine Learning (Bishop)', url: 'https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/', type: 'book' },
    ],
    milestones: [
      { title: '概率空间与条件概率', completed: false },
      { title: '常用分布族', completed: false },
      { title: '参数估计 (MLE / MAP)', completed: false },
      { title: '贝叶斯推断框架', completed: false },
    ],
    notes: [
      {
        title: '常用概率分布速查',
        content: `## ML 中常用分布

| 分布 | 用途 | 期望 | 方差 |
|------|------|------|------|
| Bernoulli(p) | 二分类 | p | p(1-p) |
| Categorical(p) | 多分类 | - | - |
| Gaussian(μ,σ²) | 连续特征 | μ | σ² |
| Poisson(λ) | 计数数据 | λ | λ |
| Beta(α,β) | 概率的先验 | α/(α+β) | αβ/((α+β)²(α+β+1)) |
| Dirichlet(α) | 多分类先验 | αᵢ/α₀ | - |

## 共轭先验

先验和后验属于同一分布族，便于贝叶斯更新：

- **Beta-Binomial**: Beta 先验 + 二项似然 → Beta 后验
- **Gaussian-Gaussian**: 正态先验 + 正态似然 → 正态后验
- **Dirichlet-Multinomial**: Dirichlet 先验 + 多项似然 → Dirichlet 后验

## MLE vs MAP

\`\`\`
MLE: θ* = argmax P(D|θ)        // 只看数据
MAP: θ* = argmax P(θ|D)        // 加入先验
    = argmax P(D|θ)·P(θ)

当先验是 Gaussian → MAP = L2 正则化 (Ridge)
当先验是 Laplace  → MAP = L1 正则化 (Lasso)
\`\`\``,
      },
    ],
  },
  {
    categoryName: '数学基础',
    title: 'Optimization Theory',
    description: '优化是训练所有 ML 模型的核心引擎。掌握梯度下降变体、凸优化理论、约束优化与现代自适应优化器。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解凸优化的基本理论',
      '掌握 SGD 及其变体 (Momentum, Adam, AdaGrad)',
      '理解学习率调度与收敛分析',
      '掌握约束优化：拉格朗日乘子法与 KKT 条件',
    ],
    resources: [
      { title: 'Convex Optimization (Boyd & Vandenberghe)', url: 'https://web.stanford.edu/~boyd/cvxbook/', type: 'book' },
      { title: 'An overview of gradient descent optimization algorithms', url: 'https://arxiv.org/abs/1609.04747', type: 'paper' },
    ],
    milestones: [
      { title: '凸函数与凸集', completed: false },
      { title: 'SGD 及自适应优化器', completed: false },
      { title: '约束优化与 KKT', completed: false },
      { title: '二阶方法与近似', completed: false },
    ],
    notes: [
      {
        title: 'SGD 变体对比',
        content: `## 优化器演进

### Vanilla SGD
\`\`\`
θ = θ - η · ∇L(θ)
\`\`\`
问题：学习率固定，所有参数共享同一步长。

### Momentum
\`\`\`
v = β·v + ∇L(θ)
θ = θ - η·v
\`\`\`
加速收敛，减少振荡。β 通常取 0.9。

### Adam (Adaptive Moment Estimation)
\`\`\`
m = β₁·m + (1-β₁)·∇L         // 一阶矩 (均值)
v = β₂·v + (1-β₂)·(∇L)²      // 二阶矩 (方差)
m̂ = m / (1-β₁ᵗ)               // 偏差修正
v̂ = v / (1-β₂ᵗ)
θ = θ - η · m̂ / (√v̂ + ε)
\`\`\`
默认: β₁=0.9, β₂=0.999, ε=1e-8

### AdamW (Weight Decay 修正)
\`\`\`
θ = θ - η · (m̂ / (√v̂ + ε) + λ·θ)
\`\`\`
AdamW 将 weight decay 从梯度中解耦，是目前 LLM 训练的标准选择。

## 学习率调度

| 策略 | 公式 | 场景 |
|------|------|------|
| Step Decay | η = η₀ · γ^(epoch/step) | 传统 CNN |
| Cosine Annealing | η = η_min + 0.5(η_max - η_min)(1 + cos(πt/T)) | Transformer |
| Warmup + Decay | 线性增长 → cosine 衰减 | LLM 预训练 |
| OneCycleLR | warmup → max → 衰减 | 快速收敛 |`,
      },
    ],
  },
  {
    categoryName: '数学基础',
    title: 'Information Theory',
    description: '信息论为理解 ML 中的损失函数、模型压缩和表示学习提供了理论框架。熵、KL 散度和互信息是核心概念。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解熵、联合熵、条件熵',
      '掌握 KL 散度与交叉熵',
      '理解互信息及其在特征选择中的应用',
      '连接信息论与 ML 损失函数',
    ],
    resources: [
      { title: 'Elements of Information Theory (Cover & Thomas)', url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/047174882X', type: 'book' },
      { title: 'Information Theory, Inference and Learning Algorithms (MacKay)', url: 'https://www.inference.org.uk/itprnn/book.html', type: 'book' },
    ],
    milestones: [
      { title: '熵与编码', completed: false },
      { title: 'KL 散度与交叉熵', completed: false },
      { title: '互信息与信息瓶颈', completed: false },
    ],
    notes: [
      {
        title: '信息论核心公式',
        content: `## 信息论与 ML 的桥梁

### 核心量

\`\`\`
熵:          H(X) = -Σ p(x) log p(x)        // 不确定性度量
交叉熵:      H(p,q) = -Σ p(x) log q(x)      // ML 分类损失函数
KL 散度:     D_KL(p||q) = Σ p(x) log(p(x)/q(x))  // 分布差异
互信息:      I(X;Y) = H(X) - H(X|Y)         // 共享信息量
\`\`\`

### 关键关系

$$H(p, q) = H(p) + D_{KL}(p \\| q)$$

最小化交叉熵 = 最小化 KL 散度（因为 H(p) 是常数）

### 在 ML 中的应用

| 概念 | ML 应用 |
|------|---------|
| 交叉熵 | 分类损失函数 |
| KL 散度 | VAE 的正则项, 知识蒸馏 |
| 互信息 | 特征选择, 对比学习 (InfoNCE) |
| 信息瓶颈 | 深度学习的泛化理论 |
| 最大熵原则 | Softmax 的理论基础 |`,
      },
    ],
  },

  // ── 机器学习 ──
  {
    categoryName: '机器学习',
    title: 'Supervised Learning',
    description: '监督学习是最经典的 ML 范式。深入理解线性模型、核方法、决策树以及偏差-方差权衡。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '掌握线性回归、逻辑回归的推导与正则化',
      '理解 SVM 的对偶问题与核技巧',
      '掌握决策树的分裂准则与剪枝',
      '理解偏差-方差分解与模型选择',
    ],
    resources: [
      { title: 'Stanford CS229: Machine Learning', url: 'https://cs229.stanford.edu/', type: 'course' },
      { title: 'The Elements of Statistical Learning', url: 'https://hastie.su.domains/ElemStatLearn/', type: 'book' },
      { title: 'Scikit-learn Documentation', url: 'https://scikit-learn.org/stable/', type: 'documentation' },
    ],
    milestones: [
      { title: '线性模型与正则化', completed: false },
      { title: 'SVM 与核方法', completed: false },
      { title: '决策树与信息增益', completed: false },
      { title: '偏差-方差权衡', completed: false },
    ],
    notes: [
      {
        title: '偏差-方差分解',
        content: `## 偏差-方差权衡 (Bias-Variance Tradeoff)

### 期望误差分解

$$E[(y - \\hat{f}(x))^2] = \\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Noise}$$

| 来源 | 含义 | 模型复杂度关系 |
|------|------|---------------|
| Bias² | 模型假设偏离真实 | 复杂度↑ → Bias↓ |
| Variance | 模型对数据敏感度 | 复杂度↑ → Variance↑ |
| Noise | 数据固有噪声 | 无法消除 |

### 正则化的本质

\`\`\`
L2 (Ridge): L + λ||w||²    → 缩小权重，不置零
L1 (Lasso): L + λ||w||₁    → 稀疏化，特征选择
ElasticNet: L + λ₁||w||₁ + λ₂||w||²  → 兼顾两者
\`\`\`

### 模型复杂度谱

\`\`\`
低 ←────────── 复杂度 ──────────→ 高
线性回归 → 多项式回归 → 决策树 → 随机森林 → 神经网络
高偏差                                        高方差
欠拟合                                        过拟合
\`\`\``,
      },
    ],
  },
  {
    categoryName: '机器学习',
    title: 'Unsupervised Learning',
    description: '无监督学习从无标注数据中发现结构：聚类、降维、密度估计。理解这些方法对特征工程和数据探索至关重要。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握 K-Means、DBSCAN、层次聚类',
      '理解 PCA、t-SNE、UMAP 的原理与适用场景',
      '掌握高斯混合模型与 EM 算法',
      '理解自编码器与表示学习',
    ],
    resources: [
      { title: 'Stanford CS246: Mining Massive Datasets', url: 'https://web.stanford.edu/class/cs246/', type: 'course' },
      { title: 'UMAP: Uniform Manifold Approximation and Projection', url: 'https://arxiv.org/abs/1802.03426', type: 'paper' },
    ],
    milestones: [
      { title: '聚类算法', completed: false },
      { title: '降维方法对比', completed: false },
      { title: 'EM 算法与 GMM', completed: false },
    ],
    notes: [
      {
        title: '降维方法对比',
        content: `## 降维方法速查

| 方法 | 类型 | 保留 | 适用 |
|------|------|------|------|
| PCA | 线性 | 全局方差 | 特征预处理、去相关 |
| t-SNE | 非线性 | 局部结构 | 2D/3D 可视化 |
| UMAP | 非线性 | 局部+全局 | 可视化 + 下游任务 |
| Autoencoders | 非线性 | 学习表示 | 复杂数据、生成 |

### PCA 核心步骤

\`\`\`
1. 中心化: X_centered = X - mean(X)
2. 协方差矩阵: C = X^T X / (n-1)
3. 特征分解: C = QΛQ^T
4. 投影: X_reduced = X · Q[:, :k]
\`\`\`

### t-SNE vs UMAP

- **t-SNE**: 用 t 分布建模低维相似度，解决拥挤问题。不保全局结构。
- **UMAP**: 基于流形假设和模糊拓扑，速度更快，可用于嵌入下游任务。

### EM 算法框架

\`\`\`
重复直到收敛:
  E-step: 计算隐变量的后验 q(z) = P(z|x,θ)
  M-step: 最大化期望完整数据对数似然
         θ* = argmax_θ E_q[log P(x,z|θ)]
\`\`\``,
      },
    ],
  },
  {
    categoryName: '机器学习',
    title: 'Ensemble Methods',
    description: '集成学习通过组合多个模型提升性能。掌握 Bagging、Boosting 和 Stacking 的原理，以及 XGBoost 等工业级工具。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解 Bagging 原理与随机森林',
      '掌握 Boosting: AdaBoost → GBDT → XGBoost → LightGBM',
      '理解 Stacking 与模型融合策略',
      '掌握超参数调优与交叉验证',
    ],
    resources: [
      { title: 'XGBoost Documentation', url: 'https://xgboost.readthedocs.io/', type: 'documentation' },
      { title: 'Kaggle Ensemble Guide', url: 'https://mlwave.com/kaggle-ensembling-guide/', type: 'article' },
    ],
    milestones: [
      { title: 'Bagging 与 Random Forest', completed: false },
      { title: 'Boosting 家族', completed: false },
      { title: 'Stacking 与实战调优', completed: false },
    ],
    notes: [
      {
        title: 'Boosting 算法演进',
        content: `## Boosting 算法演进

### 核心思想

串行训练弱学习器，每一轮关注前一轮的错误。

### AdaBoost → GBDT → XGBoost

**AdaBoost**: 调整样本权重
\`\`\`
1. 初始化样本权重 w_i = 1/N
2. 训练弱学习器 h_t
3. 计算加权错误率 ε_t
4. 学习器权重 α_t = 0.5 · ln((1-ε_t)/ε_t)
5. 更新样本权重（错误样本权重增大）
\`\`\`

**GBDT**: 拟合残差（负梯度）
\`\`\`
F_m(x) = F_{m-1}(x) + η · h_m(x)
h_m 拟合目标: 负梯度 -∂L/∂F_{m-1}
\`\`\`

**XGBoost 改进**:
- 二阶泰勒展开 (利用 Hessian)
- 正则化项: Ω(f) = γT + 0.5λ||w||²
- 列采样 + 缺失值处理
- 分布式 + GPU 加速

### 选型建议

| 场景 | 推荐 |
|------|------|
| 表格数据竞赛 | XGBoost / LightGBM |
| 大规模数据 | LightGBM (直方图加速) |
| 类别特征多 | CatBoost |
| 需要可解释性 | 单棵决策树 / SHAP |`,
      },
    ],
  },
  {
    categoryName: '机器学习',
    title: 'Probabilistic Graphical Models',
    description: '概率图模型是结构化概率推断的框架：贝叶斯网络、马尔可夫随机场、隐马尔可夫模型。理解 PGM 有助于深入变分推断和生成模型。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解有向图模型（贝叶斯网络）与无向图模型（MRF）',
      '掌握精确推断：变量消除、信念传播',
      '掌握近似推断：MCMC、变分推断',
      '理解 HMM 与 Viterbi 算法',
    ],
    resources: [
      { title: 'Stanford CS228: Probabilistic Graphical Models', url: 'https://cs228.stanford.edu/', type: 'course' },
      { title: 'Probabilistic Graphical Models (Koller & Friedman)', url: 'https://mitpress.mit.edu/9780262013192/', type: 'book' },
    ],
    milestones: [
      { title: '贝叶斯网络', completed: false },
      { title: '推断算法', completed: false },
      { title: '变分推断 (VI)', completed: false },
      { title: 'HMM 与序列模型', completed: false },
    ],
    notes: [
      {
        title: '推断方法对比',
        content: `## 推断方法

### 精确推断

- **变量消除**: 按序消除隐变量，求边际概率
- **信念传播 (BP)**: 在树结构图上消息传递，线性时间
- **Junction Tree**: 将图转为树，适用于小规模精确推断

### 近似推断

**MCMC (马尔可夫链蒙特卡洛)**:
\`\`\`
从目标分布 P(θ|D) 采样:
- Metropolis-Hastings: 通用，但可能收敛慢
- Gibbs Sampling: 依次采样每个维度的条件分布
- HMC (Hamiltonian MC): 利用梯度信息，高效采样高维
\`\`\`

**变分推断 (VI)**:
\`\`\`
将推断转化为优化:
目标: 找 q(z) 最小化 KL(q(z) || p(z|x))
等价: 最大化 ELBO = E_q[log p(x,z)] - E_q[log q(z)]

Mean-Field VI: q(z) = Π q_i(z_i)  // 假设独立
\`\`\`

| 方法 | 优点 | 缺点 |
|------|------|------|
| MCMC | 渐近精确 | 慢，难判断收敛 |
| VI | 快速，可扩展 | 低估方差，近似 |`,
      },
    ],
  },

  // ── 深度学习 ──
  {
    categoryName: '深度学习',
    title: 'Neural Network Fundamentals',
    description: '神经网络的基石：前向传播、反向传播、激活函数、权重初始化、Batch Normalization 等工程实践。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '推导反向传播算法',
      '掌握激活函数的选择与特性',
      '理解权重初始化策略 (Xavier, He)',
      '掌握正则化技术: Dropout, BN, LayerNorm',
    ],
    resources: [
      { title: 'Stanford CS231n: Deep Learning for Vision', url: 'https://cs231n.stanford.edu/', type: 'course' },
      { title: 'Deep Learning (Goodfellow, Bengio, Courville)', url: 'https://www.deeplearningbook.org/', type: 'book' },
      { title: 'PyTorch Documentation', url: 'https://pytorch.org/docs/', type: 'documentation' },
    ],
    milestones: [
      { title: '前向传播与计算图', completed: false },
      { title: '反向传播推导', completed: false },
      { title: '初始化与归一化', completed: false },
      { title: '正则化实践', completed: false },
    ],
    notes: [
      {
        title: '激活函数与初始化',
        content: `## 激活函数选择

| 函数 | 公式 | 优点 | 缺点 |
|------|------|------|------|
| ReLU | max(0,x) | 简单高效，缓解梯度消失 | 死神经元 |
| LeakyReLU | max(αx,x) | 避免死神经元 | α 需调参 |
| GELU | x·Φ(x) | 平滑，Transformer 默认 | 计算略贵 |
| SiLU/Swish | x·σ(x) | 平滑非单调 | 计算略贵 |
| Softmax | exp(xᵢ)/Σexp(xⱼ) | 多分类输出层 | 仅用于输出 |

## 权重初始化

### Xavier (Glorot) — 用于 tanh/sigmoid
\`\`\`
W ~ N(0, 2/(n_in + n_out))
\`\`\`

### He (Kaiming) — 用于 ReLU
\`\`\`
W ~ N(0, 2/n_in)
\`\`\`

### 归一化层对比

| 方法 | 归一化维度 | 典型用途 |
|------|-----------|---------|
| BatchNorm | batch 维度 | CNN |
| LayerNorm | feature 维度 | Transformer |
| GroupNorm | channel 分组 | 小 batch CNN |
| RMSNorm | feature (无偏移) | LLaMA, 高效 LN |`,
      },
    ],
  },
  {
    categoryName: '深度学习',
    title: 'CNN Architectures',
    description: '卷积神经网络的演进：从 LeNet 到现代架构（ResNet, EfficientNet, ConvNeXt），以及迁移学习实践。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解卷积、池化、感受野的数学',
      '掌握经典架构演进: LeNet → VGG → ResNet → EfficientNet',
      '理解残差连接为何有效',
      '掌握迁移学习与微调策略',
    ],
    resources: [
      { title: 'Stanford CS231n', url: 'https://cs231n.stanford.edu/', type: 'course' },
      { title: 'Deep Residual Learning (He et al.)', url: 'https://arxiv.org/abs/1512.03385', type: 'paper' },
    ],
    milestones: [
      { title: '卷积原理与特征图', completed: false },
      { title: '架构演进', completed: false },
      { title: '迁移学习实践', completed: false },
    ],
    notes: [
      {
        title: 'CNN 架构演进',
        content: `## CNN 里程碑

\`\`\`
LeNet (1998)    → 手写数字，5层
AlexNet (2012)  → ImageNet 突破，ReLU + Dropout + GPU
VGG (2014)      → 3x3 小卷积堆叠，深度取胜
GoogLeNet (2014)→ Inception 模块，多尺度
ResNet (2015)   → 残差连接，152层！
DenseNet (2017) → 密集连接，特征复用
EfficientNet (2019) → 复合缩放 (深度×宽度×分辨率)
ConvNeXt (2022) → "现代化" ResNet，对标 ViT
\`\`\`

## 残差连接的关键

\`\`\`
y = F(x) + x     // 学习残差 F(x) 比学习完整映射更容易
\`\`\`

为何有效:
1. **梯度高速公路**: 梯度可以直接流过 skip connection
2. **恒等映射**: 最坏情况下 F(x)=0，网络退化为浅层
3. **集成效应**: ResNet 等效于多条路径的隐式集成

## 输出尺寸计算

\`\`\`
O = (I - K + 2P) / S + 1

I = 输入大小, K = 核大小
P = padding,  S = stride
\`\`\``,
      },
    ],
  },
  {
    categoryName: '深度学习',
    title: 'Transformer Architecture',
    description: '深入 Transformer 的每个组件：自注意力、多头注意力、位置编码、FFN。理解 Transformer 是掌握现代 NLP 和多模态 AI 的关键。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '从零推导 Scaled Dot-Product Attention',
      '理解多头注意力的动机与实现',
      '掌握位置编码: 正弦、RoPE、ALiBi',
      '理解 Transformer 的缩放定律 (Scaling Laws)',
    ],
    resources: [
      { title: 'Attention Is All You Need (Vaswani et al.)', url: 'https://arxiv.org/abs/1706.03762', type: 'paper' },
      { title: 'The Illustrated Transformer (Jay Alammar)', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'article' },
      { title: 'Stanford CS224n: NLP with Deep Learning', url: 'https://web.stanford.edu/class/cs224n/', type: 'course' },
      { title: 'Scaling Laws for Neural Language Models', url: 'https://arxiv.org/abs/2001.08361', type: 'paper' },
    ],
    milestones: [
      { title: 'Self-Attention 机制', completed: true },
      { title: '多头注意力与 FFN', completed: false },
      { title: '位置编码方案', completed: false },
      { title: 'Scaling Laws', completed: false },
    ],
    notes: [
      {
        title: 'Self-Attention 详解',
        content: `## Scaled Dot-Product Attention

### 核心公式

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

### 为什么除以 √d_k ?

当 d_k 很大时，$QK^T$ 的方差约为 d_k，导致 softmax 进入饱和区梯度接近 0。
除以 $\\sqrt{d_k}$ 使方差稳定在 1。

### 多头注意力

\`\`\`python
# 将 d_model 拆分为 h 个头，每个头 d_k = d_model / h
MultiHead(Q, K, V):
    for i in range(h):
        head_i = Attention(Q·W_i^Q, K·W_i^K, V·W_i^V)
    return Concat(head_1, ..., head_h) · W^O
\`\`\`

多头的意义: 不同头可以关注不同类型的依赖关系（语法、语义、位置等）。

### 注意力变体

| 变体 | 复杂度 | 描述 |
|------|--------|------|
| Full Attention | O(n²d) | 标准, 质量最高 |
| MQA (Multi-Query) | O(n²d/h) | KV 共享, 推理快 |
| GQA (Grouped-Query) | 介于两者 | LLaMA 2 使用 |
| Flash Attention | O(n²d) 但 IO 优化 | 内存高效, 速度 2-4x |`,
      },
      {
        title: '位置编码方案',
        content: `## 位置编码对比

### 正弦位置编码 (Original Transformer)
\`\`\`
PE(pos, 2i)   = sin(pos / 10000^(2i/d))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d))
\`\`\`
- 绝对位置编码
- 可推广到未见长度（理论上）
- 实际泛化能力有限

### RoPE (Rotary Position Embedding)
\`\`\`
将位置信息编码为旋转矩阵:
f(q, m) = R(m) · q  // m 是位置，R 是旋转矩阵

使得: <f(q,m), f(k,n)> 仅依赖于 (q, k, m-n)
\`\`\`
- 相对位置编码
- 自然衰减远距离注意力
- LLaMA, GPT-NeoX 使用

### ALiBi (Attention with Linear Biases)
\`\`\`
Attention(Q,K,V) = softmax(QK^T/√d + m·bias)
bias[i][j] = -|i-j|  // 线性距离惩罚
\`\`\`
- 无需额外参数
- 训练短序列、推理长序列
- BLOOM 使用`,
      },
    ],
  },
  {
    categoryName: '深度学习',
    title: 'Generative Models',
    description: '生成模型学习数据分布并生成新样本：VAE、GAN、扩散模型、Flow-based 模型。理解这些模型对掌握 AIGC 至关重要。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解 VAE 的 ELBO 推导',
      '掌握 GAN 的对抗训练与模式崩塌',
      '深入理解扩散模型 (DDPM, Score-based)',
      '了解 Flow-based 模型 (Normalizing Flows)',
    ],
    resources: [
      { title: 'Auto-Encoding Variational Bayes (Kingma)', url: 'https://arxiv.org/abs/1312.6114', type: 'paper' },
      { title: 'Denoising Diffusion Probabilistic Models', url: 'https://arxiv.org/abs/2006.11239', type: 'paper' },
      { title: 'Lil\'Log: What are Diffusion Models?', url: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/', type: 'article' },
    ],
    milestones: [
      { title: 'VAE 与 ELBO', completed: false },
      { title: 'GAN 训练技巧', completed: false },
      { title: '扩散模型 (DDPM)', completed: false },
      { title: '条件生成与引导', completed: false },
    ],
    notes: [
      {
        title: '生成模型框架对比',
        content: `## 四大生成模型

### VAE (Variational Autoencoder)
\`\`\`
ELBO = E_q[log p(x|z)] - KL(q(z|x) || p(z))
       ├── 重构项         └── 正则项

编码器: q(z|x) → 近似后验
解码器: p(x|z) → 似然
先验:   p(z) = N(0, I)
\`\`\`

### GAN (Generative Adversarial Network)
\`\`\`
min_G max_D  E[log D(x)] + E[log(1 - D(G(z)))]

生成器 G: 噪声 → 假样本
判别器 D: 区分真假样本
\`\`\`

### Diffusion Model (DDPM)
\`\`\`
前向过程: 逐步加噪
  q(x_t|x_{t-1}) = N(x_t; √(1-β_t)·x_{t-1}, β_t·I)

反向过程: 学习去噪
  p_θ(x_{t-1}|x_t) = N(x_{t-1}; μ_θ(x_t,t), σ_t²·I)

训练目标: 预测噪声 ε
  L = E[||ε - ε_θ(x_t, t)||²]
\`\`\`

### 对比总结

| 模型 | 优点 | 缺点 | 代表应用 |
|------|------|------|---------|
| VAE | 有概率解释, 稳定 | 生成模糊 | 异常检测 |
| GAN | 生成清晰 | 训练不稳定 | StyleGAN |
| Diffusion | 质量最高, 稳定 | 采样慢 | Stable Diffusion |
| Flow | 精确似然 | 架构受限 | Glow |`,
      },
    ],
  },

  // ── 自然语言处理 ──
  {
    categoryName: '自然语言处理',
    title: 'Text Representation & Embeddings',
    description: '文本的向量化表示是 NLP 的基础。从稀疏表示 (BoW, TF-IDF) 到密集嵌入 (Word2Vec, BERT embeddings)。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解稀疏表示: BoW, TF-IDF',
      '掌握 Word2Vec (CBOW/Skip-gram) 与 GloVe',
      '理解上下文嵌入 (ELMo → BERT)',
      '掌握句子/文档嵌入方法',
    ],
    resources: [
      { title: 'Word2Vec (Mikolov et al.)', url: 'https://arxiv.org/abs/1301.3781', type: 'paper' },
      { title: 'Stanford CS224n', url: 'https://web.stanford.edu/class/cs224n/', type: 'course' },
    ],
    milestones: [
      { title: '稀疏表示方法', completed: false },
      { title: 'Word2Vec 与 GloVe', completed: false },
      { title: '上下文嵌入', completed: false },
    ],
    notes: [
      {
        title: '嵌入方法演进',
        content: `## 文本表示演进

### 第一代: 稀疏表示
\`\`\`
BoW (Bag of Words): 词频向量, 忽略顺序
TF-IDF: 加权词频, 降低常见词权重
  TF-IDF(t,d) = TF(t,d) × log(N/DF(t))
\`\`\`

### 第二代: 静态嵌入
\`\`\`
Word2Vec - Skip-gram:
  目标: 用中心词预测上下文
  P(context|center) = softmax(v_c · v_w)

Word2Vec - CBOW:
  目标: 用上下文预测中心词

GloVe: 基于共现矩阵的矩阵分解
  J = Σ f(X_ij)(w_i·w_j + b_i + b_j - log X_ij)²
\`\`\`
局限: 一词一向量，无法处理多义词。

### 第三代: 上下文嵌入
\`\`\`
ELMo (2018):  BiLSTM 语言模型，层级表示
BERT (2019):  双向 Transformer, MLM + NSP
GPT (2018):   单向 Transformer, 自回归

"bank" → 不同上下文得到不同向量
\`\`\`

### 现代句子嵌入
\`\`\`
Sentence-BERT: 孪生网络 + 对比学习
E5/BGE:       指令引导的嵌入模型
OpenAI Ada-002: API 嵌入服务
\`\`\``,
      },
    ],
  },
  {
    categoryName: '自然语言处理',
    title: 'Large Language Models',
    description: '大语言模型 (LLM) 是当前 AI 的核心：预训练、微调、RLHF、Prompt Engineering、Scaling Laws。深入理解 GPT、BERT、LLaMA 等架构。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '理解预训练目标: CLM vs MLM',
      '掌握 RLHF 与 DPO 对齐技术',
      '理解 Scaling Laws 与涌现能力',
      '掌握高效微调: LoRA, QLoRA, Prefix-tuning',
      '掌握 Prompt Engineering 最佳实践',
    ],
    resources: [
      { title: 'Language Models are Few-Shot Learners (GPT-3)', url: 'https://arxiv.org/abs/2005.14165', type: 'paper' },
      { title: 'Training language models to follow instructions (InstructGPT)', url: 'https://arxiv.org/abs/2203.02155', type: 'paper' },
      { title: 'LLaMA: Open and Efficient Foundation Language Models', url: 'https://arxiv.org/abs/2302.13971', type: 'paper' },
      { title: 'LoRA: Low-Rank Adaptation', url: 'https://arxiv.org/abs/2106.09685', type: 'paper' },
    ],
    milestones: [
      { title: '预训练范式', completed: true },
      { title: 'RLHF / DPO 对齐', completed: false },
      { title: '高效微调 (LoRA)', completed: false },
      { title: 'Prompt Engineering', completed: false },
      { title: 'Scaling Laws', completed: false },
    ],
    notes: [
      {
        title: 'LLM 训练三阶段',
        content: `## LLM 训练流水线

### Stage 1: 预训练 (Pre-training)
\`\`\`
目标: 下一个 token 预测 (Causal LM)
数据: 数万亿 token (网页, 书籍, 代码)
算力: 数千 GPU, 数周-数月
优化: AdamW + Cosine LR + Warmup

关键选择:
- 词表: BPE / SentencePiece (32K-100K tokens)
- 上下文: 2K → 4K → 8K → 128K+
- 架构: Decoder-only (GPT) vs Encoder-Decoder (T5)
\`\`\`

### Stage 2: 监督微调 (SFT)
\`\`\`
数据: 高质量指令-回答对 (~10K-100K)
格式: [System] + [User] + [Assistant]
目标: 让模型学会遵循指令

高效微调:
- LoRA: W' = W + BA,  rank r << d
- QLoRA: 4-bit 量化 + LoRA
- 全量微调: 效果最好但资源需求大
\`\`\`

### Stage 3: 对齐 (Alignment)
\`\`\`
RLHF:
1. 训练奖励模型 (RM): 人类偏好排序
2. PPO 优化: max R(x,y) - β·KL(π||π_ref)

DPO (Direct Preference Optimization):
- 跳过奖励模型, 直接从偏好数据优化
- L = -log σ(β(log π(y_w)/π_ref(y_w) - log π(y_l)/π_ref(y_l)))
- 更简单, 更稳定
\`\`\``,
      },
      {
        title: 'Prompt Engineering 技巧',
        content: `## Prompt Engineering 核心模式

### Zero-Shot
\`\`\`
直接给出任务描述, 不提供示例。
适合: 简单任务, 能力强的模型
\`\`\`

### Few-Shot
\`\`\`
提供 2-5 个输入-输出示例。
要点: 示例要多样、格式一致、与任务相关
\`\`\`

### Chain-of-Thought (CoT)
\`\`\`
"Let's think step by step"
引导模型展示推理过程, 提升数学和逻辑能力

变体:
- Zero-shot CoT: 加一句 "请逐步推理"
- Few-shot CoT: 示例中包含推理过程
- Self-Consistency: 多次采样取多数投票
\`\`\`

### 高级模式

| 模式 | 描述 | 适用 |
|------|------|------|
| ReAct | 推理 + 行动交替 | Agent, 工具调用 |
| Tree of Thought | 多分支推理 + 评估 | 复杂规划 |
| RAG | 检索增强生成 | 知识密集任务 |
| Self-Refine | 生成→批判→改进 | 写作、代码 |`,
      },
    ],
  },
  {
    categoryName: '自然语言处理',
    title: 'NLP Core Tasks & Evaluation',
    description: 'NLP 核心任务：命名实体识别、情感分析、机器翻译、问答系统、文本摘要。掌握各任务的评估指标和基准测试。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握序列标注 (NER, POS Tagging)',
      '理解机器翻译与 BLEU 指标',
      '掌握文本摘要: 抽取式 vs 生成式',
      '理解 LLM 评估: MMLU, HumanEval, MT-Bench',
    ],
    resources: [
      { title: 'Stanford CS224n', url: 'https://web.stanford.edu/class/cs224n/', type: 'course' },
      { title: 'MMLU Benchmark', url: 'https://arxiv.org/abs/2009.03300', type: 'paper' },
    ],
    milestones: [
      { title: 'NER 与序列标注', completed: false },
      { title: '机器翻译', completed: false },
      { title: 'LLM 评估体系', completed: false },
    ],
    notes: [
      {
        title: 'NLP 评估指标',
        content: `## NLP 评估指标

### 分类任务
\`\`\`
Accuracy:  正确数 / 总数
Precision: TP / (TP + FP)     // 查准率
Recall:    TP / (TP + FN)     // 查全率
F1:        2·P·R / (P + R)    // 调和平均
\`\`\`

### 生成任务
\`\`\`
BLEU:    n-gram 精确匹配 (翻译)
ROUGE:   n-gram 召回率 (摘要)
  ROUGE-1: unigram
  ROUGE-L: 最长公共子序列
BERTScore: 基于 BERT 嵌入的语义相似度
\`\`\`

### LLM 评估基准

| 基准 | 评估内容 | 说明 |
|------|---------|------|
| MMLU | 知识广度 | 57 个学科，多选题 |
| HumanEval | 代码能力 | 164 个 Python 编程题 |
| MT-Bench | 对话质量 | GPT-4 打分 1-10 |
| GSM8K | 数学推理 | 小学数学应用题 |
| HellaSwag | 常识推理 | 场景续写 |
| GPQA | 专家知识 | 研究生级别问题 |`,
      },
    ],
  },

  // ── 计算机视觉 ──
  {
    categoryName: '计算机视觉',
    title: 'Image Understanding',
    description: '图像理解的三大任务：分类、检测、分割。掌握 YOLO, R-CNN 系列, U-Net 等经典架构。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握目标检测: R-CNN → Fast → Faster → YOLO',
      '理解语义分割: FCN, U-Net, DeepLab',
      '掌握实例分割: Mask R-CNN',
      '理解 ViT 对 CV 的影响',
    ],
    resources: [
      { title: 'Stanford CS231n', url: 'https://cs231n.stanford.edu/', type: 'course' },
      { title: 'You Only Look Once (YOLO)', url: 'https://arxiv.org/abs/1506.02640', type: 'paper' },
      { title: 'An Image is Worth 16x16 Words (ViT)', url: 'https://arxiv.org/abs/2010.11929', type: 'paper' },
    ],
    milestones: [
      { title: '目标检测架构', completed: false },
      { title: '语义/实例分割', completed: false },
      { title: 'Vision Transformer', completed: false },
    ],
    notes: [
      {
        title: '目标检测演进',
        content: `## 目标检测架构演进

### 两阶段 (Two-Stage)
\`\`\`
R-CNN (2014):    Selective Search → CNN → SVM
                 慢: 每个区域独立过 CNN

Fast R-CNN:      整图过 CNN → RoI Pooling → 分类+回归
                 共享特征图, 快 10x

Faster R-CNN:    RPN (Region Proposal Network) 替代 Selective Search
                 端到端训练, 实时接近

Mask R-CNN:      Faster R-CNN + Mask Branch
                 同时做检测 + 实例分割
\`\`\`

### 单阶段 (One-Stage)
\`\`\`
YOLO v1 (2016):  网格划分, 直接预测框+类别
                 实时(45fps), 精度低

SSD:             多尺度特征图检测

YOLOv8 (2023):   Anchor-free, 解耦头
                 精度与速度的最佳平衡

DETR:            Transformer + 匈牙利匹配
                 去掉 NMS, 端到端
\`\`\`

### 关键概念

| 概念 | 解释 |
|------|------|
| IoU | 预测框与真实框的交并比 |
| NMS | 非极大值抑制, 去重叠框 |
| Anchor | 预定义参考框 |
| FPN | 特征金字塔, 多尺度检测 |
| mAP | 所有类别 AP 的均值 |`,
      },
    ],
  },
  {
    categoryName: '计算机视觉',
    title: 'Vision-Language Models',
    description: '视觉-语言多模态模型：CLIP, DALL-E, Stable Diffusion。理解图文对齐、条件生成和视觉推理。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解 CLIP 的对比学习目标',
      '掌握文生图: Stable Diffusion 架构',
      '理解视觉问答 (VQA) 与视觉推理',
      '了解 GPT-4V, Gemini 等多模态 LLM',
    ],
    resources: [
      { title: 'Learning Transferable Visual Models From Natural Language (CLIP)', url: 'https://arxiv.org/abs/2103.00020', type: 'paper' },
      { title: 'High-Resolution Image Synthesis with Latent Diffusion Models', url: 'https://arxiv.org/abs/2112.10752', type: 'paper' },
    ],
    milestones: [
      { title: 'CLIP 与对比学习', completed: false },
      { title: 'Stable Diffusion 架构', completed: false },
      { title: '多模态 LLM', completed: false },
    ],
    notes: [
      {
        title: '多模态架构总览',
        content: `## 视觉-语言模型架构

### CLIP (Contrastive Language-Image Pre-training)
\`\`\`
图像编码器 (ViT/ResNet) ─→ 图像嵌入 ─┐
                                      ├→ 对比损失 (InfoNCE)
文本编码器 (Transformer) ─→ 文本嵌入 ─┘

训练: 4亿图文对, 正对相似度↑, 负对↓
推理: 零样本分类 = 图像嵌入 vs 类别文本嵌入
\`\`\`

### Stable Diffusion
\`\`\`
文本 → CLIP Text Encoder → 文本嵌入
                              ↓ (Cross-Attention)
噪声 → U-Net (去噪) → 潜空间表示 → VAE Decoder → 图像

关键: 在潜空间(而非像素空间)做扩散, 效率提升 ~50x
\`\`\`

### 多模态 LLM 架构模式

| 模型 | 视觉编码器 | 融合方式 |
|------|-----------|---------|
| GPT-4V | 未知 | 早期融合 |
| LLaVA | CLIP ViT | 线性投影到 LLM |
| Gemini | 自研 | 原生多模态 |
| Qwen-VL | ViT + 压缩 | Cross-Attention |

### 关键趋势

1. **原生多模态**: 从 "拼接" 到 "原生" 训练
2. **视频理解**: 从图像扩展到视频的时序推理
3. **视觉 Agent**: 模型直接操作 GUI (屏幕截图→动作)`,
      },
    ],
  },

  // ── 强化学习 ──
  {
    categoryName: '强化学习',
    title: 'RL Fundamentals',
    description: '强化学习基础：MDP、价值函数、策略梯度。理解 agent 如何通过与环境交互学习最优行为策略。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解马尔可夫决策过程 (MDP)',
      '掌握值迭代与策略迭代',
      '理解 Q-Learning 与 SARSA',
      '掌握探索-利用权衡 (ε-greedy, UCB)',
    ],
    resources: [
      { title: 'Reinforcement Learning: An Introduction (Sutton & Barto)', url: 'http://incompleteideas.net/book/the-book.html', type: 'book' },
      { title: 'UC Berkeley CS285: Deep RL', url: 'https://rail.eecs.berkeley.edu/deeprlcourse/', type: 'course' },
      { title: 'David Silver RL Course', url: 'https://www.davidsilver.uk/teaching/', type: 'course' },
    ],
    milestones: [
      { title: 'MDP 与 Bellman 方程', completed: false },
      { title: 'Value / Policy Iteration', completed: false },
      { title: 'Q-Learning', completed: false },
      { title: '探索策略', completed: false },
    ],
    notes: [
      {
        title: 'RL 核心概念',
        content: `## 强化学习框架

### MDP 五元组

\`\`\`
(S, A, P, R, γ)
S: 状态空间
A: 动作空间
P: 转移概率 P(s'|s,a)
R: 奖励函数 R(s,a,s')
γ: 折扣因子 (0 < γ ≤ 1)
\`\`\`

### Bellman 方程

\`\`\`
状态值函数:
V(s) = E[R + γ·V(s') | s]

动作值函数:
Q(s,a) = E[R + γ·max_a' Q(s',a') | s, a]

最优 Bellman:
V*(s) = max_a Σ P(s'|s,a)[R(s,a,s') + γ·V*(s')]
\`\`\`

### 算法分类

| 类别 | 算法 | 特点 |
|------|------|------|
| Value-based | Q-Learning, DQN | 学 Q(s,a), 离策略 |
| Policy-based | REINFORCE | 学 π(a|s), 高方差 |
| Actor-Critic | A2C, PPO, SAC | 同时学 V 和 π |
| Model-based | MBPO, Dreamer | 学环境模型, 样本高效 |

### Q-Learning vs SARSA

\`\`\`
Q-Learning (off-policy):
  Q(s,a) ← Q(s,a) + α[r + γ·max_a' Q(s',a') - Q(s,a)]

SARSA (on-policy):
  Q(s,a) ← Q(s,a) + α[r + γ·Q(s',a') - Q(s,a)]
  a' 是实际执行的动作
\`\`\``,
      },
    ],
  },
  {
    categoryName: '强化学习',
    title: 'Deep Reinforcement Learning',
    description: '深度强化学习将 DL 与 RL 结合：DQN、Policy Gradient、PPO、SAC。也是 RLHF 对齐 LLM 的理论基础。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解 DQN 的关键创新',
      '掌握 Policy Gradient 与 REINFORCE',
      '深入理解 PPO (Proximal Policy Optimization)',
      '了解 SAC (Soft Actor-Critic)',
    ],
    resources: [
      { title: 'Playing Atari with Deep RL (DQN)', url: 'https://arxiv.org/abs/1312.5602', type: 'paper' },
      { title: 'Proximal Policy Optimization (PPO)', url: 'https://arxiv.org/abs/1707.06347', type: 'paper' },
      { title: 'Spinning Up in Deep RL (OpenAI)', url: 'https://spinningup.openai.com/', type: 'documentation' },
    ],
    milestones: [
      { title: 'DQN 与经验回放', completed: false },
      { title: 'Policy Gradient 推导', completed: false },
      { title: 'PPO 算法', completed: false },
      { title: 'RLHF 中的 PPO', completed: false },
    ],
    notes: [
      {
        title: 'Deep RL 核心算法',
        content: `## Deep RL 关键算法

### DQN (2015)
\`\`\`
三大创新:
1. Experience Replay: 打破样本相关性
2. Target Network: 稳定训练目标 (定期同步)
3. CNN 提取状态特征

L = E[(r + γ·max_a' Q_target(s',a') - Q(s,a))²]
\`\`\`

### Policy Gradient (REINFORCE)
\`\`\`
∇J(θ) = E[Σ_t ∇log π_θ(a_t|s_t) · G_t]

G_t = Σ_{k=t}^T γ^(k-t) · r_k   (回报)

问题: 高方差 → 引入 baseline
∇J(θ) = E[∇log π_θ(a|s) · (G_t - b(s))]
\`\`\`

### PPO (2017) — 最实用的算法
\`\`\`
核心: 限制策略更新幅度

r_t(θ) = π_θ(a|s) / π_old(a|s)    // 重要性比率

L_CLIP = E[min(
  r_t(θ) · A_t,                    // 原始目标
  clip(r_t(θ), 1-ε, 1+ε) · A_t    // 裁剪目标
)]

ε 通常取 0.2
\`\`\`

### PPO 在 RLHF 中的应用
\`\`\`
目标: max E[R(x,y)] - β·KL(π_θ || π_ref)

R(x,y): 奖励模型打分
KL 项:  防止偏离太远 (灾难性遗忘)

PPO 优势: 稳定、可调、适合大模型
\`\`\``,
      },
    ],
  },

  // ── AI 系统工程 ──
  {
    categoryName: 'AI 系统工程',
    title: 'MLOps & Model Deployment',
    description: 'MLOps 覆盖 ML 模型的全生命周期管理：实验追踪、模型版本、自动化训练、部署上线、监控运维。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '掌握实验追踪工具 (MLflow, W&B)',
      '理解模型部署: 容器化, Serving, 推理优化',
      '掌握 CI/CD for ML',
      '理解模型监控与数据漂移检测',
    ],
    resources: [
      { title: 'Made With ML: MLOps Course', url: 'https://madewithml.com/', type: 'course' },
      { title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/', type: 'documentation' },
      { title: 'Full Stack Deep Learning', url: 'https://fullstackdeeplearning.com/', type: 'course' },
    ],
    milestones: [
      { title: '实验追踪', completed: false },
      { title: '模型部署', completed: false },
      { title: '推理优化', completed: false },
      { title: '监控与维护', completed: false },
    ],
    notes: [
      {
        title: 'MLOps 全景',
        content: `## MLOps 生命周期

\`\`\`
数据 → 训练 → 评估 → 部署 → 监控 → (重新训练)
  ↑                                      ↓
  └──────────── 反馈循环 ─────────────────┘
\`\`\`

### 实验追踪

| 工具 | 特点 |
|------|------|
| MLflow | 开源, 模型注册, 本地/远程 |
| Weights & Biases | SaaS, 可视化强, 团队协作 |
| Neptune.ai | 企业级, 元数据存储 |

### 模型部署方式

| 方式 | 延迟 | 场景 |
|------|------|------|
| REST API (Flask/FastAPI) | 中 | 通用在线服务 |
| gRPC (Triton) | 低 | 高性能推理 |
| Serverless (Lambda) | 高(冷启动) | 低频调用 |
| Edge (ONNX/TFLite) | 极低 | 移动端/IoT |
| Batch | N/A | 离线批量处理 |

### 推理优化

\`\`\`
量化:      FP32 → FP16 → INT8 → INT4
剪枝:      移除不重要的权重/神经元
蒸馏:      大模型 → 小模型 (知识蒸馏)
算子融合:  合并连续计算, 减少内存访问
KV Cache:  缓存注意力计算, 加速自回归生成

推理引擎: TensorRT, vLLM, llama.cpp, ONNX Runtime
\`\`\``,
      },
    ],
  },
  {
    categoryName: 'AI 系统工程',
    title: 'RAG & Vector Databases',
    description: 'RAG (检索增强生成) 让 LLM 能够利用外部知识。掌握文本分块、向量检索、重排序和 RAG 系统架构设计。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '理解 RAG 架构与工作流程',
      '掌握文本分块策略',
      '理解向量数据库的索引原理 (HNSW, IVF)',
      '掌握检索质量优化: 重排序, HyDE, 查询改写',
    ],
    resources: [
      { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP', url: 'https://arxiv.org/abs/2005.11401', type: 'paper' },
      { title: 'LangChain Documentation', url: 'https://docs.langchain.com/', type: 'documentation' },
      { title: 'Pinecone Learning Center', url: 'https://www.pinecone.io/learn/', type: 'documentation' },
    ],
    milestones: [
      { title: 'RAG 基础架构', completed: true },
      { title: '分块策略', completed: false },
      { title: '向量检索原理', completed: false },
      { title: '高级 RAG 模式', completed: false },
    ],
    notes: [
      {
        title: 'RAG 架构与优化',
        content: `## RAG 系统架构

### 基础流程

\`\`\`
用户查询 → Embedding → 向量检索 → Top-K 文档 → Prompt 拼接 → LLM → 回答
\`\`\`

### 分块策略

| 策略 | 优点 | 缺点 |
|------|------|------|
| 固定大小 (512 tokens) | 简单 | 切断语义 |
| 按段落/章节 | 语义完整 | 大小不均 |
| 递归分割 | 平衡 | 需调参 |
| 语义分割 | 最佳语义 | 计算贵 |

推荐: chunk_size=512, overlap=50-100

### 向量检索索引

| 索引 | 原理 | 特点 |
|------|------|------|
| Flat (暴力) | 精确 L2/余弦 | 小数据最优 |
| IVF | 聚类 + 倒排 | 中等规模 |
| HNSW | 分层导航小世界图 | 速度快, 内存大 |
| PQ | 乘积量化压缩 | 内存小, 近似 |

### 高级 RAG 模式

\`\`\`
Naive RAG     → Advanced RAG → Modular RAG

改进维度:
1. 查询改写: 用 LLM 改写用户查询
2. HyDE: 先生成假设答案, 再用它检索
3. 重排序: Cross-Encoder 对 Top-K 重排
4. 多路召回: 关键词 + 向量 + 知识图谱
5. Self-RAG: 模型自主决定何时检索
\`\`\`

### 向量数据库选型

| 数据库 | 类型 | 适用 |
|--------|------|------|
| Pinecone | 托管 | 快速上手 |
| Milvus | 开源 | 大规模生产 |
| Weaviate | 开源 | 多模态 |
| Chroma | 开源 | 本地开发 |
| pgvector | PG 扩展 | 已有 PG |`,
      },
    ],
  },
  {
    categoryName: 'AI 系统工程',
    title: 'Distributed Training',
    description: '大模型训练必需的分布式技术：数据并行、模型并行、流水线并行、混合精度训练。掌握 DeepSpeed 和 FSDP。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解数据并行 (DDP) 与梯度同步',
      '掌握模型并行: 张量并行 + 流水线并行',
      '理解混合精度训练 (FP16/BF16 + Loss Scaling)',
      '掌握 DeepSpeed ZeRO 和 PyTorch FSDP',
    ],
    resources: [
      { title: 'DeepSpeed Documentation', url: 'https://www.deepspeed.ai/', type: 'documentation' },
      { title: 'PyTorch FSDP Tutorial', url: 'https://pytorch.org/tutorials/intermediate/FSDP_tutorial.html', type: 'documentation' },
      { title: 'Efficient Large-Scale Language Model Training (Narayanan)', url: 'https://arxiv.org/abs/2104.04473', type: 'paper' },
    ],
    milestones: [
      { title: '数据并行 (DDP)', completed: false },
      { title: '模型并行技术', completed: false },
      { title: '混合精度训练', completed: false },
      { title: 'DeepSpeed ZeRO', completed: false },
    ],
    notes: [
      {
        title: '分布式训练全景',
        content: `## 并行策略

### 数据并行 (Data Parallelism)
\`\`\`
每个 GPU 持有完整模型副本
不同 GPU 处理不同 mini-batch
梯度 AllReduce 同步后更新

PyTorch DDP: 最基础的分布式训练
\`\`\`

### 模型并行

**张量并行 (Tensor Parallelism)**
\`\`\`
将单个层的权重矩阵切分到多个 GPU
例: W = [W1 | W2],  Y = XW = [XW1 | XW2]
通信: AllReduce (每层)
适合: 单机多卡
\`\`\`

**流水线并行 (Pipeline Parallelism)**
\`\`\`
将模型的不同层分配到不同 GPU
GPU 0: Layer 0-11, GPU 1: Layer 12-23...
微批次流水线减少气泡
\`\`\`

### DeepSpeed ZeRO

\`\`\`
ZeRO-1: 分片优化器状态     → 内存 4x↓
ZeRO-2: + 分片梯度          → 内存 8x↓
ZeRO-3: + 分片模型参数      → 内存 Nx↓

ZeRO-Offload: 将部分数据卸载到 CPU
ZeRO-Infinity: 卸载到 NVMe SSD
\`\`\`

### 混合精度训练
\`\`\`
前向/反向: FP16/BF16  → 速度 2x, 内存 0.5x
权重更新:  FP32       → 数值精度

Loss Scaling: 防止 FP16 梯度下溢
BF16 优势:   范围和 FP32 相同, 无需 loss scaling
\`\`\`

### 训练规模计算
\`\`\`
模型参数:    P (如 7B = 70亿)
训练内存:    ~16-20 bytes/param (FP32+Adam)
             ~10 bytes/param (混合精度)
7B 模型:     ~70-140 GB (单卡放不下)
\`\`\``,
      },
    ],
  },

  // ── AI 前沿与安全 ──
  {
    categoryName: 'AI 前沿与安全',
    title: 'AI Alignment & Safety',
    description: 'AI 对齐确保 AI 系统的行为符合人类意图。理解对齐问题、RLHF、Constitutional AI、可解释性和 AI 治理。',
    status: 'TODO',
    priority: 'HIGH',
    objectives: [
      '理解对齐问题的定义与挑战',
      '掌握 RLHF 与 Constitutional AI',
      '理解可解释性方法 (SHAP, Attention, Probing)',
      '了解 AI 红队测试与安全评估',
    ],
    resources: [
      { title: 'Concrete Problems in AI Safety', url: 'https://arxiv.org/abs/1606.06565', type: 'paper' },
      { title: 'Constitutional AI (Anthropic)', url: 'https://arxiv.org/abs/2212.08073', type: 'paper' },
      { title: 'AI Alignment Forum', url: 'https://www.alignmentforum.org/', type: 'article' },
    ],
    milestones: [
      { title: '对齐问题框架', completed: false },
      { title: '对齐技术', completed: false },
      { title: '可解释性', completed: false },
      { title: 'AI 安全评估', completed: false },
    ],
    notes: [
      {
        title: 'AI 对齐核心概念',
        content: `## AI 对齐问题

### 核心挑战

\`\`\`
Outer Alignment:  目标规范是否正确反映人类意图？
Inner Alignment:  模型是否真正优化了我们指定的目标？
Scalable Oversight: 如何监督超越人类能力的 AI？
\`\`\`

### 对齐技术谱

| 技术 | 描述 | 代表 |
|------|------|------|
| RLHF | 人类偏好反馈训练 | InstructGPT, ChatGPT |
| Constitutional AI | AI 自我批评与修正 | Claude |
| DPO | 直接偏好优化 | Zephyr, many OSS |
| RLAIF | AI 反馈替代人类反馈 | 降低标注成本 |
| IDA | 迭代蒸馏放大 | 理论阶段 |

### 可解释性方法

\`\`\`
事后解释:
- SHAP: 基于 Shapley 值的特征归因
- LIME: 局部可解释近似
- Attention 可视化: 注意力权重分析

机制解释:
- Probing: 探测中间表示包含的信息
- Circuit Analysis: 追踪模型内部计算电路
- Sparse Autoencoders: 提取可解释特征方向
\`\`\`

### 安全评估

\`\`\`
红队测试:  对抗性提示, 越狱攻击
基准测试:  TruthfulQA (真实性), BBQ (偏见)
审计框架:  模型卡片, 数据表, 风险评估
\`\`\``,
      },
    ],
  },
  {
    categoryName: 'AI 前沿与安全',
    title: 'Agentic AI & Tool Use',
    description: 'AI Agent 是 LLM 的进化方向：自主规划、工具调用、多步推理。理解 ReAct、Function Calling、Multi-Agent 系统。',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    objectives: [
      '理解 AI Agent 架构: 感知-规划-执行',
      '掌握 Tool Use / Function Calling',
      '理解 ReAct 与规划算法',
      '了解 Multi-Agent 系统设计',
    ],
    resources: [
      { title: 'ReAct: Synergizing Reasoning and Acting', url: 'https://arxiv.org/abs/2210.03629', type: 'paper' },
      { title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', url: 'https://arxiv.org/abs/2302.04761', type: 'paper' },
      { title: 'The Landscape of Emerging AI Agent Architectures', url: 'https://arxiv.org/abs/2309.02427', type: 'paper' },
    ],
    milestones: [
      { title: 'Agent 架构基础', completed: true },
      { title: 'Tool Use 实现', completed: false },
      { title: '规划与记忆', completed: false },
      { title: 'Multi-Agent', completed: false },
    ],
    notes: [
      {
        title: 'AI Agent 架构',
        content: `## AI Agent 核心架构

### 基本循环

\`\`\`
while not done:
    observation = perceive(environment)
    thought = reason(observation, memory)
    action = plan(thought)
    result = execute(action, tools)
    memory.update(result)
\`\`\`

### ReAct 模式

\`\`\`
Thought: 我需要查找 X 的信息
Action: search("X")
Observation: [搜索结果]
Thought: 根据结果, 我可以得出...
Action: finish(answer)
\`\`\`

### Agent 组件

| 组件 | 功能 | 实现 |
|------|------|------|
| LLM Core | 推理引擎 | GPT-4, Claude |
| Memory | 短期/长期记忆 | 上下文/向量数据库 |
| Tools | 外部能力 | API, 代码执行, 搜索 |
| Planning | 任务分解 | CoT, ToT, 递归分解 |

### Tool Use / Function Calling

\`\`\`json
{
  "name": "search",
  "description": "Search the web for information",
  "parameters": {
    "query": {"type": "string"},
    "max_results": {"type": "integer"}
  }
}
\`\`\`

模型输出结构化工具调用 → 系统执行 → 结果返回模型

### Multi-Agent 模式

\`\`\`
1. Supervisor: 一个主 Agent 协调多个子 Agent
2. Debate: 多个 Agent 辩论达成共识
3. Pipeline: Agent 链式处理
4. Swarm: 动态路由到专长 Agent
\`\`\`

### 关键挑战

- **幻觉**: Agent 可能基于错误信息行动
- **错误累积**: 长链推理中错误级联放大
- **安全性**: 工具调用的权限控制
- **评估**: 如何评估 Agent 的整体能力`,
      },
    ],
  },
  {
    categoryName: 'AI 前沿与安全',
    title: 'Multimodal Learning & Foundation Models',
    description: '多模态学习与基础模型：统一架构处理文本、图像、音频、视频。了解 GPT-4o, Gemini, 世界模型等前沿方向。',
    status: 'TODO',
    priority: 'MEDIUM',
    objectives: [
      '理解多模态表示对齐',
      '了解统一多模态架构趋势',
      '理解世界模型 (World Models) 概念',
      '追踪 Foundation Model 最新进展',
    ],
    resources: [
      { title: 'Gemini: A Family of Highly Capable Multimodal Models', url: 'https://arxiv.org/abs/2312.11805', type: 'paper' },
      { title: 'World Models (Ha & Schmidhuber)', url: 'https://arxiv.org/abs/1803.10122', type: 'paper' },
    ],
    milestones: [
      { title: '多模态表示对齐', completed: false },
      { title: '统一架构', completed: false },
      { title: '世界模型', completed: false },
    ],
    notes: [
      {
        title: '多模态与基础模型前沿',
        content: `## 基础模型发展趋势

### 模态扩展

\`\`\`
文本 (GPT-3, 2020)
  → 文本+代码 (Codex, 2021)
    → 文本+图像 (GPT-4V, 2023)
      → 文本+图像+音频 (GPT-4o, 2024)
        → 视频理解+生成 (Sora, Gemini, 2024)
          → 通用世界模型 (?)
\`\`\`

### 多模态架构模式

| 模式 | 描述 | 代表 |
|------|------|------|
| 后期融合 | 各模态独立编码后拼接 | CLIP + LLM |
| 早期融合 | 统一 tokenizer | Gemini |
| 交叉注意力 | 模态间互相注意 | Flamingo |
| 适配器 | 冻结LLM + 轻量适配 | LLaVA |

### 世界模型 (World Models)

\`\`\`
目标: 学习环境的内部模型, 在"想象"中规划

组件:
- 感知编码器: 观测 → 潜空间
- 动态模型: 预测下一状态 z_{t+1} = f(z_t, a_t)
- 奖励预测: R = g(z_t, a_t)

应用:
- 自动驾驶: 预测其他车辆行为
- 机器人: 物理世界交互预测
- 视频生成: Sora 被认为是世界模拟器
\`\`\`

### 开放问题

1. **统一表示**: 如何高效统一不同模态？
2. **涌现能力**: 多模态是否带来新的涌现能力？
3. **评估**: 多模态理解的全面评估基准
4. **效率**: 多模态推理的计算成本控制`,
      },
    ],
  },
]


// ─── Main Seed Function ──────────────────────────────────────
async function main() {
  console.log('Clearing existing data...')
  await prisma.note.deleteMany()
  await prisma.learningPlan.deleteMany()
  await prisma.task.deleteMany()
  await prisma.category.deleteMany()
  await prisma.categoryGroup.deleteMany()

  console.log('Creating category groups...')
  const groupMap = new Map()
  for (const group of CATEGORY_GROUPS) {
    const created = await prisma.categoryGroup.create({
      data: { name: group.name, position: group.position },
    })
    groupMap.set(group.name, { id: created.id, categoryNames: group.categoryNames })
    console.log(`  + Group: ${group.name}`)
  }

  // Build a lookup: categoryName -> groupId
  const categoryGroupLookup = new Map()
  for (const [, value] of groupMap) {
    for (const catName of value.categoryNames) {
      categoryGroupLookup.set(catName, value.id)
    }
  }

  console.log('Creating categories...')
  const categoryMap = new Map()
  for (const cat of CATEGORIES) {
    const groupId = categoryGroupLookup.get(cat.name) ?? null
    const created = await prisma.category.create({
      data: { ...cat, groupId },
    })
    categoryMap.set(cat.name, created.id)
    console.log(`  + Category: ${cat.name}${groupId ? ' (grouped)' : ''}`)
  }

  console.log('Creating quests...')
  for (let i = 0; i < QUESTS.length; i++) {
    const quest = QUESTS[i]
    const categoryId = categoryMap.get(quest.categoryName)

    const task = await prisma.task.create({
      data: {
        title: quest.title,
        description: quest.description,
        status: quest.status,
        priority: quest.priority,
        position: i,
        categories: { connect: [{ id: categoryId }] },
      },
    })
    console.log(`  + Quest: ${quest.title} [${quest.status}]`)

    // Create learning plan
    await prisma.learningPlan.create({
      data: {
        taskId: task.id,
        objectives: JSON.stringify(quest.objectives),
        resources: JSON.stringify(quest.resources),
        milestones: JSON.stringify(quest.milestones),
      },
    })

    // Create notes
    for (const note of quest.notes) {
      await prisma.note.create({
        data: {
          taskId: task.id,
          title: note.title,
          content: note.content,
        },
      })
      console.log(`    - Note: ${note.title}`)
    }
  }

  const taskCount = await prisma.task.count()
  const noteCount = await prisma.note.count()
  const catCount = await prisma.category.count()
  const groupCount = await prisma.categoryGroup.count()
  console.log(`\nDone! Created ${groupCount} groups, ${catCount} categories, ${taskCount} quests, ${noteCount} notes.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
