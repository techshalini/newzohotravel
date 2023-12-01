sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast"
    ],
    function(BaseController,MessageToast) {
      "use strict";
   
      var dep; var city; var place; var bill; var name; var emId; var pur; var day; let data;
      var DepLatestdate; var DepLatestDay; var DepLatestMonth;var DepLatestYear;var DepoDatePicker;var DepselectedDate; var DepformattedDate;var Depdate;
      var depDate;var depMonth;var depYear ;
    var ArrDatePicker; var ArrselectedDate; var ArrformattedDate; var Arrdate; var ArrDate; var ArrMonth; var ArrYear;
    var RetDatePicker; var RetselectedDate; var RetformattedDate; var Retdate; var RetDate; var RetMonth; var RetYear;
    var NumberOfmonth;  var NumberOfdays;
    return BaseController.extend("project1.controller.View4", {
        onInit: function() {
         
        },
 
        dep:function(){
          dep=this.getView().byId("department").getSelectedKey();
          console.log(dep);
          // checkSelect()
          if(dep=="Select"){
            alert("Please select the valid value")
          }
         
        },
 
       EID:function(){
        emId=this.getView().byId("emId").getSelectedItem().mProperties.text;
        console.log(emId);
        // checkSelect()
        if(emId=="Select"){
          alert("Please select the valid value")
 
        }
 
       },
 
       city:function(){
        city=this.getView().byId("city").getSelectedKey();
        console.log(city);
        // checkSelect()
        if(city=="Select"){
          alert("Please select the valid value")
         
        }
       },
 
       POV:function(){
        place=this.getView().byId("city2").getSelectedKey();
        console.log(place);
        //  checkSelect()
        if(place=="Select"){
          alert("Please select the valid value")
 
        }
       },
       name:function(){
        name=this.getView().byId("name").getSelectedKey();
        console.log(name);
        if(name=="Select"){
          alert("Please select the valid value")
        }
 
       },
       bill:function(){
        bill=this.getView().byId("billable").getSelectedItem().mProperties.text;
        console.log(bill);
        if(bill=="Select"){
          alert("Please select the valid value")
        }
       },
 
      //  checkSelect:function(){
      //  if(dep=="Select" || emId=="Select" || city=="Select" || place=="Select") {
      //   alert("Please select the valid value ")
      //  }
      //  },
 
        onSubmit: function(){
 
          const oRouter = this.getOwnerComponent().getRouter();
       
       
       
        pur= this.byId("purpose").mProperties.value
        console.log(pur);
        day= this.byId("day").mProperties.value
        console.log(day);
        let data = {
          "ID":"",
          "Expected_date_of_departure":"2023-01-01" ,
          "Billable":bill,
          "Employee_Department_department":dep,
          "Customer_Name_customername":name,
          "Departure_City_city":city,
          "Place_of_Visit_city":place,
          "Expected_Date_Of_Arrival":"2023-01-01",
          "Expected_Duration_In_Days":day,
          "Purpose_of_Visit": pur,
          "Expected_Date_Of_Return": "2023-01-01"
        }
        var JsonData = JSON.stringify(data)
                console.log(JsonData);
 
                let EndPoint = "/odata/v4/myservice/travelInitiate";
                // fetch(EndPoint, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JsonData
                // })
                //     .then(function (res) {
                //         if (res) {
                //           if( res.status ==="201" || res.status==="204"){
 
                //             console.log("Entity created successfully");
                //             // console.log(travelId);
                //             MessageToast.show(`Travel Request Generate Successfully`)
                //             // oRouter.navTo("RouteView3")
                //           }else {
                //             res.json().then((data) => {
                //               if (data && data.error && data.error.message) {
                //                   // Show the error message from the backend
                //                   MessageToast.show(data.error.message);
                //               }
                //               });
                //           }
                         
                //         }
                //         else {
                //             console.log("Failed");
                //         }
                //     })
                //     .catch(function (err) {
                //         console.log("error", err);
                //     })
 
                // ... (your existing code)
 
fetch(EndPoint, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JsonData
})
  .then(function (res) {
      if (res.ok) {
          console.log("Entity created successfully");
          MessageToast.show(`Travel Request Generated Successfully`);
          // Handle navigation or other actions upon successful creation
             oRouter.navTo("RouteView3");
             location.reload();
      } else {
          res.json().then((data) => {
              if (data && data.error && data.error.message) {
                  // Show the error message from the backend
                  MessageToast.show(data.error.message);
              }
          });
      }
  })
  .catch(function (err) {
      console.log("error", err);
  });
         },
         
 
        handleChange:function(oEvent){
          DepLatestdate=new Date();
          // DepLatestdate.setHours(0,0,0,0);
                DepLatestDay=DepLatestdate.getDate();
                DepLatestMonth=DepLatestdate.getMonth()+1;
                DepLatestYear=DepLatestdate.getFullYear();
                DepoDatePicker = oEvent.getSource();
                DepselectedDate = DepoDatePicker.getDateValue();
                // console.log("Selected Date:", selectedDate);
                DepformattedDate = sap.ui.core.format.DateFormat.getDateInstance().format(DepselectedDate);
                // console.log("Formatted Date:", formattedDate);
                Depdate = new Date(DepformattedDate);
                depDate = Depdate.getDate()
                depMonth = (Depdate.getMonth()) + 1
                depYear = Depdate.getFullYear()
                if(Depdate<DepLatestdate){
                  alert("Departure Date not be back date")
                  this.getView().byId("start").setValue("")
                }
        },
        handleChange1: function(oEvent){
               if(!Depdate){
                alert("Please fill the Departure Date First")
                this.getView().byId("date").setValue("")
               }
                ArrDatePicker = oEvent.getSource();
                ArrselectedDate = ArrDatePicker.getDateValue();
                // console.log("Selected Date:", selectedDate);
                ArrformattedDate = sap.ui.core.format.DateFormat.getDateInstance().format(ArrselectedDate);
                // console.log("Formatted Date:", formattedDate);
                Arrdate = new Date(ArrformattedDate);
                ArrDate = Arrdate.getDate()
                ArrMonth = (Arrdate.getMonth()) + 1
                ArrYear = Arrdate.getFullYear()
                console.log(Arrdate);
                if(Arrdate<Depdate){
                  alert("Arrival date not be backdate of Departure date");
                  this.getView().byId("date").setValue("")
 
                }
             
        },
        handleChange2: function(oEvent){
          if(!Arrdate){
            alert("Please fill the Arrival Date First")
            this.getView().byId("end").setValue("")
           }
            RetDatePicker = oEvent.getSource();
            RetselectedDate = RetDatePicker.getDateValue();
            // console.log("Selected Date:", selectedDate);
            RetformattedDate = sap.ui.core.format.DateFormat.getDateInstance().format(RetselectedDate);
            // console.log("Formatted Date:", formattedDate);
            Retdate = new Date(RetformattedDate);
            RetDate = Retdate.getDate()
            RetMonth= (Retdate.getMonth()) + 1
            RetYear = Retdate.getFullYear()
            console.log(Retdate);
            if(Retdate<Arrdate){
              alert("Return date not be backdate of Arrival date");
              this.getView().byId("end").setValue("")
 
            }
            else{
              if (RetMonth == 1 || RetMonth == 3 || RetMonth == 5 || RetMonth == 7 || RetMonth == 8 || RetMonth == 10 || RetMonth == 12) {
 
                NumberOfmonth = (RetMonth - ArrMonth) * 31
            }
            else if (RetMonth == 4 || RetMonth == 6 || RetMonth == 9 || RetMonth == 11) {
                NumberOfmonth = (RetMonth - ArrMonth) * 30
            }
            else if (RetMonth == 2) {
                NumberOfmonth = (RetMonth - RetMonth) * 28
            }
            NumberOfdays = (RetDate - ArrDate) + NumberOfmonth
            console.log(NumberOfdays);
            this.getView().byId("day").setValue(NumberOfdays)
         
            }
        },
 
     
 
      });
    }
  );