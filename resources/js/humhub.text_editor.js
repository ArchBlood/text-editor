humhub.module('text_editor', function (module, require, $) {
    var client = require('client');
    var modal = require('ui.modal');
    var object = require('util').object;
    var Widget = require('ui.widget').Widget;

    var Editor = function (node, options) {
        Widget.call(this, node, options);
    };

    object.inherits(Editor, Widget);

    Editor.prototype.init = function () {
        this.modal = modal.get('#texteditor-modal');

        var that = this;
        this.modal.$.on('hidden.bs.modal', function (evt) {
            that.modal.clear();
        });

    };

    Editor.prototype.save = function (evt) {
        var that = this;

        client.submit(evt).then(function (response) {
            if (response.result) {
                that.modal.clear();
                that.modal.close();
                module.log.success(response.result);
            } else if (response.error) {
                module.log.error(response, true);
            }
        }).catch(function (e) {
            module.log.error(e, true);
        });

        evt.finish();
    }

    module.export({
        Editor: Editor,
    });

});