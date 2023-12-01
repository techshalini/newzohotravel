sap.ui.define(
  [
      "sap/ui/core/mvc/Controller"
  ],
  function(BaseController) {
    "use strict";

    return BaseController.extend("project1.controller.View3", {
      onInit: function() {
      },
      onAdd: function(){
          console.log("clicked");
          const route = this.getOwnerComponent().getRouter();
          route.navTo("RouteView4");
      },
     

       onBack: function(){
          console.log("back");
           this.getView().getParent().to("RouteView2");
   },
//    onDeleteItems: function(oEvent){
//     var oList = this.getView().byId("idlst");
//     var aSelectedItems = oList.getSelectedItems();
//     aSelectedItems.forEach(item => {
//         oList.removeItem(item);
//     });
// },
onDeleteLineItem : function () {

  var aItems = this.byId("table").getSelectedItems();



  if (!aItems.length) {

    MessageToast.show("nothing selected");

    return;

  }

  aItems.forEach(function (oItem) {

    oItem.getBindingContext().delete().catch(function (oError) {

      if (!oError.canceled) {

        // error was already reported to message model

      }

    });

  });

},
    });
  }
);