/**
 * @class Ext.ux.WorkSpace
 * @extends Ext.util.Observable
 */
Ext.ux.WorkSpace = function(app){
    this.app = app;
    this.init();
}

Ext.extend(Ext.ux.WorkSpace, Ext.util.Observable, {
    init : function(){

        var bogusMarkup = "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        var tools = [{
            id:'refresh',
            handler: function(){
                Ext.Msg.alert('Message', 'The Settings tool was clicked.');
            }
        }];
        var parent = 'ux-workspace';

        new Ext.Button({
            id: 'b-refresh',
            text: 'Обновить',
            iconCls: 'refresh',
            renderTo: parent
        })

        new Ext.Panel({
            title: 'МОИ ДОКУМЕНТЫ',
            collapsible:true,
            renderTo: parent,
            html: bogusMarkup,
            tools: tools,
            collapsed : false
        });
        new Ext.Panel({
            title: 'МОИ СОГЛАСОВАНИЯ',
            collapsible:true,
            renderTo: parent,
            html: bogusMarkup,
            tools: tools,
            collapsed : true

        });
        new Ext.Panel({
            title: 'МОИ СЛУЖЕБНЫЕ ЗАПИСКИ',
            collapsible:true,
            renderTo: parent,
            html: bogusMarkup,
            tools: tools,
            collapsed : true

        });
        new Ext.Panel({
            title: 'МОИ ПРОЕКТЫ',
            collapsible:true,
            renderTo: parent,
            html: bogusMarkup,
            tools: tools,
            collapsed : true

        });
        new Ext.Panel({
            title: 'МЕТОДОЛОГИЧЕСКОЕ ОБЕСПЕЧЕНИЕ ЭКСПЕРТНОЙ ДЕЯТЕЛЬНОСТИ',
            collapsible:true,
            renderTo: parent,
            html: bogusMarkup,
            tools: tools,
            collapsed : true

        });
    }
});