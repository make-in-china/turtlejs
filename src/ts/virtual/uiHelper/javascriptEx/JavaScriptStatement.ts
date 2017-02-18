namespace JS{
    export interface IJavaScriptStatementChild {
        'VNode':VMDOM.VNode&IVNodeMethod
    }

    export interface JavaScriptStatement{
        
        // children:(JavaScriptStatement|(VMDOM.VNode&IVNodeMethod))[]
    }

}