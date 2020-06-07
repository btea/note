## merge: 合并 commits  
### 含义和用法   
`merge`的意思是[合并]，它做的事也是合并；指定一个`commit`,把它合并到当前的`commit`来。具体来讲，`merage`做的事是：  
**从目标 `commit` 和当前 `commit` (即 `HEAD` 所指向的 `commit` )分叉的位置起，把目标 `commit` 的路径上的所有 `commit` 的内容一并应用到当前 `commit` 的内容一并应用到当前 `commit` ,然后自动生成一个新的 `commit` 。**   
### 适用场景  
1、合并分支  
当一个 `branch` 的开发已经完成，需要把内容合并回去时，用 `merge` 来进行合并。  
2、`pull`的内部操作  
`pull` 的实际操作其实是把远端仓库的内容用 `fetch` 取下来之后，用 `merge` 来合并。  

### 特殊情况1： 冲突  
`merge` 在做合并的时候，具有一定的自动合并能力。两个分支的修改都自动合并到一起，若两个分支修改了相同的内容, `merge` 的自动算法就搞不定了。这种情况 Git 称之为： 冲突(Conflict)。  
遇到这种情况，Git 会把问题交给你来决定。具体地，它会告诉你 `merge` 失败，以及失败的原因。  
此时，根据提示信息找到冲突的文件，手动解决掉冲突，然后手动 `commit` 一下。  
#### 放弃解决冲突，取消 merge?  
> git merge --abort  
输入这行代码，你的 Git 仓库就会回到 `merge` 前的状态。  

### 特殊情况2：HEAD 领先于目标 commit  
如果 `merge` 时的目标 `commit` 和 `HEAD` 处的 `commit` 并不存在分叉，而是 `HEAD` 领先于目标 `commit`：  
那么 `merge` 就没必要再创建一个新的 `commit` 来进行合并操作，因为并没有什么需要合并的。在这种情况下， Git 什么也不会做，`merge` 是一个空操作。  

### 特殊情况3：HEAD落后于 目标 commit——fast-forward  
而另一种情况：如果 `HEAD` 和目标 `commit` 依然是不存在分叉，但 `HEAD` 不是领先于目标 `commit`，而是落后于目标 `commit`：  
那么 Git 会直接把 `HEAD`（以及它所指向的 `branch`，如果有的话）移动到目标 `commit`：  
这种操作有一个专有称谓，叫做 "fast-forward"（快速前移）。  
