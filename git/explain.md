## 版本控制系统（Version Control System - VCS）  
Git是一个分布式版本控制系统(Distributed Version Control System - DVCS)。  

### 版本控制  
```
版本控制系统(VCS)最基本的功能是版本控制。所谓版本控制，意思就是在文件的修改历程中保留修改历史，让你可以方便地撤销之前对文件的修改操作。
```
### 主动提交  
VCS和文本编辑器的撤销功能比起来，有一个很重要的区别是：程序代码的修改的生命周期非常长。如果依然采用[每次修改自动保存]的形式来保留修改历史，将会导致改动历史非常频繁和无章可循。所以，和文本编辑的撤销功能不同，VCS保存修改历史，使用的是`主动提交改动`的机制。  
### 多人合作的同步需求：中央仓库  
**版本控制、主动提交、中央仓库**这三个要素，共同构成了版本控制系统(VCS)的核心：开发团队中的每个人向中央仓库主动提交自己的改动和同步别人的改动，并在需要的时候查看和操作历史版本，这就是版本控制系统。  

## 中央式版本控制系统(CVCS)  
最初的版本控制系统，是中央式版本控制系统(Centralized VCS),也就是前面讲的这种。Git是分布式版本控制系统（Distributed VCS）。  
### 工作模型  
每个项目有一个中央仓库（公司服务器或者云服务器），多人同时开发，将修改后的代码更新到中央仓库，其他人从远程仓库同步到自己的机器上的开发模式。  


## 分布式版本控制系统(DVCS)  
分布式 VCS （Distributed VCS / DVCS）和中央式的区别在于，分布式 VCS 除了中央仓库之外，还有本地仓库：团队中每一个成员的机器上都有一份本地仓库，这个仓库里包含了所有的版本历史，或者换句话说，每个人在自己的机器上就可以提交代码、查看历史，而无需联网和中央仓库交互——当然，取而代之的，你需要和本地仓库交互。  

中央式 VCS 和中央仓库有两个主要功能：**保存版本历史、同步团队代码**。而在分布式 VCS 中，保存版本历史的工作转交到了每个团队成员的本地仓库中，中央仓库就只剩下了同步团队代码这一个主要任务。它的中央仓库依然也保存了历史版本，但这份历史版本更多的是作为团队间的同步中转站。  
### 工作模型  
首先，主工程师创建项目框架，并推送到服务器的中央仓库，其他开发者从中仓库将所有内容克隆到本地，并拥有了各自的本地仓库。后续开发中，多个小功能或者代码块的修改可以提交到本地本地仓库，在大功能开发完成之后，再推送到服务器中央仓库，其他人可以从远程仓库同步别人的提交到自己机器上。  
### 优点与缺点  
分布式VCS的优点：   
1、大多数的操作可以在本地进行，所以速度更快，而且由于无需联网，所以即使不在公司甚至没有互联网，你也可以提交代码、查看历史，从而极大地减小了开发者的网络条件和物理位置的显示；  
2、由于可以提交到本地，所以你可以分步提交代码，把代码提交做得更细，而不是一个提交包含很多代码，难以review也难以回溯。  

分布式VCS的缺点：  
1、由于每一个机器都有会完整的本地仓库，所以初次获取项目（Git术语：clone）的时候会比较耗时；  
2、由于每个机器都会有完整本地仓库，所以本地占用的存储比中央式VCS要高。  



