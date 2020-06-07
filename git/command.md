`git clone` : 克隆，将中央仓库的项目代码拉到本地机器   
`git status`: 用来查看工作目录当前状态  
`git add`   : 用来将修改将`未追踪(untracked)`的文件变成`已暂存(staged)`,意思是这个文件中被改动的部分（也就是这整个文件）被记录进了`暂存区(staging area)`  
`git commit`: 提交暂存文件，并添加提交信息(commit message)。
```
一般操作 git commit -m 'message'  引号里面的就是提交的说明信息
若直接执行 git commit 命令，根据操作系统以及设置设置的不同，这个界面的编辑器可能是 nano 或者 vi 或者别的什么。
· 在初始状态下，你是在命名模式，不能编辑这个文件，需要按一下 "i"(小写)来切换到插入模式，然后就可以输入你的提交信息。  
· 在输入完成后别按回车，而是要按 ESC 键返回到命令模式，然后连续输入两个大写的 "Z"(用Shift 键或 Capslock键都可以)，就保存并退出了。 
```  
`git log`   : 查看提交记录。最新提交在最上面。  
`git push`  : 把本地的提交发布（即上传到中央仓库）。  
`git pull`  : 从中央仓库更新代码到本地。  
`git branch`: 创建`branch(分支)`的方式是`git branch 名称` 或 `git checkout -b 名称` (创建后自动切换)。  
`git checkout`: 切换分支，切换的方式是`git checkout 名称`。  
`git barnch -d`: 删除分支，删除的方式是`git branch -d 名称`。  
`HEAD`、`master`、`barnch`:  
1、`HEAD` 是指向当前 `commit` 的引用，它具有唯一性，每个仓库中只有一个 `HEAD`。在每次提交时它都会自动向前移动到最新的 `commit` 。  
2、`branch` 是一类引用。`HEAD` 除了直接指向 `commit`，也可以通过指向某个 `branch` 来间接指向 `commit`。当 `HEAD` 指向一个 `branch` 时，`commit` 发生时，`HEAD` 会带着它所指向的 `branch` 一起移动。  
3、`master` 是 Git 中的默认 `branch`，它和其它 `branch` 的区别在于：  
> 1、新建的仓库中的第一个 commit 会被 master 自动指向；  
> 2、在 git clone 时，会自动 checkout 出 master。  



