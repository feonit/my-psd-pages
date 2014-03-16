MyDesktop = new Ext.app.App({
    init :function(){
        Ext.QuickTips.init();
    },

    getModules : function(){
        return [
            new MyDesktop.PsdWindow(),
            new MyDesktop.DealWindow(),
            new MyDesktop.NoteWindow()
        ];
    }

});



/*
 * Example windows
 */


MyDesktop.PsdWindow = Ext.extend(Ext.app.Module, {
    id:'psd',
    init : function(){
        this.launcher = {
            handler : this.createWindow
        }
    },

    createWindow : function(opts){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
            win = desktop.createWindow({
                id: this.id,
                title: 'Создание исходящего по производственным вопросам',
                width:450,
                height:400,
                iconCls: opts.icon,
                items: [

                ]
            });
        }
        win.show();
    }
});

MyDesktop.DealWindow = Ext.extend(Ext.app.Module, {
    id:'deal',
    init : function(){
        this.launcher = {
            handler : this.createWindow
        }
    },

    createWindow : function(opts){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
            win = desktop.createWindow({
                id: this.id,
                title: 'Создание исходящего по непроизводственным вопросам',
                width:700,
                height:400,
                iconCls: opts.icon,
                items: [

                ]
            });
        }
        win.show();
    }
});

MyDesktop.NoteWindow = Ext.extend(Ext.app.Module, {
    id:'note',
    init : function(){
        this.launcher = {
            handler : this.createWindow
        }
    },

    createWindow : function(opts){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
            win = desktop.createWindow({
                id: this.id,
                title: 'Создание служебной записки',
                width:700,
                height:300,
                iconCls: opts.icon,
                items: [

                ]
            });
        }
        win.show();
    }
});

