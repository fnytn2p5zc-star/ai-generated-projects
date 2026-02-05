import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const NOTE_UPDATES = [
  {
    id: 'cml9s5ebs0019t4xims69pqjf', // Supervised Learning - 偏差-方差分解
    content: `## 偏差-方差权衡 (Bias-Variance Tradeoff)

这是机器学习中最基础也是最重要的概念之一。理解它能帮助我们诊断模型问题、选择正确的正则化策略、以及理解为什么深度学习能"违反"这个经典定律。

### 期望误差分解

对于真实函数 $f(x)$ 和学习器 $\\hat{f}(x)$，在测试点 $x$ 的期望平方误差可以精确分解为：

$$\\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}^2[\\hat{f}(x)] + \\text{Var}[\\hat{f}(x)] + \\sigma^2$$

| 来源 | 数学定义 | 含义 | 模型复杂度关系 |
|------|----------|------|---------------|
| Bias² | $(\\mathbb{E}[\\hat{f}] - f)^2$ | 模型假设偏离真实 | 复杂度↑ → Bias↓ |
| Variance | $\\mathbb{E}[(\\hat{f} - \\mathbb{E}[\\hat{f}])^2]$ | 模型对数据的敏感度 | 复杂度↑ → Variance↑ |
| Noise σ² | 数据固有噪声 | Irreducible Error | 无法消除 |

### 直观理解

\`\`\`
想象你在打靶:
  Bias = 瞄准点偏离靶心的距离
  Variance = 每次射击的散布程度

高偏差 + 低方差: 每次都打在同一个地方，但偏离靶心 (欠拟合)
低偏差 + 高方差: 平均对准靶心，但每次位置差异大 (过拟合)
低偏差 + 低方差: 每次都打靶心 (理想状态)
\`\`\`

### 正则化的本质

正则化通过增加偏差来换取方差的减少，在总误差上达到更好的平衡。

**L2 正则化 (Ridge)**:
\`\`\`
min ||y - Xw||² + λ||w||²

效果: 将权重向 0 收缩，但不会变成 0
概率解释: 等价于权重的高斯先验 w ~ N(0, σ²)
适用: 所有特征都可能有用，但要防止过拟合
\`\`\`

**L1 正则化 (Lasso)**:
\`\`\`
min ||y - Xw||² + λ||w||₁

效果: 稀疏化，部分权重直接变为 0
概率解释: 等价于权重的拉普拉斯先验
适用: 需要特征选择，认为只有少数特征重要
\`\`\`

**ElasticNet**: 结合 L1 和 L2
\`\`\`
min ||y - Xw||² + λ₁||w||₁ + λ₂||w||²

兼顾稀疏性和组效应 (相关特征一起选择)
\`\`\`

### 模型复杂度谱

\`\`\`
低 ←────────── 复杂度 ──────────→ 高

线性回归 → 多项式回归 → 决策树 → 随机森林 → 深度神经网络
────────────────────────────────────────────────────────
高偏差                                              高方差
欠拟合                                              过拟合
简单函数                                          复杂函数
\`\`\`

### 学习曲线诊断

\`\`\`
训练误差 vs 验证误差 随数据量变化:

高偏差 (欠拟合):
  - 训练误差和验证误差都高
  - 两者差距小
  - 增加数据无济于事
  - 解决: 增加模型复杂度

高方差 (过拟合):
  - 训练误差低，验证误差高
  - 两者差距大
  - 增加数据会有帮助
  - 解决: 正则化、dropout、更多数据
\`\`\`

### 深度学习的"双下降"现象

经典偏差-方差理论预测: 模型复杂度增加 → 测试误差先降后升 (U 型曲线)

但在深度学习中观察到 **双下降 (Double Descent)**:
\`\`\`
测试误差
    ^
    |    /\\
    |   /  \\    /~~~
    |  /    \\  /
    | /      \\/
    +-------------> 模型复杂度
    欠拟合  过拟合  过参数化

插值阈值: 模型参数 ≈ 数据量
过参数化: 模型参数 >> 数据量
\`\`\`

过参数化的神经网络为什么能泛化?
1. **隐式正则化**: SGD 倾向于找到"平坦"的最小值
2. **归纳偏置**: 架构本身包含的假设 (如 CNN 的平移不变性)
3. **丰富的函数类**: 有很多不同的权重组合都能拟合训练数据，SGD 选择的是特定类型`,
  },
  {
    id: 'cml9s5ebt001et4xi9pedpih0', // Unsupervised Learning - 降维方法对比
    content: `## 降维方法深入对比

降维是无监督学习的核心任务之一，目的是在尽量保留数据结构的前提下减少特征维度。不同方法保留的"结构"不同，因此适用场景也不同。

### 方法全景对比

| 方法 | 类型 | 保留什么 | 复杂度 | 可逆性 | 典型用途 |
|------|------|---------|--------|--------|---------|
| PCA | 线性 | 全局方差 | O(min(n³,d³)) | 是 | 预处理、去噪、压缩 |
| LDA | 线性 | 类别可分性 | O(nd²) | 是 | 有监督降维 |
| t-SNE | 非线性 | 局部邻域 | O(n²) | 否 | 2D/3D 可视化 |
| UMAP | 非线性 | 局部+全局 | O(n^1.14) | 部分 | 可视化、下游任务 |
| Autoencoder | 非线性 | 学习表示 | 取决于架构 | 是 | 复杂数据、生成 |
| ICA | 线性 | 统计独立 | O(n²d) | 是 | 信号分离 |

### PCA 详解

**数学推导**:
\`\`\`
目标: 找到 k 个正交方向，使投影后的方差最大

1. 中心化: X_centered = X - μ
2. 协方差矩阵: C = (1/(n-1)) · X^T X
3. 特征分解: C = QΛQ^T
   Q 的列 = 主成分方向 (特征向量)
   Λ 对角线 = 各方向的方差 (特征值)
4. 投影: X_reduced = X · Q[:, :k]
\`\`\`

**等价表述**:
- 最大化投影方差
- 最小化重构误差
- 奇异值分解 (SVD) 的几何解释

**方差解释比**:
\`\`\`
explained_variance_ratio[i] = λ_i / Σλ_j

累积解释比 = Σ(前k个) / Σ(全部)
通常选择 k 使得累积解释比 ≥ 95%

例: λ = [5, 3, 1, 0.5, 0.3, 0.2]
    前2个: (5+3)/10 = 80%
    前3个: (5+3+1)/10 = 90%
    前4个: (5+3+1+0.5)/10 = 95% ← 选 k=4
\`\`\`

### t-SNE 详解

**核心思想**: 在高维和低维空间中分别定义点对相似度，最小化两个分布的 KL 散度

\`\`\`
高维相似度 (高斯分布):
  p_j|i = exp(-||x_i - x_j||² / 2σ_i²) / Σ_k exp(...)
  p_ij = (p_j|i + p_i|j) / 2n    # 对称化

低维相似度 (t 分布，自由度=1):
  q_ij = (1 + ||y_i - y_j||²)^(-1) / Σ_{k≠l} (...)

目标函数:
  C = KL(P || Q) = Σ_ij p_ij log(p_ij / q_ij)
\`\`\`

**为什么用 t 分布?**
\`\`\`
高维空间的"拥挤问题":
  在高维中距离分布均匀
  投影到 2D 时，所有点都挤在一起

t 分布的长尾特性:
  相比高斯分布，远距离点的概率衰减更慢
  允许不相似的点在低维空间中更分散
\`\`\`

**超参数**:
- Perplexity (5-50): 有效邻居数，越大越关注全局
- Learning rate (10-1000): 太小收敛慢，太大不稳定
- Iterations (250-1000): 需要足够迭代

**注意事项**:
- 全局结构不可靠 (距离/密度没有意义)
- 每次运行结果不同 (随机初始化)
- 不适合用于下游任务 (没有 transform 方法)

### UMAP 详解

**核心思想**: 假设数据在一个流形上，用图拓扑建模

\`\`\`
1. 构建高维图:
   对每个点找 k 近邻
   边权重 = exp(-max(0, d(x,y) - ρ) / σ)
   ρ = 到最近邻的距离，σ = 缩放参数

2. 低维优化:
   用交叉熵最小化高维图和低维图的差异

优势:
- 比 t-SNE 快 (O(n^1.14) vs O(n²))
- 保留更多全局结构
- 有 transform 方法，可用于新数据
- 可以嵌入到 >2 维，用于下游任务
\`\`\`

### 自编码器 (Autoencoder)

\`\`\`
架构:
  输入 x → Encoder → 潜空间 z → Decoder → 重构 x̂

损失:
  L = ||x - x̂||² (重构误差)

变体:
  Undercomplete AE: dim(z) < dim(x)，自动降维
  Sparse AE: 加 L1 惩罚，强制稀疏表示
  Denoising AE: 输入加噪，学习去噪
  VAE: 潜空间是概率分布，可以生成

优势:
  - 可以学习高度非线性的表示
  - 端到端可微
  - 可以处理各种数据类型 (图像、文本、音频)
\`\`\`

### EM 算法框架

用于含隐变量的概率模型参数估计:

\`\`\`
目标: max_θ log P(X|θ) = max_θ log Σ_Z P(X,Z|θ)

直接求解困难 → EM 迭代:

E-step (期望步):
  计算隐变量的后验分布
  Q(Z) = P(Z|X, θ_old)

M-step (最大化步):
  最大化完整数据的期望对数似然
  θ_new = argmax_θ E_Q[log P(X,Z|θ)]

保证: 每次迭代 log P(X|θ_new) ≥ log P(X|θ_old)

应用:
  - GMM (高斯混合模型): 隐变量 = 每个点属于哪个簇
  - HMM: 隐变量 = 隐状态序列
  - K-means: EM 的硬版本 (Q 退化为 one-hot)
\`\`\``,
  },
  {
    id: 'cml9s5ebu001jt4xi2vgji2wl', // Ensemble Methods - Boosting 算法演进
    content: `## Boosting 算法深度解析

Boosting 是集成学习的核心范式之一，其核心思想是将多个弱学习器**串行**组合成强学习器，每一轮关注前一轮的错误。

### 集成学习三大范式

\`\`\`
Bagging (Bootstrap Aggregating):
  - 并行训练多个模型
  - 每个模型用 bootstrap 样本
  - 投票/平均聚合
  - 代表: 随机森林
  - 效果: 减少方差

Boosting:
  - 串行训练模型
  - 每轮关注之前的错误
  - 加权组合
  - 代表: XGBoost, LightGBM
  - 效果: 减少偏差

Stacking:
  - 用一个模型学习如何组合其他模型
  - 元学习器
  - 代表: AutoML 系统
\`\`\`

### AdaBoost 详解

**核心思想**: 通过调整样本权重，使后续分类器关注之前分错的样本

\`\`\`python
# 算法流程
初始化: w_i = 1/N (所有样本等权重)

for t = 1 to T:
    # 1. 训练弱学习器 h_t (用加权样本)
    h_t = train(X, y, weights=w)

    # 2. 计算加权错误率
    ε_t = Σ w_i · I(h_t(x_i) ≠ y_i) / Σ w_i

    # 3. 计算学习器权重
    α_t = 0.5 · ln((1-ε_t) / ε_t)

    # 4. 更新样本权重 (错误样本权重增大)
    w_i ← w_i · exp(-α_t · y_i · h_t(x_i))
    w_i ← w_i / Σ w_j  # 归一化

# 最终预测: sign(Σ α_t · h_t(x))
\`\`\`

**理论基础**:
- AdaBoost = 前向分步算法 + 指数损失
- 可以证明训练误差指数级下降

### 梯度提升 (GBDT) 详解

**核心思想**: 每一步拟合残差的负梯度

\`\`\`
前向加法模型:
  F_m(x) = F_{m-1}(x) + η · h_m(x)

关键洞察:
  对于平方损失 L = 0.5(y - F)²
  负梯度 = y - F = 残差

推广到任意损失:
  h_m 拟合目标: -∂L/∂F_{m-1}(x_i)

例: 对于对数损失 (分类)
  h_m 拟合目标: y_i - sigmoid(F_{m-1}(x_i))
\`\`\`

### XGBoost 改进

**1. 二阶泰勒展开**:
\`\`\`
传统 GBDT: 只用一阶导数 (梯度)
XGBoost: 同时用一阶和二阶导数

L^(t) ≈ Σ[g_i · f(x_i) + 0.5 · h_i · f(x_i)²] + Ω(f)

g_i = ∂L/∂F_{t-1}(x_i)   (梯度)
h_i = ∂²L/∂F_{t-1}(x_i)² (Hessian)

优势: 更精确的近似，更快收敛
\`\`\`

**2. 正则化**:
\`\`\`
Ω(f) = γ·T + 0.5·λ·||w||²

T = 叶子节点数 (控制树复杂度)
w = 叶子权重 (控制预测值幅度)
\`\`\`

**3. 分裂增益计算**:
\`\`\`
Gain = 0.5 · [G_L²/(H_L+λ) + G_R²/(H_R+λ) - (G_L+G_R)²/(H_L+H_R+λ)] - γ

G = Σg_i, H = Σh_i

γ: 分裂的最小增益阈值 (剪枝)
\`\`\`

**4. 工程优化**:
- 列采样 (类似随机森林)
- 缺失值处理 (自动学习缺失值分裂方向)
- 并行化 (特征级并行)
- 缓存优化

### LightGBM 改进

**1. Histogram-based 分裂**:
\`\`\`
XGBoost: 精确贪心分裂，枚举所有可能分裂点
LightGBM: 将连续值离散化到 bins

优势:
  - 内存: O(#data × #features) → O(#bins × #features)
  - 速度: O(#data) → O(#bins)
  - bins 通常只需 256 个
\`\`\`

**2. Leaf-wise 生长**:
\`\`\`
XGBoost (level-wise): 逐层生长，每层分裂所有叶子
LightGBM (leaf-wise): 选择增益最大的叶子分裂

leaf-wise 更快收敛，但需要 max_depth 限制防止过拟合
\`\`\`

**3. GOSS (梯度单边采样)**:
- 保留梯度大的样本 (top a%)
- 随机采样梯度小的样本 (b%)
- 大幅减少计算量

**4. EFB (互斥特征捆绑)**:
- 将互斥的稀疏特征捆绑
- 减少特征数

### CatBoost 特点

- **Ordered Boosting**: 解决预测偏移问题
- **Categorical Features**: 原生支持，自动编码
- **对称树**: 更快的推理

### 选型建议

| 场景 | 推荐 | 原因 |
|------|------|------|
| Kaggle 表格竞赛 | XGBoost / LightGBM | 精度最高 |
| 大规模数据 (>1M) | LightGBM | 速度快，内存小 |
| 类别特征多 | CatBoost | 原生支持 |
| 需要可解释性 | SHAP + XGBoost | SHAP 值解释 |
| 模型小巧 | 单棵决策树 | 完全可解释 |
| 在线学习 | 暂无完美选择 | 考虑增量学习变体 |`,
  },
  {
    id: 'cml9s5ebw001ot4xilmpcayjr', // Probabilistic Graphical Models - 推断方法对比
    content: `## 概率图模型推断方法

概率图模型 (PGM) 用图结构表示随机变量间的依赖关系。推断任务是在给定观测变量下计算隐变量的后验分布，这在机器学习的许多领域都是核心问题。

### 图模型基础

**贝叶斯网络 (有向图)**:
\`\`\`
P(X₁, ..., Xₙ) = Π P(Xᵢ | Parents(Xᵢ))

特点:
  - 边表示因果/条件依赖
  - 局部马尔可夫性: 给定父节点，与非后代条件独立
  - 例: 朴素贝叶斯、HMM、VAE
\`\`\`

**马尔可夫随机场 (无向图)**:
\`\`\`
P(X) = (1/Z) · Π ψ_c(X_c)

Z = Σ_X Π ψ_c(X_c)  (配分函数)

特点:
  - 边表示相关性 (无方向)
  - 团势函数 ψ_c 定义团内变量的兼容性
  - 例: Ising 模型、CRF、RBM
\`\`\`

### 精确推断

**变量消除 (Variable Elimination)**:
\`\`\`
计算边际概率 P(X_q | Evidence):

1. 将联合分布写成因子乘积
2. 按照某个顺序消除隐变量
3. 对每个隐变量求和

复杂度: 指数于树宽度 (treewidth)
树宽度小 → 高效; 树宽度大 → 不可行
\`\`\`

**信念传播 (Belief Propagation)**:
\`\`\`
在树结构图上传递消息:

m_{i→j}(x_j) = Σ_{x_i} ψ(x_i, x_j) · Π_{k∈N(i)\\j} m_{k→i}(x_i)

边际概率:
  P(x_i) ∝ Π_{j∈N(i)} m_{j→i}(x_i)

复杂度: O(n · k²)，n 是节点数，k 是状态数

用于:
  - HMM 的前向-后向算法
  - 纠错码解码 (LDPC)
  - 图像分割
\`\`\`

**Junction Tree 算法**:
\`\`\`
将任意图转换为树:
1. 道德化 (Moralization): 连接共同父节点
2. 三角化 (Triangulation): 添加边消除 >3 长度环
3. 构建 Junction Tree
4. 在 Junction Tree 上运行 BP

复杂度: 指数于最大团大小
\`\`\`

### 近似推断

**MCMC (马尔可夫链蒙特卡洛)**:

\`\`\`
Metropolis-Hastings:
  从目标分布 P(θ|D) 采样，但不需要知道归一化常数

Gibbs Sampling:
  每次只更新一个变量的条件分布
  θ_i ~ P(θ_i | θ_{-i}, D)

Collapsed Gibbs:
  积分掉部分变量，减少采样空间
  例: LDA 中积分掉 φ 和 θ

Hamiltonian MC (HMC):
  利用梯度信息在参数空间中高效移动
  NUTS: 自动调参的 HMC
  Stan/PyMC 的默认方法
\`\`\`

**MCMC 诊断**:
\`\`\`
收敛判断:
  - Trace plot: 多条链应该混合
  - R̂ (Gelman-Rubin): 应该 < 1.1
  - ESS (有效样本数): 应该 > 100

Burn-in: 丢弃初始不稳定的样本
Thinning: 每隔 k 个取 1 个 (减少自相关)
\`\`\`

**变分推断 (VI)**:

\`\`\`
将推断转化为优化:
  目标: 找 q(z) ≈ P(z|x)
  方法: 最小化 KL(q(z) || P(z|x))
  等价: 最大化 ELBO

ELBO 分解:
  log P(x) = ELBO + KL(q||p)
  ELBO = E_q[log P(x,z)] - E_q[log q(z)]
       = E_q[log P(x|z)] - KL(q(z)||P(z))

Mean-Field 假设:
  q(z) = Π_i q_i(z_i)
  假设隐变量相互独立
  坐标上升优化每个 q_i
\`\`\`

**现代 VI 方法**:
\`\`\`
Stochastic VI:
  用 mini-batch 估计 ELBO 梯度
  可扩展到大规模数据

黑箱 VI:
  不需要解析 ELBO 梯度
  用蒙特卡洛估计

Normalizing Flows:
  用可逆变换将简单分布变成复杂分布
  提高变分分布的表达能力

Amortized VI:
  用神经网络学习 q(z|x) 的参数
  VAE 就是这种方法!
\`\`\`

### MCMC vs VI 对比

| 维度 | MCMC | VI |
|------|------|-----|
| 精度 | 渐近精确 | 近似 |
| 速度 | 慢 | 快 |
| 扩展性 | 小数据 | 大数据 |
| 诊断 | 有成熟方法 | 困难 |
| 模式 | 可以找多个模式 | 可能错过模式 |
| 方差估计 | 准确 | 通常低估 |
| 实现 | 较简单 | 需要推导 |

### 在深度学习中的应用

\`\`\`
VAE = 深度生成模型 + 变分推断
  编码器 = 变分分布 q(z|x)
  解码器 = 似然 P(x|z)
  训练 = 最大化 ELBO

扩散模型:
  去噪过程可以看作变分推断
  训练目标是 ELBO 的简化形式

贝叶斯神经网络:
  权重的后验 P(W|D)
  用 VI 或 MC Dropout 近似
\`\`\``,
  },
  {
    id: 'cml9s5ebx001tt4xibv170hkh', // Neural Network Fundamentals - 激活函数与初始化
    content: `## 激活函数与初始化 — 深度网络训练的基石

激活函数引入非线性，使神经网络能拟合任意复杂函数。初始化策略决定了训练能否顺利开始。两者的选择直接影响梯度流动和网络可训练性。

### 激活函数详解

**ReLU (Rectified Linear Unit)**:
\`\`\`
f(x) = max(0, x)

优点:
  - 计算简单: 只需要比较和取最大
  - 缓解梯度消失: x>0 区域梯度恒为 1
  - 稀疏激活: 约 50% 神经元输出 0

缺点:
  - 死神经元 (Dying ReLU): x<0 时梯度为 0
    → 一旦进入负区间，永远无法恢复
  - 输出非零中心: 可能导致 zig-zag 更新
\`\`\`

**Leaky ReLU / PReLU**:
\`\`\`
f(x) = max(αx, x)

Leaky ReLU: α 固定 (通常 0.01)
PReLU: α 可学习

解决死神经元问题，负区间仍有小梯度
\`\`\`

**ELU (Exponential Linear Unit)**:
\`\`\`
f(x) = x           if x > 0
     = α(e^x - 1)  if x ≤ 0

优点: 负区间平滑，输出均值接近 0
缺点: 计算需要指数运算
\`\`\`

**GELU (Gaussian Error Linear Unit)**:
\`\`\`
f(x) = x · Φ(x)
     ≈ 0.5x(1 + tanh(√(2/π)(x + 0.044715x³)))

Φ = 标准正态分布的 CDF

直觉: 以概率 Φ(x) 激活 (概率门控)
       x 越大，激活概率越高

特点:
  - 平滑非单调
  - Transformer 的默认激活函数 (BERT, GPT)
  - 在 NLP 任务上效果最好
\`\`\`

**SiLU / Swish**:
\`\`\`
f(x) = x · σ(x)

σ = sigmoid 函数

类似 GELU，但用 sigmoid 替代正态 CDF
Google 搜索发现，在某些视觉任务上优于 ReLU
LLaMA 使用 SiLU
\`\`\`

**Softmax** (输出层专用):
\`\`\`
softmax(x)_i = exp(x_i) / Σ_j exp(x_j)

性质:
  - 输出和为 1 (概率分布)
  - 放大差异 (最大值对应概率接近 1)
  - 数值稳定: softmax(x) = softmax(x - max(x))
\`\`\`

### 激活函数选择指南

| 场景 | 推荐 | 原因 |
|------|------|------|
| Transformer/LLM | GELU 或 SiLU | 经验效果最好 |
| CNN | ReLU 或 Leaky ReLU | 简单高效 |
| RNN/LSTM | tanh (门控用 sigmoid) | 历史原因+梯度稳定 |
| 多分类输出 | Softmax | 输出概率分布 |
| 二分类输出 | Sigmoid | 输出单一概率 |
| 回归输出 | 无激活 (线性) | 无范围限制 |

### 权重初始化策略

**为什么初始化重要?**
\`\`\`
设 L 层网络: y = W_L · ... · W_2 · W_1 · x

如果权重太大:
  激活值指数增长 → 梯度爆炸

如果权重太小:
  激活值指数衰减 → 梯度消失

目标: 保持每层激活值和梯度的方差稳定
\`\`\`

**Xavier (Glorot) 初始化**:
\`\`\`
设计用于 sigmoid/tanh:

W ~ N(0, 2/(n_in + n_out))
或
W ~ Uniform(-√(6/(n_in + n_out)), √(6/(n_in + n_out)))

推导假设:
  - 激活函数是线性的 (在原点附近)
  - 输入和权重独立
  - 保持前向和反向传播的方差不变
\`\`\`

**He (Kaiming) 初始化**:
\`\`\`
设计用于 ReLU:

W ~ N(0, 2/n_in)

为什么 ReLU 需要不同的初始化?
  - ReLU 砍掉一半激活 (负半部分)
  - 方差减半
  - 需要初始方差加倍来补偿

PyTorch:
  nn.init.kaiming_normal_(weight, mode='fan_in', nonlinearity='relu')
\`\`\`

**其他初始化**:
\`\`\`
LSUV (Layer-Sequential Unit-Variance):
  逐层前向传播，调整权重使每层输出方差=1

Fixup:
  特殊的残差网络初始化
  可以训练非常深的网络 (10000 层) 而无需 BatchNorm

Zero Init:
  残差分支的最后一层初始化为 0
  使残差块初始时为恒等映射
  GPT-2 使用
\`\`\`

### 归一化层详解

| 方法 | 归一化维度 | 公式 | 典型用途 |
|------|-----------|------|---------|
| BatchNorm | batch | $(x - μ_B) / σ_B$ | CNN |
| LayerNorm | features | $(x - μ_L) / σ_L$ | Transformer |
| GroupNorm | channel groups | 分组计算 μ, σ | 小 batch CNN |
| InstanceNorm | single sample | 每样本独立 | 风格迁移 |
| RMSNorm | features (无偏移) | $x / \\text{RMS}(x)$ | LLaMA |

**BatchNorm**:
\`\`\`
训练时: μ, σ 来自当前 mini-batch
推理时: 使用训练过程中的移动平均

问题:
  - 小 batch 时统计量不稳定
  - 序列模型中 batch 维度不直观
  - 训练-推理不一致
\`\`\`

**LayerNorm**:
\`\`\`
在特征维度上归一化，与 batch 无关

LN(x) = γ · (x - μ) / σ + β

μ = mean(x, dim=-1)
σ = std(x, dim=-1)
γ, β = 可学习参数

优点:
  - 与 batch 大小无关
  - 训练推理一致
  - 适合序列模型
\`\`\`

**RMSNorm** (LLaMA 使用):
\`\`\`
RMSNorm(x) = x / RMS(x) · γ

RMS(x) = √(mean(x²))

优点:
  - 比 LayerNorm 更快 (无需计算均值)
  - 实践中效果相当
  - 参数减半 (没有 β)
\`\`\``,
  },
  {
    id: 'cml9s5eby001yt4xiuszvyfhe', // CNN Architectures - CNN 架构演进
    content: `## CNN 架构演进史 — 从 LeNet 到 ConvNeXt

卷积神经网络 (CNN) 是计算机视觉的基石。理解 CNN 的架构演进，有助于把握深度学习的设计哲学和未来趋势。

### 里程碑架构

**LeNet-5 (1998, Yann LeCun)**:
\`\`\`
输入: 32×32 灰度图像
架构: Conv → Pool → Conv → Pool → FC → FC → Output
特点:
  - 第一个成功的 CNN
  - 应用: 手写数字识别 (邮政编码)
  - 参数量: ~60K
\`\`\`

**AlexNet (2012, Krizhevsky et al.)**:
\`\`\`
ImageNet 竞赛冠军，深度学习复兴的起点

创新:
  1. ReLU 激活 (首次大规模使用)
  2. Dropout 正则化
  3. 数据增强 (随机裁剪、翻转)
  4. GPU 训练 (双 GPU 并行)
  5. LRN (Local Response Norm，现已弃用)

架构: 5 Conv + 3 FC
参数: 60M
Top-5 错误率: 15.3% (比第二名低 10%)
\`\`\`

**VGGNet (2014, Oxford)**:
\`\`\`
核心思想: 3×3 小卷积核堆叠

为什么 3×3?
  两个 3×3 = 一个 5×5 的感受野
  三个 3×3 = 一个 7×7 的感受野
  但参数更少，非线性更多

VGG-16 架构:
  [64]×2 → Pool → [128]×2 → Pool → [256]×3 → Pool
  → [512]×3 → Pool → [512]×3 → Pool → FC×3

参数: 138M (大部分在 FC 层)
\`\`\`

**GoogLeNet/Inception (2014, Google)**:
\`\`\`
核心思想: 同一层使用多种感受野

Inception 模块:
  ┌─ 1×1 conv ─────────────────┐
  │                             │
  ├─ 1×1 → 3×3 conv ────────────┤
  │                             │ Concat
  ├─ 1×1 → 5×5 conv ────────────┤
  │                             │
  └─ 3×3 maxpool → 1×1 conv ───┘

1×1 卷积的作用:
  - 降维: 减少计算量
  - 跨通道信息融合
  - 增加非线性

参数: 只有 5M (VGG 的 1/27)
\`\`\`

**ResNet (2015, Microsoft)**:
\`\`\`
核心创新: 残差连接 (Skip Connection)

残差块:
  y = F(x) + x

F(x) 学习残差映射，而不是完整映射
极端情况: F(x)=0 时，y=x (恒等映射)

为什么有效:
  1. 梯度高速公路: 梯度可以直接流过 skip connection
  2. 恒等映射容易学: 学 F(x)=0 比学 f(x)=x 容易
  3. 隐式集成: 相当于不同深度网络的集成

突破: 152 层网络成功训练 (ImageNet top-5: 3.57%)
衍生: ResNeXt, Wide ResNet, SE-ResNet
\`\`\`

**DenseNet (2017, Cornell)**:
\`\`\`
核心思想: 密集连接，特征复用

Dense Block:
  x_l = H_l([x_0, x_1, ..., x_{l-1}])

  每层都与之前所有层连接

优点:
  - 极强的特征复用
  - 参数效率高
  - 梯度流动更顺畅

问题:
  - 内存消耗大
  - 实际速度比 ResNet 慢
\`\`\`

**EfficientNet (2019, Google)**:
\`\`\`
核心思想: 复合缩放 (Compound Scaling)

同时按比例增加:
  - 深度 (层数): d = α^φ
  - 宽度 (通道数): w = β^φ
  - 分辨率 (输入大小): r = γ^φ

约束: α·β²·γ² ≈ 2 (计算量翻倍)

EfficientNet-B0 到 B7:
  B0: 5.3M 参数, 77.1% top-1
  B7: 66M 参数, 84.3% top-1

用 NAS (神经架构搜索) 找到基础架构
\`\`\`

**ConvNeXt (2022, Meta)**:
\`\`\`
核心思想: "现代化"的 ResNet，对标 ViT

改进:
  1. Stem: 4×4 conv stride 4 (类似 ViT patchify)
  2. 大卷积核: 7×7 depthwise conv
  3. 更少激活和归一化
  4. GELU 激活
  5. LayerNorm 替代 BatchNorm
  6. 分离下采样层

结果: 纯卷积网络可以达到 ViT 的性能
启示: 很多 Transformer 的优势来自训练技巧，不只是注意力机制
\`\`\`

### 输出尺寸计算公式

\`\`\`
O = floor((I - K + 2P) / S) + 1

I = 输入大小
K = 卷积核大小
P = padding
S = stride

常用配置:
  "same" padding: P = (K-1)/2, S=1 → O = I
  下采样: K=3, P=1, S=2 → O = I/2
\`\`\`

### 设计原则总结

| 原则 | 早期 | 现代 |
|------|------|------|
| 卷积核大小 | 大 (5×5, 7×7) | 小 (3×3) + 深堆叠 |
| 下采样 | MaxPool | Stride=2 conv |
| 归一化 | BatchNorm | LayerNorm (受 Transformer 影响) |
| 激活函数 | ReLU | GELU / SiLU |
| 跳跃连接 | 无 | 必备 (残差连接) |
| 全连接层 | 多层 FC | Global Average Pool → 单层 |`,
  },
]

