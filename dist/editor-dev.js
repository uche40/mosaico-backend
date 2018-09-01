(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Mosaico = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var templateSystem=require("../src/js/bindings/choose-template.js");document.addEventListener("DOMContentLoaded",function(t){templateSystem.addTemplate("array","\x3c!-- ko foreach: $data --\x3e\x3c!-- ko block: $data --\x3e\x3c!-- /ko --\x3e\x3c!-- /ko --\x3e"),templateSystem.addTemplate("block-show","\x3c!-- ko block: $data, scrollIntoView: $root.selectedBlock() === $data --\x3e\x3c!-- /ko --\x3e"),templateSystem.addTemplate("block-wysiwyg",'<div class="editable block" data-drop-content="Drop here" data-bind="attr: { \'data-drop-content\': $root.t(\'Drop here\') }, click: function(obj, evt) { $root.selectBlock(obj); return true }, clickBubble: false, css: { selected: $root.selectedBlock() === $data }, scrollIntoView: $root.selectedBlock() === $data">  <div class="mo-blockselectionhelper"></div>  <div class="tools" data-bind="tooltips: {}">    \x3c!-- ko if: typeof $index != \'undefined\' --\x3e    <div title="Drag this handle to move the block" data-bind="attr: { title: $root.t(\'Drag this handle to move the block\') }"      class="tool handle"><i class="fas fa-sort"></i></div>    \x3c!-- ko if: $index() > 0 --\x3e    <div title="Move this block upside" data-bind="attr: { title: $root.t(\'Move this block upside\') }" class="tool moveup"><i        class="fas fa-sort-up" data-bind=\'click: $root.moveBlock.bind($element, $index, $parent, true)\'></i></div>    \x3c!-- /ko --\x3e    \x3c!-- ko if: $index() < $parent.blocks().length -1 --\x3e    <div title="Move this block downside" data-bind="attr: { title: $root.t(\'Move this block downside\') }" class="tool movedown"><i        class="fas fa-sort-down" data-bind=\'click: $root.moveBlock.bind($element, $index, $parent, false)\'></i></div>    \x3c!-- /ko --\x3e    <div title="Delete block" class="tool delete" data-bind="attr: { title: $root.t(\'Delete block\') }, click: $root.removeBlock.bind($element, $rawData, $parent)"><i        class="fas fa-trash"></i></div>    <div title="Duplicate block" class="tool clone" data-bind="attr: { title: $root.t(\'Duplicate block\') }, click: $root.duplicateBlock.bind($element, $index, $parent)"><i        class="fas fa-copy"></i></div>    \x3c!-- /ko --\x3e    \x3c!-- ko if: typeof $data._nextVariant != \'undefined\' --\x3e    <div title="Switch block variant" class="tool variant" data-bind="attr: { title: $root.t(\'Switch block variant\') }, click: $data._nextVariant"><i        class="fa fa-fw fa-magic"></i></div>\x3c!-- /ko --\x3e  </div>  \x3c!-- ko block: $data --\x3e  \x3c!-- /ko --\x3e</div>'),templateSystem.addTemplate("blocks-show","\x3c!-- ko template: { name: 'block-show', foreach: blocks } --\x3e\x3c!-- /ko --\x3e"),templateSystem.addTemplate("blocks-wysiwyg","<div class=\"sortable-blocks-edit\" data-drop-content=\"Drop here\" data-empty-content=\"Drop here blocks from the Blocks tab\" data-bind=\"attr: { 'data-drop-content': $root.t('Drop here'), 'data-empty-content': $root.t('Drop here blocks from the &quot;Blocks&quot; tab') }, css: { 'empty': ko.utils.unwrapObservable(blocks).length == 0 }, extsortable: { connectClass: 'sortable-blocks-edit', template: 'block-wysiwyg', data: blocks, dragging: $root.dragging, beforeMove: $root.startMultiple, afterMove: $root.stopMultiple, options: { handle: '.handle', placeholder: $root.placeholderHelper } }\"></div>"),templateSystem.addTemplate("customstyle",'<div class="customStyleHelp" data-bind="html: $root.t(\'Customized block.<ul><li>In this status changes to properties will be specific to the current block (instead of being global to all blocks in the same section)</li><li>A <span class=&quot;customStyled&quot;><span>&quot;small cube&quot; </span></span> icon beside the property will mark the customization. By clicking this icon the property value will be reverted to the value defined for the section.</li></ul>\')">Customized block.<ul><li>In this status changes to properties will be specific to the current block (instead of being global to all blocks in the same section)</li><li>A <span class="customStyled"><span>"small cube" </span></span> icon beside the property will mark the customization. By clicking this icon the property value will be reverted to the value defined for the section.</li></ul></div>'),templateSystem.addTemplate("empty",""),templateSystem.addTemplate("error",'[<div style="background-color: #fff0f0" data-bind="text: ko.toJS($data)"></div>]'),templateSystem.addTemplate("img-wysiwyg",'<table tabfocus="0" cellspacing="0" cellpadding="0" data-drop-content="Drop here" data-bind="style: _stylebind, click: function(obj, evt) { $root.selectItem(_item, _data); return true; }, clickBubble: false, fudroppable: { activeClass: \'ui-state-highlight\', hoverClass: \'ui-state-draghover\' }, extdroppable: { options: { accept: \'.image\', activeClass: \'ui-state-highlight\', hoverClass: \'ui-state-draghover\' }, data: _src, dragged: $root.fileToImage }, css: { selecteditem: $root.isSelectedItem(_item) }, scrollIntoView: $root.isSelectedItem(_item), attr: { \'data-drop-content\': $root.t(\'Drop here\'), width: _width, height: _height, align: _align }"  class="img-wysiwyg selectable-img" style="display: table;">  <tr>    <td class="uploadzone">      <div class="mo-imgselectionhelper"></div>      <div class="mo-uploadzone"></div>      <div class="img-size" data-bind="text: _size">size</div>      <div class="midtools" data-bind="tooltips: {}">        \x3c!-- ko if: _src() != \'\' --\x3e        <div title="Remove image" class="tool delete" data-bind="attr: { title: $root.t(\'Remove image\') }, click: _src.bind(_src, \'\'), clickBubble: false"><i            class="fa fa-fw fa-trash-o"></i></div>        \x3c!-- ko if: typeof $root.editImage !== \'undefined\' --\x3e        <div title="Open the image editing tool" class="tool edit" data-bind="attr: { title: $root.t(\'Open the image editing tool\') }, click: $root.editImage.bind($element, _src), clickBubble: false"><i            class="fa fa-fw fa-pencil"></i></div>        \x3c!-- /ko --\x3e        \x3c!-- /ko --\x3e        \x3c!-- ko if: _src() == \'\' --\x3e        <div title="Upload a new image" data-bind="attr: { title: $root.t(\'Upload a new image\') }" class="tool upload" style="position: relative; overflow: hidden;"><i            class="fas fa-upload"></i>          <input class="fileupload nofile" type="file" name="files[]" data-bind="fileupload: { data: _src, onerror: $root.notifier.error, onfile: $root.loadMailingImage, canvasPreview: true }"            style="z-index: 20; position: absolute; top: 0; left: 0; right: 0; bottom: 0; min-width: 100%; min-height: 100%; font-size: 999px; text-align: right; filter: alpha(opacity=0); opacity: 0; outline: none; cursor: inherit; display: block">        </div>        \x3c!-- ko if: typeof $root.selectImage !== \'undefined\' --\x3e        <div title="Select from gallery" class="tool gallery" data-bind="attr: { title: $root.t(\'Select from gallery\') }, click: $root.selectImage.bind($element, _src), clickBubble: true"><i            class="fas fa-image"></i></div>        \x3c!-- /ko --\x3e        \x3c!-- /ko --\x3e      </div>      \x3c!-- ko template: _template --\x3e      \x3c!-- /ko --\x3e      \x3c!-- ko if: _src() == \'\' --\x3e      \x3c!--    <img style="display: block;" class="imgplaceholder" width="200" src="" alt="Insert an image here" data-bind="wysiwygSrc: { src: _src.preloaded, placeholder: _placeholdersrc, width: _width, height: _height, method: _method }" />    --\x3e      <span class="fileuploadtext" style="text-align: center; display: -ms-flexbox; display: flex; align-items: center; flex-align: center; justify-content: center; padding: 1em; position: absolute; top: 0; left: 0; right: 0; bottom: 0;"><span          class="textMiddle" style=" text-shadow: 1px 1px 0 #FFFFFF, 0 0 10px #FFFFFF; font-weight: bold;" data-bind="text: $root.t(\'Drop an image here\')">Drop          an image here</span></span>      \x3c!-- /ko --\x3e      \x3c!-- ko if: _src() != \'\' --\x3e      \x3c!--    <img style="display: block;" width="200" src="" data-bind="preloader: _src, wysiwygSrc: { src: _src.preloaded, placeholder: _placeholdersrc, width: _width, height: _height, method: _method }" />    --\x3e      \x3c!-- /ko --\x3e      \x3c!-- pulsante per la cancellazione --\x3e      <div title="Drop an image here or click the upload button" data-bind="attr: { title: $root.t(\'Drop an image here or click the upload button\') }, tooltips: {}"        class="workzone" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden;">        \x3c!-- ko if: _src.preloaded && _src() != _src.preloaded() --\x3ePRELOADING....        \x3c!-- /ko --\x3e        \x3c!-- ko if: _src() != \'\' --\x3e        <input class="fileupload withfile" type="file" name="files[]" data-bind="fileupload: { data: _src, onerror: $root.notifier.error, onfile: $root.mailingGallery.unshift.bind($root.mailingGallery), canvasPreview: true }"          style="z-index: -20; position: absolute; top: 0; left: 0; right: 0; bottom: 0; min-width: 100%; min-height: 100%; font-zie: 999px; text-align: right; filter: alpha(opacity=0); opacity: 0; outline: none; cursor: inherit; display: block">        \x3c!-- /ko --\x3e        <div class="progress" style="opacity: .5; width: 80%; margin-left: 10%; position: absolute; bottom: 30%; height: 20px; border: 2px solid black;">          <div class="progress-bar progress-bar-success" style="height: 20px; background-color: black; "></div>        </div>      </div></table>'),templateSystem.addTemplate("main",'<div id="page" style="display: none;" data-bind="visible: true, css: { withToolbox: $root.showToolbox, withPreviewFrame: showPreviewFrame }">  <div id="main-edit-area" data-bind="click: function(obj, evt) { $root.selectBlock(null); return true; }, clickBubble: false">    \x3c!-- ko withProperties: { templateMode: \'wysiwyg\', templateModeFallback: \'show\' } --\x3e    <div id="main-wysiwyg-area" data-bind="wysiwygScrollfix: true, scrollable: true, fudroppable: { active: draggingImage }, css: { isdragging: dragging, isdraggingimg: draggingImage }, block: content"></div>    \x3c!-- /ko --\x3e  </div>  <div id="toolbar" class="mo" data-bind="tooltips: {}">    \x3c!-- ko if: typeof $root.undo != \'undefined\' --\x3e    <span data-bind="buttonset: { }" class="leftButtons">      <a class="toolbar__button toolbar__button--undo" title="Undo last operation" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Undo last operation\') }, click: $root.undo.execute, clickBubble: false, button: { disabled: !$root.undo.enabled(), icons: { primary: \'fas fa-reply\' }, label: $root.undo.name, text: true }">UNDO</a>      <a class="toolbar__button toolbar__button--redo" title="Redo last operation" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Redo last operation\') }, click: $root.redo.execute, clickBubble: false, button: { disabled: !$root.redo.enabled(), icons: { primary: \'fas fa-share\' }, label: $root.redo.name, text: true }">REDO</a>    </span>    \x3c!-- ko if: $root.debug --\x3e    <a href="javascript:void(0)" data-bind="click: $root.undoReset, clickBubble: false, button: { disabled: !$root.undo.enabled() && !$root.redo.enabled(), label: \'reset\', text: true }">RESET</a>    \x3c!-- /ko --\x3e    \x3c!-- /ko --\x3e    <span>      <input id="showGallery" type="checkbox" data-bind="checked: $root.showGallery, button: { refreshOn: $root.showGallery,    icons: { primary: \'fas fa-image\', secondary: null }, text: true, label: $root.t(\'Gallery\') }"><label title="Show image gallery"        for="showGallery" data-bind="attr: { title: $root.t(\'Show image gallery\') }">show gallery</label></input>    </span>    \x3c!-- ko template: {name: \'edit-name\' } --\x3e# mailing name #    \x3c!-- /ko --\x3e    <input id="previewFrameToggle" type="checkbox" data-bind="checked: $root.showPreviewFrame, button: { refreshOn: $root.showPreviewFrame, icons: { primary: null , secondary: null }, text: false, label: $root.t(\'Preview\') }"    />    <label for="previewFrameToggle" title="Show live preview" data-bind="attr: { title: $root.t(\'Show live preview\') }">      PREVIEW    </label>    \x3c!-- ko if: $root.debug --\x3e    <a href="javascript:void(0)" data-bind="click: $root.export, clickBubble: false, button: { label: \'export\', text: true }">EXPORT</a>    <input type="checkbox" data-bind="checked: $root.debug" /> debug    <a href="javascript:void(0)" data-bind="click: $root.loadDefaultBlocks, clickBubble: false, button: { icons: { primary: \'fas fa-upload\' }, label: \'Default\', text: true }">LOAD      BLOCKS    </a>    [<a id="subscriptionsCount" href="javascript:viewModel.loopSubscriptionsCount()">subs</a>]    \x3c!-- /ko --\x3e    <span data-bind="visible: false">      <input type="checkbox" data-bind="checked: $root.showToolbox" /> toolbox    </span>    <div class="rightButtons">      \x3c!-- ko if: typeof $root.save !== \'undefined\' --\x3e      <a class="toolbar__button toolbar__button--save" title="Save template" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Save template\') }, click: $root.save.execute, clickBubble: false, button: { disabled: !$root.save.enabled(), icons: { primary: \'fas fa-save\' }, label: $root.t($root.save.name), text: true }">SALVA</a>      \x3c!-- /ko --\x3e      \x3c!-- ko if: typeof $root.test !== \'undefined\' --\x3e      <a class="toolbar__button" title="Show preview and send test" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Show preview and send test\') }, click: $root.test.execute, clickBubble: false, button: { disabled: !$root.test.enabled(), icons: { primary: \'fas fa-paper-plane\' }, label: $root.t($root.test.name), text: true }">TEST</a>      \x3c!-- /ko --\x3e      \x3c!-- ko template: {name: \'download-button\' } --\x3e# download button #      \x3c!-- /ko --\x3e    </div>  </div>  \x3c!-- ko template: {name: \'dialog-select-image\' } --\x3e# dialog image selection #  \x3c!-- /ko --\x3e  \x3c!-- ko if: $root.showToolbox --\x3e  <div id="main-toolbox" class="mo" data-bind="scrollable: true, withProperties: { templateMode: \'edit\' }">    <div data-bind="template: { name: \'toolbox\' }"></div>  </div>  \x3c!-- /ko --\x3e  <div id="main-preview" class="mo" data-bind="scrollable: true, if: $root.showPreviewFrame">    <div id="preview-toolbar">      <div data-bind="visible: $root.showPreviewFrame, buttonset: { }" style="display: inline-block">        <input id="previewLarge" type="radio" name="previewMode" value="large" data-bind="checked: $root.previewMode, button: { text: false, label: \'large\', icons: { primary: \'fas fa-desktop\' } }"        />        <label for="previewLarge" title="Large screen" data-bind="attr: { title: $root.t(\'Large screen\') }">Large screen</label>        <input id="previewDesktop" type="radio" name="previewMode" value="desktop" data-bind="checked: $root.previewMode, button: { text: false, label: \'desktop\', icons: { primary: \'fas fa-tablet-alt\' } }"        />        <label for="previewDesktop" title="Tablet" data-bind="attr: { title: $root.t(\'Tablet\') }">Tablet</label>        <input id="previewMobile" type="radio" name="previewMode" value="mobile" data-bind="checked: $root.previewMode, button: { text: false, label: \'mobile\', icons: { primary: \'fas fa-mobile-alt\' } }"        />        <label for="previewMobile" title="Smartphone" data-bind="attr: { title: $root.t(\'Smartphone\') }">Smartphone</label>      </div>    </div>    <div id="frame-container" data-bind="css: { desktop: $root.previewMode() == \'desktop\', mobile: $root.previewMode() == \'mobile\', large: $root.previewMode() == \'large\' }">      <iframe data-bind="bindIframe: $data"></iframe>    </div>  </div>  <div class="mo" id="mo-body"></div>  <div id="incompatible-template" title="Saved model is obsolete" style="display: none" data-bind="attr: { title: $root.t(\'Saved model is obsolete\') }, html: $root.t(\'<p>The saved model has been created with a previous, non completely compatible version, of the template</p><p>Some content or style in the model <b>COULD BE LOST</b> if you will <b>save</b></p><p>Contact us for more informations!</p>\')">    Incompatible template  </div>  <div id="fake-image-editor" title="Fake image editor" style="display: none" data-bind="attr: { title: $root.t(\'Fake image editor\') }, html: $root.t(\'<p>Fake image editor</p>\')">    <p>Fake image editor</p>  </div></div>\x3c!-- ko if: $root.logoPath --\x3e<div id="loading" class="loading" style="display: block; width: 300px; text-align: center; height: 32px; position: absolute; top:0; bottom: 0; left: 0; right: 0;  margin: auto;"  data-bind="attr: { style: \'position: absolute; top: 5px; left: 6px; z-index: 150;\'}, css: { loading: false }">  <a href="/" data-bind="attr: { href: $root.logoUrl, alt: $root.logoAlt }"><img data-bind="attr: { src: $root.logoPath }"      width="32" height="32" alt="mosaico" border="0" /></a>  <div style="opacity: 0" data-bind="visible: false">Oppps... !!</div></div>\x3c!-- /ko --\x3e\x3c!-- ko template: {name: \'home-icon\' } --\x3e# home-icon #\x3c!-- /ko --\x3e'),templateSystem.addTemplate("toolbox",'<div id="tooltabs" class="tabs_horizontal button_color" data-bind="tabs: { active: $root.selectedTool }">  <ul>    <li data-bind="tooltips: {}"><a title="Blocks ready to be added to the template" data-local="true" href="#toolblocks"        data-bind="attr: { title: $root.t(\'Blocks ready to be added to the template\') }"><i class="fas fa-cubes"></i>        <span data-bind="html: $root.t(\'Blocks\')">Blocks</span></a></li>    <li data-bind="tooltips: {}"><a title="Edit content options" href="#toolcontents" data-local="true" data-bind="attr: { title: $root.t(\'Edit content options\') }"><i          class="fas fa-pencil-alt"></i> <span data-bind="html: $root.t(\'Content\')">Content</span></a></li>    <li data-bind="tooltips: {}"><a title="Edit style options" href="#toolstyles" data-local="true" data-bind="attr: { title: $root.t(\'Edit style options\') }"><i          class="fas fa-paint-brush"></i> <span data-bind="html: $root.t(\'Style\')">Style</span></a></li>  </ul>  <div id="toolblocks" data-bind="scrollable: true">    <div class="block-list" data-bind="foreach: blockDefs" style="text-align: center">      <div class="draggable-item" data-bind="withProperties: { templateMode: \'show\' }">        <div class="block" data-bind="extdraggable: { connectClass: \'sortable-blocks-edit\', data: $data, dropContainer: \'#main-wysiwyg-area\', dragging: $root.dragging, \'options\': { handle: \'.handle\', distance: 10, \'appendTo\': \'#page\' } }, click: $root.addBlock"          style="position: relative;">          <div title="Click or drag to add this block to the template" class="handle" data-bind="attr: { title: $root.t(\'Click or drag to add this block to the template\') }, tooltips: {}"></div>          <img data-bind="attr: { alt: $root.t(\'Block __name__\', { name: ko.utils.unwrapObservable(type) }), src: $root.templatePath(\'edres/\'+ko.utils.unwrapObservable(type)+\'.png\') }"            alt="Block __name__" />        </div>        <a href="javascript:void(0)" class="addblockbutton" data-bind="click: $root.addBlock, button: { label: $root.t(\'Add\') }">Add</a>      </div>    </div>  </div>  <div id="toolcontents" data-bind="scrollable: true">    \x3c!-- ko if: $root.selectedBlock() !== null --\x3e    <div data-bind="block: $root.selectedBlock"></div>    \x3c!-- /ko --\x3e    \x3c!-- ko if: $root.selectedBlock() == null --\x3e    <div class="noSelectedBlock" data-bind="text: $root.t(\'By clicking on message parts you will select a block and content options, if any, will show here\')">By      clicking on message parts you will select a block and content options, if any, will show here</div>    \x3c!-- /ko --\x3e    \x3c!-- ko block: content --\x3e    \x3c!-- /ko --\x3e  </div>  <div id="toolstyles" data-bind="scrollable: true, withProperties: { templateMode: \'styler\' }">    \x3c!-- ko if: typeof $root.content().theme === \'undefined\' || typeof $root.content().theme().scheme === \'undefined\' || $root.content().theme().scheme() === \'custom\' --\x3e    \x3c!-- ko if: $root.selectedBlock() !== null --\x3e    <div data-bind="block: $root.selectedBlock, css: { workLocal: $root.selectedBlock().customStyle, workGlobal: typeof $root.selectedBlock().customStyle === \'undefined\' || !$root.selectedBlock().customStyle() }"></div>    \x3c!-- /ko --\x3e    \x3c!-- ko if: $root.selectedBlock() == null --\x3e    <div class="noSelectedBlock" data-bind="text: $root.t(\'By clicking on message parts you will select a block and style options, if available, will show here\')">By      clicking on message parts you will select a block and style options, if available, will show here</div>    \x3c!-- /ko --\x3e    <div class="workGlobalContent">      \x3c!-- ko block: content --\x3e      \x3c!-- /ko --\x3e    </div>    \x3c!-- /ko --\x3e  </div></div><div id="toolimages" class="slidebar" data-bind="scrollable: true, css: { hidden: $root.showGallery() === false }">  <div class="close" data-bind="click: $root.showGallery.bind($element, false);">X</div>  <span class="pane-title" data-bind="text: $root.t(\'gallery-title\')">Galleries:</span>  \x3c!-- ko if: $root.showGallery() --\x3e  <div id="toolimagestab" class="tabs_horizontal" data-bind="tabs: { active: $root.selectedImageTab }">    <ul>      <li data-bind="tooltips: {}"><a title="gallery-mailing" data-local="true" href="#toolimagesgallery" data-bind="attr: { title: $root.t(\'gallery-mailing\') }, text: $root.t(\'gallery-mailing\')">gallery-mailing</a></li>      <li data-bind="tooltips: {}"><a title="gallery-template" data-local="true" href="#toolimagesgallerytemplate" data-bind="attr: { title: $root.t(\'gallery-template\') }, text: $root.t(\'gallery-template\')">gallery-template</a></li>    </ul>    <div id="toolimagesgallery" class="gallery-panel">      \x3c!-- ko template: {name: \'gallery-upload\', data: { type: \'mailing\' } } --\x3e# mailing gallery fileupload #      \x3c!-- /ko --\x3e      \x3c!-- ko if: $root.mailingGalleryStatus() === false --\x3e<a class="loadbutton" title="Show images from the gallery" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Show images from the gallery\') }, click: $root.loadMailingGallery, button: { disabled: $root.mailingGalleryStatus, icons: { primary: \'fas fa-image\' }, label: $root.mailingGalleryStatus() == \'loading\' ? $root.t(\'Loading...\') : $root.t(\'Load gallery\'), text: true }">#        load gallery #</a>\x3c!-- /ko --\x3e      \x3c!-- ko if: $root.mailingGalleryStatus() === \'loading\' --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-loading\')">Loading mailing gallery…</div>\x3c!-- /ko --\x3e      \x3c!-- ko if: $root.mailingGalleryStatus() === 0 --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-empty\')">The mailing gallery is empty</div>\x3c!-- /ko --\x3e      \x3c!-- ko template: {name: \'gallery-images\', data: { items: mailingGallery, type: \'mailing\' } } --\x3e# mailing gallery #      \x3c!-- /ko --\x3e    </div>    <div id="toolimagesgallerytemplate" class="gallery-panel">      \x3c!-- ko template: {name: \'gallery-upload\', data: { type: \'template\' } } --\x3e# mailing template fileupload #      \x3c!-- /ko --\x3e      \x3c!-- ko if: $root.templateGalleryStatus() === false --\x3e<a class="loadbutton" title="Show images from the gallery" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Show images from the gallery\') }, click: $root.loadTemplateGallery, button: { disabled: $root.templateGalleryStatus, icons: { primary: \'fas fa-image\' }, label: $root.templateGalleryStatus() == \'loading\' ? $root.t(\'Loading...\') : $root.t(\'Load gallery\'), text: true }">#        load gallery #</a>\x3c!-- /ko --\x3e      \x3c!-- ko if: $root.templateGalleryStatus() === \'loading\' --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-loading\')">Loading template gallery...</div>\x3c!-- /ko --\x3e      \x3c!-- ko if: $root.templateGalleryStatus() === 0 --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-empty\')">The template gallery is empty</div>\x3c!-- /ko --\x3e      \x3c!-- ko template: {name: \'gallery-images\', data: { items: templateGallery, type: \'template\' } } --\x3e# template gallery #      \x3c!-- /ko --\x3e    </div>  </div>  \x3c!-- /ko --\x3e</div><div id="tooldebug" class="slidebar" data-bind="css: { hidden: $root.debug() === false }">  <div class="close" data-bind="click: $root.debug.bind($element, false);">X</div>  \x3c!-- ko if: $root.debug --\x3e  Content:  <pre data-bind=\'text: ko.toJSON(content, null, 2)\' style="overflow: auto; height: 20%"></pre> BlockDefs:  <pre data-bind=\'text: ko.toJSON(blockDefs, null, 2)\' style="overflow: auto; height: 20%"></pre>  \x3c!-- /ko --\x3e  <a href="javascript:void(0)" data-bind="click: $root.exportHTMLtoTextarea.bind($element, \'#outputhtml\'); clickBubble: false, button: { text: true, label:\'Generate\' }">Output</a>  <a href="javascript:void(0)" data-bind="click: $root.exportJSONtoTextarea.bind($element, \'#outputhtml\'); clickBubble: false, button: { text: true, label:\'Export\' }">Export</a>  <a href="javascript:void(0)" data-bind="click: $root.importJSONfromTextarea.bind($element, \'#outputhtml\'); clickBubble: false, button: { text: true, label:\'Import\' }">Import</a>  <textarea id="outputhtml" rows="10" style="width: 100%;"></textarea></div><div id="tooltheme" class="ui-widget slidebar" data-bind="css: { hidden: $root.showTheme() === false }">  <div class="close" data-bind="click: $root.showTheme.bind($element, false);">X</div>  \x3c!-- ko withProperties: { templateMode: \'styler\' } --\x3e  \x3c!-- ko if: $root.showTheme --\x3e  \x3c!-- ko block: $root.content().theme --\x3e  \x3c!-- /ko --\x3e  \x3c!-- /ko --\x3e  \x3c!-- /ko --\x3e</div>'),templateSystem.addTemplate("dialog-select-image",'\x3c!-- ko if: $root.showDialogGallery() --\x3e\x3c!-- should use ui-dialog --\x3e<aside id="dialogGallery" class="mo">  <div class="tabs_horizontal" data-bind="tabs: { active: $root.selectedImageTab }">    <div class="close" data-bind="click: $root.closeDialogGallery;">X</div>    <ul>      <li data-bind="tooltips: {}"><a title="gallery-mailing" data-local="true" href="#dialoggallerymailing" data-bind="attr: { title: $root.t(\'gallery-mailing\') }, text: $root.t(\'gallery-mailing\')">gallery-mailing</a></li>      <li data-bind="tooltips: {}"><a title="gallery-template" data-local="true" href="#dialoggallerytemplate" data-bind="attr: { title: $root.t(\'gallery-template\') }, text: $root.t(\'gallery-template\')">gallery-template</a></li>    </ul>    <div id="dialoggallerymailing" class="gallery-panel">      \x3c!-- ko template: {name: \'gallery-upload\', data: { type: \'mailing\' } } --\x3e# mailing gallery fileupload #      \x3c!-- /ko --\x3e      \x3c!-- ko if: $root.mailingGalleryStatus() === false --\x3e<a class="loadbutton" title="Show images from the gallery" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Show images from the gallery\') }, click: $root.loadMailingGallery, button: { disabled: $root.mailingGalleryStatus, icons: { primary: \'fas fa-image\' }, label: $root.mailingGalleryStatus() == \'loading\' ? $root.t(\'Loading...\') : $root.t(\'Load gallery\'), text: true }">#        load gallery #</a>\x3c!-- /ko --\x3e      \x3c!-- ko if: $root.mailingGalleryStatus() === \'loading\' --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-loading\')">Loading mailing gallery…</div>      \x3c!-- /ko --\x3e      \x3c!-- ko if: $root.mailingGalleryStatus() === 0 --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-empty\')">The mailing gallery is empty</div>      \x3c!-- /ko --\x3e      <div class="dialog-gallery-wrapper">        <ul data-bind="foreach: mailingGallery">          \x3c!-- ko if: typeof thumbnailUrl != \'undefined\' --\x3e          <li data-bind="click: $root.setBgImage.bind($element, name);">            <img style="display: block;" data-bind="attr: { src: thumbnailUrl }" />          </li>          \x3c!-- /ko --\x3e        </ul>      </div>    </div>    <div id="dialoggallerytemplate" class="gallery-panel">      \x3c!-- ko template: {name: \'gallery-upload\', data: { type: \'template\' } } --\x3e# mailing template fileupload #      \x3c!-- /ko --\x3e      \x3c!-- ko if: $root.templateGalleryStatus() === false --\x3e<a class="loadbutton" title="Show images from the gallery" href="javascript:void(0)" data-bind="attr: { title: $root.t(\'Show images from the gallery\') }, click: $root.loadTemplateGallery, button: { disabled: $root.templateGalleryStatus, icons: { primary: \'fas fa-image\' }, label: $root.templateGalleryStatus() == \'loading\' ? $root.t(\'Loading...\') : $root.t(\'Load gallery\'), text: true }">#        load gallery #</a>\x3c!-- /ko --\x3e      \x3c!-- ko if: $root.templateGalleryStatus() === \'loading\' --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-loading\')">Loading template gallery...</div>      \x3c!-- /ko --\x3e      \x3c!-- ko if: $root.templateGalleryStatus() === 0 --\x3e      <div class="galleryEmpty" data-bind="text: $root.t(\'gallery-mailing-empty\')">The template gallery is empty</div>      \x3c!-- /ko --\x3e      <div class="dialog-gallery-wrapper">        <ul data-bind="foreach: templateGallery">          \x3c!-- ko if: typeof thumbnailUrl != \'undefined\' --\x3e          <li data-bind="click: $root.setBgImage.bind($element, name);">            <img style="display: block;" data-bind="attr: { src: thumbnailUrl }" />          </li>          \x3c!-- /ko --\x3e        </ul>      </div>    </div>  </div></aside>\x3c!-- /ko --\x3e'),templateSystem.addTemplate("download-button",'\x3c!-- ko if: typeof $root.download !== \'undefined\' --\x3e<form id="downloadForm" class="download" action="#" method="POST">  <input type="hidden" name="action" value="download" />  <input type="hidden" name="filename" value="email.html" id="downloadHtmlFilename" />  <input type="hidden" name="html" id="downloadHtmlTextarea" />  <button type="button" class="toolbar__button download__button" title="Download template" data-bind="attr: { title: $root.t(\'Download template\') }">    <i class="fas fa-file-archive" aria-hidden="true"></i>    <span data-bind="text: $root.t($root.download.name)">DOWNLOAD</span>  </button>  <div class="download__panel">    <a class="download__panel_action" href="javascript:void(0)" data-bind="click: $root.download.execute.bind($element, \'image\'), clickBubble: false, button: { disabled: !$root.download.enabled(), label: $root.t(\'download-with-images\'), text: true }">DOWNLOAD</a>    <a class="download__panel_action" href="javascript:void(0)" data-bind="click: $root.download.execute.bind($element, \'cdn\'), clickBubble: false, button: { disabled: !$root.download.enabled(), label: $root.t(\'download-cdn\'), text: true }">DOWNLOAD</a>  </div></form>\x3c!-- /ko --\x3e'),templateSystem.addTemplate("edit-name",'\x3c!-- ko if: $root.titleMode() == \'edit\' || $root.titleMode() == \'saving\' --\x3e<form class="mailing-name" data-bind="submit: saveEditMailingName, submitBubble: false">  <input type="text" data-bind="value: $root.metadata.name, disable: $root.titleMode() == \'saving\', hasFocus: $root.titleMode() == \'edit\'"/>  <button type="button" data-bind="click: cancelEditMailingName, clickBubble: false, disable: $root.titleMode() == \'saving\',  button: { refreshOn: $root.showPreviewFrame, icons: { primary: \'fa fa-fw fa-times\', secondary: null }, text: false, label: $root.t(\'edit-title-cancel\') }">cancel</button>  <button type="submit" data-bind="disable: $root.titleMode() == \'saving\',    button: { refreshOn: $root.showPreviewFrame, icons: { primary: \'fa fa-fw fa-check-circle\', secondary: null }, text: false, label: $root.t(\'edit-title-save\') }">save</button></form>\x3c!-- /ko --\x3e\x3c!-- ko if: $root.titleMode() == \'show\' --\x3e<div class="mailing-name">  <p class="ui-button" data-bind="event: { dblclick: enableEditMailingName }, dblclickBubble: false,    attr: { title: $root.t(\'edit-title-double-click\') }">    <span class="ui-button-text" data-bind="text: $root.mailingName"></span>  </p></div>\x3c!-- /ko --\x3e'),templateSystem.addTemplate("gallery-images",'<aside class="gallery-thumbs gallery-thumbs--custom" data-bind="attr: {\'data-type\': type}">  <div data-bind="foreach: items">    <div class="draggable-item" data-bind="if: typeof thumbnailUrl != \'undefined\'">      <button class="gallery-thumbs__remove" data-bind="click: $root.removeImage.bind($data, $data, $parent.type)">        <i class="fa fa-times"></i>      </button>      <div class="draggable image" data-bind="click: $root.addImage, extdraggable: { data: $data, dropContainer: \'#main-wysiwyg-area\', dragging: $root.draggingImage, \'options\': { \'appendTo\': \'#page\' } }, style: { backgroundImage: \'url(\\\'\' + thumbnailUrl + \'\\\')\' }">        <img title="Drag this image and drop it on any template image placeholder" style="display: block;" data-bind="tooltips: {}, attr: { src: thumbnailUrl, \'title\': $root.t(\'Drag this image and drop it on any template image placeholder\') }"/>      </div>    </div>  </div></aside>'),templateSystem.addTemplate("gallery-upload",'<div data-drop-content="Drop here" class="img-dropzone pane uploadzone" data-bind="attr: { \'data-drop-content\': $root.t(\'Drop here\') }, fudroppable: { activeClass: \'ui-state-highlight\', hoverClass: \'ui-state-draghover\' }">  <div class="mo-uploadzone">    \x3c!-- ko if: type === \'mailing\' --\x3e      <input class="fileupload" type="file" multiple name="files[]" data-bind="fileupload: { onerror: $root.notifier.error, onfile: $root.loadMailingImage }">    \x3c!-- /ko --\x3e    \x3c!-- ko if: type === \'template\' --\x3e      <input class="fileupload" type="file" multiple name="files[]" data-bind="fileupload: { onerror: $root.notifier.error, onfile: $root.loadTemplateImage, uploadToTemplate: true }">    \x3c!-- /ko --\x3e    <span data-bind="text: $root.t(\'Click or drag files here\')">Click or drag files here</span>      <div class="workzone">        <div class="progress">          <div class="progress-bar progress-bar-success"></div>        </div>      </div>  </div></div>'),templateSystem.addTemplate("home-icon",'<div id="loading" class="loading" data-bind="css: { loading: false }">  <a href="/" id="home-button" alt="mosaic-backend" data-bind="attr: { alt: $root.brandName }">    <i class="fas fa-home fa-lg" aria-hidden="true"></i>  </a>  <div style="opacity: 0" data-bind="visible: false">Oppps... !!</div></div>')});

},{"../src/js/bindings/choose-template.js":46}],2:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"util/":35}],3:[function(require,module,exports){
(function (global){
/*global window, global*/
var util = require("util")
var assert = require("assert")
var now = require("date-now")

var slice = Array.prototype.slice
var console
var times = {}

if (typeof global !== "undefined" && global.console) {
    console = global.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"assert":2,"date-now":4,"util":35}],4:[function(require,module,exports){
module.exports = now

function now() {
    return new Date().getTime()
}

},{}],5:[function(require,module,exports){
/*
 evol-colorpicker 3.3.1
 ColorPicker widget for jQuery UI

 https://github.com/evoluteur/colorpicker
 (c) 2017 Olivier Giulieri

 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */

(function( $, undefined ) {

var _idx=0,
	ua=window.navigator.userAgent,
	isIE=ua.indexOf("MSIE ")>0,
	_ie=isIE?'-ie':'',
	isMoz=isIE?false:/mozilla/.test(ua.toLowerCase()) && !/webkit/.test(ua.toLowerCase()),
	history=[],
	baseThemeColors=['ffffff','000000','eeece1','1f497d','4f81bd','c0504d','9bbb59','8064a2','4bacc6','f79646'],
	subThemeColors=['f2f2f2','7f7f7f','ddd9c3','c6d9f0','dbe5f1','f2dcdb','ebf1dd','e5e0ec','dbeef3','fdeada',
		'd8d8d8','595959','c4bd97','8db3e2','b8cce4','e5b9b7','d7e3bc','ccc1d9','b7dde8','fbd5b5',
		'bfbfbf','3f3f3f','938953','548dd4','95b3d7','d99694','c3d69b','b2a2c7','92cddc','fac08f',
		'a5a5a5','262626','494429','17365d','366092','953734','76923c','5f497a','31859b','e36c09',
		'7f7f7f','0c0c0c','1d1b10','0f243e','244061','632423','4f6128','3f3151','205867','974806'],
	standardColors=['c00000','ff0000','ffc000','ffff00','92d050','00b050','00b0f0','0070c0','002060','7030a0'],
	webColors=[
		['003366','336699','3366cc','003399','000099','0000cc','000066'],
		['006666','006699','0099cc','0066cc','0033cc','0000ff','3333ff','333399'],
		['669999','009999','33cccc','00ccff','0099ff','0066ff','3366ff','3333cc','666699'],
		['339966','00cc99','00ffcc','00ffff','33ccff','3399ff','6699ff','6666ff','6600ff','6600cc'],
		['339933','00cc66','00ff99','66ffcc','66ffff','66ccff','99ccff','9999ff','9966ff','9933ff','9900ff'],
		['006600','00cc00','00ff00','66ff99','99ffcc','ccffff','ccccff','cc99ff','cc66ff','cc33ff','cc00ff','9900cc'],
		['003300','009933','33cc33','66ff66','99ff99','ccffcc','ffffff','ffccff','ff99ff','ff66ff','ff00ff','cc00cc','660066'],
		['333300','009900','66ff33','99ff66','ccff99','ffffcc','ffcccc','ff99cc','ff66cc','ff33cc','cc0099','993399'],
		['336600','669900','99ff33','ccff66','ffff99','ffcc99','ff9999','ff6699','ff3399','cc3399','990099'],
		['666633','99cc00','ccff33','ffff66','ffcc66','ff9966','ff6666','ff0066','d60094','993366'],
		['a58800','cccc00','ffff00','ffcc00','ff9933','ff6600','ff0033','cc0066','660033'],
		['996633','cc9900','ff9900','cc6600','ff3300','ff0000','cc0000','990033'],
		['663300','996600','cc3300','993300','990000','800000','993333']
	],
	transColor='#0000ffff',
	int2Hex=function(i){
		var h=i.toString(16);
		if(h.length==1){
			h='0'+h;
		}
		return h;
	},
	st2Hex=function(s){
		return int2Hex(Number(s));
	},
	int2Hex3=function(i){
		var h=int2Hex(i);
		return h+h+h;
	},
	toHex3=function(c){
		if(c.length>10){ // IE9
			var p1=1+c.indexOf('('),
				p2=c.indexOf(')'),
				cs=c.substring(p1,p2).split(',');
			return ['#',st2Hex(cs[0]),st2Hex(cs[1]),st2Hex(cs[2])].join('');
		}else{
			return c;
		}
	};

$.widget( "evol.colorpicker", {

	version: '3.3.1',
	
	options: {
		color: null, // example:'#31859B'
		customTheme: null, // example: ["#ff0000", "#00ff00", "blue"],
		showOn: 'both', // possible values: 'focus','button','both'
		hideButton: false,
		displayIndicator: true,
		transparentColor: false,
		history: true,
		defaultPalette: 'theme', // possible values: 'theme', 'web'
		strings: 'Theme Colors,Standard Colors,Web Colors,Theme Colors,Back to Palette,History,No history yet.'
	},

	// this is only true while showing the palette until color is chosen
	_active: false,

	_create: function() {
		var that=this;
		this._paletteIdx=this.options.defaultPalette=='theme'?1:2;
		this._id='evo-cp'+_idx++;
		this._enabled=true;
		this.options.showOn=this.options.hideButton?'focus':this.options.showOn;
		switch(this.element.get(0).tagName){
			case 'INPUT':
				var color=this.options.color,
					e=this.element,
					css=((this.options.showOn==='focus')?'':'evo-pointer ')+'evo-colorind'+(isMoz?'-ff':_ie)+(this.options.hideButton?' evo-hidden-button':''),
					style='';
				this._isPopup=true;
				this._palette=null;
				var v=e.val();
				if(color!==null){
					if (color != v) e.val(color).change();
				}else{
					if(v!==''){
						color=this.options.color=v;
					}
				}
				if(color===transColor){
					css+=' evo-transparent';
				}else{
					style=(color!==null)?('background-color:'+color):'';
				}
				e.addClass('colorPicker '+this._id)
					.wrap('<div style="width:'+(this.options.hideButton?this.element.width():this.element.width()+32)+'px;'+
						(isIE?'margin-bottom:-21px;':'')+
						(isMoz?'padding:1px 0;':'')+
						'" class="evo-cp-wrap"></div>')
					.after('<div class="'+css+'" style="'+style+'"></div>')
					.on('keyup onpaste', function(evt){
						var c=$(this).val();
						if(c!=that.options.color){
							that._setValue(c, true);
						}
					});
				var showOn=this.options.showOn;
				if(showOn==='both' || showOn==='focus'){
					e.on('focus', function(){
						that.showPalette();
					});
				}
				if(showOn==='both' || showOn==='button'){
					e.next().on('click', function(evt){
						evt.stopPropagation();
						that.showPalette();
						return false;
					});
				}
				break;
			default:
				this._isPopup=false;
				this._palette=this.element.html(this._paletteHTML())
					.attr('aria-haspopup','true');
				this._bindColors();
		}
		if(this.options.history){
			if(color){
				this._add2History(color);
			}
			if (this.options.initialHistory) {
				var c = this.options.initialHistory;
				for (var i in c){
					this._add2History(c[i]);
				}
			}
		}
	},

	_paletteHTML: function() {
		var pIdx=this._paletteIdx=Math.abs(this._paletteIdx),
			opts=this.options,
			labels=opts.strings.split(',');

		var h='<div class="evo-pop'+_ie+' ui-widget ui-widget-content ui-corner-all"'+
			(this._isPopup?' style="position:absolute"':'')+'>'+
			// palette
			'<span>'+this['_paletteHTML'+pIdx]()+'</span>'+
			// links
			'<div class="evo-more"><a href="javascript:void(0)">'+labels[1+pIdx]+'</a>';
		if(opts.history){
			h+='<a href="javascript:void(0)" class="evo-hist">'+labels[5]+'</a>';
		}
		h+='</div>';
		// indicator
		if(opts.displayIndicator){
			h+=this._colorIndHTML(this.options.color)+this._colorIndHTML('');
		}
		h+='</div>';
		return h;
	},

	_colorIndHTML: function(c) {
		var css=isIE?'evo-colorbox-ie ':'',
			style='';

		if(c){
			if(c===transColor){
				css+='evo-transparent';
			}else{
				style='background-color:'+c;
			}
		}else{
			style='display:none';
		}
		return '<div class="evo-color" style="float:left">'+
			'<div style="'+style+'" class="'+css+'"></div><span>'+ // class="evo-colortxt-ie"
			(c?c:'')+'</span></div>';
	},

	_paletteHTML1: function() {
		var opts=this.options,
			labels=opts.strings.split(','),
			oTD='<td style="background-color:',
			cTD=isIE?'"><div style="width:2px;"></div></td>':'"><span/></td>',
			oTRTH='<tr><th colspan="10" class="ui-widget-content">',
			i;

		var h='<table class="evo-palette'+_ie+'">'+oTRTH+labels[0]+'</th></tr><tr>';

		if (opts.customTheme) {
			for (i=0, ml=opts.customTheme.length;i<ml;i++) {
				h+=oTD+opts.customTheme[i]+cTD;
			}
		} else {
			oTD+='#';
			// base theme colors
			for(i=0;i<10;i++){ 
				h+=oTD+baseThemeColors[i]+cTD;
			}
			h+='</tr>';
			if(!isIE){
				h+='<tr><th colspan="10"></th></tr>';
			}
			h+='<tr class="top">';
			// theme colors
			for(i=0;i<10;i++){ 
				h+=oTD+subThemeColors[i]+cTD;
			}
			for(var r=1;r<4;r++){
				h+='</tr><tr class="in">';
				for(i=0;i<10;i++){ 
					h+=oTD+subThemeColors[r*10+i]+cTD;
				}
			}
			h+='</tr><tr class="bottom">';
			for(i=40;i<50;i++){ 
				h+=oTD+subThemeColors[i]+cTD;
			}
			h+='</tr>'+oTRTH;
			// transparent color
			if(opts.transparentColor){
				h+='<div class="evo-transparent evo-tr-box"></div>';
			}
			h+=labels[1]+'</th></tr><tr>';
			// standard colors
			for(i=0;i<10;i++){ 
				h+=oTD+standardColors[i]+cTD;
			}
		}
		h+='</tr></table>';
		return h; 
	},

	_paletteHTML2: function() {
		var i, iMax,
			oTD='<td style="background-color:#',
			cTD=isIE?'"><div style="width:5px;"></div></td>':'"><span/></td>',
			oTableTR='<table class="evo-palette2'+_ie+'"><tr>',
			cTableTR='</tr></table>';

		var h='<div class="evo-palcenter">';
		// hexagon colors
		for(var r=0,rMax=webColors.length;r<rMax;r++){
			h+=oTableTR;
			var cs=webColors[r];
			for(i=0,iMax=cs.length;i<iMax;i++){ 
				h+=oTD+cs[i]+cTD;
			}
			h+=cTableTR;
		}
		h+='<div class="evo-sep"/>';
		// gray scale colors
		var h2='';
		h+=oTableTR;
		for(i=255;i>10;i-=10){
			h+=oTD+int2Hex3(i)+cTD;
			i-=10;
			h2+=oTD+int2Hex3(i)+cTD;
		}
		h+=cTableTR+oTableTR+h2+cTableTR+'</div>';
		return h;
	},

	_switchPalette: function(link) {
		if(this._enabled){
			var idx, 
				content, 
				label,
				opts=this.options,
				labels=opts.strings.split(',');
			if($(link).hasClass('evo-hist')){
				// history
				var h='<table class="evo-palette"><tr><th class="ui-widget-content">'+
					labels[5]+'</th></tr></tr></table>'+
					'<div class="evo-cHist">';
				if(history.length===0){
					h+='<p>&nbsp;'+labels[6]+'</p>';
				}else{
					for(var i=history.length-1;i>-1;i--){
						if(history[i].length===9){
							if(opts.transparentColor){
								h+='<div class="evo-transparent"></div>';
							}
						}else{
							h+='<div style="background-color:'+history[i]+'"></div>';
						}
					}
				}
				h+='</div>';
				idx=-this._paletteIdx;
				content=h;
				label=labels[4];
			}else{
				// palette
				if(this._paletteIdx<0){
					idx=-this._paletteIdx;
					this._palette.find('.evo-hist').show();
				}else{
					idx=(this._paletteIdx==2)?1:2;
				}
				content=this['_paletteHTML'+idx]();
				label=labels[idx+1];
				this._paletteIdx=idx;
			}
			this._paletteIdx=idx;
			var e=this._palette.find('.evo-more')
				.prev().html(content).end()
				.children().eq(0).html(label);
			if(idx<0){
				e.next().hide();
			}
		}
	},

	_downOrUpPositioning: function() {
		var el = this.element,
			i = 0;
		while (el !== null && i < 100) {
			// Look up the first parent with non-visibile overflow and compute the relative position
			if (el.css('overflow') != 'visible') {
				var bott = this._palette.offset().top + this._palette.height(),
					pBott = el.offset().top + el.height(),
					top = this._palette.offset().top - this._palette.height() - this.element.outerHeight(),
					pTop = el.offset().top,
					openUp = bott > pBott && top > pTop;
				if (openUp) {
					this._palette.css({ bottom: this.element.outerHeight()+'px' });
				} else {
					this._palette.css({ bottom: 'auto' });
				}
				break;
			}
			if (el[0].tagName == 'HTML') break;
			else el = el.offsetParent();
			i++;
		}
	},

	showPalette: function() {
		if(this._enabled){
			this._active=true;
			$('.colorPicker').not('.'+this._id).colorpicker('hidePalette');
			if(this._palette===null){
				this._palette=this.element.next()
					.after(this._paletteHTML()).next()
					.on('click',function(evt){
						evt.stopPropagation();
						return false;
					});
				this._bindColors();
				var that=this;
				if(this._isPopup){
					this._downOrUpPositioning();
					$(document.body).on('click.'+that._id, function(evt){
						if(evt.target!=that.element.get(0)){
							that.hidePalette();
						}
					}).on('keyup.'+that._id, function(evt){
						if(evt.keyCode===27){
							that.hidePalette();
						}
					});
				}
			}
		}
		return this;
	},

	hidePalette: function() {
		if(this._isPopup && this._palette){
			$(document.body).off('click.'+this._id);
			var that=this;
			this._palette.off('mouseover click', 'td,.evo-transparent')
				.fadeOut(function(){
					that._palette.remove();
					that._palette=that._cTxt=null;
				})
				.find('.evo-more a').off('click');
		}
		return this;
	},

	_bindColors: function() {
		var that=this,
			opts=this.options,
			es=this._palette.find('div.evo-color'),
			sel=opts.history?'td,.evo-cHist>div':'td';

		if(opts.transparentColor){
			sel+=',.evo-transparent';
		}
		this._cTxt1=es.eq(0).children().eq(0);
		this._cTxt2=es.eq(1).children().eq(0);
		this._palette
			.on('click', sel, function(evt){
				if(that._enabled){
					var $this=$(this);
					that._setValue($this.hasClass('evo-transparent')?transColor:toHex3($this.attr('style').substring(17)));
					that._active=false;
				}
			})
			.on('mouseover', sel, function(evt){
				if(that._enabled){
					var $this=$(this),
						c=$this.hasClass('evo-transparent')?transColor:toHex3($this.attr('style').substring(17));
					if(that.options.displayIndicator){
						that._setColorInd(c,2);
					}
					if(that._active){
						that.element.trigger('mouseover.color', c);
					}
				}
			})
			.find('.evo-more a').on('click', function(){
				that._switchPalette(this);
			});
	},

	val: function(value) {
		if (typeof value=='undefined') {
			return this.options.color;
		}else{
			this._setValue(value);
			return this;
		}
	},

	_setValue: function(c, noHide) {
		c = c.replace(/ /g,'');
		this.options.color=c;
		if(this._isPopup){
			if(!noHide){
				this.hidePalette();
			}
			this._setBoxColor(this.element.val(c).change().next(), c);
		}else{
			this._setColorInd(c,1);
		}
		if(this.options.history && this._paletteIdx>0){
			this._add2History(c);
		}
		this.element.trigger('change.color', c);
	},

	_setColorInd: function(c, idx) {
		var $box=this['_cTxt'+idx];
		this._setBoxColor($box, c);
		$box.next().html(c);
	},

	_setBoxColor: function($box, c) {
		if(c===transColor){
			$box.addClass('evo-transparent')
				.removeAttr('style');
		}else{
			$box.removeClass('evo-transparent')
				.attr('style','background-color:'+c);
		}
	},

	_setOption: function(key, value) {
		if(key=='color'){
			this._setValue(value, true);
		}else{
			this.options[key]=value;
		}
	},

	_add2History: function(c) {
		var iMax=history.length;
		// skip color if already in history
		for(var i=0;i<iMax;i++){
			if(c==history[i]){
				return;
			}
		}
		// limit of 28 colors in history
		if(iMax>27){
			history.shift();
		}
		// add to history
		history.push(c);
	},

	clear: function(){
		this.hidePalette().val('');
	},

	enable: function() {
		var e=this.element;
		if(this._isPopup){
			e.removeAttr('disabled');
		}else{
			e.css({
				'opacity': '1', 
				'pointer-events': 'auto'
			});
		}
		if(this.options.showOn!=='focus'){
			this.element.next().addClass('evo-pointer');
		}
		e.removeAttr('aria-disabled');
		this._enabled=true;
		return this;
	},

	disable: function() {
		var e=this.element;
		if(this._isPopup){
			e.attr('disabled', 'disabled');
		}else{
			this.hidePalette();
			e.css({
				'opacity': '0.3', 
				'pointer-events': 'none'
			});
		}
		if(this.options.showOn!=='focus'){
			this.element.next().removeClass('evo-pointer');
		}
		e.attr('aria-disabled','true');
		this._enabled=false;
		return this;
	},

	isDisabled: function() {
		return !this._enabled;
	},

	destroy: function() {
		$(document.body).off('click.'+this._id);
		if(this._palette){
			this._palette.off('mouseover click', 'td,.evo-cHist>div,.evo-transparent')
				.find('.evo-more a').off('click');
			if(this._isPopup){
				this._palette.remove();
			}
			this._palette=this._cTxt=null;
		}
		if(this._isPopup){
			this.element
				.next().off('click').remove()
				.end().off('focus').unwrap();
		}
		this.element.removeClass('colorPicker '+this.id).empty();
		$.Widget.prototype.destroy.call(this);
	}

});

})(jQuery);

},{}],6:[function(require,module,exports){
//     JavaScript Expression Parser (JSEP) 0.3.4
//     JSEP may be freely distributed under the MIT License
//     http://jsep.from.so/

/*global module: true, exports: true, console: true */
(function (root) {
	'use strict';
	// Node Types
	// ----------

	// This is the full set of types that any JSEP node can be.
	// Store them here to save space when minified
	var COMPOUND = 'Compound',
		IDENTIFIER = 'Identifier',
		MEMBER_EXP = 'MemberExpression',
		LITERAL = 'Literal',
		THIS_EXP = 'ThisExpression',
		CALL_EXP = 'CallExpression',
		UNARY_EXP = 'UnaryExpression',
		BINARY_EXP = 'BinaryExpression',
		LOGICAL_EXP = 'LogicalExpression',
		CONDITIONAL_EXP = 'ConditionalExpression',
		ARRAY_EXP = 'ArrayExpression',

		PERIOD_CODE = 46, // '.'
		COMMA_CODE  = 44, // ','
		SQUOTE_CODE = 39, // single quote
		DQUOTE_CODE = 34, // double quotes
		OPAREN_CODE = 40, // (
		CPAREN_CODE = 41, // )
		OBRACK_CODE = 91, // [
		CBRACK_CODE = 93, // ]
		QUMARK_CODE = 63, // ?
		SEMCOL_CODE = 59, // ;
		COLON_CODE  = 58, // :

		throwError = function(message, index) {
			var error = new Error(message + ' at character ' + index);
			error.index = index;
			error.description = message;
			throw error;
		},

	// Operations
	// ----------

	// Set `t` to `true` to save space (when minified, not gzipped)
		t = true,
	// Use a quickly-accessible map to store all of the unary operators
	// Values are set to `true` (it really doesn't matter)
		unary_ops = {'-': t, '!': t, '~': t, '+': t},
	// Also use a map for the binary operations but set their values to their
	// binary precedence for quick reference:
	// see [Order of operations](http://en.wikipedia.org/wiki/Order_of_operations#Programming_language)
		binary_ops = {
			'||': 1, '&&': 2, '|': 3,  '^': 4,  '&': 5,
			'==': 6, '!=': 6, '===': 6, '!==': 6,
			'<': 7,  '>': 7,  '<=': 7,  '>=': 7,
			'<<':8,  '>>': 8, '>>>': 8,
			'+': 9, '-': 9,
			'*': 10, '/': 10, '%': 10
		},
	// Get return the longest key length of any object
		getMaxKeyLen = function(obj) {
			var max_len = 0, len;
			for(var key in obj) {
				if((len = key.length) > max_len && obj.hasOwnProperty(key)) {
					max_len = len;
				}
			}
			return max_len;
		},
		max_unop_len = getMaxKeyLen(unary_ops),
		max_binop_len = getMaxKeyLen(binary_ops),
	// Literals
	// ----------
	// Store the values to return for the various literals we may encounter
		literals = {
			'true': true,
			'false': false,
			'null': null
		},
	// Except for `this`, which is special. This could be changed to something like `'self'` as well
		this_str = 'this',
	// Returns the precedence of a binary operator or `0` if it isn't a binary operator
		binaryPrecedence = function(op_val) {
			return binary_ops[op_val] || 0;
		},
	// Utility function (gets called from multiple places)
	// Also note that `a && b` and `a || b` are *logical* expressions, not binary expressions
		createBinaryExpression = function (operator, left, right) {
			var type = (operator === '||' || operator === '&&') ? LOGICAL_EXP : BINARY_EXP;
			return {
				type: type,
				operator: operator,
				left: left,
				right: right
			};
		},
		// `ch` is a character code in the next three functions
		isDecimalDigit = function(ch) {
			return (ch >= 48 && ch <= 57); // 0...9
		},
		isIdentifierStart = function(ch) {
			return (ch === 36) || (ch === 95) || // `$` and `_`
					(ch >= 65 && ch <= 90) || // A...Z
					(ch >= 97 && ch <= 122) || // a...z
                    (ch >= 128 && !binary_ops[String.fromCharCode(ch)]); // any non-ASCII that is not an operator
		},
		isIdentifierPart = function(ch) {
			return (ch === 36) || (ch === 95) || // `$` and `_`
					(ch >= 65 && ch <= 90) || // A...Z
					(ch >= 97 && ch <= 122) || // a...z
					(ch >= 48 && ch <= 57) || // 0...9
                    (ch >= 128 && !binary_ops[String.fromCharCode(ch)]); // any non-ASCII that is not an operator
		},

		// Parsing
		// -------
		// `expr` is a string with the passed in expression
		jsep = function(expr) {
			// `index` stores the character number we are currently at while `length` is a constant
			// All of the gobbles below will modify `index` as we move along
			var index = 0,
				charAtFunc = expr.charAt,
				charCodeAtFunc = expr.charCodeAt,
				exprI = function(i) { return charAtFunc.call(expr, i); },
				exprICode = function(i) { return charCodeAtFunc.call(expr, i); },
				length = expr.length,

				// Push `index` up to the next non-space character
				gobbleSpaces = function() {
					var ch = exprICode(index);
					// space or tab
					while(ch === 32 || ch === 9 || ch === 10 || ch === 13) {
						ch = exprICode(++index);
					}
				},

				// The main parsing function. Much of this code is dedicated to ternary expressions
				gobbleExpression = function() {
					var test = gobbleBinaryExpression(),
						consequent, alternate;
					gobbleSpaces();
					if(exprICode(index) === QUMARK_CODE) {
						// Ternary expression: test ? consequent : alternate
						index++;
						consequent = gobbleExpression();
						if(!consequent) {
							throwError('Expected expression', index);
						}
						gobbleSpaces();
						if(exprICode(index) === COLON_CODE) {
							index++;
							alternate = gobbleExpression();
							if(!alternate) {
								throwError('Expected expression', index);
							}
							return {
								type: CONDITIONAL_EXP,
								test: test,
								consequent: consequent,
								alternate: alternate
							};
						} else {
							throwError('Expected :', index);
						}
					} else {
						return test;
					}
				},

				// Search for the operation portion of the string (e.g. `+`, `===`)
				// Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
				// and move down from 3 to 2 to 1 character until a matching binary operation is found
				// then, return that binary operation
				gobbleBinaryOp = function() {
					gobbleSpaces();
					var biop, to_check = expr.substr(index, max_binop_len), tc_len = to_check.length;
					while(tc_len > 0) {
						// Don't accept a binary op when it is an identifier.
						// Binary ops that start with a identifier-valid character must be followed
						// by a non identifier-part valid character
						if(binary_ops.hasOwnProperty(to_check) && (
							!isIdentifierStart(exprICode(index)) ||
							(index+to_check.length< expr.length && !isIdentifierPart(exprICode(index+to_check.length)))
						)) {
							index += tc_len;
							return to_check;
						}
						to_check = to_check.substr(0, --tc_len);
					}
					return false;
				},

				// This function is responsible for gobbling an individual expression,
				// e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
				gobbleBinaryExpression = function() {
					var ch_i, node, biop, prec, stack, biop_info, left, right, i;

					// First, try to get the leftmost thing
					// Then, check to see if there's a binary operator operating on that leftmost thing
					left = gobbleToken();
					biop = gobbleBinaryOp();

					// If there wasn't a binary operator, just return the leftmost node
					if(!biop) {
						return left;
					}

					// Otherwise, we need to start a stack to properly place the binary operations in their
					// precedence structure
					biop_info = { value: biop, prec: binaryPrecedence(biop)};

					right = gobbleToken();
					if(!right) {
						throwError("Expected expression after " + biop, index);
					}
					stack = [left, biop_info, right];

					// Properly deal with precedence using [recursive descent](http://www.engr.mun.ca/~theo/Misc/exp_parsing.htm)
					while((biop = gobbleBinaryOp())) {
						prec = binaryPrecedence(biop);

						if(prec === 0) {
							break;
						}
						biop_info = { value: biop, prec: prec };

						// Reduce: make a binary expression from the three topmost entries.
						while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
							right = stack.pop();
							biop = stack.pop().value;
							left = stack.pop();
							node = createBinaryExpression(biop, left, right);
							stack.push(node);
						}

						node = gobbleToken();
						if(!node) {
							throwError("Expected expression after " + biop, index);
						}
						stack.push(biop_info, node);
					}

					i = stack.length - 1;
					node = stack[i];
					while(i > 1) {
						node = createBinaryExpression(stack[i - 1].value, stack[i - 2], node);
						i -= 2;
					}
					return node;
				},

				// An individual part of a binary expression:
				// e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
				gobbleToken = function() {
					var ch, to_check, tc_len;

					gobbleSpaces();
					ch = exprICode(index);

					if(isDecimalDigit(ch) || ch === PERIOD_CODE) {
						// Char code 46 is a dot `.` which can start off a numeric literal
						return gobbleNumericLiteral();
					} else if(ch === SQUOTE_CODE || ch === DQUOTE_CODE) {
						// Single or double quotes
						return gobbleStringLiteral();
					} else if (ch === OBRACK_CODE) {
						return gobbleArray();
					} else {
						to_check = expr.substr(index, max_unop_len);
						tc_len = to_check.length;
						while(tc_len > 0) {
						// Don't accept an unary op when it is an identifier.
						// Unary ops that start with a identifier-valid character must be followed
						// by a non identifier-part valid character
							if(unary_ops.hasOwnProperty(to_check) && (
								!isIdentifierStart(exprICode(index)) ||
								(index+to_check.length < expr.length && !isIdentifierPart(exprICode(index+to_check.length)))
							)) {
								index += tc_len;
								return {
									type: UNARY_EXP,
									operator: to_check,
									argument: gobbleToken(),
									prefix: true
								};
							}
							to_check = to_check.substr(0, --tc_len);
						}

						if (isIdentifierStart(ch) || ch === OPAREN_CODE) { // open parenthesis
							// `foo`, `bar.baz`
							return gobbleVariable();
						}
					}

					return false;
				},
				// Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
				// keep track of everything in the numeric literal and then calling `parseFloat` on that string
				gobbleNumericLiteral = function() {
					var number = '', ch, chCode;
					while(isDecimalDigit(exprICode(index))) {
						number += exprI(index++);
					}

					if(exprICode(index) === PERIOD_CODE) { // can start with a decimal marker
						number += exprI(index++);

						while(isDecimalDigit(exprICode(index))) {
							number += exprI(index++);
						}
					}

					ch = exprI(index);
					if(ch === 'e' || ch === 'E') { // exponent marker
						number += exprI(index++);
						ch = exprI(index);
						if(ch === '+' || ch === '-') { // exponent sign
							number += exprI(index++);
						}
						while(isDecimalDigit(exprICode(index))) { //exponent itself
							number += exprI(index++);
						}
						if(!isDecimalDigit(exprICode(index-1)) ) {
							throwError('Expected exponent (' + number + exprI(index) + ')', index);
						}
					}


					chCode = exprICode(index);
					// Check to make sure this isn't a variable name that start with a number (123abc)
					if(isIdentifierStart(chCode)) {
						throwError('Variable names cannot start with a number (' +
									number + exprI(index) + ')', index);
					} else if(chCode === PERIOD_CODE) {
						throwError('Unexpected period', index);
					}

					return {
						type: LITERAL,
						value: parseFloat(number),
						raw: number
					};
				},

				// Parses a string literal, staring with single or double quotes with basic support for escape codes
				// e.g. `"hello world"`, `'this is\nJSEP'`
				gobbleStringLiteral = function() {
					var str = '', quote = exprI(index++), closed = false, ch;

					while(index < length) {
						ch = exprI(index++);
						if(ch === quote) {
							closed = true;
							break;
						} else if(ch === '\\') {
							// Check for all of the common escape codes
							ch = exprI(index++);
							switch(ch) {
								case 'n': str += '\n'; break;
								case 'r': str += '\r'; break;
								case 't': str += '\t'; break;
								case 'b': str += '\b'; break;
								case 'f': str += '\f'; break;
								case 'v': str += '\x0B'; break;
								default : str += ch;
							}
						} else {
							str += ch;
						}
					}

					if(!closed) {
						throwError('Unclosed quote after "'+str+'"', index);
					}

					return {
						type: LITERAL,
						value: str,
						raw: quote + str + quote
					};
				},

				// Gobbles only identifiers
				// e.g.: `foo`, `_value`, `$x1`
				// Also, this function checks if that identifier is a literal:
				// (e.g. `true`, `false`, `null`) or `this`
				gobbleIdentifier = function() {
					var ch = exprICode(index), start = index, identifier;

					if(isIdentifierStart(ch)) {
						index++;
					} else {
						throwError('Unexpected ' + exprI(index), index);
					}

					while(index < length) {
						ch = exprICode(index);
						if(isIdentifierPart(ch)) {
							index++;
						} else {
							break;
						}
					}
					identifier = expr.slice(start, index);

					if(literals.hasOwnProperty(identifier)) {
						return {
							type: LITERAL,
							value: literals[identifier],
							raw: identifier
						};
					} else if(identifier === this_str) {
						return { type: THIS_EXP };
					} else {
						return {
							type: IDENTIFIER,
							name: identifier
						};
					}
				},

				// Gobbles a list of arguments within the context of a function call
				// or array literal. This function also assumes that the opening character
				// `(` or `[` has already been gobbled, and gobbles expressions and commas
				// until the terminator character `)` or `]` is encountered.
				// e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`
				gobbleArguments = function(termination) {
					var ch_i, args = [], node, closed = false;
					while(index < length) {
						gobbleSpaces();
						ch_i = exprICode(index);
						if(ch_i === termination) { // done parsing
							closed = true;
							index++;
							break;
						} else if (ch_i === COMMA_CODE) { // between expressions
							index++;
						} else {
							node = gobbleExpression();
							if(!node || node.type === COMPOUND) {
								throwError('Expected comma', index);
							}
							args.push(node);
						}
					}
					if (!closed) {
						throwError('Expected ' + String.fromCharCode(termination), index);
					}
					return args;
				},

				// Gobble a non-literal variable name. This variable name may include properties
				// e.g. `foo`, `bar.baz`, `foo['bar'].baz`
				// It also gobbles function calls:
				// e.g. `Math.acos(obj.angle)`
				gobbleVariable = function() {
					var ch_i, node;
					ch_i = exprICode(index);

					if(ch_i === OPAREN_CODE) {
						node = gobbleGroup();
					} else {
						node = gobbleIdentifier();
					}
					gobbleSpaces();
					ch_i = exprICode(index);
					while(ch_i === PERIOD_CODE || ch_i === OBRACK_CODE || ch_i === OPAREN_CODE) {
						index++;
						if(ch_i === PERIOD_CODE) {
							gobbleSpaces();
							node = {
								type: MEMBER_EXP,
								computed: false,
								object: node,
								property: gobbleIdentifier()
							};
						} else if(ch_i === OBRACK_CODE) {
							node = {
								type: MEMBER_EXP,
								computed: true,
								object: node,
								property: gobbleExpression()
							};
							gobbleSpaces();
							ch_i = exprICode(index);
							if(ch_i !== CBRACK_CODE) {
								throwError('Unclosed [', index);
							}
							index++;
						} else if(ch_i === OPAREN_CODE) {
							// A function call is being made; gobble all the arguments
							node = {
								type: CALL_EXP,
								'arguments': gobbleArguments(CPAREN_CODE),
								callee: node
							};
						}
						gobbleSpaces();
						ch_i = exprICode(index);
					}
					return node;
				},

				// Responsible for parsing a group of things within parentheses `()`
				// This function assumes that it needs to gobble the opening parenthesis
				// and then tries to gobble everything within that parenthesis, assuming
				// that the next thing it should see is the close parenthesis. If not,
				// then the expression probably doesn't have a `)`
				gobbleGroup = function() {
					index++;
					var node = gobbleExpression();
					gobbleSpaces();
					if(exprICode(index) === CPAREN_CODE) {
						index++;
						return node;
					} else {
						throwError('Unclosed (', index);
					}
				},

				// Responsible for parsing Array literals `[1, 2, 3]`
				// This function assumes that it needs to gobble the opening bracket
				// and then tries to gobble the expressions as arguments.
				gobbleArray = function() {
					index++;
					return {
						type: ARRAY_EXP,
						elements: gobbleArguments(CBRACK_CODE)
					};
				},

				nodes = [], ch_i, node;

			while(index < length) {
				ch_i = exprICode(index);

				// Expressions can be separated by semicolons, commas, or just inferred without any
				// separators
				if(ch_i === SEMCOL_CODE || ch_i === COMMA_CODE) {
					index++; // ignore separators
				} else {
					// Try to gobble each expression individually
					if((node = gobbleExpression())) {
						nodes.push(node);
					// If we weren't able to find a binary expression and are out of room, then
					// the expression passed in probably has too much
					} else if(index < length) {
						throwError('Unexpected "' + exprI(index) + '"', index);
					}
				}
			}

			// If there's only one expression just try returning the expression
			if(nodes.length === 1) {
				return nodes[0];
			} else {
				return {
					type: COMPOUND,
					body: nodes
				};
			}
		};

	// To be filled in by the template
	jsep.version = '0.3.4';
	jsep.toString = function() { return 'JavaScript Expression Parser (JSEP) v' + jsep.version; };

	/**
	 * @method jsep.addUnaryOp
	 * @param {string} op_name The name of the unary op to add
	 * @return jsep
	 */
	jsep.addUnaryOp = function(op_name) {
		max_unop_len = Math.max(op_name.length, max_unop_len);
		unary_ops[op_name] = t; return this;
	};

	/**
	 * @method jsep.addBinaryOp
	 * @param {string} op_name The name of the binary op to add
	 * @param {number} precedence The precedence of the binary op (can be a float)
	 * @return jsep
	 */
	jsep.addBinaryOp = function(op_name, precedence) {
		max_binop_len = Math.max(op_name.length, max_binop_len);
		binary_ops[op_name] = precedence;
		return this;
	};

	/**
	 * @method jsep.addLiteral
	 * @param {string} literal_name The name of the literal to add
	 * @param {*} literal_value The value of the literal
	 * @return jsep
	 */
	jsep.addLiteral = function(literal_name, literal_value) {
		literals[literal_name] = literal_value;
		return this;
	};

	/**
	 * @method jsep.removeUnaryOp
	 * @param {string} op_name The name of the unary op to remove
	 * @return jsep
	 */
	jsep.removeUnaryOp = function(op_name) {
		delete unary_ops[op_name];
		if(op_name.length === max_unop_len) {
			max_unop_len = getMaxKeyLen(unary_ops);
		}
		return this;
	};

	/**
	 * @method jsep.removeAllUnaryOps
	 * @return jsep
	 */
	jsep.removeAllUnaryOps = function() {
		unary_ops = {};
		max_unop_len = 0;

		return this;
	};

	/**
	 * @method jsep.removeBinaryOp
	 * @param {string} op_name The name of the binary op to remove
	 * @return jsep
	 */
	jsep.removeBinaryOp = function(op_name) {
		delete binary_ops[op_name];
		if(op_name.length === max_binop_len) {
			max_binop_len = getMaxKeyLen(binary_ops);
		}
		return this;
	};

	/**
	 * @method jsep.removeAllBinaryOps
	 * @return jsep
	 */
	jsep.removeAllBinaryOps = function() {
		binary_ops = {};
		max_binop_len = 0;

		return this;
	};

	/**
	 * @method jsep.removeLiteral
	 * @param {string} literal_name The name of the literal to remove
	 * @return jsep
	 */
	jsep.removeLiteral = function(literal_name) {
		delete literals[literal_name];
		return this;
	};

	/**
	 * @method jsep.removeAllLiterals
	 * @return jsep
	 */
	jsep.removeAllLiterals = function() {
		literals = {};

		return this;
	};

	// In desktop environments, have a way to restore the old value for `jsep`
	if (typeof exports === 'undefined') {
		var old_jsep = root.jsep;
		// The star of the show! It's a function!
		root.jsep = jsep;
		// And a courteous function willing to move out of the way for other similarly-named objects!
		jsep.noConflict = function() {
			if(root.jsep === jsep) {
				root.jsep = old_jsep;
			}
			return jsep;
		};
	} else {
		// In Node.JS environments
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = jsep;
		} else {
			exports.parse = jsep;
		}
	}
}(this));

},{}],7:[function(require,module,exports){
'use strict';

var utils = require('./utils');

module.exports = function makeJuiceClient(juiceClient) {

juiceClient.ignoredPseudos = ['hover', 'active', 'focus', 'visited', 'link'];
juiceClient.widthElements = ['TABLE', 'TD', 'IMG'];
juiceClient.heightElements = ['TABLE', 'TD', 'IMG'];
juiceClient.tableElements = ['TABLE', 'TD', 'TH', 'TR', 'TD', 'CAPTION', 'COLGROUP', 'COL', 'THEAD', 'TBODY', 'TFOOT'];
juiceClient.nonVisualElements = [ 'HEAD', 'TITLE', 'BASE', 'LINK', 'STYLE', 'META', 'SCRIPT', 'NOSCRIPT' ];
juiceClient.styleToAttribute = {
  'background-color': 'bgcolor',
  'background-image': 'background',
  'text-align': 'align',
  'vertical-align': 'valign'
};
juiceClient.excludedProperties = [];

juiceClient.juiceDocument = juiceDocument;
juiceClient.inlineDocument = inlineDocument;

function inlineDocument($, css, options) {

  options = options || {};
  var rules = utils.parseCSS(css);
  var editedElements = [];
  var styleAttributeName = 'style';

  if (options.styleAttributeName) {
    styleAttributeName = options.styleAttributeName;
  }

  rules.forEach(handleRule);
  editedElements.forEach(setStyleAttrs);

  if (options.inlinePseudoElements) {
    editedElements.forEach(inlinePseudoElements);
  }

  if (options.applyWidthAttributes) {
    editedElements.forEach(function(el) {
      setDimensionAttrs(el, 'width');
    });
  }

  if (options.applyHeightAttributes) {
    editedElements.forEach(function(el) {
      setDimensionAttrs(el, 'height');
    });
  }

  if (options.applyAttributesTableElements) {
    editedElements.forEach(setAttributesOnTableElements);
  }

  if (options.insertPreservedExtraCss && options.extraCss) {
    var preservedText = utils.getPreservedText(options.extraCss, {
      mediaQueries: options.preserveMediaQueries,
      fontFaces: options.preserveFontFaces,
      keyFrames: options.preserveKeyFrames
    });
    if (preservedText) {
      var $appendTo = null;
      if (options.insertPreservedExtraCss !== true) {
        $appendTo = $(options.insertPreservedExtraCss);
      } else {
        $appendTo = $('head');
        if (!$appendTo.length) { $appendTo = $('body'); }
        if (!$appendTo.length) { $appendTo = $.root(); }
      }

      $appendTo.first().append('<style>' + preservedText + '</style>');
    }
  }

  function handleRule(rule) {
    var sel = rule[0];
    var style = rule[1];
    var selector = new utils.Selector(sel);
    var parsedSelector = selector.parsed();
    var pseudoElementType = getPseudoElementType(parsedSelector);

    // skip rule if the selector has any pseudos which are ignored
    for (var i = 0; i < parsedSelector.length; ++i) {
      var subSel = parsedSelector[i];
      if (subSel.pseudos) {
        for (var j = 0; j < subSel.pseudos.length; ++j) {
          var subSelPseudo = subSel.pseudos[j];
          if (juiceClient.ignoredPseudos.indexOf(subSelPseudo.name) >= 0) {
            return;
          }
        }
      }
    }

    if (pseudoElementType) {
      var last = parsedSelector[parsedSelector.length - 1];
      var pseudos = last.pseudos;
      last.pseudos = filterElementPseudos(last.pseudos);
      sel = parsedSelector.toString();
      last.pseudos = pseudos;
    }

    var els;
    try {
      els = $(sel);
    } catch (err) {
      // skip invalid selector
      return;
    }

    els.each(function() {
      var el = this;

      if (el.name && juiceClient.nonVisualElements.indexOf(el.name.toUpperCase()) >= 0) {
        return;
      }

      if (pseudoElementType) {
        var pseudoElPropName = 'pseudo' + pseudoElementType;
        var pseudoEl = el[pseudoElPropName];
        if (!pseudoEl) {
          pseudoEl = el[pseudoElPropName] = $('<span />').get(0);
          pseudoEl.pseudoElementType = pseudoElementType;
          pseudoEl.pseudoElementParent = el;
          el[pseudoElPropName] = pseudoEl;
        }
        el = pseudoEl;
      }

      if (!el.styleProps) {
        el.styleProps = {};

        // if the element has inline styles, fake selector with topmost specificity
        if ($(el).attr(styleAttributeName)) {
          var cssText = '* { ' + $(el).attr(styleAttributeName) + ' } ';
          addProps(utils.parseCSS(cssText)[0][1], new utils.Selector('<style>', true));
        }

        // store reference to an element we need to compile style="" attr for
        editedElements.push(el);
      }

      // go through the properties
      function addProps(style, selector) {
        for (var i = 0, l = style.length; i < l; i++) {
          if (style[i].type == 'property') {
            var name = style[i].name;
            var value = style[i].value;
            var important = style[i].value.match(/!important$/) !== null;
            if (important && !options.preserveImportant) value = value.replace(/\s*!important$/, '');
            // adds line number and column number for the properties as "additionalPriority" to the
            // properties because in CSS the position directly affect the priority.
            var additionalPriority = [style[i].position.start.line, style[i].position.start.col];
            var prop = new utils.Property(name, value, selector, important ? 2 : 0, additionalPriority);
            var existing = el.styleProps[name];

            // if property name is not in the excluded properties array
            if (juiceClient.excludedProperties.indexOf(name) < 0) {
              if (existing && existing.compare(prop) === prop || !existing) {
                // deleting a property let us change the order (move it to the end in the setStyleAttrs loop)
                if (existing && existing.selector !== selector) {
                  delete el.styleProps[name];
                } else if (existing) {
                  // make "prop" a special composed property.
                  prop.nextProp = existing;
                }

                el.styleProps[name] = prop;
              }
            }
          }
        }
      }

      addProps(style, selector);
    });
  }

  function setStyleAttrs(el) {
    var l = Object.keys(el.styleProps).length;
    var props = [];
    // Here we loop each property and make sure to "expand"
    // linked "nextProp" properties happening when the same property
    // is declared multiple times in the same selector.
    Object.keys(el.styleProps).forEach(function(key) {
      var np = el.styleProps[key];
      while (typeof np !== 'undefined') {
        props.push(np);
        np = np.nextProp;
      }
    });
    // sort properties by their originating selector's specificity so that
    // props like "padding" and "padding-bottom" are resolved as expected.
    props.sort(function(a, b) {
      return a.compareFunc(b);
    });
    var string = props
      .filter(function(prop) {
        // Content becomes the innerHTML of pseudo elements, not used as a
        // style property
        return prop.prop !== 'content';
      })
      .map(function(prop) {
        return prop.prop + ': ' + prop.value.replace(/["]/g, '\'') + ';';
      })
      .join(' ');
    if (string) {
      $(el).attr(styleAttributeName, string);
    }
  }

  function inlinePseudoElements(el) {
    if (el.pseudoElementType && el.styleProps.content) {
      var parsed = parseContent(el.styleProps.content.value);
      if (parsed.img) {
        el.name = 'img';
        $(el).attr('src', parsed.img);
      } else {
        $(el).text(parsed);
      }
      var parent = el.pseudoElementParent;
      if (el.pseudoElementType === 'before') {
        $(parent).prepend(el);
      } else {
        $(parent).append(el);
      }
    }
  }

  function setDimensionAttrs(el, dimension) {
    if (!el.name) { return; }
    var elName = el.name.toUpperCase();
    if (juiceClient[dimension + 'Elements'].indexOf(elName) > -1) {
      for (var i in el.styleProps) {
        if (el.styleProps[i].prop === dimension) {
          if (el.styleProps[i].value.match(/px/)) {
            var pxSize = el.styleProps[i].value.replace('px', '');
            $(el).attr(dimension, pxSize);
            return;
          }
          if (juiceClient.tableElements.indexOf(elName) > -1 && el.styleProps[i].value.match(/\%/)) {
            $(el).attr(dimension, el.styleProps[i].value);
            return;
          }
        }
      }
    }
  }

  function extractBackgroundUrl(value) {
    return value.indexOf('url(') !== 0
      ? value
      : value.replace(/^url\((["'])?([^"']+)\1\)$/, '$2');
  }

  function setAttributesOnTableElements(el) {
    if (!el.name) { return; }
    var elName = el.name.toUpperCase();
    var styleProps = Object.keys(juiceClient.styleToAttribute);

    if (juiceClient.tableElements.indexOf(elName) > -1) {
      for (var i in el.styleProps) {
        if (styleProps.indexOf(el.styleProps[i].prop) > -1) {
          var prop = juiceClient.styleToAttribute[el.styleProps[i].prop];
          var value = el.styleProps[i].value;
          if (prop === 'background') {
            value = extractBackgroundUrl(value)
          }
          $(el).attr(prop, value);
        }
      }
    }
  }
}

function parseContent(content) {
  if (content === 'none' || content === 'normal') {
    return '';
  }

  var imageUrlMatch = content.match(/^\s*url\s*\(\s*(.*?)\s*\)\s*$/i);
  if (imageUrlMatch) {
    var url = imageUrlMatch[1].replace(/^['"]|['"]$/g, '');
    return { img: url };
  }

  // Naive parsing, assume well-formed value
  content = content.slice(1, content.length - 1);
  // Naive unescape, assume no unicode char codes
  content = content.replace(/\\/g, '');
  return content;
}

// Return "before" or "after" if the given selector is a pseudo element (e.g.,
// a::after).
function getPseudoElementType(selector) {
  if (selector.length === 0) {
    return;
  }

  var pseudos = selector[selector.length - 1].pseudos;
  if (!pseudos) {
    return;
  }

  for (var i = 0; i < pseudos.length; i++) {
    if (isPseudoElementName(pseudos[i])) {
      return pseudos[i].name;
    }
  }
}

function isPseudoElementName(pseudo) {
  return pseudo.name === 'before' || pseudo.name === 'after';
}

function filterElementPseudos(pseudos) {
  return pseudos.filter(function(pseudo) {
    return !isPseudoElementName(pseudo);
  });
}

function juiceDocument($, options) {
  options = utils.getDefaultOptions(options);
  var css = extractCssFromDocument($, options);
  css += '\n' + options.extraCss;
  inlineDocument($, css, options);
  return $;
}

function getStylesData($, options) {
  var results = [];
  var stylesList = $('style');
  var styleDataList, styleData, styleElement;
  stylesList.each(function() {
    styleElement = this;
    styleDataList = styleElement.childNodes;
    if (styleDataList.length !== 1) {
      return;
    }
    styleData = styleDataList[0].data;
    if (options.applyStyleTags && $(styleElement).attr('data-embed') === undefined) {
      results.push(styleData);
    }
    if (options.removeStyleTags && $(styleElement).attr('data-embed') === undefined) {
      var preservedText = utils.getPreservedText(styleElement.childNodes[0].nodeValue, {
        mediaQueries: options.preserveMediaQueries,
        fontFaces: options.preserveFontFaces,
        keyFrames: options.preserveKeyFrames
      });
      if (preservedText) {
        styleElement.childNodes[0].nodeValue = preservedText;
      } else {
        $(styleElement).remove();
      }
    }
    $(styleElement).removeAttr('data-embed');
  });
  return results;
}

function extractCssFromDocument($, options) {
  var results = getStylesData($, options);
  var css = results.join('\n');
  return css;
}

return juiceClient;

};

},{"./utils":10}],8:[function(require,module,exports){
'use strict';

module.exports = exports = Property;

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * CSS property constructor.
 *
 * @param {String} property
 * @param {String} value
 * @param {Selector} selector the property originates from
 * @param {Integer} priority 0 for normal properties, 2 for !important properties.
 * @param {Array} additional array of integers representing more detailed priorities (sorting)
 * @api public
 */

function Property(prop, value, selector, priority, additionalPriority) {
  this.prop = prop;
  this.value = value;
  this.selector = selector;
  this.priority = priority || 0;
  this.additionalPriority = additionalPriority || [];
}

/**
 * Compares with another Property based on Selector#specificity.
 *
 * @api public
 */

Property.prototype.compareFunc = function(property) {
  var a = [];
  a.push.apply(a, this.selector.specificity());
  a.push.apply(a, this.additionalPriority);
  a[0] += this.priority;
  var b = [];
  b.push.apply(b, property.selector.specificity());
  b.push.apply(b, property.additionalPriority);
  b[0] += property.priority;
  return utils.compareFunc(a, b);
};

Property.prototype.compare = function(property) {
  var winner = this.compareFunc(property);
  if (winner === 1) {
    return this;
  }
  return property;
};


/**
 * Returns CSS property
 *
 * @api public
 */

Property.prototype.toString = function() {
  return this.prop + ': ' + this.value.replace(/['"]+/g, '') + ';';
};

},{"./utils":10}],9:[function(require,module,exports){
'use strict';

var parser = require('slick/parser');

module.exports = exports = Selector;

/**
 * CSS selector constructor.
 *
 * @param {String} selector text
 * @param {Array} optionally, precalculated specificity
 * @api public
 */

function Selector(text, styleAttribute) {
  this.text = text;
  this.spec = undefined;
  this.styleAttribute = styleAttribute || false;
}

/**
 * Get parsed selector.
 *
 * @api public
 */

Selector.prototype.parsed = function() {
  if (!this.tokens) { this.tokens = parse(this.text); }
  return this.tokens;
};

/**
 * Lazy specificity getter
 *
 * @api public
 */

Selector.prototype.specificity = function() {
  var styleAttribute = this.styleAttribute;
  if (!this.spec) { this.spec = specificity(this.text, this.parsed()); }
  return this.spec;

  function specificity(text, parsed) {
    var expressions = parsed || parse(text);
    var spec = [styleAttribute ? 1 : 0, 0, 0, 0];
    var nots = [];

    for (var i = 0; i < expressions.length; i++) {
      var expression = expressions[i];
      var pseudos = expression.pseudos;

      // id awards a point in the second column
      if (expression.id) { spec[1]++; }

      // classes and attributes award a point each in the third column
      if (expression.attributes) { spec[2] += expression.attributes.length; }
      if (expression.classList) { spec[2] += expression.classList.length; }

      // tag awards a point in the fourth column
      if (expression.tag && expression.tag !== '*') { spec[3]++; }

      // pseudos award a point each in the fourth column
      if (pseudos) {
        spec[3] += pseudos.length;

        for (var p = 0; p < pseudos.length; p++) {
          if (pseudos[p].name === 'not') {
            nots.push(pseudos[p].value);
            spec[3]--;
          }
        }
      }
    }

    for (var ii = nots.length; ii--;) {
      var not = specificity(nots[ii]);
      for (var jj = 4; jj--;) { spec[jj] += not[jj]; }
    }

    return spec;
  }
};

/**
 * Parses a selector and returns the tokens.
 *
 * @param {String} selector
 * @api private.
 */

function parse(text) {
  try {
    return parser(text)[0];
  } catch (e) {
    return [];
  }
}

},{"slick/parser":26}],10:[function(require,module,exports){
'use strict';

/**
 * Module dependencies.
 */

var mensch = require('mensch');
var own = {}.hasOwnProperty;
var Selector = require('./selector');
var Property = require('./property');

exports.Selector = Selector;
exports.Property = Property;

/**
 * Returns an array of the selectors.
 *
 * @license Sizzle CSS Selector Engine - MIT
 * @param {String} selectorText from mensch
 * @api public
 */

exports.extract = function extract(selectorText) {
  var attr = 0;
  var sels = [];
  var sel = '';

  for (var i = 0, l = selectorText.length; i < l; i++) {
    var c = selectorText.charAt(i);

    if (attr) {
      if (']' === c || ')' === c) { attr--; }
      sel += c;
    } else {
      if (',' === c) {
        sels.push(sel);
        sel = '';
      } else {
        if ('[' === c || '(' === c) { attr++; }
        if (sel.length || (c !== ',' && c !== '\n' && c !== ' ')) { sel += c; }
      }
    }
  }

  if (sel.length) {
    sels.push(sel);
  }

  return sels;
};

/**
 * Returns a parse tree for a CSS source.
 * If it encounters multiple selectors separated by a comma, it splits the
 * tree.
 *
 * @param {String} css source
 * @api public
 */

exports.parseCSS = function(css) {
  var parsed = mensch.parse(css, {position: true, comments: true});
  var rules = typeof parsed.stylesheet != 'undefined' && parsed.stylesheet.rules ? parsed.stylesheet.rules : [];
  var ret = [];

  for (var i = 0, l = rules.length; i < l; i++) {
    if (rules[i].type == 'rule') {
      var rule = rules[i];
      var selectors = rule.selectors;

      for (var ii = 0, ll = selectors.length; ii < ll; ii++) {
        ret.push([selectors[ii], rule.declarations]);
      }
    }
  }

  return ret;
};

/**
 * Returns preserved text for a CSS source.
 *
 * @param {String} css source
 * @param {Object} options
 * @api public
 */

exports.getPreservedText = function(css, options) {
  var parsed = mensch.parse(css, {position: true, comments: true});
  var rules = typeof parsed.stylesheet != 'undefined' && parsed.stylesheet.rules ? parsed.stylesheet.rules : [];
  var preserved = [];
  var lastStart = null;

  for (var i = rules.length - 1; i >= 0; i--) {
    if ((options.fontFaces && rules[i].type === 'font-face') ||
        (options.mediaQueries && rules[i].type === 'media') ||
        (options.keyFrames && rules[i].type === 'keyframes')) {
      preserved.unshift(
        mensch.stringify(
          { stylesheet: { rules: [ rules[i] ] }},
          { comments: false, indentation: '  ' }
        )
      );
    }
    lastStart = rules[i].position.start;
  }

  if (preserved.length === 0) {
    return false;
  }
  return '\n' + preserved.join('\n') + '\n';
};

exports.normalizeLineEndings = function(text) {
  return text.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
};


/**
 * Compares two specificity vectors, returning the winning one.
 *
 * @param {Array} vector a
 * @param {Array} vector b
 * @return {Array}
 * @api public
 */

exports.compareFunc = function(a, b) {
  var min = Math.min(a.length, b.length);
  for (var i = 0; i < min; i++) {
    if (a[i] === b[i]) { continue; }
    if (a[i] > b[i]) { return 1; }
    return -1;
  }

  return a.length - b.length;
};

exports.compare = function(a, b) {
  return exports.compareFunc(a, b) == 1 ? a : b;
};

exports.extend = function(obj, src) {
  for (var key in src) {
    if (own.call(src, key)) {
      obj[key] = src[key];
    }
  }
  return obj;
};

exports.getDefaultOptions = function(options) {
  var result = exports.extend({
    extraCss: '',
    insertPreservedExtraCss: true,
    applyStyleTags: true,
    removeStyleTags: true,
    preserveMediaQueries: true,
    preserveFontFaces: true,
    preserveKeyFrames: true,
    applyWidthAttributes: true,
    applyHeightAttributes: true,
    applyAttributesTableElements: true,
    url: ''
  }, options);

  result.webResources = result.webResources || {};

  return result;
};

},{"./property":8,"./selector":9,"mensch":16}],11:[function(require,module,exports){
(function (global){
// knockout-sortable 1.1.0 | (c) 2017 Ryan Niemeyer |  http://www.opensource.org/licenses/mit-license
;(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD anonymous module
        define(["knockout", "jquery", "jquery-ui/ui/widgets/sortable", "jquery-ui/ui/widgets/draggable", "jquery-ui/ui/widgets/droppable"], factory);
    } else if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS module
        var ko = (typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null),
            jQuery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);
        (typeof window !== "undefined" ? window['jQuery']['ui']['sortable'] : typeof global !== "undefined" ? global['jQuery']['ui']['sortable'] : null);
        (typeof window !== "undefined" ? window['jQuery']['ui']['draggable'] : typeof global !== "undefined" ? global['jQuery']['ui']['draggable'] : null);
        (typeof window !== "undefined" ? window['jQuery']['ui']['droppable'] : typeof global !== "undefined" ? global['jQuery']['ui']['droppable'] : null);
        factory(ko, jQuery);
    } else {
        // No module loader (plain <script> tag) - put directly in global namespace
        factory(window.ko, window.jQuery);
    }
})(function(ko, $) {
    var ITEMKEY = "ko_sortItem",
        INDEXKEY = "ko_sourceIndex",
        LISTKEY = "ko_sortList",
        PARENTKEY = "ko_parentList",
        DRAGKEY = "ko_dragItem",
        unwrap = ko.utils.unwrapObservable,
        dataGet = ko.utils.domData.get,
        dataSet = ko.utils.domData.set,
        version = $.ui && $.ui.version,
        //1.8.24 included a fix for how events were triggered in nested sortables. indexOf checks will fail if version starts with that value (0 vs. -1)
        hasNestedSortableFix = version && version.indexOf("1.6.") && version.indexOf("1.7.") && (version.indexOf("1.8.") || version === "1.8.24");

    //internal afterRender that adds meta-data to children
    var addMetaDataAfterRender = function(elements, data) {
        ko.utils.arrayForEach(elements, function(element) {
            if (element.nodeType === 1) {
                dataSet(element, ITEMKEY, data);
                dataSet(element, PARENTKEY, dataGet(element.parentNode, LISTKEY));
            }
        });
    };

    //prepare the proper options for the template binding
    var prepareTemplateOptions = function(valueAccessor, dataName) {
        var result = {},
            options = unwrap(valueAccessor()) || {},
            actualAfterRender;

        //build our options to pass to the template engine
        if (options.data) {
            result[dataName] = options.data;
            result.name = options.template;
        } else {
            result[dataName] = valueAccessor();
        }

        ko.utils.arrayForEach(["afterAdd", "afterRender", "as", "beforeRemove", "includeDestroyed", "templateEngine", "templateOptions", "nodes"], function (option) {
            if (options.hasOwnProperty(option)) {
                result[option] = options[option];
            } else if (ko.bindingHandlers.sortable.hasOwnProperty(option)) {
                result[option] = ko.bindingHandlers.sortable[option];
            }
        });

        //use an afterRender function to add meta-data
        if (dataName === "foreach") {
            if (result.afterRender) {
                //wrap the existing function, if it was passed
                actualAfterRender = result.afterRender;
                result.afterRender = function(element, data) {
                    addMetaDataAfterRender.call(data, element, data);
                    actualAfterRender.call(data, element, data);
                };
            } else {
                result.afterRender = addMetaDataAfterRender;
            }
        }

        //return options to pass to the template binding
        return result;
    };

    var updateIndexFromDestroyedItems = function(index, items) {
        var unwrapped = unwrap(items);

        if (unwrapped) {
            for (var i = 0; i < index; i++) {
                //add one for every destroyed item we find before the targetIndex in the target array
                if (unwrapped[i] && unwrap(unwrapped[i]._destroy)) {
                    index++;
                }
            }
        }

        return index;
    };

    //remove problematic leading/trailing whitespace from templates
    var stripTemplateWhitespace = function(element, name) {
        var templateSource,
            templateElement;

        //process named templates
        if (name) {
            templateElement = document.getElementById(name);
            if (templateElement) {
                templateSource = new ko.templateSources.domElement(templateElement);
                templateSource.text($.trim(templateSource.text()));
            }
        }
        else {
            //remove leading/trailing non-elements from anonymous templates
            $(element).contents().each(function() {
                if (this && this.nodeType !== 1) {
                    element.removeChild(this);
                }
            });
        }
    };

    //connect items with observableArrays
    ko.bindingHandlers.sortable = {
        init: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var $element = $(element),
                value = unwrap(valueAccessor()) || {},
                templateOptions = prepareTemplateOptions(valueAccessor, "foreach"),
                sortable = {},
                startActual, updateActual;

            stripTemplateWhitespace(element, templateOptions.name);

            //build a new object that has the global options with overrides from the binding
            $.extend(true, sortable, ko.bindingHandlers.sortable);
            if (value.options && sortable.options) {
                ko.utils.extend(sortable.options, value.options);
                delete value.options;
            }
            ko.utils.extend(sortable, value);

            //if allowDrop is an observable or a function, then execute it in a computed observable
            if (sortable.connectClass && (ko.isObservable(sortable.allowDrop) || typeof sortable.allowDrop == "function")) {
                ko.computed({
                    read: function() {
                        var value = unwrap(sortable.allowDrop),
                            shouldAdd = typeof value == "function" ? value.call(this, templateOptions.foreach) : value;
                        ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, shouldAdd);
                    },
                    disposeWhenNodeIsRemoved: element
                }, this);
            } else {
                ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, sortable.allowDrop);
            }

            //wrap the template binding
            ko.bindingHandlers.template.init(element, function() { return templateOptions; }, allBindingsAccessor, data, context);

            //keep a reference to start/update functions that might have been passed in
            startActual = sortable.options.start;
            updateActual = sortable.options.update;

            //ensure draggable table row cells maintain their width while dragging (unless a helper is provided)
            if ( !sortable.options.helper ) {
                sortable.options.helper = function(e, ui) {
                    if (ui.is("tr")) {
                        ui.children().each(function() {
                            $(this).width($(this).width());
                        });
                    }
                    return ui;
                };
            }

            //initialize sortable binding after template binding has rendered in update function
            var createTimeout = setTimeout(function() {
                var dragItem;
                var originalReceive = sortable.options.receive;

                $element.sortable(ko.utils.extend(sortable.options, {
                    start: function(event, ui) {
                        //track original index
                        var el = ui.item[0];
                        dataSet(el, INDEXKEY, ko.utils.arrayIndexOf(ui.item.parent().children(), el));

                        //make sure that fields have a chance to update model
                        ui.item.find("input:focus").change();
                        if (startActual) {
                            startActual.apply(this, arguments);
                        }
                    },
                    receive: function(event, ui) {
                        //optionally apply an existing receive handler
                        if (typeof originalReceive === "function") {
                            originalReceive.call(this, event, ui);
                        }

                        dragItem = dataGet(ui.item[0], DRAGKEY);
                        if (dragItem) {
                            //copy the model item, if a clone option is provided
                            if (dragItem.clone) {
                                dragItem = dragItem.clone();
                            }

                            //configure a handler to potentially manipulate item before drop
                            if (sortable.dragged) {
                                dragItem = sortable.dragged.call(this, dragItem, event, ui) || dragItem;
                            }
                        }
                    },
                    update: function(event, ui) {
                        var sourceParent, targetParent, sourceIndex, targetIndex, arg,
                            el = ui.item[0],
                            parentEl = ui.item.parent()[0],
                            item = dataGet(el, ITEMKEY) || dragItem;

                        if (!item) {
                            $(el).remove();
                        }
                        dragItem = null;

                        //make sure that moves only run once, as update fires on multiple containers
                        if (item && (this === parentEl) || (!hasNestedSortableFix && $.contains(this, parentEl))) {
                            //identify parents
                            sourceParent = dataGet(el, PARENTKEY);
                            sourceIndex = dataGet(el, INDEXKEY);
                            targetParent = dataGet(el.parentNode, LISTKEY);
                            targetIndex = ko.utils.arrayIndexOf(ui.item.parent().children(), el);

                            //take destroyed items into consideration
                            if (!templateOptions.includeDestroyed) {
                                sourceIndex = updateIndexFromDestroyedItems(sourceIndex, sourceParent);
                                targetIndex = updateIndexFromDestroyedItems(targetIndex, targetParent);
                            }

                            //build up args for the callbacks
                            if (sortable.beforeMove || sortable.afterMove) {
                                arg = {
                                    item: item,
                                    sourceParent: sourceParent,
                                    sourceParentNode: sourceParent && ui.sender || el.parentNode,
                                    sourceIndex: sourceIndex,
                                    targetParent: targetParent,
                                    targetIndex: targetIndex,
                                    cancelDrop: false
                                };

                                //execute the configured callback prior to actually moving items
                                if (sortable.beforeMove) {
                                    sortable.beforeMove.call(this, arg, event, ui);
                                }
                            }

                            //call cancel on the correct list, so KO can take care of DOM manipulation
                            if (sourceParent) {
                                $(sourceParent === targetParent ? this : ui.sender || this).sortable("cancel");
                            }
                            //for a draggable item just remove the element
                            else {
                                $(el).remove();
                            }

                            //if beforeMove told us to cancel, then we are done
                            if (arg && arg.cancelDrop) {
                                return;
                            }

                            //if the strategy option is unset or false, employ the order strategy involving removal and insertion of items
                            if (!sortable.hasOwnProperty("strategyMove") || sortable.strategyMove === false) {
                                //do the actual move
                                if (targetIndex >= 0) {
                                    if (sourceParent) {
                                        sourceParent.splice(sourceIndex, 1);

                                        //if using deferred updates plugin, force updates
                                        if (ko.processAllDeferredBindingUpdates) {
                                            ko.processAllDeferredBindingUpdates();
                                        }

                                        //if using deferred updates on knockout 3.4, force updates
                                        if (ko.options && ko.options.deferUpdates) {
                                            ko.tasks.runEarly();
                                        }
                                    }

                                    targetParent.splice(targetIndex, 0, item);
                                }

                                //rendering is handled by manipulating the observableArray; ignore dropped element
                                dataSet(el, ITEMKEY, null);
                            }
                            else { //employ the strategy of moving items
                                if (targetIndex >= 0) {
                                    if (sourceParent) {
                                        if (sourceParent !== targetParent) {
                                            // moving from one list to another

                                            sourceParent.splice(sourceIndex, 1);
                                            targetParent.splice(targetIndex, 0, item);

                                            //rendering is handled by manipulating the observableArray; ignore dropped element
                                            dataSet(el, ITEMKEY, null);
                                            ui.item.remove();
                                        }
                                        else {
                                            // moving within same list
                                            var underlyingList = unwrap(sourceParent);

                                            // notify 'beforeChange' subscribers
                                            if (sourceParent.valueWillMutate) {
                                                sourceParent.valueWillMutate();
                                            }

                                            // move from source index ...
                                            underlyingList.splice(sourceIndex, 1);
                                            // ... to target index
                                            underlyingList.splice(targetIndex, 0, item);

                                            // notify subscribers
                                            if (sourceParent.valueHasMutated) {
                                                sourceParent.valueHasMutated();
                                            }
                                        }
                                    }
                                    else {
                                        // drop new element from outside
                                        targetParent.splice(targetIndex, 0, item);

                                        //rendering is handled by manipulating the observableArray; ignore dropped element
                                        dataSet(el, ITEMKEY, null);
                                        ui.item.remove();
                                    }
                                }
                            }

                            //if using deferred updates plugin, force updates
                            if (ko.processAllDeferredBindingUpdates) {
                                ko.processAllDeferredBindingUpdates();
                            }

                            //allow binding to accept a function to execute after moving the item
                            if (sortable.afterMove) {
                                sortable.afterMove.call(this, arg, event, ui);
                            }
                        }

                        if (updateActual) {
                            updateActual.apply(this, arguments);
                        }
                    },
                    connectWith: sortable.connectClass ? "." + sortable.connectClass : false
                }));

                //handle enabling/disabling sorting
                if (sortable.isEnabled !== undefined) {
                    ko.computed({
                        read: function() {
                            $element.sortable(unwrap(sortable.isEnabled) ? "enable" : "disable");
                        },
                        disposeWhenNodeIsRemoved: element
                    });
                }
            }, 0);

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                //only call destroy if sortable has been created
                if ($element.data("ui-sortable") || $element.data("sortable")) {
                    $element.sortable("destroy");
                }

                ko.utils.toggleDomNodeCssClass(element, sortable.connectClass, false);

                //do not create the sortable if the element has been removed from DOM
                clearTimeout(createTimeout);
            });

            return { 'controlsDescendantBindings': true };
        },
        update: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var templateOptions = prepareTemplateOptions(valueAccessor, "foreach");

            //attach meta-data
            dataSet(element, LISTKEY, templateOptions.foreach);

            //call template binding's update with correct options
            ko.bindingHandlers.template.update(element, function() { return templateOptions; }, allBindingsAccessor, data, context);
        },
        connectClass: 'ko_container',
        allowDrop: true,
        afterMove: null,
        beforeMove: null,
        options: {}
    };

    //create a draggable that is appropriate for dropping into a sortable
    ko.bindingHandlers.draggable = {
        init: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var value = unwrap(valueAccessor()) || {},
                options = value.options || {},
                draggableOptions = ko.utils.extend({}, ko.bindingHandlers.draggable.options),
                templateOptions = prepareTemplateOptions(valueAccessor, "data"),
                connectClass = value.connectClass || ko.bindingHandlers.draggable.connectClass,
                isEnabled = value.isEnabled !== undefined ? value.isEnabled : ko.bindingHandlers.draggable.isEnabled;

            value = "data" in value ? value.data : value;

            //set meta-data
            dataSet(element, DRAGKEY, value);

            //override global options with override options passed in
            ko.utils.extend(draggableOptions, options);

            //setup connection to a sortable
            draggableOptions.connectToSortable = connectClass ? "." + connectClass : false;

            //initialize draggable
            $(element).draggable(draggableOptions);

            //handle enabling/disabling sorting
            if (isEnabled !== undefined) {
                ko.computed({
                    read: function() {
                        $(element).draggable(unwrap(isEnabled) ? "enable" : "disable");
                    },
                    disposeWhenNodeIsRemoved: element
                });
            }

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).draggable("destroy");
            });

            return ko.bindingHandlers.template.init(element, function() { return templateOptions; }, allBindingsAccessor, data, context);
        },
        update: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var templateOptions = prepareTemplateOptions(valueAccessor, "data");

            return ko.bindingHandlers.template.update(element, function() { return templateOptions; }, allBindingsAccessor, data, context);
        },
        connectClass: ko.bindingHandlers.sortable.connectClass,
        options: {
            helper: "clone"
        }
    };

    // Simple Droppable Implementation
    // binding that updates (function or observable)
    ko.bindingHandlers.droppable = {
        init: function(element, valueAccessor, allBindingsAccessor, data, context) {
            var value = unwrap(valueAccessor()) || {},
                options = value.options || {},
                droppableOptions = ko.utils.extend({}, ko.bindingHandlers.droppable.options),
                isEnabled = value.isEnabled !== undefined ? value.isEnabled : ko.bindingHandlers.droppable.isEnabled;

            //override global options with override options passed in
            ko.utils.extend(droppableOptions, options);

            //get reference to drop method
            value = "data" in value ? value.data : valueAccessor();

            //set drop method
            droppableOptions.drop = function(event, ui) {
                var droppedItem = dataGet(ui.draggable[0], DRAGKEY) || dataGet(ui.draggable[0], ITEMKEY);
                value(droppedItem);
            };

            //initialize droppable
            $(element).droppable(droppableOptions);

            //handle enabling/disabling droppable
            if (isEnabled !== undefined) {
                ko.computed({
                    read: function() {
                        $(element).droppable(unwrap(isEnabled) ? "enable": "disable");
                    },
                    disposeWhenNodeIsRemoved: element
                });
            }

            //handle disposal
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                $(element).droppable("destroy");
            });
        },
        options: {
            accept: "*"
        }
    };
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],12:[function(require,module,exports){
(function (global){
/*! ko-reactor v1.4.0
 * The MIT License (MIT)
 * Copyright (c) 2018 Ziad Jeeroburkhan */
!function(e){"function"==typeof require&&"object"==typeof exports&&"object"==typeof module?e((typeof window !== "undefined" ? window['ko'] : typeof global !== "undefined" ? global['ko'] : null)):"function"==typeof define&&define.amd?define(["knockout"],e):e(window.ko)}(function(e){e.subscribable.fn.watch=function(t,a,n,r){var o=typeof t;return"boolean"===o||"undefined"===o?e.watch(this,{enabled:!1!==t}):"function"!==o||e.isSubscribable(t)?e.watch(t,a,n,r||this):e.watch(this,a||{},t,r||this),this},e.watch=function(t,a,n,r){function o(c,u,f,s,b,h){if(c&&0!==a.depth&&(-1===a.depth||f.length<(a.depth||1))){if(a.watchedOnly&&!c.watchable&&c!=t)return;if(!1!==a.enabled&&!0!==a.enabled||(c.watchable=a.enabled),!1===c.watchable)return;!0===a.seal&&(c.watchable=!1);var d=typeof c;if("object"===d||"function"===d){if(c._watcher===r)return;if(a.hide&&e.utils.arrayIndexOf(a.hide,c)>-1)return;var p=[].concat(f,u&&u!==t?u:[]);if("function"!==d){if("[object Object]"===Object.prototype.toString.call(c))e.utils.objectForEach(c,function(t,n){if(n=a.getter?a.getter.call(r,p,c,t):n){if(a.wrap){var i=Object.prototype.toString.call(n);"[object Function]"!==i&&"[object Object]"!==i&&(a.beforeWrap&&!1===a.beforeWrap.call(r,p,c,n)||(n=c[t]="[object Array]"===i?e.observableArray(n):e.observable(n)))}a.unloop&&(n._watcher=s?void 0:r);var l=o(n,b?null:c,p,s,null,t);a.tagFields&&void 0===n._fieldName&&(l||"parentsOnly"!==a.tagFields&&"function"==typeof n||"object"==typeof n)&&(n._fieldName=t)}});else if(!0!==a.hideArrays)for(var y=0;y<c.length;y++)o(c[y],b?null:c,p,s);return!0}if("function"==typeof c.notifySubscribers&&n){if(!0===a.enabled&&!1===c.watchable)return;if(s||!a.beforeWatch||!1!==a.beforeWatch.call(r,p,c,h)){var v="function"==typeof c.pop;if(s?i(c):l(c,v,p,b),v)return o(c(),b?null:c,p,s,!0),!0;if(!0!==a.hideWrappedValues)return o(c(),b?null:c,p,s,!0)}}}}}function i(e){var t=e[c];if(!t)throw"Subscriptions field (."+c+") not defined for observable child "+(e._fieldName||"");if(t.change)for(n=t.change.length-1;n>=0;n--)t.change[n]._watcher===r&&t.change[n].dispose();if(t.beforeChange&&(a.mutable||a.oldValues>0))for(n=t.beforeChange.length-1;n>=0;n--)t.beforeChange[n]._watcher===r&&t.beforeChange[n].dispose();if(t.arrayChange)for(var n=t.arrayChange.length-1;n>=0;n--)t.arrayChange[n]._watcher===r&&t.arrayChange[n].dispose()}function l(t,i,l,c){i?t.subscribe(function(i){var u;!1===a.splitArrayChanges&&void 0!==(u=n.call(r,l,t,i))&&r(u),e.utils.arrayForEach(i,function(e){if(!1!==a.splitArrayChanges){var i=n.call(r,l,t,e);void 0!==i&&r(i)}e.moved||(!1===a.async?o(e.value,c?null:t,l,"deleted"===e.status):setTimeout(function(){o(e.value,c?null:t,l,"deleted"===e.status)}))})},void 0,"arrayChange")._watcher=r:(t.subscribe(function(){if(!1!==t.watchable){var e=n.call(r,l,t);void 0!==e&&r(e),a.mutable&&"object"==typeof t()&&(!1===a.async?o(t(),c?null:t,l,!1,!0):setTimeout(function(){o(t(),c?null:t,l,!1,!0)}))}},null,"change")._watcher=r,(a.oldValues>0||a.mutable)&&(t.subscribe(function(e){if(a.oldValues>0){var n=t.oldValues?t.oldValues:t.oldValues=[];for(n.unshift(e);n.length>a.oldValues;)n.pop()}a.mutable&&"object"==typeof e&&o(e,c?null:t,l,!0,!0)},null,"beforeChange")._watcher=r))}"function"==typeof a&&(r=r||n,n=a,a={}),r=r||this;var c;switch("function"==typeof e.subscription||e.version){case!0:c="_subscriptions";break;case"3.0.0":c="F";break;case"3.1.0":c="H";break;case"3.2.0":c="M";break;case"3.3.0":c="G";break;case"3.4.0":case"3.4.1":c="K";break;case"3.4.2":c="F";break;case"3.5.0-beta":c="S";break;default:throw"Unsupported Knockout version. Only v3.0.0 to v3.5.0-beta are supported when minified. Current version is "+e.version}return"function"!=typeof t||e.isSubscribable(t)?(o(t,null,[]),{dispose:function(){o(t,null,[],!0)}}):e.computed(t,n,a)}});window.foo = "1.4.0";
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],13:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(findIndexFunc) {
  return function(collection, predicate, fromIndex) {
    var iterable = Object(collection);
    if (!isArrayLike(collection)) {
      var iteratee = baseIteratee(predicate, 3);
      collection = keys(collection);
      predicate = function(key) { return iteratee(iterable[key], key, iterable); };
    }
    var index = findIndexFunc(collection, predicate, fromIndex);
    return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.find(users, function(o) { return o.age < 40; });
 * // => object for 'barney'
 *
 * // The `_.matches` iteratee shorthand.
 * _.find(users, { 'age': 1, 'active': true });
 * // => object for 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.find(users, ['active', false]);
 * // => object for 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.find(users, 'active');
 * // => object for 'barney'
 */
var find = createFind(findIndex);

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = find;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],15:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return basePickBy(object, props, function(value, key) {
    return key in object;
  });
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property identifiers to pick from.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, props, predicate) {
  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index],
        value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Creates an array of the own and inherited enumerable symbol properties
 * of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable string keyed properties of `object` that are
 * not omitted.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property identifiers to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = baseRest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), toKey);
  return basePick(object, baseDifference(getAllKeysIn(object), props));
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = omit;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(require,module,exports){
module.exports = {
    lex  : require('./lib/lexer'),
    parse: require('./lib/parser'),
    stringify: require('./lib/stringify')
};

},{"./lib/lexer":18,"./lib/parser":19,"./lib/stringify":20}],17:[function(require,module,exports){
(function (process){
exports = module.exports = debug;

function debug(label) {
  return _debug.bind(null, label);
}

function _debug(label) {
  var args = [].slice.call(arguments, 1);
  args.unshift('[' + label + ']');
  process.stderr.write(args.join(' ') + '\n');
}
}).call(this,require('_process'))

},{"_process":21}],18:[function(require,module,exports){
var DEBUG = false; // `true` to print debugging info.
var TIMER = false; // `true` to time calls to `lex()` and print the results.

var debug = require('./debug')('lex');

exports = module.exports = lex;

/**
 * Convert a CSS string into an array of lexical tokens.
 *
 * @param {String} css CSS
 * @returns {Array} lexical tokens
 */
function lex(css) {
  var start; // Debug timer start.

  var buffer = '';      // Character accumulator
  var ch;               // Current character
  var column = 0;       // Current source column number
  var cursor = -1;      // Current source cursor position
  var depth = 0;        // Current nesting depth
  var line = 1;         // Current source line number
  var state = 'before-selector'; // Current state
  var stack = [state];  // State stack
  var token = {};       // Current token
  var tokens = [];      // Token accumulator

  // Supported @-rules, in roughly descending order of usage probability.
  var atRules = [
    'media',
    'keyframes',
    { name: '-webkit-keyframes', type: 'keyframes', prefix: '-webkit-' },
    { name: '-moz-keyframes', type: 'keyframes', prefix: '-moz-' },
    { name: '-ms-keyframes', type: 'keyframes', prefix: '-ms-' },
    { name: '-o-keyframes', type: 'keyframes', prefix: '-o-' },
    'font-face',
    { name: 'import', state: 'before-at-value' },
    { name: 'charset', state: 'before-at-value' },
    'supports',
    'viewport',
    { name: 'namespace', state: 'before-at-value' },
    'document',
    { name: '-moz-document', type: 'document', prefix: '-moz-' },
    'page'
  ];

  // -- Functions ------------------------------------------------------------

  /**
   * Advance the character cursor and return the next character.
   *
   * @returns {String} The next character.
   */
  function getCh() {
    skip();
    return css[cursor];
  }

  /**
   * Return the state at the given index in the stack.
   * The stack is LIFO so indexing is from the right.
   *
   * @param {Number} [index=0] Index to return.
   * @returns {String} state
   */
  function getState(index) {
    return index ? stack[stack.length - 1 - index] : state;
  }

  /**
   * Look ahead for a string beginning from the next position. The string
   * being looked for must start at the next position.
   *
   * @param {String} str The string to look for.
   * @returns {Boolean} Whether the string was found.
   */
  function isNextString(str) {
    var start = cursor + 1;
    return (str === css.slice(start, start + str.length));
  }

  /**
   * Find the start position of a substring beginning from the next
   * position. The string being looked for may begin anywhere.
   *
   * @param {String} str The substring to look for.
   * @returns {Number|false} The position, or `false` if not found.
   */
  function find(str) {
    var pos = css.slice(cursor).indexOf(str);

    return pos > 0 ? pos : false;
  }

  /**
   * Determine whether a character is next.
   *
   * @param {String} ch Character.
   * @returns {Boolean} Whether the character is next.
   */
  function isNextChar(ch) {
    return ch === peek(1);
  }

  /**
   * Return the character at the given cursor offset. The offset is relative
   * to the cursor, so negative values move backwards.
   *
   * @param {Number} [offset=1] Cursor offset.
   * @returns {String} Character.
   */
  function peek(offset) {
    return css[cursor + (offset || 1)];
  }

  /**
   * Remove the current state from the stack and set the new current state.
   *
   * @returns {String} The removed state.
   */
  function popState() {
    var removed = stack.pop();
    state = stack[stack.length - 1];

    return removed;
  }

  /**
   * Set the current state and add it to the stack.
   *
   * @param {String} newState The new state.
   * @returns {Number} The new stack length.
   */
  function pushState(newState) {
    state = newState;
    stack.push(state);

    return stack.length;
  }

  /**
   * Replace the current state with a new state.
   *
   * @param {String} newState The new state.
   * @returns {String} The replaced state.
   */
  function replaceState(newState) {
    var previousState = state;
    stack[stack.length - 1] = state = newState;

    return previousState;
  }

  /**
   * Move the character cursor. Positive numbers move the cursor forward.
   * Negative numbers are not supported!
   *
   * @param {Number} [n=1] Number of characters to skip.
   */
  function skip(n) {
    if ((n || 1) == 1) {
      if (css[cursor] == '\n') {
        line++;
        column = 1;
      } else {
        column++;
      }
      cursor++;
    } else {
      var skipStr = css.slice(cursor, cursor + n).split('\n');
      if (skipStr.length > 1) {
        line += skipStr.length - 1;
        column = 1;
      }
      column += skipStr[skipStr.length - 1].length;
      cursor = cursor + n;
    }
  }

  /**
   * Add the current token to the pile and reset the buffer.
   */
  function addToken() {
    token.end = {
      line: line,
      col: column
    };

    DEBUG && debug('addToken:', JSON.stringify(token, null, 2));

    tokens.push(token);

    buffer = '';
    token = {};
  }

  /**
   * Set the current token.
   *
   * @param {String} type Token type.
   */
  function initializeToken(type) {
    token = {
      type: type,
      start: {
        line: line,
        col : column
      }
    };
  }

  // -- Main Loop ------------------------------------------------------------

  /*
  The main loop is a state machine that reads in one character at a time,
  and determines what to do based on the current state and character.
  This is implemented as a series of nested `switch` statements and the
  case orders have been mildly optimized based on rough probabilities
  calculated by processing a small sample of real-world CSS.

  Further optimization (such as a dispatch table) shouldn't be necessary
  since the total number of cases is very low.
  */

  TIMER && (start = Date.now());

  while (ch = getCh()) {
    DEBUG && debug(ch, getState());

    // column += 1;

    switch (ch) {
    // Space
    case ' ':
      switch (getState()) {
      case 'selector':
      case 'value':
      case 'value-paren':
      case 'at-group':
      case 'at-value':
      case 'comment':
      case 'double-string':
      case 'single-string':
        buffer += ch;
        break;
      }
      break;

    // Newline or tab
    case '\n':
    case '\t':
    case '\r':
    case '\f':
      switch (getState()) {
      case 'value':
      case 'value-paren':
      case 'at-group':
      case 'comment':
      case 'single-string':
      case 'double-string':
      case 'selector':
        buffer += ch;
        break;

      case 'at-value':
        // Tokenize an @-rule if a semi-colon was omitted.
        if ('\n' === ch) {
          token.value = buffer.trim();
          addToken();
          popState();
        }
        break;
      }

      // if ('\n' === ch) {
      //   column = 0;
      //   line += 1;
      // }
      break;

    case ':':
      switch (getState()) {
      case 'name':
        token.name = buffer.trim();
        buffer = '';

        replaceState('before-value');
        break;

      case 'before-selector':
        buffer += ch;

        initializeToken('selector');
        pushState('selector');
        break;

      case 'before-value':
        replaceState('value');
        buffer += ch;
        break;

      default:
        buffer += ch;
        break;
      }
      break;

    case ';':
      switch (getState()) {
      case 'name':
      case 'before-value':
      case 'value':
        // Tokenize a declaration
        // if value is empty skip the declaration
        if (buffer.trim().length > 0) {
          token.value = buffer.trim(),
          addToken();
        }
        replaceState('before-name');
        break;

      case 'value-paren':
        // Insignificant semi-colon
        buffer += ch;
        break;

      case 'at-value':
        // Tokenize an @-rule
        token.value = buffer.trim();
        addToken();
        popState();
        break;

      case 'before-name':
        // Extraneous semi-colon
        break;

      default:
        buffer += ch;
        break;
      }
      break;

    case '{':
      switch (getState()) {
      case 'selector':
        // If the sequence is `\{` then assume that the brace should be escaped.
        if (peek(-1) === '\\') {
            buffer += ch;
            break;
        }

        // Tokenize a selector
        token.text = buffer.trim();
        addToken();
        replaceState('before-name');
        depth = depth + 1;
        break;

      case 'at-group':
        // Tokenize an @-group
        token.name = buffer.trim();

        // XXX: @-rules are starting to get hairy
        switch (token.type) {
        case 'font-face':
        case 'viewport' :
        case 'page'     :
          pushState('before-name');
          break;

        default:
          pushState('before-selector');
        }

        addToken();
        depth = depth + 1;
        break;

      case 'name':
      case 'at-rule':
        // Tokenize a declaration or an @-rule
        token.name = buffer.trim();
        addToken();
        pushState('before-name');
        depth = depth + 1;
        break;

      case 'comment':
      case 'double-string':
      case 'single-string':
        // Ignore braces in comments and strings
        buffer += ch;
        break;
      case 'before-value':
        replaceState('value');
        buffer += ch;
        break;
      }

      break;

    case '}':
      switch (getState()) {
      case 'before-name':
      case 'name':
      case 'before-value':
      case 'value':
        // If the buffer contains anything, it is a value
        if (buffer) {
          token.value = buffer.trim();
        }

        // If the current token has a name and a value it should be tokenized.
        if (token.name && token.value) {
          addToken();
        }

        // Leave the block
        initializeToken('end');
        addToken();
        popState();

        // We might need to leave again.
        // XXX: What about 3 levels deep?
        if ('at-group' === getState()) {
          initializeToken('at-group-end');
          addToken();
          popState();
        }
        
        if (depth > 0) {
          depth = depth - 1;
        }

        break;

      case 'at-group':
      case 'before-selector':
      case 'selector':
        // If the sequence is `\}` then assume that the brace should be escaped.
        if (peek(-1) === '\\') {
            buffer += ch;
            break;
        }

        if (depth > 0) {
          // Leave block if in an at-group
          if ('at-group' === getState(1)) {
            initializeToken('at-group-end');
            addToken();
          }
        }

        if (depth > 1) {
          popState();
        }

        if (depth > 0) {
          depth = depth - 1;
        }
        break;

      case 'double-string':
      case 'single-string':
      case 'comment':
        // Ignore braces in comments and strings.
        buffer += ch;
        break;
      }

      break;

    // Strings
    case '"':
    case "'":
      switch (getState()) {
      case 'double-string':
        if ('"' === ch && '\\' !== peek(-1)) {
          popState();
        }
        break;

      case 'single-string':
        if ("'" === ch && '\\' !== peek(-1)) {
          popState();
        }
        break;

      case 'before-at-value':
        replaceState('at-value');
        pushState('"' === ch ? 'double-string' : 'single-string');
        break;

      case 'before-value':
        replaceState('value');
        pushState('"' === ch ? 'double-string' : 'single-string');
        break;

      case 'comment':
        // Ignore strings within comments.
        break;

      default:
        if ('\\' !== peek(-1)) {
          pushState('"' === ch ? 'double-string' : 'single-string');
        }
      }

      buffer += ch;
      break;

    // Comments
    case '/':
      switch (getState()) {
      case 'comment':
      case 'double-string':
      case 'single-string':
        // Ignore
        buffer += ch;
        break;

      case 'before-value':
      case 'selector':
      case 'name':
      case 'value':
        if (isNextChar('*')) {
          // Ignore comments in selectors, properties and values. They are
          // difficult to represent in the AST.
          var pos = find('*/');

          if (pos) {
            skip(pos + 1);
          }
        } else {
          if (getState() == 'before-value') replaceState('value');
          buffer += ch;
        }
        break;

      default:
        if (isNextChar('*')) {
          // Create a comment token
          initializeToken('comment');
          pushState('comment');
          skip();
        }
        else {
          buffer += ch;
        }
        break;
      }
      break;

    // Comment end or universal selector
    case '*':
      switch (getState()) {
      case 'comment':
        if (isNextChar('/')) {
          // Tokenize a comment
          token.text = buffer; // Don't trim()!
          skip();
          addToken();
          popState();
        }
        else {
          buffer += ch;
        }
        break;

      case 'before-selector':
        buffer += ch;
        initializeToken('selector');
        pushState('selector');
        break;

      case 'before-value':
        replaceState('value');
        buffer += ch;
        break;

      default:
        buffer += ch;
      }
      break;

    // @-rules
    case '@':
      switch (getState()) {
      case 'comment':
      case 'double-string':
      case 'single-string':
        buffer += ch;
        break;
      case 'before-value':
        replaceState('value');
        buffer += ch;
        break;

      default:
        // Iterate over the supported @-rules and attempt to tokenize one.
        var tokenized = false;
        var name;
        var rule;

        for (var j = 0, len = atRules.length; !tokenized && j < len; ++j) {
          rule = atRules[j];
          name = rule.name || rule;

          if (!isNextString(name)) { continue; }

          tokenized = true;

          initializeToken(name);
          pushState(rule.state || 'at-group');
          skip(name.length);

          if (rule.prefix) {
            token.prefix = rule.prefix;
          }

          if (rule.type) {
            token.type = rule.type;
          }
        }

        if (!tokenized) {
          // Keep on truckin' America!
          buffer += ch;
        }
        break;
      }
      break;

    // Parentheses are tracked to disambiguate semi-colons, such as within a
    // data URI.
    case '(':
      switch (getState()) {
      case 'value':
        pushState('value-paren');
        break;
      case 'before-value':
        replaceState('value');
        break;
      }

      buffer += ch;
      break;

    case ')':
      switch (getState()) {
      case 'value-paren':
        popState();
        break;
      case 'before-value':
        replaceState('value');
        break;
      }

      buffer += ch;
      break;

    default:
      switch (getState()) {
      case 'before-selector':
        initializeToken('selector');
        pushState('selector');
        break;

      case 'before-name':
        initializeToken('property');
        replaceState('name');
        break;

      case 'before-value':
        replaceState('value');
        break;

      case 'before-at-value':
        replaceState('at-value');
        break;
      }

      buffer += ch;
      break;
    }
  }

  TIMER && debug('ran in', (Date.now() - start) + 'ms');

  return tokens;
}

},{"./debug":17}],19:[function(require,module,exports){
var DEBUG = false; // `true` to print debugging info.
var TIMER = false; // `true` to time calls to `parse()` and print the results.

var debug = require('./debug')('parse');
var lex = require('./lexer');

exports = module.exports = parse;

var _comments;   // Whether comments are allowed.
var _depth;      // Current block nesting depth.
var _position;   // Whether to include line/column position.
var _tokens;     // Array of lexical tokens.

/**
 * Convert a CSS string or array of lexical tokens into a `stringify`-able AST.
 *
 * @param {String} css CSS string or array of lexical token
 * @param {Object} [options]
 * @param {Boolean} [options.comments=false] allow comment nodes in the AST
 * @returns {Object} `stringify`-able AST
 */
function parse(css, options) {
  var start; // Debug timer start.

  options || (options = {});
  _comments = !!options.comments;
  _position = !!options.position;

  _depth = 0;

  // Operate on a copy of the given tokens, or the lex()'d CSS string.
  _tokens = Array.isArray(css) ? css.slice() : lex(css);

  var rule;
  var rules = [];
  var token;

  TIMER && (start = Date.now());

  while ((token = next())) {
    rule = parseToken(token);
    rule && rules.push(rule);
  }

  TIMER && debug('ran in', (Date.now() - start) + 'ms');

  return {
    type: "stylesheet",
    stylesheet: {
      rules: rules
    }
  };
}

// -- Functions --------------------------------------------------------------

/**
 * Build an AST node from a lexical token.
 *
 * @param {Object} token lexical token
 * @param {Object} [override] object hash of properties that override those
 *   already in the token, or that will be added to the token.
 * @returns {Object} AST node
 */
function astNode(token, override) {
  override || (override = {});

  var key;
  var keys = ['type', 'name', 'value'];
  var node = {};

  // Avoiding [].forEach for performance reasons.
  for (var i = 0; i < keys.length; ++i) {
    key = keys[i];

    if (token[key]) {
      node[key] = override[key] || token[key];
    }
  }

  keys = Object.keys(override);

  for (i = 0; i < keys.length; ++i) {
    key = keys[i];

    if (!node[key]) {
      node[key] = override[key];
    }
  }

  if (_position) {
    node.position = {
      start: token.start,
      end: token.end
    };
  }

  DEBUG && debug('astNode:', JSON.stringify(node, null, 2));

  return node;
}

/**
 * Remove a lexical token from the stack and return the removed token.
 *
 * @returns {Object} lexical token
 */
function next() {
  var token = _tokens.shift();
  DEBUG && debug('next:', JSON.stringify(token, null, 2));
  return token;
}

// -- Parse* Functions ---------------------------------------------------------

/**
 * Convert an @-group lexical token to an AST node.
 *
 * @param {Object} token @-group lexical token
 * @returns {Object} @-group AST node
 */
function parseAtGroup(token) {
  _depth = _depth + 1;

  // As the @-group token is assembled, relevant token values are captured here
  // temporarily. They will later be used as `tokenize()` overrides.
  var overrides = {};

  switch (token.type) {
  case 'font-face':
  case 'viewport' :
    overrides.declarations = parseDeclarations();
    break;

  case 'page':
    overrides.prefix = token.prefix;
    overrides.declarations = parseDeclarations();
    break;

  default:
    overrides.prefix = token.prefix;
    overrides.rules = parseRules();
  }

  return astNode(token, overrides);
}

/**
 * Convert an @import lexical token to an AST node.
 *
 * @param {Object} token @import lexical token
 * @returns {Object} @import AST node
 */
function parseAtImport(token) {
  return astNode(token);
}

/**
 * Convert an @charset token to an AST node.
 *
 * @param {Object} token @charset lexical token
 * @returns {Object} @charset node
 */
function parseCharset(token) {
  return astNode(token);
}

/**
 * Convert a comment token to an AST Node.
 *
 * @param {Object} token comment lexical token
 * @returns {Object} comment node
 */
function parseComment(token) {
  return astNode(token, {text: token.text});
}

function parseNamespace(token) {
  return astNode(token);
}

/**
 * Convert a property lexical token to a property AST node.
 *
 * @returns {Object} property node
 */
function parseProperty(token) {
  return astNode(token);
}

/**
 * Convert a selector lexical token to a selector AST node.
 *
 * @param {Object} token selector lexical token
 * @returns {Object} selector node
 */
function parseSelector(token) {
  function trim(str) {
    return str.trim();
  }

  return astNode(token, {
    type: 'rule',
    selectors: token.text.split(',').map(trim),
    declarations: parseDeclarations(token)
  });
}

/**
 * Convert a lexical token to an AST node.
 *
 * @returns {Object|undefined} AST node
 */
function parseToken(token) {
  switch (token.type) {
  // Cases are listed in roughly descending order of probability.
  case 'property': return parseProperty(token);

  case 'selector': return parseSelector(token);

  case 'at-group-end': _depth = _depth - 1; return;

  case 'media'     :
  case 'keyframes' :return parseAtGroup(token);

  case 'comment': if (_comments) { return parseComment(token); } break;

  case 'charset': return parseCharset(token);
  case 'import': return parseAtImport(token);

  case 'namespace': return parseNamespace(token);

  case 'font-face':
  case 'supports' :
  case 'viewport' :
  case 'document' :
  case 'page'     : return parseAtGroup(token);
  }

  DEBUG && debug('parseToken: unexpected token:', JSON.stringify(token));
}

// -- Parse Helper Functions ---------------------------------------------------

/**
 * Iteratively parses lexical tokens from the stack into AST nodes until a
 * conditional function returns `false`, at which point iteration terminates
 * and any AST nodes collected are returned.
 *
 * @param {Function} conditionFn
 *   @param {Object} token the lexical token being parsed
 *   @returns {Boolean} `true` if the token should be parsed, `false` otherwise
 * @return {Array} AST nodes
 */
function parseTokensWhile(conditionFn) {
  var node;
  var nodes = [];
  var token;

  while ((token = next()) && (conditionFn && conditionFn(token))) {
    node = parseToken(token);
    node && nodes.push(node);
  }

  // Place an unused non-`end` lexical token back onto the stack.
  if (token && token.type !== 'end') {
    _tokens.unshift(token);
  }

  return nodes;
}

/**
 * Convert a series of tokens into a sequence of declaration AST nodes.
 *
 * @returns {Array} declaration nodes
 */
function parseDeclarations() {
  return parseTokensWhile(function (token) {
    return (token.type === 'property' || token.type === 'comment');
  });
}

/**
 * Convert a series of tokens into a sequence of rule nodes.
 *
 * @returns {Array} rule nodes
 */
function parseRules() {
  return parseTokensWhile(function () { return _depth; });
}

},{"./debug":17,"./lexer":18}],20:[function(require,module,exports){
var DEBUG = false; // `true` to print debugging info.
var TIMER = false; // `true` to time calls to `stringify()` and print the results.

var debug = require('./debug')('stringify');

var _comments;      // Whether comments are allowed in the stringified CSS.
var _compress;      // Whether the stringified CSS should be compressed.
var _indentation;   // Indentation option value.
var _n;             // Compression-aware newline character.
var _s;             // Compression-aware space character.

exports = module.exports = stringify;

/**
 * Convert a `stringify`-able AST into a CSS string.
 *
 * @param {Object} `stringify`-able AST
 * @param {Object} [options]
 * @param {Boolean} [options.comments=false] allow comments in the CSS
 * @param {Boolean} [options.compress=false] compress whitespace
 * @param {String} [options.indentation=''] indentation sequence
 * @returns {String} CSS
 */
function stringify(ast, options) {
  var start; // Debug timer start.

  options || (options = {});
  _indentation = options.indentation || '';
  _compress = !!options.compress;
  _comments = !!options.comments;

  if (_compress) {
    _n = _s = '';
  } else {
    _n = '\n';
    _s = ' ';
  }

  TIMER && (start = Date.now());

  var css = reduce(ast.stylesheet.rules, stringifyNode).join('\n').trim();

  TIMER && debug('ran in', (Date.now() - start) + 'ms');

  return css;
}

// -- Functions --------------------------------------------------------------

/**
 * Modify the indentation level, or return a compression-aware sequence of
 * spaces equal to the current indentation level.
 *
 * @param {Number} [level=undefined] indentation level modifier
 * @returns {String} sequence of spaces
 */
function indent(level) {
  this.level || (this.level = 1);

  if (level) {
    this.level += level;
    return;
  }

  if (_compress) { return ''; }

  return Array(this.level).join(_indentation || '');
}

// -- Stringify Functions ------------------------------------------------------

/**
 * Stringify an @-rule AST node.
 *
 * Use `stringifyAtGroup()` when dealing with @-groups that may contain blocks
 * such as @media.
 *
 * @param {String} type @-rule type. E.g., import, charset
 * @returns {String} Stringified @-rule
 */
function stringifyAtRule(node) {
  return '@' + node.type + ' ' + node.value + ';' + _n;
}

/**
 * Stringify an @-group AST node.
 *
 * Use `stringifyAtRule()` when dealing with @-rules that may not contain blocks
 * such as @import.
 *
 * @param {Object} node @-group AST node
 * @returns {String}
 */
function stringifyAtGroup(node) {
  var label = '';
  var prefix = node.prefix || '';

  if (node.name) {
    label = ' ' + node.name;
  }

  // FIXME: @-rule conditional logic is leaking everywhere.
  var chomp = node.type !== 'page';

  return '@' + prefix + node.type + label + _s + stringifyBlock(node, chomp) + _n;
}

/**
 * Stringify a comment AST node.
 *
 * @param {Object} node comment AST node
 * @returns {String}
 */
function stringifyComment(node) {
  if (!_comments) { return ''; }

  return '/*' + (node.text || '') + '*/' + _n;
}

/**
 * Stringify a rule AST node.
 *
 * @param {Object} node rule AST node
 * @returns {String}
 */
function stringifyRule(node) {
  var label;

  if (node.selectors) {
    label = node.selectors.join(',' + _n);
  } else {
    label = '@' + node.type;
    label += node.name ? ' ' + node.name : '';
  }

  return indent() + label + _s + stringifyBlock(node) + _n;
}


// -- Stringify Helper Functions -----------------------------------------------

/**
 * Reduce an array by applying a function to each item and retaining the truthy
 * results.
 *
 * When `item.type` is `'comment'` `stringifyComment` will be applied instead.
 *
 * @param {Array} items array to reduce
 * @param {Function} fn function to call for each item in the array
 *   @returns {Mixed} Truthy values will be retained, falsy values omitted
 * @returns {Array} retained results
 */
function reduce(items, fn) {
  return items.reduce(function (results, item) {
    var result = (item.type === 'comment') ? stringifyComment(item) : fn(item);
    result && results.push(result);
    return results;
  }, []);
}

/**
 * Stringify an AST node with the assumption that it represents a block of
 * declarations or other @-group contents.
 *
 * @param {Object} node AST node
 * @returns {String}
 */
// FIXME: chomp should not be a magic boolean parameter
function stringifyBlock(node, chomp) {
  var children = node.declarations;
  var fn = stringifyDeclaration;

  if (node.rules) {
    children = node.rules;
    fn = stringifyRule;
  }

  children = stringifyChildren(children, fn);
  children && (children = _n + children + (chomp ? '' : _n));

  return '{' + children + indent() + '}';
}

/**
 * Stringify an array of child AST nodes by calling the given stringify function
 * once for each child, and concatenating the results.
 *
 * @param {Array} children `node.rules` or `node.declarations`
 * @param {Function} fn stringify function
 * @returns {String}
 */
function stringifyChildren(children, fn) {
  if (!children) { return ''; }

  indent(1);
  var results = reduce(children, fn);
  indent(-1);

  if (!results.length) { return ''; }

  return results.join(_n);
}

/**
 * Stringify a declaration AST node.
 *
 * @param {Object} node declaration AST node
 * @returns {String}
 */
function stringifyDeclaration(node) {
  if (node.type === 'property') {
    return stringifyProperty(node);
  }

  DEBUG && debug('stringifyDeclaration: unexpected node:', JSON.stringify(node));
}

/**
 * Stringify an AST node.
 *
 * @param {Object} node AST node
 * @returns {String}
 */
function stringifyNode(node) {
  switch (node.type) {
  // Cases are listed in roughly descending order of probability.
  case 'rule': return stringifyRule(node);

  case 'media'    :
  case 'keyframes': return stringifyAtGroup(node);

  case 'comment': return stringifyComment(node);

  case 'import'   :
  case 'charset'  :
  case 'namespace': return stringifyAtRule(node);

  case 'font-face':
  case 'supports' :
  case 'viewport' :
  case 'document' :
  case 'page'     : return stringifyAtGroup(node);
  }

  DEBUG && debug('stringifyNode: unexpected node: ' + JSON.stringify(node));
}

/**
 * Stringify an AST property node.
 *
 * @param {Object} node AST property node
 * @returns {String}
 */
function stringifyProperty(node) {
  var name = node.name ? node.name + ':' + _s : '';

  return indent() + name + node.value + ';';
}

},{"./debug":17}],21:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],22:[function(require,module,exports){
(function (global){
/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],23:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],25:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":23,"./encode":24}],26:[function(require,module,exports){
/*
Slick Parser
 - originally created by the almighty Thomas Aylott <@subtlegradient> (http://subtlegradient.com)
*/"use strict"

// Notable changes from Slick.Parser 1.0.x

// The parser now uses 2 classes: Expressions and Expression
// `new Expressions` produces an array-like object containing a list of Expression objects
// - Expressions::toString() produces a cleaned up expressions string
// `new Expression` produces an array-like object
// - Expression::toString() produces a cleaned up expression string
// The only exposed method is parse, which produces a (cached) `new Expressions` instance
// parsed.raw is no longer present, use .toString()
// parsed.expression is now useless, just use the indices
// parsed.reverse() has been removed for now, due to its apparent uselessness
// Other changes in the Expressions object:
// - classNames are now unique, and save both escaped and unescaped values
// - attributes now save both escaped and unescaped values
// - pseudos now save both escaped and unescaped values

var escapeRe   = /([-.*+?^${}()|[\]\/\\])/g,
    unescapeRe = /\\/g

var escape = function(string){
    // XRegExp v2.0.0-beta-3
    // « https://github.com/slevithan/XRegExp/blob/master/src/xregexp.js
    return (string + "").replace(escapeRe, '\\$1')
}

var unescape = function(string){
    return (string + "").replace(unescapeRe, '')
}

var slickRe = RegExp(
/*
#!/usr/bin/env ruby
puts "\t\t" + DATA.read.gsub(/\(\?x\)|\s+#.*$|\s+|\\$|\\n/,'')
__END__
    "(?x)^(?:\
      \\s* ( , ) \\s*               # Separator          \n\
    | \\s* ( <combinator>+ ) \\s*   # Combinator         \n\
    |      ( \\s+ )                 # CombinatorChildren \n\
    |      ( <unicode>+ | \\* )     # Tag                \n\
    | \\#  ( <unicode>+       )     # ID                 \n\
    | \\.  ( <unicode>+       )     # ClassName          \n\
    |                               # Attribute          \n\
    \\[  \
        \\s* (<unicode1>+)  (?:  \
            \\s* ([*^$!~|]?=)  (?:  \
                \\s* (?:\
                    ([\"']?)(.*?)\\9 \
                )\
            )  \
        )?  \\s*  \
    \\](?!\\]) \n\
    |   :+ ( <unicode>+ )(?:\
    \\( (?:\
        (?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+)\
    ) \\)\
    )?\
    )"
*/
"^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:([\"']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:([\"'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)"
    .replace(/<combinator>/, '[' + escape(">+~`!@$%^&={}\\;</") + ']')
    .replace(/<unicode>/g, '(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
    .replace(/<unicode1>/g, '(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])')
)

// Part

var Part = function Part(combinator){
    this.combinator = combinator || " "
    this.tag = "*"
}

Part.prototype.toString = function(){

    if (!this.raw){

        var xpr = "", k, part

        xpr += this.tag || "*"
        if (this.id) xpr += "#" + this.id
        if (this.classes) xpr += "." + this.classList.join(".")
        if (this.attributes) for (k = 0; part = this.attributes[k++];){
            xpr += "[" + part.name + (part.operator ? part.operator + '"' + part.value + '"' : '') + "]"
        }
        if (this.pseudos) for (k = 0; part = this.pseudos[k++];){
            xpr += ":" + part.name
            if (part.value) xpr += "(" + part.value + ")"
        }

        this.raw = xpr

    }

    return this.raw
}

// Expression

var Expression = function Expression(){
    this.length = 0
}

Expression.prototype.toString = function(){

    if (!this.raw){

        var xpr = ""

        for (var j = 0, bit; bit = this[j++];){
            if (j !== 1) xpr += " "
            if (bit.combinator !== " ") xpr += bit.combinator + " "
            xpr += bit
        }

        this.raw = xpr

    }

    return this.raw
}

var replacer = function(
    rawMatch,

    separator,
    combinator,
    combinatorChildren,

    tagName,
    id,
    className,

    attributeKey,
    attributeOperator,
    attributeQuote,
    attributeValue,

    pseudoMarker,
    pseudoClass,
    pseudoQuote,
    pseudoClassQuotedValue,
    pseudoClassValue
){

    var expression, current

    if (separator || !this.length){
        expression = this[this.length++] = new Expression
        if (separator) return ''
    }

    if (!expression) expression = this[this.length - 1]

    if (combinator || combinatorChildren || !expression.length){
        current = expression[expression.length++] = new Part(combinator)
    }

    if (!current) current = expression[expression.length - 1]

    if (tagName){

        current.tag = unescape(tagName)

    } else if (id){

        current.id = unescape(id)

    } else if (className){

        var unescaped = unescape(className)

        var classes = current.classes || (current.classes = {})
        if (!classes[unescaped]){
            classes[unescaped] = escape(className)
            var classList = current.classList || (current.classList = [])
            classList.push(unescaped)
            classList.sort()
        }

    } else if (pseudoClass){

        pseudoClassValue = pseudoClassValue || pseudoClassQuotedValue

        ;(current.pseudos || (current.pseudos = [])).push({
            type         : pseudoMarker.length == 1 ? 'class' : 'element',
            name         : unescape(pseudoClass),
            escapedName  : escape(pseudoClass),
            value        : pseudoClassValue ? unescape(pseudoClassValue) : null,
            escapedValue : pseudoClassValue ? escape(pseudoClassValue) : null
        })

    } else if (attributeKey){

        attributeValue = attributeValue ? escape(attributeValue) : null

        ;(current.attributes || (current.attributes = [])).push({
            operator     : attributeOperator,
            name         : unescape(attributeKey),
            escapedName  : escape(attributeKey),
            value        : attributeValue ? unescape(attributeValue) : null,
            escapedValue : attributeValue ? escape(attributeValue) : null
        })

    }

    return ''

}

// Expressions

var Expressions = function Expressions(expression){
    this.length = 0

    var self = this

    var original = expression, replaced

    while (expression){
        replaced = expression.replace(slickRe, function(){
            return replacer.apply(self, arguments)
        })
        if (replaced === expression) throw new Error(original + ' is an invalid expression')
        expression = replaced
    }
}

Expressions.prototype.toString = function(){
    if (!this.raw){
        var expressions = []
        for (var i = 0, expression; expression = this[i++];) expressions.push(expression)
        this.raw = expressions.join(", ")
    }

    return this.raw
}

var cache = {}

var parse = function(expression){
    if (expression == null) return null
    expression = ('' + expression).replace(/^\s+|\s+$/g, '')
    return cache[expression] || (cache[expression] = new Expressions(expression))
}

module.exports = parse

},{}],27:[function(require,module,exports){
module.exports = require('./lib/speakingurl');

},{"./lib/speakingurl":28}],28:[function(require,module,exports){
(function (root) {
    'use strict';

    /**
     * charMap
     * @type {Object}
     */
    var charMap = {

        // latin
        'À': 'A',
        'Á': 'A',
        'Â': 'A',
        'Ã': 'A',
        'Ä': 'Ae',
        'Å': 'A',
        'Æ': 'AE',
        'Ç': 'C',
        'È': 'E',
        'É': 'E',
        'Ê': 'E',
        'Ë': 'E',
        'Ì': 'I',
        'Í': 'I',
        'Î': 'I',
        'Ï': 'I',
        'Ð': 'D',
        'Ñ': 'N',
        'Ò': 'O',
        'Ó': 'O',
        'Ô': 'O',
        'Õ': 'O',
        'Ö': 'Oe',
        'Ő': 'O',
        'Ø': 'O',
        'Ù': 'U',
        'Ú': 'U',
        'Û': 'U',
        'Ü': 'Ue',
        'Ű': 'U',
        'Ý': 'Y',
        'Þ': 'TH',
        'ß': 'ss',
        'à': 'a',
        'á': 'a',
        'â': 'a',
        'ã': 'a',
        'ä': 'ae',
        'å': 'a',
        'æ': 'ae',
        'ç': 'c',
        'è': 'e',
        'é': 'e',
        'ê': 'e',
        'ë': 'e',
        'ì': 'i',
        'í': 'i',
        'î': 'i',
        'ï': 'i',
        'ð': 'd',
        'ñ': 'n',
        'ò': 'o',
        'ó': 'o',
        'ô': 'o',
        'õ': 'o',
        'ö': 'oe',
        'ő': 'o',
        'ø': 'o',
        'ù': 'u',
        'ú': 'u',
        'û': 'u',
        'ü': 'ue',
        'ű': 'u',
        'ý': 'y',
        'þ': 'th',
        'ÿ': 'y',
        'ẞ': 'SS',

        // language specific

        // Arabic
        'ا': 'a',
        'أ': 'a',
        'إ': 'i',
        'آ': 'aa',
        'ؤ': 'u',
        'ئ': 'e',
        'ء': 'a',
        'ب': 'b',
        'ت': 't',
        'ث': 'th',
        'ج': 'j',
        'ح': 'h',
        'خ': 'kh',
        'د': 'd',
        'ذ': 'th',
        'ر': 'r',
        'ز': 'z',
        'س': 's',
        'ش': 'sh',
        'ص': 's',
        'ض': 'dh',
        'ط': 't',
        'ظ': 'z',
        'ع': 'a',
        'غ': 'gh',
        'ف': 'f',
        'ق': 'q',
        'ك': 'k',
        'ل': 'l',
        'م': 'm',
        'ن': 'n',
        'ه': 'h',
        'و': 'w',
        'ي': 'y',
        'ى': 'a',
        'ة': 'h',
        'ﻻ': 'la',
        'ﻷ': 'laa',
        'ﻹ': 'lai',
        'ﻵ': 'laa',

        // Persian additional characters than Arabic
        'گ': 'g',
        'چ': 'ch',
        'پ': 'p',
        'ژ': 'zh',
        'ک': 'k',
        'ی': 'y',

        // Arabic diactrics
        'َ': 'a',
        'ً': 'an',
        'ِ': 'e',
        'ٍ': 'en',
        'ُ': 'u',
        'ٌ': 'on',
        'ْ': '',

        // Arabic numbers
        '٠': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',

        // Persian numbers
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',

        // Burmese consonants
        'က': 'k',
        'ခ': 'kh',
        'ဂ': 'g',
        'ဃ': 'ga',
        'င': 'ng',
        'စ': 's',
        'ဆ': 'sa',
        'ဇ': 'z',
        'စျ': 'za',
        'ည': 'ny',
        'ဋ': 't',
        'ဌ': 'ta',
        'ဍ': 'd',
        'ဎ': 'da',
        'ဏ': 'na',
        'တ': 't',
        'ထ': 'ta',
        'ဒ': 'd',
        'ဓ': 'da',
        'န': 'n',
        'ပ': 'p',
        'ဖ': 'pa',
        'ဗ': 'b',
        'ဘ': 'ba',
        'မ': 'm',
        'ယ': 'y',
        'ရ': 'ya',
        'လ': 'l',
        'ဝ': 'w',
        'သ': 'th',
        'ဟ': 'h',
        'ဠ': 'la',
        'အ': 'a',
        // consonant character combos
        'ြ': 'y',
        'ျ': 'ya',
        'ွ': 'w',
        'ြွ': 'yw',
        'ျွ': 'ywa',
        'ှ': 'h',
        // independent vowels
        'ဧ': 'e',
        '၏': '-e',
        'ဣ': 'i',
        'ဤ': '-i',
        'ဉ': 'u',
        'ဦ': '-u',
        'ဩ': 'aw',
        'သြော': 'aw',
        'ဪ': 'aw',
        // numbers
        '၀': '0',
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
        // virama and tone marks which are silent in transliteration
        '္': '',
        '့': '',
        'း': '',

        // Czech
        'č': 'c',
        'ď': 'd',
        'ě': 'e',
        'ň': 'n',
        'ř': 'r',
        'š': 's',
        'ť': 't',
        'ů': 'u',
        'ž': 'z',
        'Č': 'C',
        'Ď': 'D',
        'Ě': 'E',
        'Ň': 'N',
        'Ř': 'R',
        'Š': 'S',
        'Ť': 'T',
        'Ů': 'U',
        'Ž': 'Z',

        // Dhivehi
        'ހ': 'h',
        'ށ': 'sh',
        'ނ': 'n',
        'ރ': 'r',
        'ބ': 'b',
        'ޅ': 'lh',
        'ކ': 'k',
        'އ': 'a',
        'ވ': 'v',
        'މ': 'm',
        'ފ': 'f',
        'ދ': 'dh',
        'ތ': 'th',
        'ލ': 'l',
        'ގ': 'g',
        'ޏ': 'gn',
        'ސ': 's',
        'ޑ': 'd',
        'ޒ': 'z',
        'ޓ': 't',
        'ޔ': 'y',
        'ޕ': 'p',
        'ޖ': 'j',
        'ޗ': 'ch',
        'ޘ': 'tt',
        'ޙ': 'hh',
        'ޚ': 'kh',
        'ޛ': 'th',
        'ޜ': 'z',
        'ޝ': 'sh',
        'ޞ': 's',
        'ޟ': 'd',
        'ޠ': 't',
        'ޡ': 'z',
        'ޢ': 'a',
        'ޣ': 'gh',
        'ޤ': 'q',
        'ޥ': 'w',
        'ަ': 'a',
        'ާ': 'aa',
        'ި': 'i',
        'ީ': 'ee',
        'ު': 'u',
        'ޫ': 'oo',
        'ެ': 'e',
        'ޭ': 'ey',
        'ޮ': 'o',
        'ޯ': 'oa',
        'ް': '',

        // Georgian https://en.wikipedia.org/wiki/Romanization_of_Georgian
        // National system (2002)
        'ა': 'a',
        'ბ': 'b',
        'გ': 'g',
        'დ': 'd',
        'ე': 'e',
        'ვ': 'v',
        'ზ': 'z',
        'თ': 't',
        'ი': 'i',
        'კ': 'k',
        'ლ': 'l',
        'მ': 'm',
        'ნ': 'n',
        'ო': 'o',
        'პ': 'p',
        'ჟ': 'zh',
        'რ': 'r',
        'ს': 's',
        'ტ': 't',
        'უ': 'u',
        'ფ': 'p',
        'ქ': 'k',
        'ღ': 'gh',
        'ყ': 'q',
        'შ': 'sh',
        'ჩ': 'ch',
        'ც': 'ts',
        'ძ': 'dz',
        'წ': 'ts',
        'ჭ': 'ch',
        'ხ': 'kh',
        'ჯ': 'j',
        'ჰ': 'h',

        // Greek
        'α': 'a',
        'β': 'v',
        'γ': 'g',
        'δ': 'd',
        'ε': 'e',
        'ζ': 'z',
        'η': 'i',
        'θ': 'th',
        'ι': 'i',
        'κ': 'k',
        'λ': 'l',
        'μ': 'm',
        'ν': 'n',
        'ξ': 'ks',
        'ο': 'o',
        'π': 'p',
        'ρ': 'r',
        'σ': 's',
        'τ': 't',
        'υ': 'y',
        'φ': 'f',
        'χ': 'x',
        'ψ': 'ps',
        'ω': 'o',
        'ά': 'a',
        'έ': 'e',
        'ί': 'i',
        'ό': 'o',
        'ύ': 'y',
        'ή': 'i',
        'ώ': 'o',
        'ς': 's',
        'ϊ': 'i',
        'ΰ': 'y',
        'ϋ': 'y',
        'ΐ': 'i',
        'Α': 'A',
        'Β': 'B',
        'Γ': 'G',
        'Δ': 'D',
        'Ε': 'E',
        'Ζ': 'Z',
        'Η': 'I',
        'Θ': 'TH',
        'Ι': 'I',
        'Κ': 'K',
        'Λ': 'L',
        'Μ': 'M',
        'Ν': 'N',
        'Ξ': 'KS',
        'Ο': 'O',
        'Π': 'P',
        'Ρ': 'R',
        'Σ': 'S',
        'Τ': 'T',
        'Υ': 'Y',
        'Φ': 'F',
        'Χ': 'X',
        'Ψ': 'PS',
        'Ω': 'O',
        'Ά': 'A',
        'Έ': 'E',
        'Ί': 'I',
        'Ό': 'O',
        'Ύ': 'Y',
        'Ή': 'I',
        'Ώ': 'O',
        'Ϊ': 'I',
        'Ϋ': 'Y',

        // Latvian
        'ā': 'a',
        // 'č': 'c', // duplicate
        'ē': 'e',
        'ģ': 'g',
        'ī': 'i',
        'ķ': 'k',
        'ļ': 'l',
        'ņ': 'n',
        // 'š': 's', // duplicate
        'ū': 'u',
        // 'ž': 'z', // duplicate
        'Ā': 'A',
        // 'Č': 'C', // duplicate
        'Ē': 'E',
        'Ģ': 'G',
        'Ī': 'I',
        'Ķ': 'k',
        'Ļ': 'L',
        'Ņ': 'N',
        // 'Š': 'S', // duplicate
        'Ū': 'U',
        // 'Ž': 'Z', // duplicate

        // Macedonian
        'Ќ': 'Kj',
        'ќ': 'kj',
        'Љ': 'Lj',
        'љ': 'lj',
        'Њ': 'Nj',
        'њ': 'nj',
        'Тс': 'Ts',
        'тс': 'ts',

        // Polish
        'ą': 'a',
        'ć': 'c',
        'ę': 'e',
        'ł': 'l',
        'ń': 'n',
        // 'ó': 'o', // duplicate
        'ś': 's',
        'ź': 'z',
        'ż': 'z',
        'Ą': 'A',
        'Ć': 'C',
        'Ę': 'E',
        'Ł': 'L',
        'Ń': 'N',
        'Ś': 'S',
        'Ź': 'Z',
        'Ż': 'Z',

        // Ukranian
        'Є': 'Ye',
        'І': 'I',
        'Ї': 'Yi',
        'Ґ': 'G',
        'є': 'ye',
        'і': 'i',
        'ї': 'yi',
        'ґ': 'g',

        // Romanian
        'ă': 'a',
        'Ă': 'A',
        'ș': 's',
        'Ș': 'S',
        // 'ş': 's', // duplicate
        // 'Ş': 'S', // duplicate
        'ț': 't',
        'Ț': 'T',
        'ţ': 't',
        'Ţ': 'T',

        // Russian https://en.wikipedia.org/wiki/Romanization_of_Russian
        // ICAO

        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'yo',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'i',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'kh',
        'ц': 'c',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sh',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya',
        'А': 'A',
        'Б': 'B',
        'В': 'V',
        'Г': 'G',
        'Д': 'D',
        'Е': 'E',
        'Ё': 'Yo',
        'Ж': 'Zh',
        'З': 'Z',
        'И': 'I',
        'Й': 'I',
        'К': 'K',
        'Л': 'L',
        'М': 'M',
        'Н': 'N',
        'О': 'O',
        'П': 'P',
        'Р': 'R',
        'С': 'S',
        'Т': 'T',
        'У': 'U',
        'Ф': 'F',
        'Х': 'Kh',
        'Ц': 'C',
        'Ч': 'Ch',
        'Ш': 'Sh',
        'Щ': 'Sh',
        'Ъ': '',
        'Ы': 'Y',
        'Ь': '',
        'Э': 'E',
        'Ю': 'Yu',
        'Я': 'Ya',

        // Serbian
        'ђ': 'dj',
        'ј': 'j',
        // 'љ': 'lj',  // duplicate
        // 'њ': 'nj', // duplicate
        'ћ': 'c',
        'џ': 'dz',
        'Ђ': 'Dj',
        'Ј': 'j',
        // 'Љ': 'Lj', // duplicate
        // 'Њ': 'Nj', // duplicate
        'Ћ': 'C',
        'Џ': 'Dz',

        // Slovak
        'ľ': 'l',
        'ĺ': 'l',
        'ŕ': 'r',
        'Ľ': 'L',
        'Ĺ': 'L',
        'Ŕ': 'R',

        // Turkish
        'ş': 's',
        'Ş': 'S',
        'ı': 'i',
        'İ': 'I',
        // 'ç': 'c', // duplicate
        // 'Ç': 'C', // duplicate
        // 'ü': 'u', // duplicate, see langCharMap
        // 'Ü': 'U', // duplicate, see langCharMap
        // 'ö': 'o', // duplicate, see langCharMap
        // 'Ö': 'O', // duplicate, see langCharMap
        'ğ': 'g',
        'Ğ': 'G',

        // Vietnamese
        'ả': 'a',
        'Ả': 'A',
        'ẳ': 'a',
        'Ẳ': 'A',
        'ẩ': 'a',
        'Ẩ': 'A',
        'đ': 'd',
        'Đ': 'D',
        'ẹ': 'e',
        'Ẹ': 'E',
        'ẽ': 'e',
        'Ẽ': 'E',
        'ẻ': 'e',
        'Ẻ': 'E',
        'ế': 'e',
        'Ế': 'E',
        'ề': 'e',
        'Ề': 'E',
        'ệ': 'e',
        'Ệ': 'E',
        'ễ': 'e',
        'Ễ': 'E',
        'ể': 'e',
        'Ể': 'E',
        'ỏ': 'o',
        'ọ': 'o',
        'Ọ': 'o',
        'ố': 'o',
        'Ố': 'O',
        'ồ': 'o',
        'Ồ': 'O',
        'ổ': 'o',
        'Ổ': 'O',
        'ộ': 'o',
        'Ộ': 'O',
        'ỗ': 'o',
        'Ỗ': 'O',
        'ơ': 'o',
        'Ơ': 'O',
        'ớ': 'o',
        'Ớ': 'O',
        'ờ': 'o',
        'Ờ': 'O',
        'ợ': 'o',
        'Ợ': 'O',
        'ỡ': 'o',
        'Ỡ': 'O',
        'Ở': 'o',
        'ở': 'o',
        'ị': 'i',
        'Ị': 'I',
        'ĩ': 'i',
        'Ĩ': 'I',
        'ỉ': 'i',
        'Ỉ': 'i',
        'ủ': 'u',
        'Ủ': 'U',
        'ụ': 'u',
        'Ụ': 'U',
        'ũ': 'u',
        'Ũ': 'U',
        'ư': 'u',
        'Ư': 'U',
        'ứ': 'u',
        'Ứ': 'U',
        'ừ': 'u',
        'Ừ': 'U',
        'ự': 'u',
        'Ự': 'U',
        'ữ': 'u',
        'Ữ': 'U',
        'ử': 'u',
        'Ử': 'ư',
        'ỷ': 'y',
        'Ỷ': 'y',
        'ỳ': 'y',
        'Ỳ': 'Y',
        'ỵ': 'y',
        'Ỵ': 'Y',
        'ỹ': 'y',
        'Ỹ': 'Y',
        'ạ': 'a',
        'Ạ': 'A',
        'ấ': 'a',
        'Ấ': 'A',
        'ầ': 'a',
        'Ầ': 'A',
        'ậ': 'a',
        'Ậ': 'A',
        'ẫ': 'a',
        'Ẫ': 'A',
        // 'ă': 'a', // duplicate
        // 'Ă': 'A', // duplicate
        'ắ': 'a',
        'Ắ': 'A',
        'ằ': 'a',
        'Ằ': 'A',
        'ặ': 'a',
        'Ặ': 'A',
        'ẵ': 'a',
        'Ẵ': 'A',
        "⓪": "0",
        "①": "1",
        "②": "2",
        "③": "3",
        "④": "4",
        "⑤": "5",
        "⑥": "6",
        "⑦": "7",
        "⑧": "8",
        "⑨": "9",
        "⑩": "10",
        "⑪": "11",
        "⑫": "12",
        "⑬": "13",
        "⑭": "14",
        "⑮": "15",
        "⑯": "16",
        "⑰": "17",
        "⑱": "18",
        "⑲": "18",
        "⑳": "18",

        "⓵": "1",
        "⓶": "2",
        "⓷": "3",
        "⓸": "4",
        "⓹": "5",
        "⓺": "6",
        "⓻": "7",
        "⓼": "8",
        "⓽": "9",
        "⓾": "10",

        "⓿": "0",
        "⓫": "11",
        "⓬": "12",
        "⓭": "13",
        "⓮": "14",
        "⓯": "15",
        "⓰": "16",
        "⓱": "17",
        "⓲": "18",
        "⓳": "19",
        "⓴": "20",

        "Ⓐ": "A",
        "Ⓑ": "B",
        "Ⓒ": "C",
        "Ⓓ": "D",
        "Ⓔ": "E",
        "Ⓕ": "F",
        "Ⓖ": "G",
        "Ⓗ": "H",
        "Ⓘ": "I",
        "Ⓙ": "J",
        "Ⓚ": "K",
        "Ⓛ": "L",
        "Ⓜ": "M",
        "Ⓝ": "N",
        "Ⓞ": "O",
        "Ⓟ": "P",
        "Ⓠ": "Q",
        "Ⓡ": "R",
        "Ⓢ": "S",
        "Ⓣ": "T",
        "Ⓤ": "U",
        "Ⓥ": "V",
        "Ⓦ": "W",
        "Ⓧ": "X",
        "Ⓨ": "Y",
        "Ⓩ": "Z",

        "ⓐ": "a",
        "ⓑ": "b",
        "ⓒ": "c",
        "ⓓ": "d",
        "ⓔ": "e",
        "ⓕ": "f",
        "ⓖ": "g",
        "ⓗ": "h",
        "ⓘ": "i",
        "ⓙ": "j",
        "ⓚ": "k",
        "ⓛ": "l",
        "ⓜ": "m",
        "ⓝ": "n",
        "ⓞ": "o",
        "ⓟ": "p",
        "ⓠ": "q",
        "ⓡ": "r",
        "ⓢ": "s",
        "ⓣ": "t",
        "ⓤ": "u",
        "ⓦ": "v",
        "ⓥ": "w",
        "ⓧ": "x",
        "ⓨ": "y",
        "ⓩ": "z",

        // symbols
        '“': '"',
        '”': '"',
        '‘': "'",
        '’': "'",
        '∂': 'd',
        'ƒ': 'f',
        '™': '(TM)',
        '©': '(C)',
        'œ': 'oe',
        'Œ': 'OE',
        '®': '(R)',
        '†': '+',
        '℠': '(SM)',
        '…': '...',
        '˚': 'o',
        'º': 'o',
        'ª': 'a',
        '•': '*',
        '၊': ',',
        '။': '.',

        // currency
        '$': 'USD',
        '€': 'EUR',
        '₢': 'BRN',
        '₣': 'FRF',
        '£': 'GBP',
        '₤': 'ITL',
        '₦': 'NGN',
        '₧': 'ESP',
        '₩': 'KRW',
        '₪': 'ILS',
        '₫': 'VND',
        '₭': 'LAK',
        '₮': 'MNT',
        '₯': 'GRD',
        '₱': 'ARS',
        '₲': 'PYG',
        '₳': 'ARA',
        '₴': 'UAH',
        '₵': 'GHS',
        '¢': 'cent',
        '¥': 'CNY',
        '元': 'CNY',
        '円': 'YEN',
        '﷼': 'IRR',
        '₠': 'EWE',
        '฿': 'THB',
        '₨': 'INR',
        '₹': 'INR',
        '₰': 'PF',
        '₺': 'TRY',
        '؋': 'AFN',
        '₼': 'AZN',
        'лв': 'BGN',
        '៛': 'KHR',
        '₡': 'CRC',
        '₸': 'KZT',
        'ден': 'MKD',
        'zł': 'PLN',
        '₽': 'RUB',
        '₾': 'GEL'

    };

    /**
     * special look ahead character array
     * These characters form with consonants to become 'single'/consonant combo
     * @type [Array]
     */
    var lookAheadCharArray = [
        // burmese
        '်',

        // Dhivehi
        'ް'
    ];

    /**
     * diatricMap for languages where transliteration changes entirely as more diatrics are added
     * @type {Object}
     */
    var diatricMap = {
        // Burmese
        // dependent vowels
        'ာ': 'a',
        'ါ': 'a',
        'ေ': 'e',
        'ဲ': 'e',
        'ိ': 'i',
        'ီ': 'i',
        'ို': 'o',
        'ု': 'u',
        'ူ': 'u',
        'ေါင်': 'aung',
        'ော': 'aw',
        'ော်': 'aw',
        'ေါ': 'aw',
        'ေါ်': 'aw',
        '်': '်', // this is special case but the character will be converted to latin in the code
        'က်': 'et',
        'ိုက်': 'aik',
        'ောက်': 'auk',
        'င်': 'in',
        'ိုင်': 'aing',
        'ောင်': 'aung',
        'စ်': 'it',
        'ည်': 'i',
        'တ်': 'at',
        'ိတ်': 'eik',
        'ုတ်': 'ok',
        'ွတ်': 'ut',
        'ေတ်': 'it',
        'ဒ်': 'd',
        'ိုဒ်': 'ok',
        'ုဒ်': 'ait',
        'န်': 'an',
        'ာန်': 'an',
        'ိန်': 'ein',
        'ုန်': 'on',
        'ွန်': 'un',
        'ပ်': 'at',
        'ိပ်': 'eik',
        'ုပ်': 'ok',
        'ွပ်': 'ut',
        'န်ုပ်': 'nub',
        'မ်': 'an',
        'ိမ်': 'ein',
        'ုမ်': 'on',
        'ွမ်': 'un',
        'ယ်': 'e',
        'ိုလ်': 'ol',
        'ဉ်': 'in',
        'ံ': 'an',
        'ိံ': 'ein',
        'ုံ': 'on',

        // Dhivehi
        'ައް': 'ah',
        'ަށް': 'ah'
    };

    /**
     * langCharMap language specific characters translations
     * @type   {Object}
     */
    var langCharMap = {
        'en': {}, // default language

        'az': { // Azerbaijani
            'ç': 'c',
            'ə': 'e',
            'ğ': 'g',
            'ı': 'i',
            'ö': 'o',
            'ş': 's',
            'ü': 'u',
            'Ç': 'C',
            'Ə': 'E',
            'Ğ': 'G',
            'İ': 'I',
            'Ö': 'O',
            'Ş': 'S',
            'Ü': 'U'
        },

        'cs': { // Czech
            'č': 'c',
            'ď': 'd',
            'ě': 'e',
            'ň': 'n',
            'ř': 'r',
            'š': 's',
            'ť': 't',
            'ů': 'u',
            'ž': 'z',
            'Č': 'C',
            'Ď': 'D',
            'Ě': 'E',
            'Ň': 'N',
            'Ř': 'R',
            'Š': 'S',
            'Ť': 'T',
            'Ů': 'U',
            'Ž': 'Z'
        },

        'fi': { // Finnish
            // 'å': 'a', duplicate see charMap/latin
            // 'Å': 'A', duplicate see charMap/latin
            'ä': 'a', // ok
            'Ä': 'A', // ok
            'ö': 'o', // ok
            'Ö': 'O' // ok
        },

        'hu': { // Hungarian
            'ä': 'a', // ok
            'Ä': 'A', // ok
            // 'á': 'a', duplicate see charMap/latin
            // 'Á': 'A', duplicate see charMap/latin
            'ö': 'o', // ok
            'Ö': 'O', // ok
            // 'ő': 'o', duplicate see charMap/latin
            // 'Ő': 'O', duplicate see charMap/latin
            'ü': 'u',
            'Ü': 'U',
            'ű': 'u',
            'Ű': 'U'
        },

        'lt': { // Lithuanian
            'ą': 'a',
            'č': 'c',
            'ę': 'e',
            'ė': 'e',
            'į': 'i',
            'š': 's',
            'ų': 'u',
            'ū': 'u',
            'ž': 'z',
            'Ą': 'A',
            'Č': 'C',
            'Ę': 'E',
            'Ė': 'E',
            'Į': 'I',
            'Š': 'S',
            'Ų': 'U',
            'Ū': 'U'
        },

        'lv': { // Latvian
            'ā': 'a',
            'č': 'c',
            'ē': 'e',
            'ģ': 'g',
            'ī': 'i',
            'ķ': 'k',
            'ļ': 'l',
            'ņ': 'n',
            'š': 's',
            'ū': 'u',
            'ž': 'z',
            'Ā': 'A',
            'Č': 'C',
            'Ē': 'E',
            'Ģ': 'G',
            'Ī': 'i',
            'Ķ': 'k',
            'Ļ': 'L',
            'Ņ': 'N',
            'Š': 'S',
            'Ū': 'u',
            'Ž': 'Z'
        },

        'pl': { // Polish
            'ą': 'a',
            'ć': 'c',
            'ę': 'e',
            'ł': 'l',
            'ń': 'n',
            'ó': 'o',
            'ś': 's',
            'ź': 'z',
            'ż': 'z',
            'Ą': 'A',
            'Ć': 'C',
            'Ę': 'e',
            'Ł': 'L',
            'Ń': 'N',
            'Ó': 'O',
            'Ś': 'S',
            'Ź': 'Z',
            'Ż': 'Z'
        },

        'sv': { // Swedish
            // 'å': 'a', duplicate see charMap/latin
            // 'Å': 'A', duplicate see charMap/latin
            'ä': 'a', // ok
            'Ä': 'A', // ok
            'ö': 'o', // ok
            'Ö': 'O' // ok
        },

        'sk': { // Slovak
            'ä': 'a',
            'Ä': 'A'
        },

        'sr': { // Serbian
            'љ': 'lj',
            'њ': 'nj',
            'Љ': 'Lj',
            'Њ': 'Nj',
            'đ': 'dj',
            'Đ': 'Dj'
        },

        'tr': { // Turkish
            'Ü': 'U',
            'Ö': 'O',
            'ü': 'u',
            'ö': 'o'
        }
    };

    /**
     * symbolMap language specific symbol translations
     * translations must be transliterated already
     * @type   {Object}
     */
    var symbolMap = {
        'ar': {
            '∆': 'delta',
            '∞': 'la-nihaya',
            '♥': 'hob',
            '&': 'wa',
            '|': 'aw',
            '<': 'aqal-men',
            '>': 'akbar-men',
            '∑': 'majmou',
            '¤': 'omla'
        },

        'az': {},

        'ca': {
            '∆': 'delta',
            '∞': 'infinit',
            '♥': 'amor',
            '&': 'i',
            '|': 'o',
            '<': 'menys que',
            '>': 'mes que',
            '∑': 'suma dels',
            '¤': 'moneda'
        },

        'cs': {
            '∆': 'delta',
            '∞': 'nekonecno',
            '♥': 'laska',
            '&': 'a',
            '|': 'nebo',
            '<': 'mensi nez',
            '>': 'vetsi nez',
            '∑': 'soucet',
            '¤': 'mena'
        },

        'de': {
            '∆': 'delta',
            '∞': 'unendlich',
            '♥': 'Liebe',
            '&': 'und',
            '|': 'oder',
            '<': 'kleiner als',
            '>': 'groesser als',
            '∑': 'Summe von',
            '¤': 'Waehrung'
        },

        'dv': {
            '∆': 'delta',
            '∞': 'kolunulaa',
            '♥': 'loabi',
            '&': 'aai',
            '|': 'noonee',
            '<': 'ah vure kuda',
            '>': 'ah vure bodu',
            '∑': 'jumula',
            '¤': 'faisaa'
        },

        'en': {
            '∆': 'delta',
            '∞': 'infinity',
            '♥': 'love',
            '&': 'and',
            '|': 'or',
            '<': 'less than',
            '>': 'greater than',
            '∑': 'sum',
            '¤': 'currency'
        },

        'es': {
            '∆': 'delta',
            '∞': 'infinito',
            '♥': 'amor',
            '&': 'y',
            '|': 'u',
            '<': 'menos que',
            '>': 'mas que',
            '∑': 'suma de los',
            '¤': 'moneda'
        },

        'fa': {
            '∆': 'delta',
            '∞': 'bi-nahayat',
            '♥': 'eshgh',
            '&': 'va',
            '|': 'ya',
            '<': 'kamtar-az',
            '>': 'bishtar-az',
            '∑': 'majmooe',
            '¤': 'vahed'
        },

        'fi': {
            '∆': 'delta',
            '∞': 'aarettomyys',
            '♥': 'rakkaus',
            '&': 'ja',
            '|': 'tai',
            '<': 'pienempi kuin',
            '>': 'suurempi kuin',
            '∑': 'summa',
            '¤': 'valuutta'
        },

        'fr': {
            '∆': 'delta',
            '∞': 'infiniment',
            '♥': 'Amour',
            '&': 'et',
            '|': 'ou',
            '<': 'moins que',
            '>': 'superieure a',
            '∑': 'somme des',
            '¤': 'monnaie'
        },

        'ge': {
            '∆': 'delta',
            '∞': 'usasruloba',
            '♥': 'siqvaruli',
            '&': 'da',
            '|': 'an',
            '<': 'naklebi',
            '>': 'meti',
            '∑': 'jami',
            '¤': 'valuta'
        },

        'gr': {},

        'hu': {
            '∆': 'delta',
            '∞': 'vegtelen',
            '♥': 'szerelem',
            '&': 'es',
            '|': 'vagy',
            '<': 'kisebb mint',
            '>': 'nagyobb mint',
            '∑': 'szumma',
            '¤': 'penznem'
        },

        'it': {
            '∆': 'delta',
            '∞': 'infinito',
            '♥': 'amore',
            '&': 'e',
            '|': 'o',
            '<': 'minore di',
            '>': 'maggiore di',
            '∑': 'somma',
            '¤': 'moneta'
        },

        'lt': {
            '∆': 'delta',
            '∞': 'begalybe',
            '♥': 'meile',
            '&': 'ir',
            '|': 'ar',
            '<': 'maziau nei',
            '>': 'daugiau nei',
            '∑': 'suma',
            '¤': 'valiuta'
        },

        'lv': {
            '∆': 'delta',
            '∞': 'bezgaliba',
            '♥': 'milestiba',
            '&': 'un',
            '|': 'vai',
            '<': 'mazak neka',
            '>': 'lielaks neka',
            '∑': 'summa',
            '¤': 'valuta'
        },

        'my': {
            '∆': 'kwahkhyaet',
            '∞': 'asaonasme',
            '♥': 'akhyait',
            '&': 'nhin',
            '|': 'tho',
            '<': 'ngethaw',
            '>': 'kyithaw',
            '∑': 'paungld',
            '¤': 'ngwekye'
        },

        'mk': {},

        'nl': {
            '∆': 'delta',
            '∞': 'oneindig',
            '♥': 'liefde',
            '&': 'en',
            '|': 'of',
            '<': 'kleiner dan',
            '>': 'groter dan',
            '∑': 'som',
            '¤': 'valuta'
        },

        'pl': {
            '∆': 'delta',
            '∞': 'nieskonczonosc',
            '♥': 'milosc',
            '&': 'i',
            '|': 'lub',
            '<': 'mniejsze niz',
            '>': 'wieksze niz',
            '∑': 'suma',
            '¤': 'waluta'
        },

        'pt': {
            '∆': 'delta',
            '∞': 'infinito',
            '♥': 'amor',
            '&': 'e',
            '|': 'ou',
            '<': 'menor que',
            '>': 'maior que',
            '∑': 'soma',
            '¤': 'moeda'
        },

        'ro': {
            '∆': 'delta',
            '∞': 'infinit',
            '♥': 'dragoste',
            '&': 'si',
            '|': 'sau',
            '<': 'mai mic ca',
            '>': 'mai mare ca',
            '∑': 'suma',
            '¤': 'valuta'
        },

        'ru': {
            '∆': 'delta',
            '∞': 'beskonechno',
            '♥': 'lubov',
            '&': 'i',
            '|': 'ili',
            '<': 'menshe',
            '>': 'bolshe',
            '∑': 'summa',
            '¤': 'valjuta'
        },

        'sk': {
            '∆': 'delta',
            '∞': 'nekonecno',
            '♥': 'laska',
            '&': 'a',
            '|': 'alebo',
            '<': 'menej ako',
            '>': 'viac ako',
            '∑': 'sucet',
            '¤': 'mena'
        },

        'sr': {},

        'tr': {
            '∆': 'delta',
            '∞': 'sonsuzluk',
            '♥': 'ask',
            '&': 've',
            '|': 'veya',
            '<': 'kucuktur',
            '>': 'buyuktur',
            '∑': 'toplam',
            '¤': 'para birimi'
        },

        'uk': {
            '∆': 'delta',
            '∞': 'bezkinechnist',
            '♥': 'lubov',
            '&': 'i',
            '|': 'abo',
            '<': 'menshe',
            '>': 'bilshe',
            '∑': 'suma',
            '¤': 'valjuta'
        },

        'vn': {
            '∆': 'delta',
            '∞': 'vo cuc',
            '♥': 'yeu',
            '&': 'va',
            '|': 'hoac',
            '<': 'nho hon',
            '>': 'lon hon',
            '∑': 'tong',
            '¤': 'tien te'
        }
    };

    var uricChars = [';', '?', ':', '@', '&', '=', '+', '$', ',', '/'].join('');

    var uricNoSlashChars = [';', '?', ':', '@', '&', '=', '+', '$', ','].join('');

    var markChars = ['.', '!', '~', '*', "'", '(', ')'].join('');

    /**
     * getSlug
     * @param  {string} input input string
     * @param  {object|string} opts config object or separator string/char
     * @api    public
     * @return {string}  sluggified string
     */
    var getSlug = function getSlug(input, opts) {
        var separator = '-';
        var result = '';
        var diatricString = '';
        var convertSymbols = true;
        var customReplacements = {};
        var maintainCase;
        var titleCase;
        var truncate;
        var uricFlag;
        var uricNoSlashFlag;
        var markFlag;
        var symbol;
        var langChar;
        var lucky;
        var i;
        var ch;
        var l;
        var lastCharWasSymbol;
        var lastCharWasDiatric;
        var allowedChars = '';

        if (typeof input !== 'string') {
            return '';
        }

        if (typeof opts === 'string') {
            separator = opts;
        }

        symbol = symbolMap.en;
        langChar = langCharMap.en;

        if (typeof opts === 'object') {
            maintainCase = opts.maintainCase || false;
            customReplacements = (opts.custom && typeof opts.custom === 'object') ? opts.custom : customReplacements;
            truncate = (+opts.truncate > 1 && opts.truncate) || false;
            uricFlag = opts.uric || false;
            uricNoSlashFlag = opts.uricNoSlash || false;
            markFlag = opts.mark || false;
            convertSymbols = (opts.symbols === false || opts.lang === false) ? false : true;
            separator = opts.separator || separator;

            if (uricFlag) {
                allowedChars += uricChars;
            }

            if (uricNoSlashFlag) {
                allowedChars += uricNoSlashChars;
            }

            if (markFlag) {
                allowedChars += markChars;
            }

            symbol = (opts.lang && symbolMap[opts.lang] && convertSymbols) ?
                symbolMap[opts.lang] : (convertSymbols ? symbolMap.en : {});

            langChar = (opts.lang && langCharMap[opts.lang]) ?
                langCharMap[opts.lang] :
                opts.lang === false || opts.lang === true ? {} : langCharMap.en;

            // if titleCase config is an Array, rewrite to object format
            if (opts.titleCase && typeof opts.titleCase.length === 'number' && Array.prototype.toString.call(opts.titleCase)) {
                opts.titleCase.forEach(function (v) {
                    customReplacements[v + ''] = v + '';
                });

                titleCase = true;
            } else {
                titleCase = !!opts.titleCase;
            }

            // if custom config is an Array, rewrite to object format
            if (opts.custom && typeof opts.custom.length === 'number' && Array.prototype.toString.call(opts.custom)) {
                opts.custom.forEach(function (v) {
                    customReplacements[v + ''] = v + '';
                });
            }

            // custom replacements
            Object.keys(customReplacements).forEach(function (v) {
                var r;

                if (v.length > 1) {
                    r = new RegExp('\\b' + escapeChars(v) + '\\b', 'gi');
                } else {
                    r = new RegExp(escapeChars(v), 'gi');
                }

                input = input.replace(r, customReplacements[v]);
            });

            // add all custom replacement to allowed charlist
            for (ch in customReplacements) {
                allowedChars += ch;
            }
        }

        allowedChars += separator;

        // escape all necessary chars
        allowedChars = escapeChars(allowedChars);

        // trim whitespaces
        input = input.replace(/(^\s+|\s+$)/g, '');

        lastCharWasSymbol = false;
        lastCharWasDiatric = false;

        for (i = 0, l = input.length; i < l; i++) {
            ch = input[i];

            if (isReplacedCustomChar(ch, customReplacements)) {
                // don't convert a already converted char
                lastCharWasSymbol = false;
            } else if (langChar[ch]) {
                // process language specific diactrics chars conversion
                ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? ' ' + langChar[ch] : langChar[ch];

                lastCharWasSymbol = false;
            } else if (ch in charMap) {
                // the transliteration changes entirely when some special characters are added
                if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
                    diatricString += ch;
                    ch = '';
                } else if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + charMap[ch];
                    diatricString = '';
                } else {
                    // process diactrics chars
                    ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? ' ' + charMap[ch] : charMap[ch];
                }

                lastCharWasSymbol = false;
                lastCharWasDiatric = false;
            } else if (ch in diatricMap) {
                diatricString += ch;
                ch = '';
                // end of string, put the whole meaningful word
                if (i === l - 1) {
                    ch = diatricMap[diatricString];
                }
                lastCharWasDiatric = true;
            } else if (
                // process symbol chars
                symbol[ch] && !(uricFlag && uricChars
                    .indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars
                    // .indexOf(ch) !== -1) && !(markFlag && markChars
                    .indexOf(ch) !== -1)) {
                ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
                ch += input[i + 1] !== void 0 && input[i + 1].match(/[A-Za-z0-9]/) ? separator : '';

                lastCharWasSymbol = true;
            } else {
                if (lastCharWasDiatric === true) {
                    ch = diatricMap[diatricString] + ch;
                    diatricString = '';
                    lastCharWasDiatric = false;
                } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) {
                    // process latin chars
                    ch = ' ' + ch;
                }
                lastCharWasSymbol = false;
            }

            // add allowed chars
            result += ch.replace(new RegExp('[^\\w\\s' + allowedChars + '_-]', 'g'), separator);
        }

        if (titleCase) {
            result = result.replace(/(\w)(\S*)/g, function (_, i, r) {
                var j = i.toUpperCase() + (r !== null ? r : '');
                return (Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0) ? j : j.toLowerCase();
            });
        }

        // eliminate duplicate separators
        // add separator
        // trim separators from start and end
        result = result.replace(/\s+/g, separator)
            .replace(new RegExp('\\' + separator + '+', 'g'), separator)
            .replace(new RegExp('(^\\' + separator + '+|\\' + separator + '+$)', 'g'), '');

        if (truncate && result.length > truncate) {
            lucky = result.charAt(truncate) === separator;
            result = result.slice(0, truncate);

            if (!lucky) {
                result = result.slice(0, result.lastIndexOf(separator));
            }
        }

        if (!maintainCase && !titleCase) {
            result = result.toLowerCase();
        }

        return result;
    };

    /**
     * createSlug curried(opts)(input)
     * @param   {object|string} opts config object or input string
     * @return  {Function} function getSlugWithConfig()
     **/
    var createSlug = function createSlug(opts) {

        /**
         * getSlugWithConfig
         * @param   {string} input string
         * @return  {string} slug string
         */
        return function getSlugWithConfig(input) {
            return getSlug(input, opts);
        };
    };

    /**
     * escape Chars
     * @param   {string} input string
     */
    var escapeChars = function escapeChars(input) {
        return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, '\\$&');
    };

    /**
     * check if the char is an already converted char from custom list
     * @param   {char} ch character to check
     * @param   {object} customReplacements custom translation map
     */
    var isReplacedCustomChar = function (ch, customReplacements) {
        for (var c in customReplacements) {
            if (customReplacements[c] === ch) {
                return true;
            }
        }
    };

    if (typeof module !== 'undefined' && module.exports) {

        // export functions for use in Node
        module.exports = getSlug;
        module.exports.createSlug = createSlug;
    } else if (typeof define !== 'undefined' && define.amd) {

        // export function for use in AMD
        define([], function () {
            return getSlug;
        });
    } else {

        // don't overwrite global if exists
        try {
            if (root.getSlug || root.createSlug) {
                throw 'speakingurl: globals exists /(getSlug|createSlug)/';
            } else {
                root.getSlug = getSlug;
                root.createSlug = createSlug;
            }
        } catch (e) {}
    }
})(this);
},{}],29:[function(require,module,exports){
// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if (typeof module !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (typeof define === 'function' && define.amd) {
    define(function () {return tinycolor;});
}
// Browser: Expose to window
else {
    window.tinycolor = tinycolor;
}

})(Math);

},{}],30:[function(require,module,exports){
(function (global){
/*
 * Toastr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */
/* global define */
(function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.4',
                warning: warning
            };

            var previousToast;

            return toastr;

            ////////////////

            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement, clearOptions) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options, clearOptions)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }

            // internal functions

            function clearContainer (options) {
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                }
            }

            function clearToast ($toastElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass);

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,
                    closeMethod: false,
                    closeDuration: false,
                    closeEasing: false,
                    closeOnHover: true,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    escapeHtml: false,
                    target: 'body',
                    closeHtml: '<button type="button">&times;</button>',
                    closeClass: 'toast-close-button',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false,
                    progressClass: 'toast-progress',
                    rtl: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions();
                var iconClass = map.iconClass || options.iconClass;

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                if (shouldExit(options, map)) { return; }

                toastId++;

                $container = getContainer(options, true);

                var intervalId = null;
                var $toastElement = $('<div/>');
                var $titleElement = $('<div/>');
                var $messageElement = $('<div/>');
                var $progressElement = $('<div/>');
                var $closeElement = $(options.closeHtml);
                var progressBar = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                };
                var response = {
                    toastId: toastId,
                    state: 'visible',
                    startTime: new Date(),
                    options: options,
                    map: map
                };

                personalizeToast();

                displayToast();

                handleEvents();

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function escapeHtml(source) {
                    if (source == null) {
                        source = '';
                    }

                    return source
                        .replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                }

                function personalizeToast() {
                    setIcon();
                    setTitle();
                    setMessage();
                    setCloseButton();
                    setProgressBar();
                    setRTL();
                    setSequence();
                    setAria();
                }

                function setAria() {
                    var ariaValue = '';
                    switch (map.iconClass) {
                        case 'toast-success':
                        case 'toast-info':
                            ariaValue =  'polite';
                            break;
                        default:
                            ariaValue = 'assertive';
                    }
                    $toastElement.attr('aria-live', ariaValue);
                }

                function handleEvents() {
                    if (options.closeOnHover) {
                        $toastElement.hover(stickAround, delayedHideToast);
                    }

                    if (!options.onclick && options.tapToDismiss) {
                        $toastElement.click(hideToast);
                    }

                    if (options.closeButton && $closeElement) {
                        $closeElement.click(function (event) {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                event.cancelBubble = true;
                            }

                            if (options.onCloseClick) {
                                options.onCloseClick(event);
                            }

                            hideToast(true);
                        });
                    }

                    if (options.onclick) {
                        $toastElement.click(function (event) {
                            options.onclick(event);
                            hideToast();
                        });
                    }
                }

                function displayToast() {
                    $toastElement.hide();

                    $toastElement[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                    );

                    if (options.timeOut > 0) {
                        intervalId = setTimeout(hideToast, options.timeOut);
                        progressBar.maxHideTime = parseFloat(options.timeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        if (options.progressBar) {
                            progressBar.intervalId = setInterval(updateProgress, 10);
                        }
                    }
                }

                function setIcon() {
                    if (map.iconClass) {
                        $toastElement.addClass(options.toastClass).addClass(iconClass);
                    }
                }

                function setSequence() {
                    if (options.newestOnTop) {
                        $container.prepend($toastElement);
                    } else {
                        $container.append($toastElement);
                    }
                }

                function setTitle() {
                    if (map.title) {
                        var suffix = map.title;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.title);
                        }
                        $titleElement.append(suffix).addClass(options.titleClass);
                        $toastElement.append($titleElement);
                    }
                }

                function setMessage() {
                    if (map.message) {
                        var suffix = map.message;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.message);
                        }
                        $messageElement.append(suffix).addClass(options.messageClass);
                        $toastElement.append($messageElement);
                    }
                }

                function setCloseButton() {
                    if (options.closeButton) {
                        $closeElement.addClass(options.closeClass).attr('role', 'button');
                        $toastElement.prepend($closeElement);
                    }
                }

                function setProgressBar() {
                    if (options.progressBar) {
                        $progressElement.addClass(options.progressClass);
                        $toastElement.prepend($progressElement);
                    }
                }

                function setRTL() {
                    if (options.rtl) {
                        $toastElement.addClass('rtl');
                    }
                }

                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousToast) {
                            return true;
                        } else {
                            previousToast = map.message;
                        }
                    }
                    return false;
                }

                function hideToast(override) {
                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
                    var duration = override && options.closeDuration !== false ?
                        options.closeDuration : options.hideDuration;
                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $toastElement[method]({
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            removeToast($toastElement);
                            clearTimeout(intervalId);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $toastElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                    previousToast = undefined;
                }
            }

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));
    } else {
        window.toastr = factory(window.jQuery);
    }
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],31:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = require('punycode');
var util = require('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"./util":32,"punycode":22,"querystring":25}],32:[function(require,module,exports){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],33:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],34:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],35:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":34,"_process":21,"inherits":33}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];
},{"./util/assertString":40}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = require('./util/merge');

var _merge2 = _interopRequireDefault(_merge);

var _isByteLength = require('./isByteLength');

var _isByteLength2 = _interopRequireDefault(_isByteLength);

var _isFQDN = require('./isFQDN');

var _isFQDN2 = _interopRequireDefault(_isFQDN);

var _isIP = require('./isIP');

var _isIP2 = _interopRequireDefault(_isIP);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var gmailUserPart = /^[a-z\d]+$/;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();

  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
    /*
      Previously we removed dots for gmail addresses before validating.
      This was removed because it allows `multiple..dots@gmail.com`
      to be reported as valid, but it is not.
      Gmail only normalizes single dots, removing them from here is pointless,
      should be done in normalizeEmail
    */
    user = user.toLowerCase();

    // Removing sub-address from username before gmail validation
    var username = user.split('+')[0];

    // Dots are not included in gmail length restriction
    if (!(0, _isByteLength2.default)(username.replace('.', ''), { min: 6, max: 30 })) {
      return false;
    }

    var _user_parts = username.split('.');
    for (var i = 0; i < _user_parts.length; i++) {
      if (!gmailUserPart.test(_user_parts[i])) {
        return false;
      }
    }
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 254 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    if (!options.allow_ip_domain) {
      return false;
    }

    if (!(0, _isIP2.default)(domain)) {
      if (!domain.startsWith('[') || !domain.endsWith(']')) {
        return false;
      }

      var noBracketdomain = domain.substr(1, domain.length - 2);

      if (noBracketdomain.length === 0 || !(0, _isIP2.default)(noBracketdomain)) {
        return false;
      }
    }
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var _i = 0; _i < user_parts.length; _i++) {
    if (!pattern.test(user_parts[_i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];
},{"./isByteLength":36,"./isFQDN":38,"./isIP":39,"./util/assertString":40,"./util/merge":41}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFQDN;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

var _merge = require('./util/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFQDN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].length > 63) {
      return false;
    }
  }
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (var part, _i = 0; _i < parts.length; _i++) {
    part = parts[_i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
},{"./util/assertString":40,"./util/merge":41}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2.default)(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var blocks = str.split(':');
    var foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
}
module.exports = exports['default'];
},{"./util/assertString":40}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];
},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];
},{}],42:[function(require,module,exports){
"use strict";var getSlug=require("speakingurl"),extReg=/\.[0-9a-z]+$/;function slugFilename(e){var t=e.toLowerCase().trim();if(!extReg.test(t))return console.log("[SLUGFILENAME] impossible to slug",e),!1;var r=extReg.exec(t)[0];return t=t.replace(r,""),t=getSlug(t.trim())+r}module.exports=slugFilename;

},{"speakingurl":27}],43:[function(require,module,exports){
(function (global){
"use strict";var url=require("url"),console=require("console-browserify"),ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,templateLoader=require("./template-loader.js");require("./ko-bindings.js");var performanceAwareCaller=require("./timed-call.js").timedCall,addUndoStackExtensionMaker=require("./undomanager/undomain.js"),colorPlugin=require("./ext/color.js"),utilPlugin=require("./ext/util.js"),inlinerPlugin=require("./ext/inliner.js"),localStorageLoader=require("./ext/localstorage.js");if(void 0===ko)throw"Cannot find knockout.js library!";if(void 0===$)throw"Cannot find jquery library!";var initFromLocalStorage,start=function(e,i,t,o,n){templateLoader.fixPageEvents();var a=[function(i){e&&e.strings&&(i.t=function(t,o){var n=e.strings[t];return void 0===n&&(console.warn("Missing translation string for",t,": using default string"),n=t),i.tt(n,o)})},addUndoStackExtensionMaker(performanceAwareCaller),colorPlugin,utilPlugin,inlinerPlugin];if(void 0!==n)for(var l=0;l<n.length;l++)a.push(n[l]);a.push(function(i){var t={messages:{unknownError:i.t("Unknown error"),uploadedBytes:i.t("Uploaded bytes exceed file size"),maxNumberOfFiles:i.t("Maximum number of files exceeded"),acceptFileTypes:i.t("File type not allowed"),maxFileSize:i.t("File is too large"),minFileSize:i.t("File is too small"),post_max_size:i.t("The uploaded file exceeds the post_max_size directive in php.ini"),max_file_size:i.t("File is too big"),min_file_size:i.t("File is too small"),accept_file_types:i.t("Filetype not allowed"),max_number_of_files:i.t("Maximum number of files exceeded"),max_width:i.t("Image exceeds maximum width"),min_width:i.t("Image requires a minimum width"),max_height:i.t("Image exceeds maximum height"),min_height:i.t("Image requires a minimum height"),abort:i.t("File upload aborted"),image_resize:i.t("Failed to resize image"),generic:i.t("Unexpected upload error")}};e&&e.fileuploadConfig&&(t=$.extend(!0,t,e.fileuploadConfig)),ko.bindingHandlers.fileupload.extendOptions=t});var r=e.fileuploadConfig?e.fileuploadConfig.url:"/upload/";applyBindingOptions(e,ko),$("\x3c!-- ko template: 'main' --\x3e\x3c!-- /ko --\x3e").appendTo(global.document.body),void 0===i&&void 0!==t&&(i=t.template),templateLoader.load(performanceAwareCaller,i,t,o,a,r)},applyBindingOptions=$.noop,customExt=require("./ext/custom-extensions"),init=function(e,i){return console.info("CUSTOM MOSAICO – init"),console.log(e),!!(e&&e.metadata&&e.data)&&(customExt.extendViewModel(e,i),customExt.extendKnockout(e),start(e,void 0,e.metadata,e.data,i),!0)};module.exports={isCompatible:templateLoader.isCompatible,init:init,start:start};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ext/color.js":76,"./ext/custom-extensions":78,"./ext/inliner.js":84,"./ext/localstorage.js":85,"./ext/util.js":86,"./ko-bindings.js":87,"./template-loader.js":88,"./timed-call.js":89,"./undomanager/undomain.js":90,"console-browserify":3,"url":31}],44:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify"),addScriptTemplate=function(e,t,n){var o=e.createElement("script");return o.setAttribute("type","text/html"),o.setAttribute("id",t),o.text=n,e.body.appendChild(o),o};ko.bindingHandlers.bindIframe={tpl:'<!DOCTYPE html>\r\n<html>\r\n<head>\r\n</head>\r\n<body><div data-bind="block: content"></div></body>\r\n</html>\r\n',init:function(e,t){!function(n){try{var o=e.contentDocument;o.open(),o.write(ko.bindingHandlers.bindIframe.tpl),o.close();try{var r=o.body;if(r){for(var i=e.contentWindow.parent.document.getElementsByTagName("script"),d=0;d<i.length;d++)"text/html"==i[d].getAttribute("type")&&i[d].getAttribute("id")&&addScriptTemplate(o,i[d].getAttribute("id"),i[d].innerHTML);var a=o.getElementsByTagName("HTML");ko.utils.domNodeDisposal.addDisposeCallback(e,function(){ko.cleanNode(a[0]||r)}),ko.applyBindings(t(),a[0]||r)}else console.log("no iframedoc",n)}catch(e){throw console.log("error reading iframe.body",e,n),e}}catch(e){throw console.log("error reading iframe contentDocument",e,n),e}}("first call")}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],45:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");ko.bindingHandlers.withProperties={init:function(e,n,o,t,l){var a=l.createChildContext(l.$rawData,null,function(e){ko.utils.extend(e,n())});return ko.applyBindingsToDescendants(a,e),{controlsDescendantBindings:!0}}},ko.virtualElements.allowedBindings.withProperties=!0,ko.bindingHandlers.log={init:function(e,n,o,t,l){console.log("log",n())}},ko.bindingHandlers.block={templateExists:function(e){return!!global.document.getElementById(e)},_chooseTemplate:function(e,n,o,t){var l=n+"-"+o;if(ko.bindingHandlers.block.templateExists(l))return l;if(null!=t)return ko.bindingHandlers.block._chooseTemplate(e,n,t);var a=e?"array":"object-"+o;if(ko.bindingHandlers.block.templateExists(a))return a;throw"cannot find template for "+l+"/"+a},_displayMode:function(e,n){var o=void 0!==e.type?ko.utils.unwrapObservable(e.type):"notablock-"+typeof e,t=void 0!==e.splice,l=n.templateMode?n.templateMode:"show";return ko.bindingHandlers.block._chooseTemplate(t,o,l,n.templateModeFallback)},_makeTemplateValueAccessor:function(e,n){return function(){var o,t,l=e(),a=ko.utils.peekObservable(l);if(!a||"object"!=typeof a.data&&"function"!=typeof a.data)o=l;else if(o=a.data,void 0!==a.template){var i=ko.utils.unwrapObservable(a.template),r=n.templateMode?n.templateMode:"show";t=ko.bindingHandlers.block._chooseTemplate(!1,i,r,n.templateModeFallback)}var s=ko.utils.unwrapObservable(o);if(ko.isObservable(s)&&console.log("doubleObservable",s),void 0===t)if(void 0===o)t="empty";else try{t=ko.bindingHandlers.block._displayMode(s,n)}catch(e){throw console.log(e,s,n.$data,n.templateMode),e}return{name:t,data:o,templateEngine:ko.nativeTemplateEngine.instance}}},init:function(e,n,o,t,l){void 0===n()&&console.log("found a null block: check ending commas in arrays defs in IE");var a=ko.bindingHandlers.block._makeTemplateValueAccessor(n,l);return ko.bindingHandlers.template.init(e,a)},update:function(e,n,o,t,l){var a=ko.bindingHandlers.block._makeTemplateValueAccessor(n,l);return ko.bindingHandlers.template.update(e,a,o,t,l)}},ko.expressionRewriting.bindingRewriteValidators.block=!1,ko.virtualElements.allowedBindings.block=!0;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],46:[function(require,module,exports){
"use strict";module.exports=require("./string-template.js");

},{"./string-template.js":61}],47:[function(require,module,exports){
(function (global){
"use strict";require("evol-colorpicker");var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,kojqui="undefined"!=typeof window?window.kojqui:"undefined"!=typeof global?global.kojqui:null,ColorPicker=function(){kojqui.BindingHandler.call(this,"colorpicker")};ColorPicker.prototype=kojqui.utils.createObject(kojqui.BindingHandler.prototype),ColorPicker.prototype.constructor=ColorPicker,ColorPicker.prototype.init=function(o,e,i){var r=e(),n=r.color,l=ko.computed({read:n,write:n,disposeWhenNodeIsRemoved:o});ko.bindingHandlers.value.init(o,function(){return l},i);var t=function(o,e){void 0!==e&&l(e)};$(o).on("change.color",t),ko.computed({read:function(){var e={color:ko.utils.unwrapObservable(l),showOn:"button"};for(var i in r)"color"!==i&&r.hasOwnProperty(i)&&(e[i]=ko.utils.unwrapObservable(r[i]));$(o).colorpicker(e)},disposeWhenNodeIsRemoved:o}),ko.utils.domNodeDisposal.addDisposeCallback(o,function(){$(o).off("change.color",t),$(o).colorpicker("destroy")})},kojqui.utils.register(ColorPicker);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"evol-colorpicker":5}],48:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null;ko.bindingHandlers.cssText={update:function(e,n,t){var o=ko.utils.unwrapObservable(n());try{e.innerText=o}catch(n){e.styleSheet||(e.innerHTML="a{}"),e.styleSheet.cssText=o}}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],49:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,console=require("console-browserify");ko.bindingHandlers.focusable={focus:function(){},blur:function(){},init:function(o){ko.utils.domNodeDisposal.addDisposeCallback(o,function(){$(o).off("focusin",ko.bindingHandlers.focusable.focus),$(o).off("focusout",ko.bindingHandlers.focusable.blur)}),$(o).on("focusin",ko.bindingHandlers.focusable.focus),$(o).on("focusout",ko.bindingHandlers.focusable.blur)}},ko.bindingHandlers.scrollable={scroll:function(){},init:function(o){ko.utils.domNodeDisposal.addDisposeCallback(o,function(){$(o).off("scroll",ko.bindingHandlers.scrollable.scroll)}),$(o).on("scroll",ko.bindingHandlers.scrollable.scroll)}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],50:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null;!function(e,o){e.utils.unwrapObservable;var n=e.utils.domData.get;e.utils.domData.set,e.bindingHandlers.extdroppable={init:function(t,d,a,l,i){var s,p=o(t),r=e.utils.unwrapObservable(d())||{},u={};o.extend(!0,u,e.bindingHandlers.extdroppable),r.data?(r.options&&u.options&&(e.utils.extend(u.options,r.options),delete r.options),e.utils.extend(u,r)):u.data=r,s=u.options.drop,p.droppable(e.utils.extend(u.options,{drop:function(e,o){var t=o.draggable[0],d=n(t,"ko_sortItem")||n(t,"ko_dragItem");d&&(d.clone&&(d=d.clone()),u.dragged&&(d=u.dragged.call(this,d,e,o)||d),u.data&&u.data(d)),s&&s.apply(this,arguments)}})),void 0!==u.isEnabled&&e.computed({read:function(){p.droppable(e.utils.unwrapObservable(u.isEnabled)?"enable":"disable")},disposeWhenNodeIsRemoved:t})},update:function(e,o,n,t,d){},targetIndex:null,afterMove:null,beforeMove:null,options:{}}}(ko,$);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],51:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null;ko.extenders.paging=function(e,n){var t=ko.observable(n||10),o=ko.observable(1);return e.pageSize=ko.computed({read:t,write:function(e){t(e>0?e:10)}}),e.currentPage=ko.computed({read:o,write:function(n){n>e.pageCount()?o(e.pageCount()):o(n<=0?1:n)}}),e.pageCount=ko.computed(function(){return Math.ceil(e().length/e.pageSize())||1}),e.currentPageData=ko.computed(function(){var n=t(),r=o(),u=n*(r-1),a=n*r;return e().slice(u,a)}),e.moveFirst=function(){e.currentPage(1)},e.movePrevious=function(){e.currentPage(e.currentPage()-1)},e.moveNext=function(){e.currentPage(e.currentPage()+1)},e.moveLast=function(){e.currentPage(e.pageCount())},e};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],52:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,sortable="undefined"!=typeof window?window.jQuery.ui.sortable:"undefined"!=typeof global?global.jQuery.ui.sortable:null,draggable="undefined"!=typeof window?window.jQuery.ui.draggable:"undefined"!=typeof global?global.jQuery.ui.draggable:null,console=require("console-browserify");if(require("knockout-sortable"),void 0===sortable)throw"Cannot find jquery-ui sortable widget dependency!";if(void 0===draggable)throw"Cannot find jquery-ui sortable widget dependency!";var isDraggingHelper=function(e,n){e()?n.type==e()+"stop"&&e(!1):"dragstart"!=n.type&&"sortstart"!=n.type||e(n.type.substring(0,4))},makeExtendedValueAccessor=function(e){return function(){var n=e();ko.utils.peekObservable(n);ko.utils.unwrapObservable(n),"undefined"==n.options&&(n.options={});var o=n.options.start;n.options.start=function(e,r){if(void 0!==n.dragging&&ko.isWritableObservable(n.dragging)&&isDraggingHelper(n.dragging,e),void 0!==n.dropContainer&&(n.scrollInterval=global.setInterval(function(){var e=$(n.dropContainer).scrollTop();$(n.dropContainer).scrollTop(e+n.adding)},20)),void 0!==o)return o(e,r)};var r=n.options.stop;n.options.stop=function(e,o){if(void 0!==n.dragging&&ko.isWritableObservable(n.dragging)&&isDraggingHelper(n.dragging,e),void 0!==n.dropContainer&&global.clearInterval(n.scrollInterval),void 0!==r)return r(e,o)};var i=n.options.drag;return n.options.drag=function(e,o){if(void 0!==n.dropContainer){var r=e.pageY-$(n.dropContainer).offset().top,t=r-$(n.dropContainer).height();n.adding=r<-20?-20:r<0?-10:r<10?-5:t>20?20:t>0?10:t>-10?5:0}if(void 0!==i)return i(e,o)},n}};ko.bindingHandlers.extsortable={init:function(e,n,o,r,i){return ko.bindingHandlers.sortable.init(e,makeExtendedValueAccessor(n),o,r,i)},update:function(e,n,o,r,i){return ko.bindingHandlers.sortable.update(e,makeExtendedValueAccessor(n),o,r,i)}},ko.bindingHandlers.extdraggable={init:function(e,n,o,r,i){return ko.bindingHandlers.draggable.init(e,makeExtendedValueAccessor(n),o,r,i)},update:function(e,n,o,r,i){return ko.bindingHandlers.draggable.update(e,makeExtendedValueAccessor(n),o,r,i)}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3,"knockout-sortable":11}],53:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");ko.bindingHandlers.fudroppable={init:function(e,i){var o=i()||{},l={},r=function(e,i,o,l,r,a){e[i]?global.clearTimeout(e[i]):(void 0!==l&&o.classList.add(l),ko.isWriteableObservable(r)&&!r()&&r(!0));var n=function(){e[i]=null,void 0!==l&&o.classList.remove(l),ko.isWriteableObservable(r)&&r()&&r(!1)};"dragleave"==a.type?n():e[i]=global.setTimeout(n,500)};(o.active||o.activeClass)&&ko.utils.registerEventHandler(global,"dragover",r.bind(void 0,l,"activeTimeout",e,o.activeClass,o.active)),o.hoverClass&&ko.utils.registerEventHandler(e,"dragover dragenter dragleave",r.bind(void 0,l,"hoverTimeout",e,o.hoverClass,void 0))}},ko.bindingHandlers.fileupload={extendOptions:{},init:function(e,i){ko.utils.domNodeDisposal.addDisposeCallback(e,function(){$(e).fileupload("destroy")}),!("WebkitAppearance"in global.document.documentElement.style)||"webkitNbspMode"in global.document.documentElement.style||"StyleMedia"in global?$(e).attr("title",""):$(e).attr("title"," ")},update:function(e,i){var o=i()||{},l=$(e),r=l.parents(".uploadzone"),a=o.data;o.data=void 0;var n=o.canvasPreview;ko.utils.extend(o,{url:"/upload/",dataType:"json",dropZone:r.find(".mo-uploadzone")[0],autoUpload:!0,acceptFileTypes:/(\.|\/)(gif|jpe?g|png)$/i,maxFileSize:1048576,disableImageResize:/Android(?!.*Chrome)|Opera/.test(global.navigator.userAgent),previewMaxWidth:200,previewMaxHeight:200,previewCrop:!1,replaceFileInput:!1,messages:{unknownError:"Unknown error",uploadedBytes:"Uploaded bytes exceed file size",maxNumberOfFiles:"Maximum number of files exceeded",acceptFileTypes:"File type not allowed",maxFileSize:"File is too large",minFileSize:"File is too small",post_max_size:"The uploaded file exceeds the post_max_size directive in php.ini",max_file_size:"File is too big",min_file_size:"File is too small",accept_file_types:"Filetype not allowed",max_number_of_files:"Maximum number of files exceeded",max_width:"Image exceeds maximum width",min_width:"Image requires a minimum width",max_height:"Image exceeds maximum height",min_height:"Image requires a minimum height",abort:"File upload aborted",image_resize:"Failed to resize image",generic:"Unexpected upload error"}}),ko.utils.extend(o,ko.bindingHandlers.fileupload.extendOptions);var s=0,t="",d=function(){0==--s&&(a&&a(t),t="",n&&(r.find("img").show(),r.find("canvas").remove()),r.removeClass("uploading"),r.find(".progress-bar").css("width",0))},u=function(e){if("object"==typeof o.messages&&null!==o.messages){var i=e.match(/^([^ ]+)(.*)$/);if(i&&void 0!==o.messages[i[1]])return o.messages[i[1]]+i[2]}return e};o.uploadToTemplate?o.url=ko.bindingHandlers.fileupload.extendOptions.url.template:o.url=ko.bindingHandlers.fileupload.extendOptions.url.mailing,l.fileupload(o);for(var p=["fileuploadadd","fileuploadprocessalways","fileuploadprogressall","fileuploaddone","fileuploadfail"],f=function(e,i){if("fileuploadadd"==e.type&&s++,"fileuploadfail"==e.type&&(console.log("fileuploadfail",e,i),o.onerror&&(""===i.errorThrown&&"error"==i.textStatus?o.onerror(u("generic")):o.onerror(u("generic ("+i.errorThrown+")"))),d()),"fileuploaddone"==e.type)if(void 0!==i.result.files[0].url){if(o.onfile)for(var l=0;l<i.result.files.length;l++)i.result.files[l]=ko.bindingHandlers.fileupload.remoteFilePreprocessor(i.result.files[l]),o.onfile(i.result.files[l]);if(""===t&&(t=i.result.files[0].url),n){var a=new Image;a.onload=d,a.onerror=d,a.src=i.result.files[0].url}else d()}else void 0!==i.result.files[0].error?(console.log("remote error",e,i),o.onerror&&o.onerror(u(i.result.files[0].error)),d()):(console.log("unexpected error",e,i),o.onerror&&o.onerror(u("generic (Unexpected Error retrieving uploaded file)")),d());if("fileuploadprocessalways"==e.type){var p=i.index,f=i.files[p];if(f.preview&&0===p&&0===r.find("canvas").length){if(n){var m=$(f.preview).css("width","100%");r.find("img").hide(),r.prepend(m)}r.addClass("uploading"),r.find(".progress-bar").css("width",0)}f.error&&(o.onerror&&o.onerror(u(f.error)),d())}if("fileuploadprogressall"==e.type){var g=parseInt(i.loaded/i.total*100,10);r.find(".progress-bar").css("width",g+"%")}},m=p.length-1;m>=0;m--){var g=p[m];l.on(g,f)}$.support.fileInput||l.prop("disabled",!0).parent().addClass("disabled")}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],54:[function(require,module,exports){
(function (global){
"use strict";var beforeSubscriptionProp,afterSubscriptionProp,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");if(ko.bindingHandlers.ifSubs={cloneNodes:function(o,e){for(var i=0,n=o.length,r=[];i<n;i++){var s=o[i].cloneNode(!0);r.push(e?ko.cleanNode(s):s)}return r},init:function(o,e,i,n,r){var s,t,u=e();return void 0===u.data.subsCount&&ko.extenders.subscriptionsCount(u.data),ko.computed(function(){var i,n,b=ko.utils.unwrapObservable(e().data.subsCount),p=!t;n=-(void 0!==e().gutter?e().gutter:1),i=b+(s?n:0)>=ko.utils.unwrapObservable(u.threshold),void 0!==e().not&&e().not&&(i=!i),(p||i!==s)&&(p&&ko.computedContext.getDependenciesCount()&&(t=ko.bindingHandlers.ifSubs.cloneNodes(ko.virtualElements.childNodes(o),!0)),i?(p||ko.virtualElements.setDomNodeChildren(o,ko.bindingHandlers.ifSubs.cloneNodes(t)),ko.applyBindingsToDescendants(r,o)):ko.virtualElements.emptyNode(o),s=i)},null,{disposeWhenNodeIsRemoved:o}),{controlsDescendantBindings:!0}}},ko.virtualElements.allowedBindings.ifSubs=!0,"function"==typeof ko.subscription&&void 0!==ko.isWritableObservable)beforeSubscriptionProp="beforeSubscriptionAdd",afterSubscriptionProp="afterSubscriptionRemove";else if("3.2.0"==ko.version)beforeSubscriptionProp="va",afterSubscriptionProp="nb";else if("3.3.0"==ko.version)beforeSubscriptionProp="ja",afterSubscriptionProp="ua";else if("3.4.0"==ko.version)beforeSubscriptionProp="sa",afterSubscriptionProp="Ia";else if("3.4.1"==ko.version)beforeSubscriptionProp="sa",afterSubscriptionProp="Ia";else if("3.4.2"==ko.version)beforeSubscriptionProp="ua",afterSubscriptionProp="Ka";else{if("3.5.0-beta"!=ko.version)throw"Unsupported minimized Knockout version "+ko.version+" (supported DEBUG or minimized 3.2.0 ... 3.5.0-beta)";beforeSubscriptionProp="Pa",afterSubscriptionProp="ab"}ko.extenders.subscriptionsCount=function(o,e,i){if(void 0===o.subsCount){o.subsCount=ko.observable(o.getSubscriptionsCount()).extend({notify:"always"});var n=o[beforeSubscriptionProp],r=o[afterSubscriptionProp];o[beforeSubscriptionProp]=function(r){n&&n.call(o,r);var s=o.getSubscriptionsCount()+1;void 0!==e&&s!=e&&void 0!==i&&s!=i||o.subsCount(s)},o[afterSubscriptionProp]=function(n){r&&r.call(o,n);var s=o.getSubscriptionsCount();void 0!==e&&s!=e&&void 0!==i&&s!=i||o.subsCount(s)}}else console.log("already applied subscriptionCount to observable");return null};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],55:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,spinner="undefined"!=typeof window?window.jQuery.ui.spinner:"undefined"!=typeof global?global.jQuery.ui.spinner:null,console=require("console-browserify");if(void 0===spinner)throw"Cannot find jquery-ui spinner widget dependency!";$.widget("ui.spinner",spinner,{_adjustValue:function(n){this._super(n);var e=this.options;return n=parseFloat(n.toFixed(this._precision())),null!==e.max&&n>e.max?e.max:null!==e.min&&n<e.min?e.min:n}});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],56:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,console=require("console-browserify"),tabs="undefined"!=typeof window?window.jQuery.ui.tabs:"undefined"!=typeof global?global.jQuery.ui.tabs:null;if(void 0===tabs)throw"Cannot find jquery-ui tabs widget dependency!";$.widget("ui.tabs",tabs,{_isLocal:function(e){return"true"==e.getAttribute("data-local")||this._superApply(arguments)}});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],57:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null;ko.bindingHandlers.preloader={init:function(e,o){var d=o();if(void 0===d.preloaded){d.preloaded=ko.observable("");var n=function(e){if(e!=d.preloaded())if(""!==e){var o=new Image;o.onload=function(){d.preloaded(e)},o.onerror=function(){d.preloaded(e)},o.src=e}else d.preloaded(e)};d.subscribe(n),n(d())}}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],58:[function(require,module,exports){
(function (global){
"use strict";function pushTemplate(e,t){var n=global.document.createElement("script");n.setAttribute("type","text/html"),n.setAttribute("id",e),n.text=t,global.document.body.appendChild(n)}function removeTemplate(e){var t=global.document.getElementById(e);t&&t.parentNode.removeChild(t)}function init(){}function getTemplateContent(e){var t=global.document.getElementById(e);return t?t.innerHTML:void 0}module.exports={init:init,addTemplate:pushTemplate,removeTemplate:removeTemplate,getTemplateContent:getTemplateContent};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],59:[function(require,module,exports){
(function (global){
"use strict";var timeout,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,console=require("console-browserify"),tinymce="undefined"!=typeof window?window.tinymce:"undefined"!=typeof global?global.tinymce:null,render=function(){if(timeout=void 0,void 0!==tinymce.activeEditor&&null!==tinymce.activeEditor&&void 0!==tinymce.activeEditor.theme&&null!==tinymce.activeEditor.theme&&void 0!==tinymce.activeEditor.theme.panel&&null!==tinymce.activeEditor.theme.panel){(void 0!==tinymce.activeEditor.theme.panel._visible&&tinymce.activeEditor.theme.panel._visible&&tinymce.activeEditor.theme.panel._fixed||void 0!==tinymce.activeEditor.theme.panel.state&&tinymce.activeEditor.theme.panel.state.get("visible")&&tinymce.activeEditor.theme.panel.state.get("fixed"))&&tinymce.activeEditor.theme.panel.fixed(!1);var e=void 0!==tinymce.activeEditor.bodyElement?tinymce.activeEditor.bodyElement:tinymce.activeEditor.dom.settings.root_element;null!==e&&void 0!==e.classList&&e.classList.contains("mce-edit-focus")&&(tinymce.activeEditor.nodeChanged(),tinymce.activeEditor.theme.panel.visible(!0),tinymce.activeEditor.theme.panel.layoutRect().y<=40&&tinymce.activeEditor.theme.panel.moveBy(0,40-tinymce.activeEditor.theme.panel.layoutRect().y))}};ko.bindingHandlers.wysiwygScrollfix={scroll:function(e){timeout&&global.clearTimeout(timeout),timeout=global.setTimeout(render,50)},init:function(e){ko.utils.domNodeDisposal.addDisposeCallback(e,function(){$(e).off("scroll",ko.bindingHandlers.wysiwygScrollfix.scroll)}),$(e).on("scroll",ko.bindingHandlers.wysiwygScrollfix.scroll)}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],60:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify"),_scrollIntoView=function(o,e,l,n){var i=l.scrollTop(),t=i-n-(e?20:-20);if(void 0!==l[0].nodeType){var r={scrollTop:Math.round(t)+"px"},s=Math.round(Math.abs(t-i));l.stop().animate(r,s)}else l.scrollTop(t)};ko.bindingHandlers.scrollIntoView={update:function(o,e,l,n,i){if(ko.utils.unwrapObservable(e()))try{for(;8===o.nodeType;)o=o.nextSibling;if(8!==o.nodeType){var t,r=$(o).scrollParent(),s=!1;9==r[0].nodeType?(r=$(r[0].defaultView),t=0,s=!0):t=r.offset().top;var a=r.height(),d=r.scrollTop(),c=t+a,f=$(o),w=f.offset().top;s&&(w-=d);var p=f.height(),u=w+p;w>t&&w+p<c||(p<a?(w<t&&_scrollIntoView(o,!0,r,t-w),u>c&&_scrollIntoView(o,!1,r,c-u)):(w<t&&u<c&&_scrollIntoView(o,!1,r,c-u),w>t&&u>c&&_scrollIntoView(o,!0,r,t-w)))}}catch(o){console.log("TODO exception scrolling into view",o)}}},ko.virtualElements.allowedBindings.scrollIntoView=!0;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],61:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,origTemplateSystem=require("./script-template.js"),templates={};function createStringTemplateEngine(e){var t=e.makeTemplateSource;return e.makeTemplateSource=function(e){return void 0!==templates[e]?new ko.templateSources.stringTemplate(e,templates[e]):t(e)},e}function pushTemplate(e,t){templates[e]=t}function removeTemplate(e){void 0!==templates[e]?templates[e]=void 0:origTemplateSystem.removeTemplate(e)}function init(){ko.setTemplateEngine(createStringTemplateEngine(new ko.nativeTemplateEngine))}function getTemplateContent(e){return void 0!==templates[e]?templates[e]:origTemplateSystem.getTemplateContent(e)}ko.templateSources.stringTemplate=function(e,t){this.templateName=e,this.template=t,this._data={}},ko.utils.extend(ko.templateSources.stringTemplate.prototype,{data:function(e,t){if(1===arguments.length)return this._data[e];this._data[e]=t},text:function(e){if(0===arguments.length)return this.template;this.template=e}}),module.exports={init:init,addTemplate:pushTemplate,removeTemplate:removeTemplate,getTemplateContent:getTemplateContent};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./script-template.js":58}],62:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,kojqui="undefined"!=typeof window?window.kojqui:"undefined"!=typeof global?global.kojqui:null,console=require("console-browserify"),extendValueAccessor=function(o,n){return function(){return ko.utils.extend(n,o()),n}},options={show:{delay:500},track:!0,items:'[title][title!=""][title!=" "]'};ko.bindingHandlers.tooltips={init:function(o,n,i,e,t){if(void 0!==$.fn.tooltip&&void 0!==ko.bindingHandlers.tooltip)return ko.bindingHandlers.tooltip.init(o,extendValueAccessor(n,options),i,e,t)},update:function(o,n,i,e,t){if(void 0!==$.fn.tooltip&&void 0!==ko.bindingHandlers.tooltip)return ko.bindingHandlers.tooltip.update(o,extendValueAccessor(n,options),i,e,t)}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],63:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");ko.bindingHandlers.validatedValue={init:function(e,n,i){var o=n;if(void 0!==e.pattern){var t=new RegExp("^(?:"+e.pattern+")$"),a=ko.computed({read:function(){var i=ko.utils.unwrapObservable(n());return null===i||""===i||t.test(i)?e.classList.remove("invalid"):e.classList.add("invalid"),i},write:ko.isWriteableObservable(n())&&function(i){ko.selectExtensions.writeValue(e,i);var o=ko.selectExtensions.readValue(e);n()(o)},disposeWhenNodeIsRemoved:e});o=function(){return a}}ko.bindingHandlers.value.init(e,o,i)}},ko.expressionRewriting._twoWayBindings.validatedValue=!0;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],64:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");ko.bindingHandlers.uniqueId={currentIndex:0,init:function(e,n){var t=ko.utils.unwrapObservable(n())||{};if(""===t.id()){var i,l,r;r="ko_"+(void 0!==t.type?ko.utils.unwrapObservable(t.type):"block");do{i=r+"_"+ ++ko.bindingHandlers.uniqueId.currentIndex,l=global.document.getElementById(i)}while(l);t.id(i)}}},ko.virtualElements.allowedBindings.uniqueId=!0,ko.bindingHandlers.virtualAttr={update:function(e,n){8!==e.nodeType&&ko.bindingHandlers.attr.update(e,n)}},ko.virtualElements.allowedBindings.virtualAttr=!0,ko.bindingHandlers.virtualAttrStyle={update:function(e,n,t,i,l){if(8!==e.nodeType){var r=["style"];(void 0===l.templateMode||"wysiwyg"!=l.templateMode)&&r.push("replacedstyle");for(var o=ko.utils.unwrapObservable(n()),d=0;d<r.length;d++){var a=r[d];!1===o||null==o?e.removeAttribute(a):e.setAttribute(a,o.toString())}}}},ko.virtualElements.allowedBindings.virtualAttrStyle=!0,ko.bindingHandlers.virtualStyle={update:function(e,n){8!==e.nodeType&&ko.bindingHandlers.style.update(e,n)}},ko.virtualElements.allowedBindings.virtualStyle=!0,ko.bindingHandlers.virtualHtml={init:ko.bindingHandlers.html.init,update:function(e,n){if(8===e.nodeType){var t=ko.utils.unwrapObservable(n());if(ko.virtualElements.emptyNode(e),null!=t){"string"!=typeof t&&(t=t.toString());var i=ko.utils.parseHtmlFragment(t);if(i)for(var l=e.nextSibling,r=0,o=i.length;r<o;r++)l.parentNode.insertBefore(i[r],l)}}else ko.bindingHandlers.html.update(e,n);return{controlsDescendantBindings:!0}}},ko.virtualElements.allowedBindings.virtualHtml=!0;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],65:[function(require,module,exports){
(function (global){
"use strict";var tinymce="undefined"!=typeof window?window.tinymce:"undefined"!=typeof global?global.tinymce:null,$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");require("./eventable.js"),ko.bindingHandlers.wysiwygOrHtml={init:function(e,i,n,t,o){return void 0===o.templateMode||"wysiwyg"!=o.templateMode?ko.bindingHandlers.virtualHtml.init():ko.bindingHandlers.wysiwyg.init(e,i,n,t,o)},update:function(e,i,n,t,o){if(void 0===o.templateMode||"wysiwyg"!=o.templateMode)return ko.bindingHandlers.virtualHtml.update(e,i,n,t,o)}},ko.virtualElements.allowedBindings.wysiwygOrHtml=!0,ko.bindingHandlers.wysiwygHref={init:function(e,i,n,t,o){if(8!==e.nodeType){i();if(void 0===o.templateMode||"wysiwyg"!=o.templateMode)e.setAttribute("target","_new");else void 0!==n().wysiwygOrHtml?e.setAttribute("href","javascript:void(0)"):(e.removeAttribute("href"),e.setAttribute("disabledhref","#"))}},update:function(e,i,n,t,o){if(8!==e.nodeType){var l=void 0===o.templateMode||"wysiwyg"!=o.templateMode,s=ko.utils.unwrapObservable(i());l&&(!1===s||null==s?e.removeAttribute("href"):e.setAttribute("href",s.toString()))}}},ko.virtualElements.allowedBindings.wysiwygHref=!0,ko.bindingHandlers.wysiwygSrc={convertedUrl:function(e,i,n,t){var o=-1==e.indexOf("?")?"?":"&";return e+o+"method="+i+"&width="+n+(null!==t?"&height="+t:"")},placeholderUrl:function(e,i,n){},update:function(e,i,n,t,o){var l=ko.utils.unwrapObservable(i()),s=ko.utils.unwrapObservable(l.src),r=ko.utils.unwrapObservable(l.placeholder),a=ko.utils.unwrapObservable(l.width),d=ko.utils.unwrapObservable(l.height);if(!1===s||null==s||""===s)"object"==typeof r&&null!==r?e.setAttribute("src",ko.bindingHandlers.wysiwygSrc.placeholderUrl(r.width,r.height,r.text)):e.removeAttribute("src");else{var g=ko.utils.unwrapObservable(l.method);g||(g=a>0&&d>0?"cover":"resize");var u=ko.bindingHandlers.wysiwygSrc.convertedUrl(s.toString(),g,a,d);e.setAttribute("src",u)}null!=a?e.setAttribute("width",a):e.removeAttribute("width"),null!=d?e.setAttribute("height",d):e.removeAttribute("height")}},ko.bindingHandlers.wysiwygId={init:function(e,i,n,t,o){void 0===o.templateMode||"wysiwyg"!=o.templateMode||e.setAttribute("id",ko.utils.unwrapObservable(i()))},update:function(e,i,n,t,o){void 0===o.templateMode||"wysiwyg"!=o.templateMode||e.setAttribute("id",ko.utils.unwrapObservable(i()))}},ko.virtualElements.allowedBindings.wysiwygId=!0,ko.bindingHandlers.wysiwygClick={init:function(e,i,n,t,o){void 0===o.templateMode||"wysiwyg"!=o.templateMode||ko.bindingHandlers.click.init(e,i,n,t,o)}},ko.virtualElements.allowedBindings.wysiwygClick=!0,ko.bindingHandlers.wysiwygCss={update:function(e,i,n,t,o){void 0===o.templateMode||"wysiwyg"!=o.templateMode||ko.bindingHandlers.css.update(e,i,n,t,o)}},ko.virtualElements.allowedBindings.wysiwygCss=!0,ko.bindingHandlers.wysiwygImg={makeTemplateValueAccessor:function(e,i){return function(){var n=void 0!==i.templateMode&&"wysiwyg"==i.templateMode,t=e(),o=ko.utils.peekObservable(t);return ko.utils.unwrapObservable(t),{name:n?o._editTemplate:o._template,templateEngine:ko.nativeTemplateEngine.instance}}},init:function(e,i,n,t,o){return ko.bindingHandlers.template.init(e,ko.bindingHandlers.wysiwygImg.makeTemplateValueAccessor(i,o))},update:function(e,i,n,t,o){return o=o.extend(i()),ko.bindingHandlers.template.update(e,ko.bindingHandlers.wysiwygImg.makeTemplateValueAccessor(i,o),n,t,o)}},ko.virtualElements.allowedBindings.wysiwygImg=!0;var _catchingFire=function(e,i){try{return this.originalFire.apply(this,arguments)}catch(i){console.warn("Cought tinymce exception while firing editor event",e,i)}};ko.bindingHandlers.wysiwyg={debug:!1,getContentOptions:{format:"raw"},useTarget:!1,currentIndex:0,standardOptions:{},initializingClass:"wysiwyg-loading",removeSelectionOnBlur:!0,emptyClass:void 0,fullOptions:{toolbar1:"bold italic forecolor backcolor hr styleselect removeformat | link unlink | pastetext code",plugins:["link hr paste lists textcolor code"]},init:function(e,i,n,t,o){ko.bindingHandlers.focusable.init(e);var l,s=ko.bindingHandlers.wysiwyg.debug&&"function"==typeof console.debug;ko.bindingHandlers.wysiwyg.useTarget?l="@target_"+ ++ko.bindingHandlers.wysiwyg.currentIndex:(l=e.getAttribute("id"))||(l="wysiwyg_"+ ++ko.bindingHandlers.wysiwyg.currentIndex,e.setAttribute("id",l)),ko.bindingHandlers.wysiwyg.initializingClass&&e.classList.add(ko.bindingHandlers.wysiwyg.initializingClass),ko.utils.domNodeDisposal.addDisposeCallback(e,function(){s&&console.debug("Editor for selector",l,"is being removed..."),tinymce.remove("#"+e.getAttribute("id")),s&&console.debug("Editor for selector",l,"has been removed.")});var r=i();if(!ko.isObservable(r))throw"Wysiwyg binding called with non observable";if(8===e.nodeType)throw"Wysiwyg binding called on virtual node, ignoring...."+e.innerHTML;var a,d="DIV"==e.tagName||"TD"==e.tagName,g=!1,u=!1,w={inline:!0,hidden_input:!1,plugins:["paste"],toolbar1:"bold italic",toolbar2:"",preview_styles:!1,paste_as_text:!0,language:"en",schema:"html5",extended_valid_elements:"strong/b,em/i,*[*]",menubar:!1,skin:"gray-flat",forced_root_block:d?"p":"",init_instance_callback:function(i){if(s&&console.debug("Editor for selector",l,"is now initialized."),ko.bindingHandlers.wysiwyg.initializingClass&&e.classList.remove(ko.bindingHandlers.wysiwyg.initializingClass),"function"==typeof console.debug){var n=e.currentStyle?e.currentStyle.display:global.getComputedStyle(e,null).display;"inline"==n&&console.debug("Initializing an editor on an inline element: please note that while it may work, this is unsupported because of a multitude of browser issues",e.tagName,n,l)}},setup:function(i){s&&console.debug("Editor for selector",l,"is now in the setup phase.");var n=function(){0==(e.textContent||e.innerText||"").trim().length?e.classList.add(ko.bindingHandlers.wysiwyg.emptyClass):e.classList.remove(ko.bindingHandlers.wysiwyg.emptyClass)};i.on("change redo undo",function(){if(!g)try{u=!0,r(i.getContent(ko.bindingHandlers.wysiwyg.getContentOptions))}catch(e){console.warn("Unexpected error setting content value for",l,e)}finally{u=!1}ko.bindingHandlers.wysiwyg.emptyClass&&n()}),ko.bindingHandlers.wysiwyg.emptyClass&&i.on("keyup",function(){n()}),i.on("focus",function(){i.nodeChanged(),i.getElement().click()}),ko.bindingHandlers.wysiwyg.removeSelectionOnBlur&&i.on("blur",function(e){global.getSelection().removeAllRanges()}),i.on("BeforeSetContent",function(e){e.initial&&(e.format="raw")}),void 0===i.originalFire&&(i.originalFire=i.fire,i.fire=_catchingFire),a=i}};return ko.bindingHandlers.wysiwyg.useTarget?w.target=e:w.selector="#"+l,ko.utils.extend(w,ko.bindingHandlers.wysiwyg.standardOptions),d&&ko.utils.extend(w,ko.bindingHandlers.wysiwyg.fullOptions),global.setTimeout(function(){s&&console.debug("Editor for selector",l,"is being inizialized ...");var e=tinymce.init(w);s&&console.debug("Editor for selector",l,"init has just been called returning",e),e.then(function(){s&&console.debug("Editor for selector",l,"init promise has resolved.")},function(e){console.log("Editor for selector",l,"init promise has failed.",e)})}),ko.computed(function(){var n=ko.utils.unwrapObservable(i());if(!u){try{g=!0,void 0!==a?a.setContent(n,{format:"raw"}):ko.utils.setHtml(e,n)}catch(e){console.warn("Exception setting content to editable element",typeof a,e)}g=!1}},null,{disposeWhenNodeIsRemoved:e}),{controlsDescendantBindings:!0}}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./eventable.js":49,"console-browserify":3}],66:[function(require,module,exports){
"use strict";var console=require("console-browserify"),checkModel=function(e,o,t,n,l){var i,f,r,a=0;if(void 0===l&&(l=!1),void 0!==o&&"function"==typeof o.splice)for(i={},f=0;f<o.length;f++)i[o[f].type]=o[f];else i=o;for(var p in e)if(e.hasOwnProperty(p))if(r=void 0!==n?n+"."+p:p,t.hasOwnProperty(p))if(typeof t[p]!=typeof e[p])null!==t[p]&&null!==e[p]&&("string"==typeof t[p]?String(e[p])!=e[p]&&(console.log("TODO Different type 1 ",r,typeof t[p],typeof e[p],t[p],e[p]),a=Math.max(a,2)):"number"==typeof t[p]?Number(e[p])!=e[p]&&(console.log("TODO Different type 2 ",r,typeof t[p],typeof e[p],t[p],e[p]),a=Math.max(a,2)):(console.log("TODO Different type 3 ",r,typeof t[p],typeof e[p],t[p],e[p]),a=Math.max(a,2)));else if("object"==typeof e[p])if(null!==e[p])if(void 0!==e[p].splice){if(e[p].length>0)if(t[p].length>0){var c=0;for(f=0;f<t[p].length;f++)if("string"==typeof t[p][f].type){for(;c<e[p].length&&e[p][c].type!==t[p][f].type;)console.log("ignoring ",r,e[p][c].type," block type in reference not found in model"),c++;if(c>=e[p].length){console.log("WARN cannot find ",r,t[p][f].type," block in reference"),a=Math.max(a,2);break}a=Math.max(a,checkModel(e[p][c],void 0,t[p][f],r+"["+f+"."+t[p][f].type+"]"))}}else for(f=0;f<e[p].length;f++)"string"!=typeof e[p][f].type?(console.log("TODO found an object with no type",r,e[p][f]),a=Math.max(a,2)):i.hasOwnProperty(e[p][f].type)?a=Math.max(a,checkModel(i[e[p][f].type],i,e[p][f],r+"["+f+"."+e[p][f].type+"]")):(console.warn("TODO the model uses a block type not defined by the template. REMOVING IT!!",r,e[p][f]),e[p].splice(f,1),f--,a=Math.max(a,2))}else null===t[p]?l?(console.log("WARN Null object in model ",r,"instead of",e[p],"deleting it"),a=Math.max(a,2),delete e[p]):(console.log("INFO Null object in model ",r,"instead of",e[p],"cloning it from the reference"),a=Math.max(a,1),t[p]=e[p]):a=Math.max(a,checkModel(e[p],i,t[p],r,l));else null!==t[p]&&(console.log("TODO Null in reference but not null in model",r,t[p]),a=Math.max(a,2));else"string"!=typeof e[p]&&"boolean"!=typeof e[p]&&"number"!=typeof e[p]&&(console.log("TODO unsupported type",r,typeof e[p]),a=Math.max(a,2));else l?(console.warn("WARN Property ",r,"found in model is not defined by template: removing it!"),a=Math.max(a,2),delete e[p]):(console.log("INFO Property ",r,"missing in model, cloning from reference!"),a=Math.max(a,1),t[p]=e[p]);return l||(a=Math.max(a,checkModel(t,o,e,void 0!==n?n+"!R":"!R",!0))),a};module.exports=checkModel;

},{"console-browserify":3}],67:[function(require,module,exports){
"use strict";var converterUtils=require("./utils.js"),cssParse=require("mensch/lib/parser.js"),console=require("console-browserify"),domutils=require("./domutils.js"),_declarationValueLookup=function(e,t,r){for(var l=e.length-1;l>=0;l--)if("property"==e[l].type&&e[l].name==t)return _declarationValueUrlPrefixer(e[l].value,r);return null},_propToCamelCase=function(e){return e.replace(/-([a-z])/g,function(e,t,r,l){return t.toUpperCase()})},_declarationValueUrlPrefixer=function(e,t){return e.match(/url\(.*\)/)?e.replace(/(url\()([^\)]*)(\))/g,function(e,r,l,i){var n=l.trim(),o=l.trim().charAt(0);"'"==o||'"'==o?n=n.substr(1,n.length-2):o="";var a=t(n);return null!==a?r+o+a+o+i:e}):e},elaborateDeclarations=function(e,t,r,l,i,n,o){var a="object"==typeof n&&null!==n?n:{},u=null,s=0;void 0===t&&(t=cssParse("#{\n"+e+"}",{comments:!0,position:!0}).stylesheet.rules[0].declarations,s=1);for(var v=t.length-1;v>=0;v--)if("property"==t[v].type)if(!0===o&&"display"==t[v].name&&"none"==t[v].value)null===u&&(u=e),u=converterUtils.removeStyle(u,t[v].position.start,t[v].position.end,s,0,0,"");else{var d=t[v].name.match(/^-ko-(bind-|attr-)?([a-z0-9-]*?)(-if|-ifnot)?$/);if(null!==d){null===u&&void 0!==e&&(u=e);var c,f,p,m="attr-"==d[1],y="bind-"==d[1],h=d[2],b="-if"==d[3]||"-ifnot"==d[3];if(b){if(c=t[v].name.substr(0,t[v].name.length-d[3].length),null===_declarationValueLookup(t,c,r))throw"Unable to find declaration "+c+" for "+t[v].name}else{if((m||y)&&void 0===i&&void 0!==e)throw"Attributes and bind declarations are only allowed in inline styles!";var S,g=!0;if(m?(p=domutils.getAttribute(i,h),g=!1,S="virtualAttr"):y?(S=null,"text"==h?void 0!==i?p=domutils.getInnerText(i):g=!1:"html"==h&&void 0!==i?p=domutils.getInnerHtml(i):g=!1):((g=void 0!==e)&&(p=_declarationValueLookup(t,h,r)),S="virtualStyle"),g&&null===p)throw console.error("Cannot find default value for",t[v].name,t),"Cannot find default value for "+t[v].name+": "+t[v].value+" in "+i+" ("+typeof e+"/"+h+")";var w=p,U=y||m?-1!=h.indexOf("-")?"'"+h+"'":h:_propToCamelCase(h);try{f=converterUtils.expressionBinding(t[v].value,l,w)}catch(e){throw console.error("Model ensure path failed",e.stack,"name",t[v].name,"value",t[v].value,"default",p,"element",i),e}null!==S&&void 0===a[S]&&(a[S]={}),"virtualAttr"==S&&"href"==U&&(S=null,U="wysiwygHref",null!=i&&domutils.removeAttribute(i,"href"));var x=_declarationValueLookup(t,t[v].name+"-if",r),_=!1;if(null===x)x=_declarationValueLookup(t,t[v].name+"-ifnot",r),_=!0;else if(null!==_declarationValueLookup(t,t[v].name+"-ifnot",r))throw"Unexpected error: cannot use both -if and -ifnot property conditions";if(null!==x)try{f=(_?"!":"")+"("+converterUtils.conditionBinding(x,l)+") ? "+f+" : null"}catch(e){throw console.error("Unable to deal with -ko style binding condition",x,t[v].name),e}null!==S?a[S][U]=f:a[U]=f}if(null!==u)try{if(null!=i)u=converterUtils.removeStyle(u,t[v].position.start,t[v].position.end,s,0,0,"");else{var A="";b||(A=h+": \x3c!-- ko text: "+f+" --\x3e"+p+"\x3c!-- /ko --\x3e"),u=converterUtils.removeStyle(u,t[v].position.start,t[v].position.end,s,0,0,A)}}catch(e){throw console.warn("Remove style failed",e,"name",t[v]),e}}else{var k=_declarationValueUrlPrefixer(t[v].value,r);if(k!=t[v].value&&(null===u&&void 0!==e&&(u=e),null!==u))try{u=converterUtils.removeStyle(u,t[v].position.start,t[v].position.end,s,0,0,t[v].name+": "+k)}catch(e){throw console.log("Remove style failed replacing url",e,"name",t[v]),e}var C=_propToCamelCase(t[v].name),V="virtualAttrStyle",P=void 0!==a.virtualStyle?a.virtualStyle[C]:void 0,j=" ";void 0===a[V]&&(a[V]="''",j=""),void 0!==P?(a[V]="'"+t[v].name+": '+("+P+")+';"+j+"'+"+a[V],delete a.virtualStyle[C]):a[V]="'"+t[v].name+": "+converterUtils.addSlashes(k)+";"+j+"'+"+a[V]}}if(null!=i){for(var z in a.virtualStyle)if(a.virtualStyle.hasOwnProperty(z))throw console.log("Unexpected virtualStyle binding after conversion to virtualAttr.style",z,a.virtualStyle[z],e),"Unexpected virtualStyle binding after conversion to virtualAttr.style for "+z;delete a.virtualStyle;var L=domutils.getAttribute(i,"data-bind"),q=(null!==L?L+", ":"")+_bindingSerializer(a);domutils.setAttribute(i,"data-bind",q)}if(void 0===e){var O=!1;for(var T in a.virtualStyle)if(a.virtualStyle.hasOwnProperty(T)){O=!0;break}if(O){if(void 0!==a.virtualAttrStyle){var B=a.virtualAttrStyle;delete a.virtualAttrStyle,a.virtualAttrStyle=B}}else delete a.virtualStyle;return _bindingSerializer(a)}return u},_bindingSerializer=function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&("object"==typeof e[r]?t.push(r+": { "+_bindingSerializer(e[r])+" }"):t.push(r+": "+e[r]));return t.reverse().join(", ")};module.exports=elaborateDeclarations;

},{"./domutils.js":68,"./utils.js":74,"console-browserify":3,"mensch/lib/parser.js":19}],68:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null;function _extend(e,t){if(t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var objExtend=function(e,t){return"function"==typeof $.extend?$.extend(!0,e,t):_extend(e,JSON.parse(JSON.stringify(t)))},getAttribute=function(e,t){var n=$(e).attr(t);return void 0===n&&(n=null),n},setAttribute=function(e,t,n){$(e).attr(t,n)},removeAttribute=function(e,t){$(e).removeAttr(t)},getInnerText=function(e){return $(e).text()},getInnerHtml=function(e){return $(e).html()},getLowerTagName=function(e){return""===e.tagName&&"string"==typeof e.name?e.name.toLowerCase():""!==e.tagName?e.tagName.toLowerCase():$(e).prop("tagName").toLowerCase()},setContent=function(e,t){$(e).html(t)},replaceHtml=function(e,t){$(e).replaceWith(t)},removeElements=function(e,t){t&&void 0!==e.detach&&e.detach(),e.remove()};module.exports={getAttribute:getAttribute,setAttribute:setAttribute,removeAttribute:removeAttribute,getInnerText:getInnerText,getInnerHtml:getInnerHtml,getLowerTagName:getLowerTagName,setContent:setContent,replaceHtml:replaceHtml,removeElements:removeElements,objExtend:objExtend};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],69:[function(require,module,exports){
"use strict";var console=require("console-browserify"),elaborateDeclarations=require("./declarations.js"),utils=require("./utils.js"),modelDef=require("./model.js"),_getOptionsObject=function(e){for(var t=e.split("|"),o={},i=0;i<t.length;i++){var l=t[i].split("=");o[l[0].trim()]=l.length>1?l[1].trim():l[0].trim()}return o},_filterProps=function(e,t,o){var i=[];for(var l in e)if(!l.match(/^customStyle$/)&&!l.match(/^_/)&&e.hasOwnProperty(l)){var a=null!==e[l]&&void 0!==e[l]._category&&"style"==e[l]._category;if("id"==l||"type"==l||l.match(/Blocks$/));else if("styler"==t)(a||o>0)&&i.push(l);else if("edit"==t){null!==e[l]&&void 0!==e[l]._category&&"content"==e[l]._category&&(void 0===e[l]._context||"block"!=e[l]._context)&&i.push(l)}else void 0===t&&i.push(l)}return i},_propInput=function(e,t,o,i,l){var a,n="";if(null!==e&&void 0!==e._widget&&(a=e._widget),void 0===a)throw"Unknown data type for "+t;var s="focusable: true";if("edit"==i&&(s+=", event: { focus: function(ui, event) { $($element).click(); } } "),n+='<label class="data-'+a+'"'+("boolean"==a?" data-bind=\"event: { mousedown: function(ui, evt) { if (evt.button == 0) { var input = $($element).find('input'); var ch = input.prop('checked'); setTimeout(function() { input.click(); input.prop('checked', !ch); input.trigger('change'); }, 0); } } }, click: function(ui, evt) { evt.preventDefault(); }, clickBubble: false\"":"")+">",void 0!==l&&void 0!==l[a]){var d=l[a],r={};if(void 0!==d.parameters)for(var c in d.parameters)d.parameters.hasOwnProperty(c)&&void 0!==e["_"+c]&&(r[c]=e["_"+c]);n+=d.html(o,s,r)}else if("boolean"==a)n+='<input type="checkbox" value="nothing" data-bind="checked: '+o+", "+s+'" />',n+='<span class="checkbox-replacer" ></span>';else if("color"==a)n+='<input size="7" type="text" data-bind="colorpicker: { color: '+o+", strings: $root.t('Theme Colors,Standard Colors,Web Colors,Theme Colors,Back to Palette,History,No history yet.') }, , "+s+'" />';else if("select"==a){if(void 0!==e._options){var p=_getOptionsObject(e._options);for(var v in n+='<select data-bind="value: '+o+", "+s+'">',p)p.hasOwnProperty(v)&&(n+='<option value="'+v+"\" data-bind=\"text: $root.ut('template', '"+utils.addSlashes(p[v])+"')\">"+p[v]+"</option>");n+="</select>"}}else if("font"==a)n+='<select type="text" data-bind="value: '+o+", "+s+'">',n+='<optgroup label="Sans-Serif Fonts">',n+='<option value="Arial,Helvetica,sans-serif">Arial</option>',n+="<option value=\"'Comic Sans MS',cursive,sans-serif\">Comic Sans MS</option>",n+='<option value="Impact,Charcoal,sans-serif">Impact</option>',n+="<option value=\"'Trebuchet MS',Helvetica,sans-serif\">Trebuchet MS</option>",n+='<option value="Verdana,Geneva,sans-serif">Verdana</option>',n+="</optgroup>",n+='<optgroup label="Serif Fonts">',n+='<option value="Georgia,serif">Georgia</option>',n+="<option value=\"'Times New Roman',Times,serif\">Times New Roman</option>",n+="</optgroup>",n+='<optgroup label="Monospace Fonts">',n+="<option value=\"'Courier New',Courier,monospace\">Courier New</option>",n+="</optgroup>",n+="</select>";else if("url"==a)n+='<div class="ui-textbutton">',n+='<input class="ui-textbutton-input" size="7" type="url" pattern="(mailto:.+@.+|https?://.+\\..+|\\[.*\\].*)" value="nothing" data-bind="css: { withButton: typeof $root.linkDialog !== \'undefined\' }, validatedValue: '+o+", "+s+'" />',n+="<a class=\"ui-textbutton-button\" data-bind=\"visible: typeof $root.linkDialog !== 'undefined', click: typeof $root.linkDialog !== 'undefined' ? $root.linkDialog.bind($element.previousSibling) : false, button: { icons: { primary: 'fa fa-fw fa-ellipsis-h' }, label: 'Opzioni', text: false }\">Opzioni</a>",n+="</div>";else if("integer"==a){var u=0,b=1e3;null!==e&&void 0!==e._max&&(b=e._max),null!==e&&void 0!==e._min&&(u=e._min);var f=b-u>=100?10:1;n+='<input class="number-spinner" size="7" step="'+f+'" type="number" value="-1" data-bind="spinner: { min: '+u+", max: "+b+", page: "+5*f+", value: "+o+" }, valueUpdate: ['change', 'spin'], "+s+'" />'}else n+='<input size="7" type="text" value="nothing" data-bind="value: '+o+", "+s+'" />';return n+="</label>"},_getGlobalStyleProp=function(e,t,o,i){var l;return"object"==typeof t&&null!==t&&void 0===t._widget||void 0!==o&&void 0!==i&&i.length>0&&"object"==typeof e&&void 0!==e[i]&&(l=e[i]),l},_propEditor=function(e,t,o,i,l,a,n,s,d,r,c,p,v,u,b){if(void 0===d&&(d=0),void 0!==n&&"object"==typeof i&&null!==i&&void 0===i._usecount)return"function"==typeof console.debug&&console.debug("Ignoring",a,"property because it is not used by the template","prop:",n,"type:",s,"level:",d,e._templateName),"";var f,h=void 0!==p?n+"._defaultComputed":n,m="",g=h,_=1,y=1;if("object"==typeof i&&null!==i&&void 0===i._widget||void 0===p&&(_+=1),void 0===p&&void 0!==r&&(y+=r),void 0!==n&&v&&(m+="\x3c!-- ko ifSubs: { data: "+g+", threshold: "+y+", gutter: "+_+" } --\x3e"),void 0===n||null!==i&&void 0!==i._name||console.log("Missing label for property ",n),void 0===n&&null!==i&&void 0===i._name&&"theme"!==i.type&&console.log("Missing label for object ",i.type),"object"==typeof i&&null!==i&&void 0===i._widget){var k=_filterProps(i,s,d),x="styler"==s&&null!==i&&void 0!==i.customStyle&&void 0!==p,S="",w="";void 0!==n&&"edit"==s&&(S=", click: function(obj, evt) { $root.selectItem("+n+", $data); return false }, clickBubble: false, css: { selecteditem: $root.isSelectedItem("+n+") }, scrollIntoView: $root.isSelectedItem("+n+"), ",w+=" selectable"),x&&(w+=" supportsCustomStyles"),m+='<div class="objEdit level'+d+w+'" data-bind="tooltips: {}'+S+'">';var $,j,D,B=null!==i&&void 0!==i._name?i._name:void 0!==n?"["+n+"]":"";if(x){var E="Stile";null!=l&&void 0!==l._name?E=l._name:console.log("Missing label for theme section ",n,null!==i?i.type:"-"),B="<span class=\"blockSelectionMethod\" data-bind=\"text: customStyle() ? $root.ut('template', '"+utils.addSlashes(B)+"') : $root.ut('template', '"+utils.addSlashes(E)+"')\">Block</span>"}else B="<span data-bind=\"text: $root.ut('template', '"+utils.addSlashes(B)+"')\">"+B+"</span>";if(m+="<span"+(f=null!==i&&void 0!==i._help?' title="'+utils.addSlashes(i._help)+"\" data-bind=\"attr: { title: $root.ut('template', '"+utils.addSlashes(i._help)+"') }\"":"")+' class="objLabel level'+d+'">'+B+"</span>","edit"==s&&void 0!==i._blockDescription&&(m+="<div class=\"blockDescription\" data-bind=\"html: $root.ut('template', '"+utils.addSlashes(i._blockDescription)+"')\">"+i._blockDescription+"</div>"),x&&(m+='<label class="data-boolean blockCheck" data-bind="tooltips: { }">',m+='<input type="checkbox" value="nothing" data-bind="focusable: true, checked: customStyle" />',m+='<span title="Switch between global and block level styles editing" data-bind="attr: { title: $root.t(\'Switch between global and block level styles editing\') }" class="checkbox-replacer checkbox-replacer-onoff"></span>',m+="</label>",m+="\x3c!-- ko template: { name: 'customstyle', if: customStyle } --\x3e\x3c!-- /ko --\x3e"),void 0!==n)if(m+="\x3c!-- ko with: "+n+" --\x3e",1==d&&void 0!==n)if(void 0!==i._previewBindings&&void 0!==e)void 0!==u&&(m+='\x3c!-- ko with: $root.content() --\x3e<div class="objPreview" data-bind="'+u+'"></div>\x3c!-- /ko --\x3e'),void 0!==b&&(m+='\x3c!-- ko with: $parent --\x3e<div class="objPreview" data-bind="'+b+'"></div>\x3c!-- /ko --\x3e'),m+='<div class="objPreview"><div class="objPreviewInner" data-bind="'+elaborateDeclarations(void 0,i._previewBindings,o,e.bind(this,a+"."))+'"></div></div>';0===d&&void 0!==i._previewBindings&&($=elaborateDeclarations(void 0,i._previewBindings,o,e.bind(this,a.length>0?a+".":"")));var C,I=m.length;for(j=0;j<k.length;j++)D=a.length>0?a+"."+k[j]:k[j],"object"==typeof i[k[j]]&&null!==i[k[j]]&&void 0===i[k[j]]._widget||(C=void 0,0===d&&"theme"==k[j]?m+=_propEditor(e,t,o,i[k[j]],void 0,D,k[j],s,0,r,void 0,void 0,v,u):(C=_getGlobalStyleProp(c,i[k[j]],k[j],D),m+=_propEditor(e,t,o,i[k[j]],void 0,D,k[j],s,d+1,r,c,C,v,u,$)));for(j=0;j<k.length;j++)D=a.length>0?a+"."+k[j]:k[j],"object"==typeof i[k[j]]&&null!==i[k[j]]&&void 0===i[k[j]]._widget&&(C=void 0,0===d&&"theme"==k[j]?m+=_propEditor(e,t,o,i[k[j]],void 0,D,k[j],s,0,r,void 0,void 0,v,u):(C=_getGlobalStyleProp(c,i[k[j]],k[j],D),m+=_propEditor(e,t,o,i[k[j]],void 0,D,k[j],s,d+1,r,c,C,v,u,$)));if(0===m.length-I){if("object"==typeof i&&null!==i&&"template"==i._context)return"";m+='<div class="objEmpty" data-bind="html: $root.t(\'Selected element has no editable properties\')">Selected element has no editable properties</div>'}void 0!==n&&(m+="\x3c!-- /ko --\x3e"),m+="</div>"}else{var P=!0;if(void 0===c&&(P=!1),null===i||"object"!=typeof i||void 0!==i._widget){var M=[];void 0!==p&&M.push("css: { notnull: "+n+"() !== null }"),(f=null!==i&&void 0!==i._help?' title="'+utils.addSlashes(i._help)+"\" data-bind=\"attr: { title: $root.ut('template', '"+utils.addSlashes(i._help)+"') }\"":"").length>0&&M.push("tooltips: {}"),m+='<div class="propEditor '+(P?"checkboxes":"")+'"'+(M.length>0?'data-bind="'+utils.addSlashes(M.join())+'"':"")+">";var T=null!==i&&void 0!==i._name?i._name:void 0!==n?"["+n+"]":"";m+="<span"+f+' class="propLabel">'+(T="<span data-bind=\"text: $root.ut('template', '"+utils.addSlashes(T)+"')\">"+T+"</span>")+"</span>",m+='<div class="propInput '+(void 0!==c?"local":"")+'" data-bind="css: { default: '+n+'() === null }">',m+=_propInput(i,n,h,s,t),m+="</div>",void 0!==p&&(m+='<div class="propInput global" data-bind="css: { overridden: '+n+'() !== null }">',m+=_propInput(i,n,p,s,t),m+="</div>",P&&(m+='<div class="propCheck"><label data-bind="tooltips: {}"><input type="checkbox" data-bind="focusable: true, click: function(evt, obj) { $root.localGlobalSwitch('+n+", "+p+"); return true; }, checked: "+n+'() !== null">',m+='<span class="checkbox-replacer" data-bind="css: { checked: '+n+"() !== null }, attr: { title: $root.t('This style is specific for this block: click here to remove the custom style and revert to the theme value') }\"></span>",m+="</label></div>")),m+="</div>"}else m+=null===i||"object"!=typeof i?'<div class="propEditor unknown">[A|'+n+"|"+typeof i+"]</div>":'<div class="propEditor unknown">[B|'+n+"|"+typeof i+"]</div>"}return void 0!==n&&v&&(m+="\x3c!-- /ko --\x3e",m+="\x3c!-- ko ifSubs: { not: true, data: "+g+", threshold: "+y+", gutter: 0 } --\x3e",m+='<span class="label notused">('+n+")</span>",m+="\x3c!-- /ko --\x3e"),m},createBlockEditor=function(e,t,o,i,l,a,n,s,d,r,c,p){void 0===c&&(c=!0);var v,u=modelDef.getDef(e,a),b=modelDef.getDef(e,l);void 0!==b._previewBindings&&"thaeme"!=a&&"styler"==n&&(v=elaborateDeclarations(void 0,b._previewBindings,i,modelDef.getBindValue.bind(void 0,e,o,l,l,"")));var f,h=void 0!==r&&r?e[a]._globalStyles:void 0,m=void 0!==r&&r?e[a]._globalStyle:void 0;void 0!==m&&(f=modelDef.getDef(e,"theme")[m.replace(/^(\$theme|_theme_)\./,"")]);var g=modelDef.getBindValue.bind(void 0,e,o,l,a);g._templateName=a;var _='<div class="editor">';_+='<div class="blockType'+(void 0!==h?" withdefaults":"")+'">'+u.type+"</div>";var y=_propEditor(g,t,i,u,f,"",void 0,n,p,d,h,m,c,v);y.length>0&&(_+=y),s(_+="</div>",a,n)},createBlockEditors=function(e,t,o,i,l,a,n,s){createBlockEditor(e,t,o,i,l,a,"edit",n,s),createBlockEditor(e,t,o,i,l,a,"styler",n,s,!0)},generateEditors=function(e,t,o,i,l){var a,n=e._defs,s=e.templateName,d=e._blocks,r=[];for(a=0;a<d.length;a++)void 0!==d[a].container&&r.push(modelDef.generateModel(n,d[a].block)),createBlockEditors(n,t,void 0,o,d[a].root,d[a].block,i,l);return void 0!==n.theme&&createBlockEditor(n,t,void 0,o,s,"theme","styler",i,void 0,!1,!1,-1),r};module.exports=generateEditors;

},{"./declarations.js":67,"./model.js":71,"./utils.js":74,"console-browserify":3}],70:[function(require,module,exports){
"use strict";var modelDef=require("./model.js"),wrappedResultModel=function(e){var r=e._defs,t=e.templateName,l=modelDef.getDef(r,t),a=modelDef.generateResultModel(e);return require("./wrapper.js")(a,l,r)},translateTemplate=function(){var e=require("./parser.js");return e.apply(e,arguments)},generateEditors=function(){var e=require("./editor.js");return e.apply(e,arguments)},checkModel=function(){var e=require("./checkmodel.js");return e.apply(e,arguments)};module.exports={translateTemplate:translateTemplate,wrappedResultModel:wrappedResultModel,generateResultModel:modelDef.generateResultModel,generateEditors:generateEditors,checkModel:checkModel};

},{"./checkmodel.js":66,"./editor.js":69,"./model.js":71,"./parser.js":72,"./wrapper.js":75}],71:[function(require,module,exports){
"use strict";var objExtend=require("./domutils.js").objExtend,console=require("console-browserify"),_valueSet=function(e,t,o,l){var r=o.indexOf(".");if(-1==r)if(void 0===t[o])console.log("Undefined prop "+o+" while setting value "+l+" in model._valueSet");else if(null===t[o])"object"==typeof l&&null!==l&&void 0===l.push&&console.log("nullpropobjectvalue",o,l),t[o]=l;else if("object"==typeof t[o]&&"function"==typeof t[o].push){var n;if("string"==typeof l){var i=l.match(/^\[(.*)\]$/);if(null===i)throw"Unexpected default value for array property "+o+": "+l;n=i[1].split(",")}else{if("object"!=typeof l||void 0===l.push)throw"Unexpected default value for array property "+o+": "+l+" typeof "+typeof l;n=l}for(var a=[],d=0;d<n.length;d++)"@"==n[d].substr(0,1)?a.push(_generateModel(e,n[d].substr(1))):n[d].length>0&&a.push(n[d]);t[o]=a}else"string"==typeof t[o]||"boolean"==typeof t[o]?t[o]=l:"object"==typeof t[o]&&null!==t[o]&&void 0!==t[o]._widget?("object"==typeof l&&null!==l&&console.log("objectvalue",o,t[o]._widget,l),t[o]=l):console.log("setting",typeof t[o],t[o],o,l);else{var f=o.substr(0,r);_valueSet(e,t[f],o.substr(r+1),l)}},_modelCreateOrUpdateBlockDef=function(e,t,o,l){if(void 0!==e[t]&&e[t]._initialized&&!e[t]._writeable)throw console.log("_modelCreateOrUpdateBlockDef",e,t,o,l),"Trying to alter non writeable model: "+t+" / "+o;if(void 0===e[t]&&(e[t]={_writeable:!0},void 0===l&&(l={}),void 0===l.category&&void 0===e[t]._category&&(t.match(/(^t|.T)heme$/)||t.match(/(^s|.S)tyle$/)||t.match(/(^c|.C)olor$/)||t.match(/(^r|.R)adius$/)?l.category="style":l.category="content")),void 0!==l){if(void 0!==l.name&&(e[t]._name=l.name),void 0!==l.themeOverride&&(e[t]._themeOverride=l.themeOverride),void 0!==l.globalStyle){e[t]._globalStyle=l.globalStyle;var r=l.globalStyle.replace(/^(\$theme|_theme_)\./,""),n=r.indexOf("."),i=-1!=n?r.substr(0,n):r;_modelCreateOrUpdateBlockDef(e,"theme",i),(void 0===e[t]._themeOverride||e[t]._themeOverride)&&_modelCreateOrUpdateBlockDef(e,t,"customStyle=false")}void 0!==l.contextName&&(e[t]._context=l.contextName,"block"==l.contextName&&void 0===e[t]._globalStyle&&(e[t]._globalStyle="_theme_.bodyTheme",_modelCreateOrUpdateBlockDef(e,"theme","bodyTheme"),(void 0===e[t]._themeOverride||e[t]._themeOverride)&&_modelCreateOrUpdateBlockDef(e,t,"customStyle=false"))),void 0!==l.extend&&(e[t].type=l.extend)}for(var a in l)l.hasOwnProperty(a)&&void 0!==l[a]&&-1==["name","extend","contextName","globalStyle","themeOverride"].indexOf(a)&&(e[t]["_"+a]=l[a]);void 0!==o&&o.length>0&&(e[t]._props=void 0!==e[t]._props&&e[t]._props.length>0?e[t]._props+" "+o:o)},_removePrefix=function(e){var t=e.match(/^[^A-Z]+([A-Z])(.*)$/);return null!==t?t[1].toLowerCase()+t[2]:null},_generateModelFromDef=function(e,t){var o={};for(var l in e)if(!l.match(/^_.*/)&&e.hasOwnProperty(l)){var r=e[l];if("object"==typeof r&&null!==r&&void 0!==r._complex&&r._complex)o[l]=_generateModelFromDef(r,t);else if("type"==l)o[l]=r;else{if("object"!=typeof r)throw console.error("Unexpected model def",l,r,e),"Unexpected model def ["+l+"]="+r;o[l]=null}}if(void 0!==e._defaultValues){var n=e._defaultValues;for(var i in n)n.hasOwnProperty(i)&&_valueSet(t,o,i,n[i])}return o},_generateModel=function(e,t){var o=_getModelDef(e,t,!1,!0);return _generateModelFromDef(o,e)},_getDef=function(e,t){return _getModelDef(e,t,!1,!0)},_getModelDef=function(e,t,o,l){if(void 0===e[t]){if(-1!=t.indexOf(" "))return null;var r=_removePrefix(t);return null!==r?_getModelDef(e,r,o,l):null}var n=e[t];if("object"!=typeof n)throw"Block definition must be an object: found "+n+" for "+t;if(void 0===n._initialized){if(void 0===n.type&&(-1==t.indexOf(" ")?n.type=t:n.type=t.substr(t.indexOf(" ")+1)),n.type!=t&&void 0===n._widget){var i=_getModelDef(e,n.type,!0);n=objExtend(i,n),e[t]=n}else void 0===n._widget&&void 0===n._props&&n._complex;n._writeable=!0,n._initialized=!0}if(void 0!==n._props){var a=n._props;if((a=a.split(" ")).length>0&&void 0===n._writeable)throw console.error("Altering a non writable object ",t,a,n),"Altering a non writable object: "+t+" def: "+a;void 0===n._processedDefs&&(n._processedDefs={}),void 0===n._globalStyles&&(n._globalStyles={}),void 0===n._defaultValues&&(n._defaultValues={});for(var d=0;d<a.length;d++){var f=a[d];if(0!==f.length){var s=f,u=null,c=f.match(/^([^=\[\]]+)(\[\])?(=?)(.*)$/);if(null!==c&&(f=c[1],"[]"==c[2]&&(void 0===n[f]&&(n[f]=[]),u=[]),"="==c[3]&&(u=f.match(/(^v|V)isible$/)?"true"==String(c[4]).toLowerCase():f.match(/^customStyle$/)?"true"==String(c[4]).toLowerCase():c[4])),null!==u&&void 0===n._defaultValues[f]&&(n._defaultValues[f]=u),void 0===n[f]){var _=_getModelDef(e,t+" "+f,!0);null===_&&(_=_getModelDef(e,f,!0)),n[f]=_}n._processedDefs[f]=s,n._complex=!0}}delete n._props}if(o)return n._writeable=!1,objExtend({},n);if(l)return n._writeable=!1,n;if(void 0===n._writeable||!1===n._writeable)throw"Retrieving non writeable object definition: "+t;return n},_increaseUseCount=function(e,t){if(e){if(void 0===t._usecount)throw console.error("ERROR trying to bind an unused property while readonly",t),"ERROR trying to bind an unused property"}else void 0===t._usecount&&(t._usecount=0),t._usecount++},ensureGlobalStyle=function(e,t,o,l,r,n,i,a){var d=o(n,i,a);if(void 0===e[l]._globalStyles[r]){if(t)throw"Cannot find _globalStyle for "+r+" in "+l+"!";(-1!=r.indexOf(".")||"object"==typeof e[l][r]&&void 0!==e[l][r]._widget)&&(e[l]._globalStyles[r]=d)}else if(e[l]._globalStyles[r]!=d)throw"Unexpected conflicting globalStyle [2] for "+l+"/"+r+": old="+e[l]._globalStyles[r]+" new="+d},modelEnsurePathAndGetBindValue=function(e,t,o,l,r,n,i,a,d,f){var s,u,c;if("$"==i.substr(0,1)){console.warn("DEPRECATED $ in bindingProvider: ",i,r);var _=i.indexOf(".");if(-1==_)throw"Unexpected fullPath: "+i+"/"+n+"/"+r+"/"+a+"/"+d;if(s=i.substr(1,_-1),c=i.substr(_+1),"theme"!=s)throw"Unexpected $ sequence: "+s+" in "+i;var v=c.indexOf(".");u="$root.content().theme()."+(s=c.substr(0,v))+"()."+(c=c.substr(v+1)).replace(new RegExp("\\.","g"),"().")}else if("#"==i.substr(0,1))console.warn("DEPRECATED # in bindingProvider: ",i,r),s=l,u="$root.content()."+(c=i.substr(1)).replace(new RegExp("\\.","g"),"().");else if("_theme_."==i.substr(0,8)){var p=i.indexOf(".",8);u="$root.content().theme()."+(s=i.substr(8,p-8))+"()."+(c=i.substr(p+1)).replace(new RegExp("\\.","g"),"().")}else"_root_."==i.substr(0,7)?(s=l,u="$root.content()."+(c=i.substr(7)).replace(new RegExp("\\.","g"),"().")):(s=r,c=n+i,u=i.replace(new RegExp("\\.","g"),"()."));if(void 0===t[s])throw"Cannot find model def for ["+s+"]";var g,b=c.indexOf("."),h=-1==b?c:c.substr(0,b);if(-1!=s.indexOf("-"))throw console.error("ERROR cannot use - for block names",s),"ERROR unexpected char in block name: "+s;if(-1!=h.indexOf("-"))throw console.error("ERROR cannot use - for property names",h),"ERROR unexpected char in property name: "+s;if(e)return void 0!==t[s]._globalStyle&&void 0!==t[s][h]&&"style"==t[s][h]._category&&(u+="._defaultComputed"),u;if(e){if(void 0!==a)throw"Cannot use defaultValue in readonly mode!";if(d)throw"Cannot use overrideDefault in readonly mode for "+s+"/"+c+"/"+d+"!";if(void 0!==f)throw"Cannot set category for "+s+"/"+c+"/"+f+" in readonly mode!";g=_getModelDef(t,s,!1,!0)}else!1===t[s]._writeable&&console.log("TODO debug use cases for this condition",s,c),g=_getModelDef(t,s,!1===t[s]._writeable);if(null===g)throw"Unexpected model for ["+s+"]";if(void 0===g[h]){if(e)throw"Cannot find path "+h+" for "+s+"!";_modelCreateOrUpdateBlockDef(t,s,h),g=_getModelDef(t,s,!1)}void 0!==t[s]._globalStyle&&void 0!==t[s][h]&&null!==t[s][h]&&"style"==t[s][h]._category&&(u+="._defaultComputed");var y=g;try{if(_increaseUseCount(e,y),-1!=b){var m=c;do{var w=m.substr(0,b);if(void 0===y[w])throw"Found an unexpected prop "+w+" for model "+s+" for "+c;y=y[w],_increaseUseCount(e,y),b=(m=m.substr(b+1)).indexOf(".")}while(-1!=b);if(void 0===y[m]||null===y[m])throw"Found an unexpected path termination "+m+" for model "+s+" for "+c;y=y[m]}else y=y[c];if(null==y)throw"Unexpected null model for "+s+"/"+n+"/"+i;void 0!==f&&(y._category=f),_increaseUseCount(e,y)}catch(e){throw console.error("TODO ERROR Property lookup exception",e,s,c,r,i,t),e}if(void 0!==t[s]._globalStyle&&"object"==typeof t[s][h]&&null!==t[s][h]&&void 0!==t[s][h]._category&&"style"==t[s][h]._category){var x=modelEnsurePathAndGetBindValue.bind(void 0,e,t,o,l,r,""),O=-1!=c.indexOf(".")?c.substr(c.indexOf(".")):"";if(-1!=O.indexOf(".",1))throw"TODO unsupported object nesting! "+c;var D=t[s]._globalStyle+"."+h;"object"==typeof t[s][h]&&null!==t[s][h]&&void 0!==t[s][h]._globalStyle&&(D=t[s][h]._globalStyle),ensureGlobalStyle(t,e,x,s,h,D,void 0,!1);var S=D+O;if(void 0===a&&null!==t[s]._defaultValues[c]&&(a=t[s]._defaultValues[c]),ensureGlobalStyle(t,e,x,s,c,S,a,d),void 0!==a){if(e)throw console.error("Cannot set a new theme default value",S.substr(7),a,"while in readonly mode"),"Cannot set a new theme default value ("+a+") for "+S.substr(7)+" while in readonly mode!";o("default",S.substr(7),a)}a=null}if(void 0!==a)if(void 0===t[s]._defaultValues[c]||void 0!==d&&d){if(e)throw"Cannot set new _defaultValues [1] for "+c+" in "+s+"!";t[s]._defaultValues[c]=a}else if(null===a){if(e&&null!==t[s]._defaultValues[c])throw"Cannot set new _defaultValues [2] for "+c+" in "+s+"!";t[s]._defaultValues[c]=null}else if(t[s]._defaultValues[c]!=a)throw console.error("TODO error!!! Trying to set a new default value for "+s+" "+c+" while it already exists (current: "+t[s]._defaultValues[c]+", new: "+a+")"),"Trying to set a new default value for "+s+" "+c+" while it already exists (current: "+t[s].defaultValues[c]+", new: "+a+")";return u},generateResultModel=function(e){var t=e._defs,o=e.templateName,l=_generateModel(t,o);return void 0!==t.theme&&(l.theme=_generateModel(t,"theme")),l};module.exports={ensurePathAndGetBindValue:modelEnsurePathAndGetBindValue.bind(void 0,!1),getBindValue:modelEnsurePathAndGetBindValue.bind(void 0,!0),generateModel:_generateModel,generateResultModel:generateResultModel,getDef:_getDef,createOrUpdateBlockDef:_modelCreateOrUpdateBlockDef};

},{"./domutils.js":68,"console-browserify":3}],72:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,console=require("console-browserify"),converterUtils=require("./utils.js"),elaborateDeclarations=require("./declarations.js"),processStylesheetRules=require("./stylesheet.js"),modelDef=require("./model.js"),domutils=require("./domutils.js"),wrapElementWithCondition=function(e,t,o){var a=domutils.getAttribute(t,e);try{var i=converterUtils.conditionBinding(a,o);$(t).before("\x3c!-- ko if: "+i+" --\x3e"),$(t).after("\x3c!-- /ko --\x3e"),domutils.removeAttribute(t,e)}catch(o){throw console.warn("Model ensure path failed in if/variant",t,a,e),o}},replacedAttributes=function(e,t){domutils.setAttribute(e,t,domutils.getAttribute(e,"replaced"+t))},processStyle=function(e,t,o,a){var i,r=domutils.getAttribute(e,"replacedstyle"),l=null;a&&(i={uniqueId:"$data",attr:{id:"id"}});var d=null!==domutils.getAttribute(e,"data-ko-display");null===(l=elaborateDeclarations(r,void 0,t,o,e,i,d))?l=r:domutils.removeAttribute(e,"replacedstyle"),null!==l&&(l.trim().length>0?domutils.setAttribute(e,"style",l):domutils.removeAttribute(e,"style"))},_fixRelativePath=function(e,t,o,a){var i=t(domutils.getAttribute(a,e));null!==i&&domutils.setAttribute(a,e,i)},processBlock=function(e,t,o,a,i,r,l,d,s,c){try{var n;if("block"==r)n=domutils.getAttribute(e,"data-ko-block"),domutils.removeAttribute(e,"data-ko-block");else{if("template"!=r)throw"Unexpected context name while processing block: "+r;n=l}$("[data-ko-remove]",e).remove();for(var u=$("[data-ko-block]",e).replaceWith("<replacedblock>"),m=["href","src","data-ko-placeholder-src","background"],h=0;h<m.length;h++){var p=_fixRelativePath.bind(void 0,m[h],i);$("["+m[h]+"]",e).each(p)}var b=domutils.getAttribute(e,"data-ko-properties");null===b&&(b=""),$("[data-ko-properties]",e).each(function(e,t){b.length>0&&(b+=" "),b+=domutils.getAttribute(t,"data-ko-properties"),domutils.removeAttribute(t,"data-ko-properties")}),modelDef.createOrUpdateBlockDef(t,n,b,{contextName:r});var v=modelDef.ensurePathAndGetBindValue.bind(void 0,t,o,l,n,"");"block"==r&&v("id",""),$("style",e).each(function(e,a){var r=domutils.getInnerHtml(a),d=modelDef.createOrUpdateBlockDef.bind(void 0,t),s=modelDef.ensurePathAndGetBindValue.bind(void 0,t,o,l),u=processStylesheetRules(r,void 0,s,d,o,i,l,n);if(u!=r)if(""!==u.trim()){var m=c(u);domutils.setAttribute(a,"data-bind","template: { name: '"+m+"' }"),domutils.setContent(a,"")}else domutils.removeElements($(a))}),processStyle(e,i,v,s);for(var f=["data-ko-display","data-ko-editable","data-ko-wrap","href"],k=0;k<f.length;k++){if(domutils.getAttribute(e,f[k]))throw console.warn("ERROR: Unsupported "+f[k]+" used together with data-ko-block",e),"ERROR: Unsupported "+f[k]+" used together with data-ko-block"}return $("[data-ko-link]",e).each(function(e,t){var o=domutils.getAttribute(t,"data-ko-link"),a=domutils.getAttribute(t,"replacedstyle");null==a&&(a=""),a=""!==a?"-ko-attr-href: @"+o+"; "+a:"-ko-attr-href: @"+o,domutils.setAttribute(t,"replacedstyle",a),domutils.setAttribute(t,"data-ko-wrap",o),domutils.removeAttribute(t,"data-ko-link")}),$("[replacedstyle]",e).each(function(e,t){processStyle(t,i,v,!1)}),$("[replacedhttp-equiv]",e).each(function(e,t){replacedAttributes(t,"http-equiv")}),$("[data-ko-display]",e).each(function(e,t){wrapElementWithCondition("data-ko-display",t,v)}),$("[data-ko-editable]",e).each(function(e,t){var o,a,i,r,l,d,s=domutils.getAttribute(t,"data-ko-editable");if(s.lastIndexOf(".")>0){var n=s.substr(0,s.lastIndexOf("."));l=v(n)}else l=v(s);if(d="wysiwygClick: function(obj, evt) { $root.selectItem("+l+", $data); return false }, clickBubble: false, wysiwygCss: { selecteditem: $root.isSelectedItem("+l+") }, scrollIntoView: $root.isSelectedItem("+l+")","img"!=domutils.getLowerTagName(t)){a=domutils.getInnerHtml(t);var u=v(s,a,!0,"wysiwyg");if(o="",domutils.getAttribute(t,"id")||(o+="wysiwygId: id()+'_"+s.replace(".","_")+"', "),void 0!==d&&(o+=d+", "),o+="wysiwygOrHtml: "+u,"td"==domutils.getLowerTagName(t)){var m=$('<div data-ko-wrap="false" style="width: 100%; height: 100%"></div>')[0];domutils.setAttribute(m,"data-bind",o);var h=domutils.getInnerHtml($("<div></div>").append(m));domutils.setContent(t,h)}else r=(null!==(i=domutils.getAttribute(t,"data-bind"))?i+", ":"")+o,domutils.setAttribute(t,"data-bind",r),domutils.setContent(t,"");domutils.removeAttribute(t,"data-ko-editable")}else{var p=domutils.getAttribute(t,"width");if(""===p&&(p=null),null===p)throw console.error("ERROR: data-ko-editable images must declare a WIDTH attribute!",t),"ERROR: data-ko-editable images must declare a WIDTH attribute!";var b=domutils.getAttribute(t,"height");""===b&&(b=null);var f=domutils.getAttribute(t,"align"),k=(i=domutils.getAttribute(t,"data-bind"))&&i.match(/virtualAttr: {[^}]* height: ([^,}]*)[,}]/);k&&(b=k[1]);var g=i&&i.match(/virtualAttr: {[^}]* width: ([^,}]*)[,}]/);g&&(p=g[1]);var w,A,y="";(a=domutils.getAttribute(t,"data-ko-placeholder-src"))?y=domutils.getAttribute(t,"src"):a=domutils.getAttribute(t,"src"),p&&b?w=p+"+'x'+"+b:b?p||(w="'h'+"+b+"+''"):w="'w'+"+p+"+''";var x=b||domutils.getAttribute(t,"data-ko-placeholder-height"),_=p||domutils.getAttribute(t,"data-ko-placeholder-width");if(domutils.removeAttribute(t,"src"),domutils.removeAttribute(t,"data-ko-editable"),domutils.removeAttribute(t,"data-ko-placeholder-height"),domutils.removeAttribute(t,"data-ko-placeholder-width"),domutils.removeAttribute(t,"data-ko-placeholder-src"),a&&(A="{ width: "+_+", height: "+x+", text: "+w+"}"),!_||!x)throw console.error("IMG data-ko-editable must declare width and height attributes, or their placeholder counterparts data-ko-placeholder-width/data-ko-placeholder-height",t),"ERROR: IMG data-ko-editable MUST declare width and height attributes, or their placeholder counterparts data-ko-placeholder-width/data-ko-placeholder-height";var D=v(s,y,!1,"wysiwyg");r=(null!==i?i+", ":"")+(o="wysiwygSrc: { width: "+p+", height: "+b+", src: "+D+", placeholder: "+A+" }"),domutils.setAttribute(t,"data-bind",r);var I=c(t),R="{ width: "+p;"left"==f?R+=", float: 'left'":"right"==f?R+=", float: 'right'":"center"==f&&("function"==typeof console.debug?console.debug("Ignoring align=center on an img tag: we don't know how to emulate this alignment in the editor!"):"top"==f?R+=", verticalAlign: 'top'":"middle"==f?R+=", verticalAlign: 'middle'":"bottom"==f&&(R+=", verticalAlign: 'bottom'")),R+="}",$(t).before("\x3c!-- ko wysiwygImg: { _data: $data, _item: "+l+", _template: '"+I+"', _editTemplate: 'img-wysiwyg', _src: "+D+", _width: "+p+", _height: "+b+", _align: "+(null===f?void 0:"'"+f+"'")+", _size: "+w+", _method: "+void 0+", _placeholdersrc: "+A+", _stylebind: "+R+" } --\x3e"),$(t).after("\x3c!-- /ko --\x3e")}}),$("[href]",e).each(function(e,t){var o=domutils.getAttribute(t,"href"),a="wysiwygHref: '"+converterUtils.addSlashes(o)+"'",i=domutils.getAttribute(t,"data-bind"),r=(null!==i?i+", ":"")+a;domutils.setAttribute(t,"data-bind",r)}),$("replacedblock",e).each(function(e,r){var s=u[e],m=processBlock(s,t,o,a,i,"block",n,d,!0,c),h=modelDef.ensurePathAndGetBindValue(t,o,l,n,"",m);$(r).before("\x3c!-- ko block: { data: "+converterUtils.addSlashes(h)+", template: 'block' } --\x3e"),$(r).after("\x3c!-- /ko --\x3e"),$(r).remove()}),$($("[data-ko-wrap]",e).get().reverse(),e).each(function(e,t){var o=domutils.getAttribute(t,"data-ko-wrap");if(void 0===o||""===o||"true"===o)throw"Unsupported empty value for data-ko-wrap: use false value if you want to always remove the tag";var a,i,r=converterUtils.conditionBinding(o,v),l=domutils.getAttribute(t,"data-bind");if(""!==l&&null!==l&&l.match(/(block|wysiwygOrHtml):/)){var d="\x3c!-- ko "+l+" --\x3e"+domutils.getInnerHtml(t)+"\x3c!-- /ko --\x3e";a=c(d),domutils.removeAttribute(t,"data-ko-wrap"),i=c(t),domutils.replaceHtml(t,"\x3c!-- ko template: /* special */ (typeof templateMode != 'undefined' && templateMode == 'wysiwyg') || "+r+" ? '"+i+"' : '"+a+"' --\x3e\x3c!-- /ko --\x3e")}else a=c(domutils.getInnerHtml(t)),domutils.removeAttribute(t,"data-ko-wrap"),domutils.setContent(t,"\x3c!-- ko template: '"+a+"' --\x3e\x3c!-- /ko --\x3e"),i=c(t),domutils.replaceHtml(t,"\x3c!-- ko template: (typeof templateMode != 'undefined' && templateMode == 'wysiwyg') || "+r+" ? '"+i+"' : '"+a+"' --\x3e\x3c!-- /ko --\x3e")}),c(e,n,"show"),a(l,n,r,d),n}catch(t){throw console.error("Exception while parsing the template",t,e),t}};function conditional_replace(e){return e.replace(/<!--\[if ([^\]]*)\]>((?:(?!--)[\s\S])*?)<!\[endif\]-->/g,function(e,t,o){var a="\x3c!-- cc:start --\x3e";a+=o.replace(/<([A-Za-z:]+)/g,"\x3c!-- cc:bo:$1 --\x3e<cc").replace(/<\/([A-Za-z:]+)>/g,"\x3c!-- cc:bc:$1 --\x3e</cc>\x3c!-- cc:ac:$1 --\x3e").replace(/\/>/g,"/>\x3c!-- cc:sc --\x3e"),a+="\x3c!-- cc:end --\x3e";var i='<replacedcc condition="'+t+'" style="display: none">';return i+=$("<div>").append($(a)).html().replace(/^<!-- cc:start -->/,"").replace(/<!-- cc:end -->$/,""),i+="</replacedcc>"})}var translateTemplate=function(e,t,o,a){var i={},r=conditional_replace(t.replace(/(<[^>]+\s)(style|http-equiv)(="[^"]*"[^>]*>)/gi,function(e,t,o,a){return t+"replaced"+o+a})),l="function"==typeof $.parseHTML?$($.parseHTML(r,!1)):$(r),d=l[0],s=[],c=function(e,t,o,a){s.push({root:e,block:t,context:o,container:a})},n=function(e,t,o){if(void 0===i.themes&&(i.themes={}),void 0===i.themes[e]&&(i.themes[e]={}),void 0===i.themes[e][t]||null===i.themes[e][t])i.themes[e][t]=o;else if(null!=o){var a=i.themes[e][t];a!=o&&console.log("Error setting a new default for property "+t+" in theme "+e+". old:"+a+" new:"+o+"!")}},u=$("[data-ko-container]",l),m={};u.each(function(e,t){var o=domutils.getAttribute(t,"data-ko-container")+"Blocks";domutils.removeAttribute(t,"data-ko-container"),domutils.setAttribute(t,"data-bind","block: "+o);var a=$("> [data-ko-block]",t);domutils.removeElements(a,!0),m[o]=a}),modelDef.createOrUpdateBlockDef(i,"id"),modelDef.createOrUpdateBlockDef(i,"bodyTheme"),modelDef.createOrUpdateBlockDef(i,"blocks","blocks[]"),modelDef.createOrUpdateBlockDef(i,"text"),processBlock(d,i,n,c,o,"template",e,void 0,!1,a);var h=function(t,r,l){processBlock(l,i,n,c,o,"block",e,t,!0,a)};for(var p in m)if(m.hasOwnProperty(p)){var b=m[p],v=p;modelDef.ensurePathAndGetBindValue(i,n,e,e,"",v+".blocks","[]"),b.each(h.bind(void 0,v))}var f={_defs:i,templateName:e,_blocks:s};return void 0!==i[e]._version&&(f.version=i[e]._version),f};module.exports=translateTemplate;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./declarations.js":67,"./domutils.js":68,"./model.js":71,"./stylesheet.js":73,"./utils.js":74,"console-browserify":3}],73:[function(require,module,exports){
"use strict";var cssParse=require("mensch/lib/parser.js"),console=require("console-browserify"),converterUtils=require("./utils.js"),elaborateDeclarations=require("./declarations.js"),_removeOptionalQuotes=function(e){return"'"!=e[0]&&'"'!=e[0]||e[e.length-1]!=e[0]?e:e.substr(1,e.length-2).replace(/\\([\s\S])/gm,"$1")},_processStyleSheetRules_processBlockDef=function(e,t){for(var o,s,r,l=0;l<t.length;l++)if("rule"==t[l].type){for(var n=t[l].selectors,i=!1,a=!1,c=0;c<n.length;c++)n[c].match(/:preview$/)?a=!0:i=!0;if(a&&i)throw console.log("cannot mix selectors type (:preview and declarations) in @supports -ko-blockdefs ",n),"Cannot mix selectors type (:preview and declarations) in @supports -ko-blockdefs";if(!a&&!i)throw console.log("cannot find known selectors in @supports -ko-blockdefs ",n),"Cannot find known selectors in @supports -ko-blockdefs";if(i){o="",s={},r=t[l].declarations;for(var p,u=0;u<r.length;u++)"property"==r[u].type&&(p=_removeOptionalQuotes(r[u].value),"label"==r[u].name?s.name=p:"context"==r[u].name?s.contextName=p:"properties"==r[u].name?o=p:"theme"==r[u].name?s.globalStyle="_theme_."+p:"themeOverride"==r[u].name?s.themeOverride="true"==String(p).toLowerCase():s[r[u].name]=p);for(var d=0;d<n.length;d++)e(n[d],o,s)}if(a)for(var f=0;f<n.length;f++){e(n[f].substr(0,n[f].indexOf(":")),void 0,{previewBindings:t[l].declarations})}}},processStylesheetRules=function(e,t,o,s,r,l,n,i){var a,c=e,p=null;if(void 0===t){var u=cssParse(e,{comments:!0,position:!0});if("stylesheet"!=u.type||void 0===u.stylesheet)throw console.log("unable to process styleSheet",u),"Unable to parse stylesheet";t=u.stylesheet.rules}for(var d=t.length-1;d>=0;d--){if("supports"==t[d].type&&"-ko-blockdefs"==t[d].name)_processStyleSheetRules_processBlockDef(s,t[d].rules),c=converterUtils.removeStyle(c,t[d].position.start,p,0,0,0,"");else if("media"==t[d].type||"supports"==t[d].type)c=processStylesheetRules(c,t[d].rules,o,s,r,l,n,i);else if("comment"==t[d].type);else if("rule"==t[d].type){for(var f=t[d].selectors,h="",m=null,v=0;v<f.length;v++){h.length>0&&(h+=", ");var y=f[v].match(/\[data-ko-block=([^ ]*)\]/);if(null!==y){if(null!==m&&m!=y[1])throw"Found multiple block-match attribute selectors: cannot translate it ("+m+" vs "+y[1]+")";m=y[1]}h+="\x3c!-- ko text: templateMode =='wysiwyg' ? '#main-wysiwyg-area ' : '' --\x3e\x3c!-- /ko --\x3e"+f[v]}if(m){var k="\x3c!-- ko foreach: $root.findObjectsOfType($data, '"+m+"') --\x3e",x=p,g=" ";t[d].declarations.length>0&&(t[d].declarations[0].position.start.line!=t[d].position.end.line&&(g="\n"+new Array(t[d].position.start.col).join(" ")),x=t[d].declarations[t[d].declarations.length-1].position.end),null===x?c+=g+"\x3c!-- /ko --\x3e":c=x==p?converterUtils.removeStyle(c,x,p,0,0,0,g+"\x3c!-- /ko --\x3e"):converterUtils.removeStyle(c,x,p,0,0,0,g+"}"+g+"\x3c!-- /ko --\x3e"),h=k+g+h.replace(new RegExp("\\[data-ko-block="+m+"\\]","g"),"\x3c!-- ko text: '#'+id() --\x3e"+m+"\x3c!-- /ko --\x3e"),s(m,"",{contextName:"block"})}var b=m||i;a=o.bind(this,b,"");var w=elaborateDeclarations(c,t[d].declarations,l,a);null!==w&&(c=w),c=converterUtils.removeStyle(c,t[d].position.start,t[d].position.end,0,0,0,h)}else console.log("Unknown rule type",t[d].type,"while parsing <style> rules");p=t[d].position.start}return c};module.exports=processStylesheetRules;

},{"./declarations.js":67,"./utils.js":74,"console-browserify":3,"mensch/lib/parser.js":19}],74:[function(require,module,exports){
"use strict";var console=require("console-browserify"),jsep=require("jsep");jsep.addBinaryOp("or",1),jsep.addBinaryOp("and",2),jsep.addBinaryOp("eq",6),jsep.addBinaryOp("neq",6),jsep.addBinaryOp("lt",7),jsep.addBinaryOp("lte",7),jsep.addBinaryOp("gt",7),jsep.addBinaryOp("gte",7);var addSlashes=function(e){return e.replace(/[\\"'\r\n\t\v\f\b]/g,"\\$&").replace(/\u0000/g,"\\0")},removeStyle=function(e,r,n,t,o,i,a){for(var s=e.split("\n"),p=o,l=i,u=1+t;u<r.line;u++)p+=s[u-1-t].length+1;if(p+=r.col,null!==n){for(var d=1+t;d<n.line;d++)l+=s[d-1-t].length+1;l+=n.col}else l+=e.length+1;return e.substr(0,p-1)+a+e.substr(l-1)},expressionGenerator=function(e,r,n){return function e(r,n,t,o){if(void 0===t&&(t=!0),void 0!==o&&"Identifier"!==r.type&&"MemberExpression"!==r.type&&"function"==typeof console.debug&&console.debug("Cannot apply default value to variable when using expressions"),"BinaryExpression"===r.type||"LogicalExpression"===r.type)return"("+e(r.left,n,t)+" "+function(e){switch(e){case"or":return"||";case"and":return"&&";case"lt":return"<";case"lte":return"<=";case"gt":return">";case"gte":return">=";case"eq":return"==";case"neq":return"!=";default:return e}}(r.operator)+" "+e(r.right,n,t)+")";if("CallExpression"===r.type){var i=r.arguments.map(function(r){return e(r,n,t)});return e(r.callee,n,t)+"("+i.join(", ")+")"}if("UnaryExpression"===r.type)return r.operator+e(r.argument,n,t);if("MemberExpression"==r.type&&r.computed)throw"Unexpected computed member expression";if("MemberExpression"!=r.type||r.computed){if("Literal"===r.type)return r.raw;if("Identifier"===r.type){var a=r.name;return t?n(a,o)+"()":a}if("ConditionalExpression"===r.type)return"("+e(r.test,n,t)+" ? "+e(r.consequent,n,t)+" : "+e(r.alternate,n,t)+")";throw"Compound"===r.type?"Syntax error in expression: operator expected after "+e(r.body[0],n,!1):"Found an unsupported expression type: "+r.type}var s=e(r.object,n,!1)+"."+e(r.property,n,!1);return t&&"Math"!==r.object.name&&"Color"!==r.object.name&&"Util"!==r.object.name?n(s,o)+"()":s}(e,r,void 0,n)},expressionBinding=function(e,r,n){var t;if(null!=n){var o=e.trim().replace(/@\[([^\]]+)\]|@([a-zA-Z0-9\._]+)\b/g,"###var###");if("###var###"==(o=o.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")))t=[null,n];else if(o="^"+o.replace(/###var###/g,"(.+)")+"$",!(t=n.trim().match(new RegExp(o))))throw console.log("Cannot find matches",t,"for",n,e,o,e),"Cannot find default value for "+e+" in "+n}try{var i=0,a="'"+e.replace(/@\[([^\]]+)\]|@([a-zA-Z0-9\._]+)\b|(')/g,function(e,n,o,a){if(a)return"\\"+a;i++;var s,p=n||o;if(t&&(void 0!==t[i]?s=t[i].trim():console.log("ABZZZ Cannot find default value for",p,"in",t,"as",i)),n){var l=jsep(n);return"'+"+expressionGenerator(l,r,s)+"+'"}return"'+"+r(p,s)+"()+'"})+"'";return a=a.replace(/(^|[^\\])''\+/g,"$1").replace(/\+''/g,""),0===i&&"false"!==a&&"true"!==a&&console.error("Unexpected expression with no valid @variable references",e),a}catch(r){throw"Exception parsing expression "+e+" "+r}},conditionBinding=function(e,r){var n=jsep(e);return expressionGenerator(n,r)};module.exports={addSlashes:addSlashes,removeStyle:removeStyle,conditionBinding:conditionBinding,expressionBinding:expressionBinding};

},{"console-browserify":3,"jsep":6}],75:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");function wrap(e){var t=typeof e;if("object"===t&&(e?e.constructor==Date?t="date":"[object Array]"==Object.prototype.toString.call(e)&&(t="array"):t="null"),"array"==t){var n=ko.observableArray();if(!e||0===e.length)return n;for(var o=0,r=e.length;o<r;++o)n.push(wrap(e[o]));return n}if("object"==t){var a={};for(var i in e){var l=e[i];a[i]=wrap(l)}return ko.observable(a)}if("function"==t)return e;var s=ko.observable();return s(e),s}var _getOptionsObjectKeys=function(e){for(var t=e.split("|"),n=[],o=0;o<t.length;o++){var r=t[o].split("=");n.push(r[0].trim())}return n},_makeComputed=function(e,t,n,o,r,a){return ko.computed({read:function(){var n=e();if(null===n){var i=ko.utils.unwrapObservable(o);return void 0===i||"custom"==i?ko.utils.unwrapObservable(t):a[i][r]}return n},write:function(i){var l,s=ko.utils.unwrapObservable(o);if(l=void 0===s||"custom"==s?ko.utils.peekObservable(t):a[s][r],n)e(i==l?null:i);else{var u=ko.utils.peekObservable(e);i==l&&null===u||e(i)}}})},_nextVariantFunction=function(e,t,n){for(var o=e.utils.unwrapObservable(t),r=0;r<n.length&&e.utils.peekObservable(n[r])!=o;r++);r==n.length&&(console.warn("Didn't find a variant!",t,o,n),r=n.length-1);var a=r+1;a==n.length&&(a=0),t(e.utils.peekObservable(n[a]))},_getVariants=function(e){var t=e._variant;if("object"!=typeof e[t]||void 0===e[t]._widget||"string"!=typeof e[t]._options&&"boolean"!==e[t]._widget)throw console.error("Unexpected variant declaration",t,e[t]),"Unexpected variant declaration: cannot find property "+t+" or its _options string and it is not a boolean";return"string"==typeof e[t]._options?_getOptionsObjectKeys(e[t]._options):[!0,!1]},_makeComputedFunction=function(e,t,n,o,r,a,i){if(void 0===e){if(void 0===o.utils.unwrapObservable(i).type)throw console.log("TODO ERROR Found a non-typed def ",e,i),"Found a non-typed def "+e;var l=o.utils.unwrapObservable(o.utils.unwrapObservable(i).type);"object"!=typeof(e=t[l])&&console.log("TODO ERROR Found a non-object def ",e,"for",l)}void 0===r&&void 0!==a&&a&&(r=i);var s="$root.content().",u=e._globalStyles;if(void 0!==u)for(var p in u)if(u.hasOwnProperty(p)){var b,c,v,d="$root.content().theme().scheme";if(u[p].substr(0,s.length)!=s)throw"UNEXPECTED globalStyle path ("+u[p]+") outside selfPath ("+s+")";v=u[p].substr(s.length),c=r,d.substr(0,s.length)==s?b=d.substr(s.length):(console.log("IS THIS CORRECT?",d,s),b=d);for(var f=c,h=v.split("()."),_="",g=!0,k=0;k<h.length;k++)c=o.utils.unwrapObservable(c)[h[k]],g?"theme"==h[k]&&(g=!1):(_.length>0&&(_+="."),_+=h[k]);for(var w=b.split("()."),m=0;m<w.length;m++)f=o.utils.unwrapObservable(f)[w[m]];for(var O=p.split("."),y=i,R=0;R<O.length;R++)y=o.utils.unwrapObservable(y)[O[R]];if(!o.isObservable(y))throw"Unexpected non observable target "+p+"/"+_;y._defaultComputed=_makeComputed(y,c,!0,f,_,n)}if(void 0!==e._variant){for(var F=e._variant.split("."),S=i,j=o.utils.unwrapObservable(i),C=0;C<F.length;C++)S=o.utils.unwrapObservable(S)[F[C]];if(void 0!==S._defaultComputed&&(console.log("Found variant on a style property: beware variants should be only used on content properties because they don't match the theme fallback behaviour",e._variant),S=S._defaultComputed),void 0===S)throw console.log("ERROR looking for variant target",e._variant,i),"ERROR looking for variant target "+e._variant;j._nextVariant=_nextVariantFunction.bind(S,o,S,_getVariants(e))}for(var x in e)if(e.hasOwnProperty(x)){var P=e[x];if("object"==typeof P&&null!==P&&void 0!==P._context&&"block"==P._context){var B=r[x](),E=_makeComputedFunction(t[x],t,n,o,r,a,B);i[x](E)}else if("object"==typeof P&&null!==P&&"blocks"==P.type){for(var D,I,T,A=r[x](),V=A.blocks(),U=0;U<V.length;U++)D=o.utils.unwrapObservable(V[U]),I=o.utils.unwrapObservable(D.type),T=_makeComputedFunction(t[I],t,n,o,r,a,D),V[U](T);var W=A.blocks;_augmentBlocksObservable(W,_blockInstrumentFunction.bind(A,void 0,t,n,o,void 0,r,a)),r[x]._wrap=_makeBlocksWrap.bind(r[x],W._instrumentBlock),r[x]._unwrap=_unwrap.bind(r[x])}}return i},_augmentBlocksObservable=function(e,t){e._instrumentBlock=t,void 0===e.origPush&&(e.origPush=e.push,e.push=_makePush.bind(e),e.origSplice=e.splice,e.splice=_makeSplice.bind(e))},_makeBlocksWrap=function(e,t){var n=ko.toJS(t),o=n.blocks;n.blocks=[];var r=wrap(n)();_augmentBlocksObservable(r.blocks,e);for(var a=0;a<o.length;a++){var i=ko.toJS(o[a]);i.id="block_"+a,r.blocks.push(i)}this(r)},_makePush=function(){if(arguments.length>1)throw"Array push with multiple arguments not implemented";if(arguments.length>0&&ko.isObservable(arguments[0])&&("function"==typeof arguments[0]._unwrap?arguments[0]=arguments[0]._unwrap():console.log("WARN: pushing observable with no _unwrap function (TODO remove me, expected condition)")),ko.isObservable(arguments[0]))return this.origPush.apply(this,arguments);var e=this._instrumentBlock(arguments[0]);return this.origPush.apply(this,[e])},_makeSplice=function(){if(arguments.length>3)throw"Array splice with multiple objects not implemented";if(arguments.length>2&&ko.isObservable(arguments[2])&&("function"==typeof arguments[2]._unwrap?arguments[2]=arguments[2]._unwrap():console.log("WARN: splicing observable with no _unwrap function (TODO remove me, expected condition)")),arguments.length>2&&!ko.isObservable(arguments[2])){var e=this._instrumentBlock(arguments[2]);return this.origSplice.apply(this,[arguments[0],arguments[1],e])}return this.origSplice.apply(this,arguments)},_blockInstrumentFunction=function(e,t,n,o,r,a,i,l){void 0===r&&(r=l);var s=wrap(r);return s(_makeComputedFunction(e,t,n,o,a,i,s())),s._unwrap=_unwrap.bind(s),s},_wrap=function(e,t){this(ko.utils.unwrapObservable(e(ko,t,void 0,!0)))},_unwrap=function(){return ko.toJS(this)},_modelInstrument=function(e,t,n){var o=_blockInstrumentFunction.bind(void 0,t,n,n.themes),r=o(ko,e,void 0,!0);return r._wrap=_wrap.bind(r,o),r._unwrap=_unwrap.bind(r),r};module.exports=_modelInstrument;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],76:[function(require,module,exports){
(function (global){
var tinycolor=require("tinycolor2");function Color(t){this.getBrightness=function(n){return t(n).getBrightness()},this.isLight=function(n){return t(n).isLight()},this.isDark=function(n){return t(n).isDark()},this.getLuminance=function(n){return t(n).getLuminance()},this.lighten=function(n,i){return t(n).lighten(i).toHexString()},this.brighten=function(n,i){return t(n).brighten(i).toHexString()},this.darken=function(n,i){return t(n).darken(i).toHexString()},this.desaturate=function(n,i){return t(n).desaturate(i).toHexString()},this.saturate=function(n,i){return t(n).saturate(i).toHexString()},this.greyscale=function(n){return t(n).greyscale().toHexString()},this.spin=function(n,i){return t(n).spin(i).toHexString()},this.complement=function(n){return t(n).complement().toHexString()},this.mix=t.mix,this.readability=t.readability,this.isReadable=t.isReadable,this.mostReadable=t.mostReadable}var colorPlugin=function(t){global.Color=new Color(tinycolor)};module.exports=colorPlugin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"tinycolor2":29}],77:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify");function handleMailingName(e){var a;e.titleMode=ko.observable("show"),e.metadata.name=ko.observable(e.metadata.name),e.mailingName=ko.computed(function(){return e.metadata.name()},e),e.enableEditMailingName=function(t,n){console.log("enableEditMailingName",t),a=e.metadata.name(),e.titleMode("edit")},e.cancelEditMailingName=function(t,n){console.log("cancelEditMailingName"),e.metadata.name(a),a="",e.titleMode("show")},e.saveEditMailingName=function(t,n){console.log("saveEditMailingName",e.metadata.name()),e.titleMode("saving"),e.notifier.info(e.t("edit-title-ajax-pending")),$.ajax({method:"POST",url:e.metadata.url.update,data:{name:e.metadata.name()},success:function(a){e.metadata.name(a.meta.name),e.notifier.success(e.t("edit-title-ajax-success"))},error:function(){e.notifier.error(e.t("edit-title-ajax-fail"))},complete:function(){a="",e.titleMode("show")}})}}module.exports=handleMailingName;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],78:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,url=require("url"),slugFilename=require("../../../shared/slug-filename.js"),serverStorage=require("./custom-server-storage"),editTitle=require("./custom-edit-title"),textEditor=require("./custom-text-editor"),gallery=require("./custom-gallery"),removeImage=require("./custom-remove-gallery-image"),widgetBgimage=require("./custom-widget-bgimage"),setEditorIcon=function(e){return function(t){t.logoPath=!1,t.logoUrl=!1,t.logoAlt=!1,t.brandName=e.brandName}};function extendViewModel(e,t){t.push(serverStorage),t.push(setEditorIcon(e)),t.push(editTitle),t.push(gallery(e)),t.push(removeImage),t.push(widgetBgimage(e))}function templateUrlConverter(e){var t=e.metadata.assets||{};return function(r){if(!r)return null;if(console.log("customTemplateUrlConverter",r),/\]$/.test(r))return null;if(/^http/.test(r))return null;if(/<%/.test(r))return null;return r=/([^\/]*)$/.exec(r)[1],/\.[0-9a-z]+$/.test(r)?(console.log("customTemplateUrlConverter",r),r=slugFilename(r),r=t[r]?e.imgProcessorBackend+t[r]:null):null}}function extendKnockout(e){"fr"===e.lang&&(textEditor.language_url="/tinymce-langs/fr_FR.js",textEditor.language="fr_FR",tinymce.util.I18n.add("fr_FR",{Cancel:"Annuler","in pixel":"en pixel","Enter a font-size":"Entrez une taille de police","Letter spacing":"Interlettrage","Font size":"Taille de police","Font size: ":"Taille : ","minimum size: 8px":"taille minimum : 8px","no decimals":"pas de décimales"})),textEditor=$.extend({convert_urls:!1},textEditor,e.tinymce),ko.bindingHandlers.wysiwyg.fullOptions=textEditor,ko.bindingHandlers.wysiwyg.standardOptions={convert_urls:!1,external_plugins:{paste:textEditor.external_plugins.paste},theme_url:textEditor.theme_url,skin_url:textEditor.skin_url},ko.bindingHandlers.wysiwygSrc.templateUrlConverter=templateUrlConverter(e);var t=url.parse(e.imgProcessorBackend);ko.bindingHandlers.fileupload.remoteFilePreprocessor=function(e){console.info("REMOTE FILE PREPROCESSOR"),console.log(e);var r=url.format({protocol:t.protocol,host:t.host,pathname:t.pathname});return e.url=url.resolve(r,url.parse(e.url).pathname),e},ko.bindingHandlers.wysiwygSrc.convertedUrl=function(t,r,n,l){var o=url.parse(t).pathname;o||console.warn("no pathname for image",t),console.info("CONVERTED URL",o,r,n,l),o=o.replace("/img/","");var i=e.basePath+"/"+r;return i=i+"/"+n+"x"+l+"/"+o},ko.bindingHandlers.wysiwygSrc.placeholderUrl=function(t,r,n){return e.basePath+"/placeholder/"+t+"x"+r+".png"}}module.exports={extendViewModel:extendViewModel,extendKnockout:extendKnockout};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../../shared/slug-filename.js":42,"./custom-edit-title":77,"./custom-gallery":79,"./custom-remove-gallery-image":80,"./custom-server-storage":81,"./custom-text-editor":82,"./custom-widget-bgimage":83,"url":31}],79:[function(require,module,exports){
(function (global){
"use strict";var console=require("console-browserify"),$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,_find=require("lodash.find");function galleryLoader(e){var l=e.fileuploadConfig.url;return function(e){function a(a){var r=l[a],n=e[a+"Gallery"],o=e[a+"GalleryStatus"];return function(){o("loading"),$.getJSON(r,function(l){for(var a=0;a<l.files.length;a++)l.files[a]=e.remoteFileProcessor(l.files[a]);o(l.files.length),n(l.files.reverse())}).fail(function(){o(!1),e.notifier.error(e.t("Unexpected error listing files"))})}}function r(l){var a=e[l+"Gallery"],r=e[l+"GalleryStatus"];return function(e){var l=e.name;_find(a(),function(e){return e.name===l})||!1!==r()&&(a.unshift(e),r(a().length))}}e.mailingGallery=ko.observableArray([]),e.templateGallery=ko.observableArray([]),e.mailingGalleryStatus=ko.observable(!1),e.templateGalleryStatus=ko.observable(!1),e.loadMailingGallery=a("mailing"),e.loadTemplateGallery=a("template"),e.loadMailingImage=r("mailing"),e.loadTemplateImage=r("template");var n=e.showGallery.subscribe(function(l){!0===l&&!1===e.mailingGalleryStatus()&&(e.loadMailingGallery(),n.dispose())}),o=e.selectedImageTab.subscribe(function(l){1===l&&!1===e.templateGalleryStatus()&&(e.loadTemplateGallery(),o.dispose())},e,"change")}}module.exports=galleryLoader;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3,"lodash.find":14}],80:[function(require,module,exports){
(function (global){
"use strict";var console=require("console-browserify"),$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null;function removeGalleryImage(e){e.removeImage=function(o,l,r){var n=o.deleteUrl;$.ajax({url:n,method:"DELETE",type:"DELETE",success:function(o){e.notifier.success(e.t("gallery-remove-image-success"));var r=e[l+"Gallery"];(0,e[l+"GalleryStatus"])(o.files.length),r(o.files.reverse())},error:function(o){console.log(o),e.notifier.error(e.t("gallery-remove-image-fail"))}})}}module.exports=removeGalleryImage;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],81:[function(require,module,exports){
(function (global){
"use strict";var console=require("console-browserify"),$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,_omit=require("lodash.omit"),isEmail=require("validator/lib/isEmail");function getData(e){var o=_omit(ko.toJS(e.metadata),["urlConverter","template"]);return o.data=e.exportJS(),o}var loader=function(e){console.info("init server storage (save, test, download)");var o={name:"Save",enabled:ko.observable(!0),execute:function(){o.enabled(!1);var t=getData(e);console.info("SAVE DATA"),console.log(t),$.ajax({url:window.location.href,method:"POST",contentType:"application/json",data:JSON.stringify(t),success:function(o,t,a){console.log("save success"),e.notifier.success(e.t("save-message-success"))},error:function(o,t,a){console.log("save error"),console.log(a),e.notifier.error(e.t("save-message-error"))},complete:function(){o.enabled(!0)}})}},t={name:"Test",enabled:ko.observable(!0),execute:function(){console.info("TEST"),console.log(e.metadata.url.send),t.enabled(!1);var o=e.t("Insert here the recipient email address");if(!(o=global.prompt(e.t("Test email address"),o)))return t.enabled(!0);if(!isEmail(o))return global.alert(e.t("Invalid email address")),t.enabled(!0);console.log("TODO testing...",o);ko.toJS(e.metadata);var a={rcpt:o,html:e.exportHTML()};$.ajax({url:e.metadata.url.send,method:"POST",data:a,success:function(o,t,a){console.log("test success"),e.notifier.success(e.t("Test email sent..."))},error:function(o,t,a){console.log("test error"),console.log(a),e.notifier.error(e.t("Unexpected error talking to server: contact us!"))},complete:function(){t.enabled(!0)}})}},a={name:"Download",enabled:ko.observable(!0),execute:function(o){console.info("DOWNLOAD – "+o),a.enabled(!1),e.notifier.info(e.t("Downloading...")),e.exportHTMLtoTextarea("#downloadHtmlTextarea"),$("#downloadHtmlFilename").val(e.metadata.name()),$("#downloadForm").attr("action",e.metadata.url.zip+"?format="+o).submit(),a.enabled(!0)}};e.save=o,e.test=t,e.download=a};module.exports=loader;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3,"lodash.omit":15,"validator/lib/isEmail":37}],82:[function(require,module,exports){
"use strict";var debounce=require("lodash.debounce"),defaults=[0,1,2,3,5,8,13].map(function(t){return Math.round(.1*t*100)/100}).map(function(t){return t+"="+t+"em"}).join(" ");function addLetterSpacing(t,e){t.addButton("letterspacingselect",function(){return{type:"listbox",text:"Letter spacing",tooltip:"Letter spacing",values:(t.settings.spacing_formats||defaults).split(" ").map(function(t){var e=t,n=t,i=t.split("=");return i.length>1&&(e=i[0],n=i[1]),{text:e,value:n}}),fixedWidth:!0,onclick:function(t){t.control.settings.value&&(tinymce.activeEditor.formatter.register("letter-spacing",{inline:"span",styles:{"letter-spacing":t.control.settings.value}}),tinymce.activeEditor.formatter.apply("letter-spacing"))}}})}function each(t,e,n){var i,l;if(!t)return 0;if(n=n||t,void 0!==t.length){for(i=0,l=t.length;i<l;i++)if(!1===e.call(n,t[i],i,t))return 0}else for(i in t)if(t.hasOwnProperty(i)&&!1===e.call(n,t[i],i,t))return 0;return 1}function fontsizedialog(t,e){console.dir(t);var n=8,i=666,l=!1,o=[tinymce.util.I18n.translate("minimum size: 8px"),tinymce.util.I18n.translate("no decimals")].map(function(t){return"• "+t}).join("<br>");t.addButton("fontsizedialogbutton",{text:"Font size",tooltip:"Font size",classes:"fontsizedialogbutton",icon:!1,onPostRender:function(e){var n=e.control;function i(t){if(t.style&&t.style.fontSize)return n.text(tinymce.util.I18n.translate("Font size: ")+t.style.fontSize),l=t.style.fontSize,!1;l=!1,n.text(tinymce.util.I18n.translate("Font size"))}t.on("nodeChange",debounce(function(t){each(t.parents,i),l||(l=document.defaultView.getComputedStyle(t.parents[0]||t.element,null).getPropertyValue("font-size"))},150))},onclick:function(e){var r=l?/^(\d+)/.exec(l):null;r=Array.isArray(r)?r[0]:"",t.windowManager.open({title:"Enter a font-size",width:320,height:120,body:[{type:"label",multiline:!0,text:"",onPostRender:function(){this.getEl().innerHTML=o}},{type:"textbox",name:"bsdialogfontsize",label:"in pixel",autofocus:!0,value:r,onPostRender:function(){this.$el.attr({type:"number",min:n,step:1})}}],onsubmit:function(e){var l=~~e.data.bsdialogfontsize;l>=n&&l<=i&&t.execCommand("FontSize",!1,l+"px")}})}})}tinymce.PluginManager.add("spacing",addLetterSpacing),tinymce.PluginManager.add("fontsizedialog",fontsizedialog);var tinymceConfigFull={toolbar1:"bold italic forecolor backcolor hr | fontsizedialogbutton styleselect letterspacingselect removeformat | link unlink | pastetext code",plugins:["link hr paste lists textcolor colorpicker code spacing fontsizedialog"],style_formats:[{title:"Inline",items:[{title:"Bold",icon:"bold",inline:"strong"},{title:"Italic",icon:"italic",inline:"em"},{title:"Underline",icon:"underline",inline:"span",styles:{"text-decoration":"underline"}},{title:"Strikethrough",icon:"strikethrough",inline:"span",styles:{"text-decoration":"line-through"}},{title:"Superscript",icon:"superscript",inline:"sup"},{title:"Subscript",icon:"subscript",inline:"sub"},{title:"Code",icon:"code",inline:"code"}]},{title:"Alignment",items:[{title:"Left",icon:"alignleft",block:"div",styles:{"text-align":"left"}},{title:"Center",icon:"aligncenter",block:"div",styles:{"text-align":"center"}},{title:"Right",icon:"alignright",block:"div",styles:{"text-align":"right"}},{title:"Justify",icon:"alignjustify",block:"div",styles:{"text-align":"justify"}}]}]};module.exports=tinymceConfigFull;

},{"lodash.debounce":13}],83:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify"),defaultParameters=Object.freeze({}),transparentGif="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",isValidSize=function(e){return/(\d+)x(\d+)/.test(e.trim())};function html(e,t,a){return'\n    <input size="7" type="hidden" value="nothing" id="'+e+'" data-bind="value: '+e+", "+t+"\" />\n    <button data-bind=\"text: $root.t('widget-bgimage-button'), click: $root.openDialogGallery.bind($element, '"+e+"', '"+a+"');\">pick an image</button>\n    <button data-bind=\"click: $root.resetBgimage.bind($element, '"+e+"', '"+a+"'), button: {icons: {primary: 'fas fa-eraser'}, text: false, label: $root.t('widget-bgimage-reset') }\"></button>\n  "}module.exports=function(e){var t=e.basePath;return{widget:function(e,t,a){return{widget:"bgimage",defaultParameters:defaultParameters,html:html}},viewModel:function(e){e.showDialogGallery=ko.observable(!1),e.currentBgimage=ko.observable(!1),e.setBgImage=function(a,i,n){e.currentBgimage()(t+"/img/"+a),e.closeDialogGallery()},e.resetBgimage=function(e,t,a,i){a[e](transparentGif)},e.openDialogGallery=function(t,a,i,n){e.currentBgimage(i[t].bind(i)),e.showDialogGallery(!0)},e.closeDialogGallery=function(){e.currentBgimage(!1),e.showDialogGallery(!1)};var a=e.showDialogGallery.subscribe(function(t){!0===t&&!1===e.mailingGalleryStatus()&&(e.loadMailingGallery(),a.dispose())})}}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],84:[function(require,module,exports){
(function (global){
"use strict";var console=require("console-browserify"),$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,inlineDocument=require("juice/lib/inline")({}).inlineDocument,inlinerPlugin=function(e){e.inline=function(e){$("[style]:not([replacedstyle])",e).each(function(e,n){var i=$(n);i.attr("replacedstyle",i.attr("style"))});var n=[];$('style[data-inline="true"]',e).each(function(e,i){var t=$(i).html();t=(t=t.replace(/<!-- ko ((?!--).)*? -->/g,"")).replace(/<!-- \/ko -->/g,""),n.push(t),$(i).removeAttr("data-inline")});var i=n.join("\n"),t=function(n,i){return void 0===i&&(i=e),$(n,i)};t.root=function(){return $(":root",e)},inlineDocument(t,i,{styleAttributeName:"replacedstyle"})}};module.exports=inlinerPlugin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3,"juice/lib/inline":7}],85:[function(require,module,exports){
(function (global){
"use strict";var lsLoader,lsCommandPluginFactory,console=require("console-browserify"),ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,$="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null;module.exports=function(){};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],86:[function(require,module,exports){
(function (global){
var utilPlugin=function(e){global.Util={decodeURI:decodeURI,encodeURI:encodeURI,decodeURIComponent:decodeURIComponent,encodeURIComponent:encodeURIComponent}};module.exports=utilPlugin;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],87:[function(require,module,exports){
"use strict";require("knockout-sortable"),require("./bindings/jqueryui-spinner.js"),require("./bindings/jqueryui-tabs.js"),require("./bindings/colorpicker.js"),require("./bindings/blocks.js"),require("./bindings/csstext.js"),require("./bindings/bind-iframe.js"),require("./bindings/extdroppable.js"),require("./bindings/preloader.js"),require("./bindings/fileupload.js"),require("./bindings/virtuals.js"),require("./bindings/wysiwygs.js"),require("./bindings/scrollfix.js"),require("./bindings/if-subs.js"),require("./bindings/extsortables.js"),require("./bindings/eventable.js"),require("./bindings/tooltips.js"),require("./bindings/extender-pagination.js"),require("./bindings/validated-value.js"),require("./bindings/scrollintoview.js");

},{"./bindings/bind-iframe.js":44,"./bindings/blocks.js":45,"./bindings/colorpicker.js":47,"./bindings/csstext.js":48,"./bindings/eventable.js":49,"./bindings/extdroppable.js":50,"./bindings/extender-pagination.js":51,"./bindings/extsortables.js":52,"./bindings/fileupload.js":53,"./bindings/if-subs.js":54,"./bindings/jqueryui-spinner.js":55,"./bindings/jqueryui-tabs.js":56,"./bindings/preloader.js":57,"./bindings/scrollfix.js":59,"./bindings/scrollintoview.js":60,"./bindings/tooltips.js":62,"./bindings/validated-value.js":63,"./bindings/virtuals.js":64,"./bindings/wysiwygs.js":65,"knockout-sortable":11}],88:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,kojqui="undefined"!=typeof window?window.kojqui:"undefined"!=typeof global?global.kojqui:null,templateConverter=require("./converter/main.js"),console=require("console-browserify"),initializeViewmodel=require("./viewmodel.js"),templateSystem=require("./bindings/choose-template.js");if(!$.ui.version.match(/^1\.11\..*$/))throw"Usupported jQuery UI version detected: "+$.ui.version+" (we only support 1.11.*)";var pluginsCall=function(e,t,n,o){var i,a,r,d,l;l=[],void 0!==o&&o?(i=e.length-1,a=0,r=-1):(i=0,a=e.length-1,r=1);for(var s=i;s!=a+r;s+=r)void 0!==e[s][t]&&void 0!==(d=e[s][t].apply(e[s],n))&&l.push(d);return l},origDisposeCallback=ko.utils.domNodeDisposal.addDisposeCallback;ko.utils.domNodeDisposal.addDisposeCallback=function(e,t){origDisposeCallback(e,function(e){try{t(e)}catch(e){"function"==typeof console.debug&&console.debug("Caught unexpected dispose callback exception",e)}})};var _templateUrlConverter,bindingPluginMaker=function(e){return{viewModel:function(t){try{e("applyBindings",ko.applyBindings.bind(void 0,t))}catch(e){throw console.warn(e,e.stack),e}},dispose:function(){try{e("unapplyBindings",ko.cleanNode.bind(this,global.document.body))}catch(e){throw console.warn(e,e.stack),e}}}},templateCreator=function(e,t,n,o){var i=n;for(void 0!==n&&void 0!==o&&("object"==typeof t&&"replacedhtml"==t.tagName.toLowerCase()||(i+="-"+o));null==i||e.exists(i);)i="anonymous-"+Math.floor(1e5*Math.random()+1);if("object"==typeof t&&"replacedhtml"==t.tagName.toLowerCase()){var a=$(t),r=$("replacedhead",a),d=$("replacedbody",a);e.adder(i+"-head",r.html()||""),e.adder(i+"-show",d.html()||""),e.adder(i+"-preview",a.html()),e.adder(i+"-wysiwyg",a.html()),r.children().detach(),r.html("\x3c!-- ko block: content --\x3e\x3c!-- /ko --\x3e"),r.before("\x3c!-- ko withProperties: { templateMode: 'head' } --\x3e"),r.after("\x3c!-- /ko --\x3e"),d.html("\x3c!-- ko block: content --\x3e\x3c!-- /ko --\x3e"),e.adder(i+"-iframe",a[0].outerHTML)}else"object"==typeof t?e.adder(i,t.outerHTML):e.adder(i,t);return i};function _viewModelPluginInstance(e){var t;return{viewModel:function(n){t=e(n)},init:function(){void 0!==t&&void 0!==t.init&&t.init()},dispose:function(){void 0!==t&&void 0!==t.dispose&&t.dispose()}}}var templateLoader=function(e,t,n,o,i,a){console.info("TEMPLATE LOADER");var r=ko.bindingHandlers.wysiwygSrc.templateUrlConverter,d=n;$.ajax({url:t,method:"GET",success:function(t,n,l){templateCompiler(e,r,"template",t,o,d,i,a).init()},error:function(e,t,n){console.error("cannot retrieve HTML data from template"),$(".mo-standalone").html("<h1>error</h1><h2>"+n+"</h2>")}})},templateCompiler=function(e,t,n,o,i,a,r,d){var l=o.match(/^([\S\s]*)([<]html[^>]*>[\S\s]*<\/html>)([\S\s]*)$/i);if(null===l)throw"Unable to find <html> opening and closing tags in the template";var s=l[1],c={"<html":0,"<head":0,"<body":0,"</html":0,"</body":0,"</head":0},u=l[2].replace(/(<\/?)(html|head|body)([^>]*>)/gi,function(e,t,n,o){return c[(t+n).toLowerCase()]+=1,t+"replaced"+n+o});for(var m in c)if(c.hasOwnProperty(m)&&1!=c[m]){if(0===c[m])throw"ERROR: missing mandatory element "+m+">";if(c[m]>1)throw"ERROR: multiple element "+m+"> occourences are not supported (found "+c[m]+" occourences)"}var p=l[3],b=[],h=[];if(void 0!==r)for(var g=0;g<r.length;g++)"function"==typeof r[g]?h.push(_viewModelPluginInstance(r[g])):h.push(r[g]);var v=[],f={adder:function(e,t){if("string"!=typeof t)throw"Template system: cannot create new template "+e;var n=t.match(/(data)?-ko-[^ =:]*/g);n&&console.error("ERROR: found unexpected -ko- attribute in compiled template",e,", you probably mispelled it:",n),templateSystem.addTemplate(e,t),v.push(e)},exists:function(e){return void 0!==templateSystem.getTemplateContent(e)},dispose:function(){for(var e=v.length-1;e>=0;e--)templateSystem.removeTemplate(v[e])}};ko.bindingHandlers.block.templateExists=f.exists;for(var y=templateCreator.bind(void 0,f),w=e("translateTemplate",templateConverter.translateTemplate.bind(void 0,n,u,t,y)),k=e("generateModel",templateConverter.wrappedResultModel.bind(void 0,w)),C={},x=pluginsCall(h,"widget",[$,ko,kojqui]),E=0;E<x.length;E++)C[x[E].widget]=x[E];b.push.apply(b,e("generateEditors",templateConverter.generateEditors.bind(void 0,w,C,t,y,"+$root.contentListeners()")));var S=!1;if(null!=i){var M;M="string"==typeof i?ko.utils.parseJson(i):i,2==e("checkModel",templateConverter.checkModel.bind(void 0,k._unwrap(),b,M))&&(console.error("Trying to compile an incompatible template version!",k._unwrap(),b,M),S=!0);try{k._wrap(M)}catch(e){console.error("Unable to inject model content!",e),S=!0}}var T=s+templateSystem.getTemplateContent(n+"-iframe").replace(/(<\/?)replaced(html|head|body)([^>]*>)/gi,function(e,t,n,o){return t+n+o})+p,L=ko.bindingHandlers.bindIframe.tpl;ko.bindingHandlers.bindIframe.tpl=T;var I={dispose:function(){ko.bindingHandlers.bindIframe.tpl=L}};h.push(I),h.push(f);var D=e("initializeViewmodel",initializeViewmodel.bind(this,k,b,t,d));D.metadata=a;return void 0!==D.metadata.editorversion&&"0.17.4"!==D.metadata.editorversion&&console.log("The model being loaded has been created with a different editor version",D.metadata.editorversion,"runtime:","0.17.4"),D.metadata.editorversion="0.17.4",void 0!==w.version&&(void 0!==D.metadata.templateversion&&D.metadata.templateversion!==w.version&&console.log("The model being loaded has been created with a different template version",D.metadata.templateversion,"runtime:",w.version),D.metadata.templateversion=w.version),templateSystem.init(),h.push(bindingPluginMaker(e)),pluginsCall(h,"viewModel",[D]),S&&$("#incompatible-template").dialog({modal:!0,appendTo:"#mo-body",buttons:{Ok:function(){$(this).dialog("close")}}}),{model:D,init:function(){pluginsCall(h,"init",void 0,!0)},dispose:function(){pluginsCall(h,"dispose",void 0,!0)}}},checkFeature=function(e,t){if(!t())throw console.warn("Missing feature",e),"Missing feature "+e},isCompatible=function(){try{return checkFeature("matchMedia",function(){return void 0!==global.matchMedia}),checkFeature("XMLHttpRequest 2",function(){return"XMLHttpRequest"in global&&"withCredentials"in new global.XMLHttpRequest}),checkFeature("ES5 strict",function(){return function(){return void 0===this}()}),checkFeature("CSS borderRadius",function(){return void 0!==global.document.body.style.borderRadius}),checkFeature("CSS boxShadow",function(){return void 0!==global.document.body.style.boxShadow}),checkFeature("CSS boxSizing",function(){return void 0!==global.document.body.style.boxSizing}),checkFeature("CSS backgroundSize",function(){return void 0!==global.document.body.style.backgroundSize}),checkFeature("CSS backgroundOrigin",function(){return void 0!==global.document.body.style.backgroundOrigin}),checkBadBrowserExtensions(),!0}catch(e){return!1}},checkBadBrowserExtensions=function(){var e="checkbadbrowsersframe",t=ko.bindingHandlers.bindIframe.tpl;ko.bindingHandlers.bindIframe.tpl='<!DOCTYPE html>\r\n<html>\r\n<head><title>A</title>\r\n</head>\r\n<body><p style="color: blue" align="right" data-bind="style: { color: \'red\' }">B</p><div data-bind="text: content"></div></body>\r\n</html>\r\n',$("body").append('<iframe id="'+e+'" data-bind="bindIframe: $data"></iframe>');var n=global.document.getElementById(e);ko.applyBindings({content:"dummy content"},n);var o=n.contentWindow.document.doctype,i="<!DOCTYPE "+o.name+(o.publicId?' PUBLIC "'+o.publicId+'"':"")+(!o.publicId&&o.systemId?" SYSTEM":"")+(o.systemId?' "'+o.systemId+'"':"")+">"+"\n"+n.contentWindow.document.documentElement.outerHTML;ko.cleanNode(n),ko.removeNode(n),ko.bindingHandlers.bindIframe.tpl=t;var a='<!DOCTYPE html>\n<html><head><title>A</title>\n</head>\n<body><p align="right" style="color: red;" data-bind="style: { color: \'red\' }">B</p><div data-bind="text: content">dummy content</div>\n\n</body></html>',r='<!DOCTYPE html>\n<html><head><title>A</title>\n</head>\n<body><p style="color: red;" data-bind="style: { color: \'red\' }" align="right">B</p><div data-bind="text: content">dummy content</div>\n\n</body></html>',d='<!DOCTYPE html>\n<html><head><title>A</title>\n</head>\n<body><p style="color: red;" align="right" data-bind="style: { color: \'red\' }">B</p><div data-bind="text: content">dummy content</div>\n\n</body></html>';if(a!==i&&r!==i&&d!==i)throw console.info("BadBrowser.FrameContentCheck",i.length,a.length,r.length,d.length,i==a,i==r,i==d),console.info(i),"Unexpected frame content. Misbehaving browser: "+i.length+"/"+a.length+"/"+r.length+"/"+d.length},fixPageEvents=function(){global.addEventListener&&(global.addEventListener("drag",function(e){(e=e||global.event).preventDefault()},!1),global.addEventListener("dragstart",function(e){(e=e||global.event).preventDefault()},!1),global.addEventListener("dragover",function(e){(e=e||global.event).preventDefault()},!1),global.addEventListener("drop",function(e){(e=e||global.event).preventDefault()},!1),global.document.body.addEventListener("drop",function(e){e.preventDefault()},!1)),global.document.ondragstart&&(global.document.ondragstart=function(){return!1})};module.exports={compile:templateCompiler,load:templateLoader,isCompatible:isCompatible,fixPageEvents:fixPageEvents};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./bindings/choose-template.js":46,"./converter/main.js":70,"./viewmodel.js":93,"console-browserify":3}],89:[function(require,module,exports){
"use strict";var console=require("console-browserify"),_call=function(e){return e()},logs=[],_timedCall=function(e,o){var t,l=(new Date).getTime();"object"==typeof console&&console.time&&console.time(e),t=_call(o),"object"==typeof console&&console.time&&console.timeEnd(e);var n=(new Date).getTime()-l;return"object"!=typeof console||console.time||"function"==typeof console.debug&&console.debug(e,"took",n,"ms"),logs.push({name:e,time:n}),logs.length>100&&logs.unshift(),t};module.exports={timedCall:_timedCall,logs:logs};

},{"console-browserify":3}],90:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,undoManager=require("./undomanager.js"),undoserializer=require("./undoserializer.js"),addUndoStackExtensionMaker=function(e){return function(n){n.contentListeners(n.contentListeners()+2);var o=undoManager(n.content,{levels:100,undoLabel:ko.computed(function(){return n.t("Undo (#COUNT#)")}),redoLabel:ko.computed(function(){return n.t("Redo")})});return n.undo=o.undoCommand,n.undo.execute=e.bind(n,"undo",n.undo.execute),n.redo=o.redoCommand,n.redo.execute=e.bind(n,"redo",n.redo.execute),n.undoReset=e.bind(n,"undoReset",o.reset),n.setUndoModeMerge=o.setModeMerge,n.setUndoModeOnce=o.setModeOnce,o.setModeIgnore(),o.setUndoActionMaker(undoserializer.makeUndoAction.bind(void 0,n.content)),undoserializer.watchEnabled(!0),{pause:function(){o.setModeIgnore()},run:function(){o.setModeOnce()},init:function(){o.setModeOnce()},dispose:function(){n.contentListeners(n.contentListeners()-2),undoserializer.watchEnabled(!1),o.dispose()}}}};module.exports=addUndoStackExtensionMaker;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./undomanager.js":91,"./undoserializer.js":92}],91:[function(require,module,exports){
(function (global){
"use strict";var ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,reactor=require("ko-reactor/dist/ko-reactor.min.js"),console=require("console-browserify"),undoManager=function(e,o){var n,t=ko.observableArray(),i=ko.observableArray(),r=0,d=0,l={levels:100,undoLabel:"undo (#COUNT#)",redoLabel:"redo (#COUNT#)"};o="object"==typeof o?ko.utils.extend(l,o):l;var u=function(e){1==r?a(e,i):2==r?a(e,t):0==r&&(a(e,t),i.removeAll())},a=function(e,t){if(t().length>0){var i=(r=t()[t().length-1],d=e,void 0!==r.mergedAction?r.mergedAction(d):null);if(null!==i)return void(t()[t().length-1]=i)}var r,d;t().length>=o.levels&&t.shift(),n=t,t.push(e)},c=function(e,o,t){return{name:ko.computed(function(){return ko.utils.unwrapObservable(e).replace(/#COUNT#/,t().length)}),enabled:ko.computed(function(){return 0!==t().length}),execute:function(){var e=t.pop();if(e){var i=r;r=o;var l=d;d=3,e(),s(n),d=l,r=i}return!0}}},s=function(e){if(void 0===e)throw"Unexpected operation: stack cleaner called with undefined stack";e().length>0&&void 0!==e()[e().length-1].mergedAction&&delete e()[e().length-1].mergedAction},f=function(e,o){var n=function(e,o){e(),o()}.bind(void 0,e,o);return void 0!==e.mergedAction&&(n.mergedAction=e.mergedAction),n},m=function(e,o,n){if(void 0!==o)e(o);else{if(!n)throw"Unexpected condition: no item and no child.oldValues!";if("deleted"==n.status)e.splice(n.index,0,n.value);else{if("added"!=n.status)throw"Unsupported item.status: "+n.status;e.splice(n.index,1)}}},v=function(e,o,n,t,i){return e.bind(void 0,n,t,i)},g=("function"==typeof reactor?reactor:ko.watch)(e,{depth:-1,oldValues:1,mutable:!0,tagFields:!0},function(e,o,n){var t=void 0!==o.oldValues?o.oldValues[0]:void 0,i=v(m,e,o,t,n);1!=d&&(3==d?void 0!==i&&(i.mergedAction=function(e){return void 0!==e.mergeMe&&e.mergeMe?f(e,this):null},i.mergeMe=!0):void 0!==i&&(o.oldValues&&2==d&&(i.mergedAction=function(e,o,n){return"object"==typeof n.mergeableAction&&e==n.mergeableAction.child?this:null}.bind(i,o,n),i.mergeableAction={child:o,item:n}),n&&"deleted"==n.status?i.mergedAction=function(e,o,n){return"object"==typeof n.mergeableMove&&o.value==n.mergeableMove.item.value?f(n,this):null}.bind(i,o,n):n&&"added"==n.status?i.mergeableMove={child:o,item:n}:n&&console.warn("Unsupported item.status",n.status)),void 0!==i&&u(i))},{});return{push:u,undoCommand:c(o.undoLabel,1,t),redoCommand:c(o.redoLabel,2,i),reset:function(){t.removeAll(),i.removeAll()},setModeOnce:function(){d=2,s(t)},setModeMerge:function(){d=3,s(t)},setModeNormal:function(){d=0,s(t)},setModeIgnore:function(){d=1,s(t)},setUndoActionMaker:function(e){v=e},dispose:function(){g.dispose()}}};module.exports=undoManager;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3,"ko-reactor/dist/ko-reactor.min.js":12}],92:[function(require,module,exports){
(function (global){
"use strict";var listener,watchEnabled,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify"),_reference=function(e,n){for(var t,o,r=0,a=e;r<n.length;)switch(n.charAt(r)){case"(":")"==n.charAt(r+1)&&(a=a()),r+=2;break;case"[":o=n.indexOf("]",r),a=a[n.substring(r+1,o)],r=o+1;break;case".":-1==(t=n.indexOf("(",r))&&(t=n.length),-1==(o=n.indexOf("[",r))&&(o=n.length),o=Math.min(t,o),a=a[n.substring(r+1,o)],r=o}return a},_getPath=function(e,n){for(var t,o="",r=0;r<=e.length;r++)if(t=r<e.length?e[r]:n,ko.isObservable(t)&&(o+="()"),void 0!==t._fieldName)o+="."+t._fieldName;else{if(!(r>0&&"function"==typeof e[r-1].pop))throw console.error("Unexpected parent with no _fieldName and no parent array",r,e),"Unexpected parent with no _fieldName and no parent array";var a=ko.isObservable(e[r-1])?ko.utils.peekObservable(e[r-1]):e[r-1],i=ko.utils.arrayIndexOf(a,t);if(-1==i)throw console.error("Unexpected object not found in parent array",a,t,r,e.length,ko.toJS(a),ko.utils.unwrapObservable(t)),"Unexpected object not found in parent array";o+="["+i+"]"}return o},makeDereferencedUndoAction=function(e,n,t,o,r){e(_reference(n,t),o,r)},_setListener=function(e){listener=e},makeUndoActionDereferenced=function(e,n,t,o,r,a){try{var i=_getPath(t,o);if("object"!=typeof r&&"function"!=typeof r||(r=ko.toJS(r)),void 0!==a&&("object"==typeof a.value||"function"==typeof a.value))a=ko.toJS(a);if(void 0!==listener)try{listener(i,o,r,a)}catch(e){console.log("Undoserializer ignoring exception in listener callback")}return makeDereferencedUndoAction.bind(void 0,n,e,i,r,a)}catch(e){console.error("Exception processing undo",e,t,o,a)}},_watchEnabled=function(e){if(void 0===e)return watchEnabled;watchEnabled=e};module.exports={dereference:_getPath,reference:_reference,makeUndoAction:makeUndoActionDereferenced,setListener:_setListener,watchEnabled:_watchEnabled};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"console-browserify":3}],93:[function(require,module,exports){
(function (global){
"use strict";var $="undefined"!=typeof window?window.jQuery:"undefined"!=typeof global?global.jQuery:null,ko="undefined"!=typeof window?window.ko:"undefined"!=typeof global?global.ko:null,console=require("console-browserify"),performanceAwareCaller=require("./timed-call.js").timedCall,toastr=require("toastr");function initializeEditor(e,o,t,l){var r={galleryRecent:ko.observableArray([]),galleryRemote:ko.observableArray([]),selectedBlock:ko.observable(null),selectedItem:ko.observable(null),selectedTool:ko.observable(0),selectedImageTab:ko.observable(0),dragging:ko.observable(!1),draggingImage:ko.observable(!1),galleryLoaded:ko.observable(!1),showPreviewFrame:ko.observable(!1),previewMode:ko.observable("mobile"),showToolbox:ko.observable(!0),showTheme:ko.observable(!1),showGallery:ko.observable(!1),debug:ko.observable(!1),contentListeners:ko.observable(0),logoPath:"rs/img/mosaico32.png",logoUrl:".",logoAlt:"mosaico"};return r.content=e,r.blockDefs=o,r.notifier=toastr,r.tt=function(e,o){if(void 0!==o)for(var t in o)o.hasOwnProperty(t)&&(e=e.replace(new RegExp("__"+t+"__","g"),o[t]));return e},r.t=r.tt,r.ut=function(e,o){return o},r.templatePath=t,r.remoteUrlProcessor=function(e){return e},r.remoteFileProcessor=function(e){return void 0!==e.url&&(e.url=r.remoteUrlProcessor(e.url)),void 0!==e.thumbnailUrl&&(e.thumbnailUrl=r.remoteUrlProcessor(e.thumbnailUrl)),e},r.loadGallery=function(){r.galleryLoaded("loading");var e=l||"/upload/";$.getJSON(e,function(e){for(var o=0;o<e.files.length;o++)e.files[o]=r.remoteFileProcessor(e.files[o]);r.galleryLoaded(e.files.length),r.galleryRemote(e.files.reverse())}).fail(function(){r.galleryLoaded(!1),r.notifier.error(r.t("Unexpected error listing files"))})},r.fileToImage=function(e,o,t){return e.url},r.removeBlock=function(e,o){ko.utils.unwrapObservable(r.selectedBlock)==ko.utils.unwrapObservable(e)&&r.selectBlock(null,!0);var t=o.blocks.remove(e);return r.notifier.info(r.t("Block removed: use undo button to restore it...")),t},r.duplicateBlock=function(e,o){var t=ko.utils.unwrapObservable(e),l=ko.toJS(ko.utils.unwrapObservable(o.blocks)[t]);void 0!==l.id&&(l.id=""),o.blocks.splice(t+1,0,l)},r.moveBlock=function(e,o,t){var l=ko.utils.unwrapObservable(e),n=ko.utils.unwrapObservable(o.blocks);if(t&&l>0||!t&&l<n.length-1){var a=l+(t?-1:1),c=n[a];r.startMultiple(),o.blocks.splice(a,1),o.blocks.splice(l,0,c),r.stopMultiple()}},r.loadDefaultBlocks=function(){var e=ko.toJS(r.content().mainBlocks);e.blocks=[];for(var o=ko.utils.unwrapObservable(r.blockDefs),t=0;t<o.length;t++){var l=ko.toJS(o[t]);l.id="block_"+t,e.blocks.push(l)}performanceAwareCaller("setMainBlocks",r.content().mainBlocks._wrap.bind(r.content().mainBlocks,e))},r.addImage=function(e){var o=$("#main-wysiwyg-area .selectable-img.selecteditem");return 1==o.length&&"object"==typeof e&&void 0!==e.url&&(ko.contextFor(o[0])._src(e.url),!0)},r.addBlock=function(e,o){var t,l,n=r.selectedBlock();if(null!==n)for(var a=r.content().mainBlocks().blocks().length-1;a>=0;a--)if(r.content().mainBlocks().blocks()[a]()==n){t=a;break}void 0!==t?(l=t+1,r.content().mainBlocks().blocks.splice(l,0,e),r.notifier.info(r.t("New block added after the selected one (__pos__)",{pos:l}))):(r.content().mainBlocks().blocks.push(e),l=r.content().mainBlocks().blocks().length-1,r.notifier.info(r.t("New block added at the model bottom (__pos__)",{pos:l})));var c=r.content().mainBlocks().blocks()[l]();return r.selectBlock(c,!0),!1},r.findObjectsOfType=function(e,o){var t=[],l=ko.utils.unwrapObservable(e);for(var r in l)if(l.hasOwnProperty(r)){var n=ko.utils.unwrapObservable(l[r]);if(r.match(/Blocks$/))for(var a=ko.utils.unwrapObservable(n.blocks),c=0;c<a.length;c++){var i=ko.utils.unwrapObservable(a[c]);null!==o&&ko.utils.unwrapObservable(i.type)!=o||t.push(i)}else"object"==typeof n&&null!==n&&(null!==o&&ko.utils.unwrapObservable(n.type)!=o||t.push(n))}return t},r.placeholderHelper={element:function(e){return $(e[0].outerHTML).removeClass("ui-draggable").addClass("sortable-placeholder").css("display","block").css("position","relative").css("width","100%").css("height","auto").css("opacity",".8")[0]},update:function(e,o){}},r.startMultiple=function(){void 0!==r.setUndoModeMerge&&r.setUndoModeMerge()},r.stopMultiple=function(){void 0!==r.setUndoModeOnce&&r.setUndoModeOnce()},r.localGlobalSwitch=function(e,o){var t=e();return e(null===t?o():null),!1},r.selectItem=function(e,o,t){var l=ko.utils.peekObservable(e);return void 0!==t&&r.selectBlock(t,!1,!0),l!=o&&(e(o),null!==o&&0===r.selectedTool()&&r.selectedTool(1)),!1}.bind(r,r.selectedItem),r.isSelectedItem=function(e){return r.selectedItem()==e},r.selectBlock=function(e,o,t,l){var n=ko.utils.peekObservable(e);l||r.selectItem(null),n!=o&&(e(o),r.showGallery(!1),null===o||t||0!==r.selectedTool()||r.selectedTool(1))}.bind(r,r.selectedBlock),r.countSubscriptions=function(e,o){var t=0;for(var l in e)if(e.hasOwnProperty(l)){var n=e[l];if(ko.isObservable(n)&&(void 0!==n._defaultComputed&&(void 0!==o&&console.log(o+"/"+l+"/_",n._defaultComputed.getSubscriptionsCount()),t+=n._defaultComputed.getSubscriptionsCount()),void 0!==o&&console.log(o+"/"+l+"/-",n.getSubscriptionsCount()),t+=n.getSubscriptionsCount(),n=ko.utils.unwrapObservable(n)),"object"==typeof n&&null!==n){var a=r.countSubscriptions(n,void 0!==o?o+"/"+l+"@":void 0);void 0!==o&&console.log(o+"/"+l+"@",a),t+=a}}return t},r.loopSubscriptionsCount=function(){var e=r.countSubscriptions(r.content());global.document.getElementById("subscriptionsCount").innerHTML=e,global.setTimeout(r.loopSubscriptionsCount,1e3)},r.export=function(){return performanceAwareCaller("exportHTML",r.exportHTML)},r.exportHTML=function(){console.log("viewModel.exportHTML");var e="exportframe";$("body").append('<iframe id="'+e+'" data-bind="bindIframe: $data"></iframe>');var o=global.document.getElementById(e);ko.applyBindings(r,o),ko.cleanNode(o),r.inline&&r.inline(o.contentWindow.document);var t=o.contentWindow.document.doctype,l="<!DOCTYPE "+t.name+(t.publicId?' PUBLIC "'+t.publicId+'"':"")+(!t.publicId&&t.systemId?" SYSTEM":"")+(t.systemId?' "'+t.systemId+'"':"")+">"+"\n"+o.contentWindow.document.documentElement.outerHTML;ko.removeNode(o),l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=(l=l.replace(/<script ([^>]* )?type="text\/html"[^>]*>[\s\S]*?<\/script>/gm,"")).replace(/<!-- ko ((?!--).)*? -->/g,"")).replace(/<!-- \/ko -->/g,"")).replace(/ data-bind="[^"]*"/gm,"")).replace(/ data-mce-(href|src|style)="[^"]*"/gm,"")).replace(/ style="[^"]*"([^>]*) replaced(style="[^"]*")/gm,"$1 $2")).replace(/ replaced(style="[^"]*")([^>]*) style="[^"]*"/gm," $1$2")).replace(/ replaced(style="[^"]*")/gm," $1")).replace(/ http-equiv="[^"]*"([^>]*) replaced(http-equiv="[^"]*")/gm,"$1 $2")).replace(/ replaced(http-equiv="[^"]*")([^>]*) http-equiv="[^"]*"/gm," $1$2")).replace(/ replaced(http-equiv="[^"]*")/gm," $1")).replace(/&lt;%/g,"<%")).replace(/%&gt;/g,"%>");var n=(l=l.replace(/<replacedcc[^>]* condition="([^"]*)"[^>]*>([\s\S]*?)<\/replacedcc>/g,function(e,o,t){var l="\x3c!--[if "+o.replace(/&amp;/,"&")+"]>";return l+=t.replace(/<!-- cc:bc:([A-Za-z:]*) -->(<\/cc>)?<!-- cc:ac:\1 -->/g,"</$1>").replace(/><\/cc><!-- cc:sc -->/g,"/>").replace(/<!-- cc:bo:([A-Za-z:]*) --><cc/g,"<$1").replace(/^.*<!-- cc:start -->/,"").replace(/<!-- cc:end -->.*$/,""),l+="<![endif]--\x3e"})).match(/ data-[^ =]+(="[^"]+")? /)||l.match(/ replaced([^= ]*=)/);return n&&console.warn("Output HTML contains unexpected data- attributes or replaced attributes",n),l},r.exportHTMLtoTextarea=function(e){$(e).val(r.exportHTML())},r.exportJSONtoTextarea=function(e){$(e).val(r.exportJSON())},r.importJSONfromTextarea=function(e){r.importJSON($(e).val())},r.exportMetadata=function(){return ko.toJSON(r.metadata)},r.exportJSON=function(){return ko.toJSON(r.content)},r.exportJS=function(){return ko.toJS(r.content)},r.importJSON=function(e){var o=ko.utils.parseJson(e);r.content._wrap(o)},r.exportTheme=function(){var e={},o=r.content().theme(),t=function(e,o,l){for(var r in l)if(l.hasOwnProperty(r)){var n=ko.utils.unwrapObservable(l[r]);null!==n&&"object"==typeof n?t(r+".",o,n):o[e+r]=n}};t("",e,o);var l="";for(var n in e)e.hasOwnProperty(n)&&"type"!=n&&(l+=n+": "+e[n]+";\n");return l},r.loadImage=function(e){r.galleryRecent.unshift(e),r.selectedImageTab(0)},r.selectImage=function(e){r.showGallery(!0)},r.dialog=function(e,o){$(e).dialog(o)},r.log=function(e,o){},r}toastr.options={closeButton:!1,debug:!1,positionClass:"toast-bottom-full-width",target:"#mo-body",onclick:null,showDuration:"300",hideDuration:"1000",timeOut:"5000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"},module.exports=initializeEditor;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./timed-call.js":89,"console-browserify":3,"toastr":30}]},{},[43,1])(43)
});