import '@gudhub/gh-html-element';
class HtmlViewer extends GhHtmlElement {
    constructor() {
      super();
      this.appId;
      this.fileFieldId;
    }
  
    getAttributes() {
      this.appId = this.getAttribute('app-id');
      this.fileFieldId = this.getAttribute('file-field-id');
    }
  
    static get observedAttributes() {
      return ['app-id', 'file-field-id'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if(name == 'app-id' && newValue.indexOf('{{') == -1) {
        setTimeout(() => {
          this.getAttributes();
          if(this.appId && this.fileFieldId)
            this.init();
        }, 0);
      }
    }
  
    async init() {
      
    }
  
    disconnectedCallback() {
     
    }
  }
  
  if(!window.customElements.get('html-viewer')) {
    window.customElements.define('html-viewer', HtmlViewer);
  }