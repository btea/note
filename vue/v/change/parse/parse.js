export function parseHTML(html, options = {}){
    while(html) {
        if (!lastTag || !isPlainTextEelement(lastTag)) {
            // 父元素为正常元素的处理逻辑
            // 可能会有以下几种情况
            // 文本、注释、条件注释、DOCTYPE、结束标签、开始标签
            // 在这些处理的类型中，除了文本之外，其他都是以标签的形式存在的，而标签是以 < 开头的
            let textEnd = html.indexOf('<')
            if (textEnd === 0) {
                // 注释
                if (comment.test(html)) {
                    // 注释的处理逻辑
                    continue
                }
                // 条件注释
                if (conditionalComment.test(html)) {
                    // 条件注释的处理逻辑
                    continue
                }
                // DOCTYPE
                const doctypeMatch = html.match(doctype)
                if (doctypeMatch) {
                    // DOCTYPE的处理逻辑
                    continue
                }

                // 结束标签
                const endTagMatch = html.match(doctype)
                if (endTagMatch) {
                    // 结束标签的处理逻辑
                    continue
                }
                // 开始标签
                const startTagMatch = parseStartTag()
                if (startTagMatch) {
                    // 开始标签的处理逻辑
                    continue
                }
            }
            let txet, rest, next
            if (textEnd >= 0) {

            }
            if (textEnd < 0) {
                text = html
                html = ''
            }
            if (options.chars && text) {
                options.chars(text)
            }
        }else {
            // 父元素为script、style、textarea这种纯文本内容的元素的逻辑
        }
    }
}