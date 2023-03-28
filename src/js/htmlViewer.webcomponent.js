import GhHtmlElement from "@gudhub/gh-html-element";
class HtmlViewer extends GhHtmlElement {
    constructor() {
      super();
      this.appId;
      this.itemId;
      this.fileFieldId;
    }
  
    getAttributes() {
      this.appId = this.getAttribute('app-id');
      this.fileFieldId = this.getAttribute('file-field-id');
      this.itemId = this.getAttribute('item-id');
    }
  
    static get observedAttributes() {
      return ['app-id', 'file-field-id', 'item-id'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if(name == 'app-id' && newValue.indexOf('{{') == -1) {
        setTimeout(() => {
          this.getAttributes();
          if(this.appId && this.fileFieldId && this.itemId)
            this.init();
        }, 0);
      }
    }
  
    async init() {
      const self = this;
      this.render('<iframe frameborder="0"></iframe>');

      this.observe('iframeSrc', () => {
        this.querySelector('iframe').setAttribute('src', this.data.iframeSrc)
      });
      
      this.fileId = await gudhub.getFieldValue(this.appId, this.itemId, this.fileFieldId);

      if(this.fileId) {
        const file = await gudhub.getFile(this.appId, this.fileId);

        if(file) {
          self.data.iframeSrc = file.url + '?timestamp=' + file.last_update;
        }
      }

      this.value_address = {
        app_id: this.appId,
        item_id: this.itemId,
        field_id: this.fileFieldId
      };

      gudhub.on('gh_value_update', this.value_address, async (e, fieldValue) => {
        const file = await gudhub.getFile(this.appId, fieldValue);
        self.data.iframeSrc = file.url + '?timestamp=' + file.last_update;
      });

      // Subscribe to update file and replace with new src
      gudhub.on('gh_file_update', { file_id: this.fileId }, async function() {
        const file = await gudhub.getFile(self.appId, self.fileId);

        if (file) {
          self.data.iframeSrc = file.url + '?timestamp=' + file.last_update;
        }
        
      });

    }
  
    disconnectedCallback() {
      // Remove listener from update file
      gudhub.destroy('gh_file_update', { file_id: this.fileId });
      gudhub.destroy('gh_value_update', this.value_address);
    }
}
  
  if(!window.customElements.get('html-viewer')) {
    window.customElements.define('html-viewer', HtmlViewer);
  }