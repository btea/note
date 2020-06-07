### 修改刚提交有错误的代码  
"amend" 是[修正]的意思。在提交时，如果加上 `--amend`参数，Git不会再当前 `commit`上增加`commit`,而是会把当前`commit`里的内容和暂存区（stageing area）里的内容合并起来后创建一个新的`commit`,**用这个新的`commit`把当前`commit`替换掉**。所以，`commit --amend` 做的事就是它的字面意思：对最新一条`commit` 进行修正。  
需要注意的一点：`commit --amend`并不是直接修改原 `commit` 内容，而是生成一条心的 `commit`。  

### 开启交互式 reabse 过程  
若要修改当前 `commit`的前两个 `commit`，现在再用`commit --amend` 已经晚了，但可以用 `rebase -i`  
> git rebase -i HEAD^^  

说明： 在Git中，有两个偏移符号：`^` 和 `~`。  
`^` 的用法：在 `commit` 的后面加一个或多个 `^` 号，可以把 `commit` 往回偏移，偏移的数量是 `^` 的数量。例如：`master^ `表示 `master` 指向的 `commit` 之前的那个 `commit； HEAD^^` 表示 `HEAD` 所指向的 `commit` 往前数两个 `commit`。

`~` 的用法：在 `commit` 的后面加上 `~` 号和一个数，可以把 `commit` 往回偏移，偏移的数量是 `~` 号后面的数。例如：`HEAD~5` 表示 `HEAD` 指向的 `commit`往前数 `5` 个 `commit`。  


### reset的本质————不止可以撤销提交  
```
git reset --hard HEAD^   
```
> 用这行代码可以撤销掉当前 `commit`  

#### reset 的本质：移动HEAD以及它所指向的branch  
实质上，`reset` 这个指令虽然可以用来撤销 `commit` ，但它的实质行为并不是撤销，而是移动 `HEAD` ，并且「捎带」上 `HEAD` 所指向的 `branch`（如果有的话）。也就是说，`reset` 这个指令的行为其实和它的字面意思 "reset"（重置）十分相符：它是用来重置 `HEAD` 以及它所指向的 `branch` 的位置的。  
同理，`reset --hard`不仅可以撤销提交，还可以用来把`HEAD`和`branch`移动到其他的任何地方。  
> git reset --hard branch2  

#### reset --hard: 重置工作目录  
`reset --hard`会在重置`HEAD` 和 `branch` 的同时，重置工作目录里的内容。当你在 `reset` 后面加了`--hard`参数时，你的工作目录里的内容会被完全重置为何`HEAD`的新位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。  
#### reset --soft：保留工作目录  
`reset --soft` 会在重置 `HEAD` 和 `branch` 时，保留工作目录和暂存区中的内容，并把重置 `HEAD` 所带来的新的差异放进暂存区。  
#### reset不加参数：保留工作目录，并清空暂存区  
`reset` 如果不加参数，那么默认使用 `--mixed` 参数。它的行为是：保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 `reset` 所导致的新的文件差异，都会被放进工作目录。简而言之，就是「把所有差异都混合（mixed）放在工作目录中」。


### stash: 临时存放工作目录的改动  
"stash"这个词，和它意思接近的中文翻译是[隐匿]。  
具体说来，`stash` 的用法很简单。当你手头有一件临时工作要做，需要把工作目录暂时清理干净，那么你可以：  
```
git stash
```  
就这么简单，你的工作目录的改动就被清空了，所有改动都被存了起来。  
切换回分支：  
```
git stash pop 
``` 
>注意：没有被 track 的文件（即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 `-u` 参数，它是 `--include-untracked` 的简写。就像这样：  git stash -u 
