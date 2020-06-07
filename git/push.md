## push的本质  
### push：把 branch 上传到远端仓库  
实质上，`push` 做的事是：把当前 `branch` 的位置（即它指向哪个`commit`）上传到远端仓库，并把它的路径上的 `commit`S 一并上传。  
`push`的时候，如果当前分支是一个本地创建的分支，需要制定远程仓库名和分支名，用`git push origin barnch_name`的格式，而不能只用`git push`;或者可以通过`git config` 修改 `push.default` 来改变 `push` 时的行为逻辑。  
`push`的时候之后上传当前分支，并不会上传`HEAD`;远程仓库的`HEAD`是永远指向默认分支（即`master`）的。  
