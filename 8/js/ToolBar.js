/**
 * @class Ext.ux.ToolBar
 * @extends Ext.util.Observable
 */
Ext.ux.ToolBar = function(app){
    this.app = app;
    this.init();
}

Ext.extend(Ext.ux.ToolBar, Ext.util.Observable, {
    init : function(){
        var toolbar = new Ext.Toolbar(),
            that = this;

        function showWindow(){
            var id = this.id,
                opts,
                module;

            opts = {
                id: this.id,
                icon: this.iconCls
            };
            module = that.app.getModule(id);

            if (module) {
                module.createWindow(opts);
            }
        }

        toolbar.render('ux-toolbar');

        toolbar.add({
                text:'Создать',
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            id: 'psd',
                            text: 'Исходящее по ПСД',
                            iconCls: 'mail-reply',
                            handler: showWindow
                        },{
                            id: 'deal',
                            text: 'Исходящее по деловой переписке',
                            iconCls: 'mail-reply-all',
                            handler: showWindow
                        },{
                            id: 'note',
                            text: 'Служебная записка',
                            iconCls: 'receipt--pencil',
                            handler: showWindow
                        }
                    ]
                })
            },{
                text:'Планирование',
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: 'Планирование по експертам',
                            iconCls: 'chart'
                        }
                    ]
                })
            },{
                text:'Перейти к...',
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: 'Система "Реестр"',
                            iconCls: 'regcentre'
                        },
                        {
                            text: 'Система "Реестр СДОСС"',
                            iconCls: 'regcentre'
                        }
                    ]
                })
            },'->',' ',{
                iconCls: 'binocular',
                tooltip: ''
            },' ',
            new Ext.form.TriggerField({
                triggerClass: 'x-form-search-trigger',
                onTriggerClick: null
            }),{
                text: '1',
                iconCls: 'mail'
            },{
                text: 'Артюшкова Г.Д.',
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: 'Личные папки',
                            iconCls: 'folders'
                        },{
                            text: 'Персональные настройки',
                            iconCls: 'gear'
                        },{
                            text: 'Просмотренные документы',
                            iconCls: 'inbox-document-text'
                        },{
                            text: 'Созданные документы',
                            iconCls: 'document--pencil'
                        },{
                            text: 'Профиль пользователя',
                            iconCls: 'user--pencil'
                        },{
                            text: 'Выход',
                            iconCls: 'door-open-out'
                        }
                    ]
                })
            },
            {
                text: '',
                iconCls: 'question-frame',
                menu: new Ext.menu.Menu({
                    items: [
                        {
                            text: "О программе",
                            iconCls: 'question-button'
                        }
                    ]
                })
            }


        );

        toolbar.doLayout();
    }
});