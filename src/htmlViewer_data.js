import  './js/htmlViewer.webcomponent.js';

export default class HtmlViewerData {
   getTemplate() {

	var fieldsTemplate = {
		constructor: 'field',
		name: 'HTML Viewer',
		icon: 'code_editor',
		type: 'html_viewer',
		model: {
		 field_name: "HTML Viewer",
		 data_type: "html_viewer",
    		 name_space: "html_viewer",
		 data_model: {
        	  application_id: '',
        	  file_field: '',
		  interpretation : [
		  {
		    src: 'form',
		    id: 'default',
		    settings: 
		    {
			editable: 1,
			show_field_name: 1,
			show_field: 1
		     }
		   }
		  ]
		 }
		}
	};

	return fieldsTemplate;
	}
  
      /*------------------------------- ACTION INTERPRETATION --------------------------------------*/
  
      getInterpretation(gudhub, value, appId, itemId, field_model) {
        var interpretations = [{
            id: 'default',
            name: 'Default',
            content: () =>
                  `<html-viewer app-id="{{field_model.data_model.application_id}}" file-field-id="{{field_model.data_model.file_field}}" item-id="${itemId}"></html-viewer>`
          },{
            id: 'simple_icon',
            name: 'Icon',
            content: () =>
                  `<span gh-icon="code_editor #000 40px normal"></span>`
          }]; 
  
        return interpretations;
      }
  
      /*--------------------------  ACTION SETTINGS --------------------------------*/
      getSettings(scope) {
        return [{
            title: 'Options',
            type: 'general_setting',
            icon: 'menu',
            columns_list: [
                [
                  {
                    type: 'ghElement',
                    property: 'data_model.application_id',
                    data_model: function () {
                        return {
                            field_name: 'App Id',
                            name_space: 'application_id',
                            data_type: 'app',
                            data_model: {
                              interpretation : [{
                                src: 'form',
                                id: 'with_text',
                                settings: {
                                    editable: 1,
                                    show_field_name: 1,
                                    show_field: 1
                                }
                              }]
                            }
                        };
                    }
                },
                {
                  type: 'ghElement',
                  property: 'data_model.file_field',
                  onInit: function (settingScope, fieldModel) {

                    settingScope.$watch(function () {
                        return fieldModel.data_model.application_id;
                    }, function(newValue) {
                        settingScope.field_model.data_model.app_id = newValue;
                    });

                  },
                  data_model: function (fieldModel) {
                    return {
                        data_model:{
                            app_id: fieldModel.data_model.application_id
                        },
                        field_name: 'File Field Id',
                        name_space: 'file_field_id',
                        data_type: 'field'
                    };
                  }
                },
              ]
            ]
        }];
      }
}
