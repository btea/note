[层合成(composite)](http://jartto.wang/2017/09/29/expand-on-performance-composite/)   

### 什么是composite?  
通俗来说：在DOM树中每个节点都会对应一个 LayoutObject，当他们的 LayoutObject 处于相同的坐标空间时，就会形成一个 RenderLayers，也就是渲染层。   
RenderLayers 来保证页面元素以正确的顺序合成，这时候就会出现层合成（composite），总而正确处理透明元素和重叠元素的显示。  