const NEW_NOTES = [
  {
    taskTitle: 'Supervised Learning',
    title: '核心监督学习算法详解',
    content: `## 核心监督学习算法

### 线性回归

\`\`\`
模型: y = w^T x + b
损失: L = Σ(y_i - ŷ_i)²  (MSE)

闭式解:
  w = (X^T X)^{-1} X^T y

梯度下降:
  w ← w - η · X^T(Xw - y)

正则化版本:
  Ridge: w = (X^T X + λI)^{-1} X^T y
  Lasso: 无闭式解，需要迭代算法
\`\`\`

### 逻辑回归

\`\`\`
模型: P(y=1|x) = σ(w^T x + b) = 1/(1+e^{-z})
损失: L = -Σ[y log(ŷ) + (1-y)log(1-ŷ)]  (交叉熵)

梯度:
  ∂L/∂w = X^T(ŷ - y)  # 与线性回归形式相同!

决策边界: w^T x + b = 0 (线性超平面)
\`\`\`

### 支持向量机 (SVM)

\`\`\`
硬边距 SVM:
  min  0.5||w||²
  s.t. y_i(w·x_i + b) ≥ 1

软边距 SVM (允许误分):
  min  0.5||w||² + C Σ ξ_i
  s.t. y_i(w·x_i + b) ≥ 1 - ξ_i, ξ_i ≥ 0

核技巧:
  将 x·x' 替换为 K(x, x')
  常用核: RBF, 多项式, sigmoid
  支持向量: 在边界上的样本
\`\`\`

### 决策树

\`\`\`
分裂准则:
  信息增益: IG = H(parent) - Σ(n_i/n)H(child_i)
  基尼不纯度: Gini = 1 - Σp_i²

剪枝:
  预剪枝: 限制深度、最小样本数
  后剪枝: 训练完整树后修剪

优点: 可解释、处理非线性、特征选择
缺点: 高方差、容易过拟合
\`\`\`

### K 近邻 (KNN)

\`\`\`
分类: 投票 → 多数类
回归: 平均 → k 个邻居的均值

距离度量:
  欧氏距离: √Σ(x_i - y_i)²
  曼哈顿距离: Σ|x_i - y_i|
  余弦相似度: x·y / (||x|| ||y||)

K 的选择:
  K 太小 → 高方差 (过拟合)
  K 太大 → 高偏差 (欠拟合)
  通常用交叉验证选择
\`\`\``,
  },
  {
    taskTitle: 'Neural Network Fundamentals',
    title: '反向传播算法详解',
    content: `## 反向传播 (Backpropagation) 详解

### 计算图视角

\`\`\`
神经网络 = 计算图
前向传播 = 从输入到输出计算每个节点的值
反向传播 = 从输出到输入计算每个参数的梯度

关键: 链式法则
  ∂L/∂x = ∂L/∂y · ∂y/∂x
\`\`\`

### 简单例子

\`\`\`
两层网络:
  z1 = W1 · x + b1
  a1 = ReLU(z1)
  z2 = W2 · a1 + b2
  ŷ = softmax(z2)
  L = CrossEntropy(y, ŷ)

前向传播:
  x → z1 → a1 → z2 → ŷ → L

反向传播:
  ∂L/∂z2 = ŷ - y           (softmax+CE 的简洁梯度)
  ∂L/∂W2 = ∂L/∂z2 · a1^T
  ∂L/∂b2 = ∂L/∂z2
  ∂L/∂a1 = W2^T · ∂L/∂z2
  ∂L/∂z1 = ∂L/∂a1 ⊙ (z1 > 0)  (ReLU 的梯度)
  ∂L/∂W1 = ∂L/∂z1 · x^T
  ∂L/∂b1 = ∂L/∂z1
\`\`\`

### 梯度消失与爆炸

\`\`\`
L 层网络的梯度:
  ∂L/∂W1 ∝ Π_{i=1}^{L} ∂a_i/∂a_{i-1}

如果每层的 Jacobian 范数:
  > 1: 指数增长 → 梯度爆炸
  < 1: 指数衰减 → 梯度消失

解决方案:
  1. ReLU 激活 (正区间梯度恒为 1)
  2. 残差连接 (梯度直接流过)
  3. 归一化层 (稳定中间层分布)
  4. 梯度裁剪 (限制梯度范数)
  5. 合适的初始化 (Xavier/He)
\`\`\`

### PyTorch 自动微分

\`\`\`python
# 自动构建计算图
x = torch.tensor([1.0], requires_grad=True)
y = x ** 2 + 2 * x
y.backward()  # 反向传播
print(x.grad)  # dy/dx = 2x + 2 = 4

# 计算图的动态性
for i in range(n):
    y = f(y)  # 每次循环都重建计算图
y.backward()  # 沿着实际执行的路径反向传播
\`\`\``,
  },
]

async function main() {
  console.log('Expanding ML/DL notes...\n')

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
