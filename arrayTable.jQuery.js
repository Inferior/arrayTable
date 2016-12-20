/*
*  Scope:
*    Creates a table from an array and inserts it into the selected element.
*
*  Options:
*    - dataArray (Multi-Directional Array) | List of data to add into the table
*    - headersIncluded (Boolean) | Does the first
*    - tableId (String) | Custom ID for the tableId
*    - sortByIndex (Integer) | Array index to sort the list by
*    - results per page (Integer) | Number of results to display
*
*/

(function ( $ ) {

  $.fn.toTable = function( options ){

    var settings = $.extend({
    //Set default option values
      dataArray: [],
      headersIncluded: false,
      tableId: "arrayTable",
      sortByIndex: 0,
      fixedListLength: false,
      fixedLength: null
    }, options );

// Remove table if already exists
if ($('#' + settings.tableId).length) {
  $('#' + settings.tableId).remove();
}


// --------------------------------------------------------------------------------
// ------------------------- Create table for data --------------------------------
// --------------------------------------------------------------------------------

  var element = this;
  var si = settings.sortByIndex; //used for array index to sort by
  var oldArray = settings.dataArray.slice();

  createTable();

  if (settings.headersIncluded) {
    createHeaders();
  }

  insertData();


  // --------------------------------------------------------------------------------
  // ------------------------------ Functions ---------------------------------------
  // --------------------------------------------------------------------------------

    function createTable(){
      //Create table for data
      element.append(function(){
        return '<table id="' + settings.tableId + '"></table>';;
      });
    };

    function createHeaders(){
      //Create headers for the table if included
      //Create header row
      var rowId = '<tr class="header_Row" " id="' + settings.tableId + '_Header"></tr>'
      $('#' + settings.tableId).append(function(){
        return rowId;
      });
      //Add header values
      for(c = 0; c < oldArray[0].length; c++){
          $('#' + settings.tableId + '_Header' ).append(function(){
            return '<th>' + oldArray[0][c] + '</th>';
          });
      }

      //Delete headers from array so they wont be added to the rows
      oldArray.splice(0,1);

    };


    function insertData(){
      //Insert data into the table

      if (settings.fixedListLength) {
        var listLength = settings.fixedLength;
      } else {
        var listLength = oldArray.length
      }

      //Sort array
      oldArray.sort(function(a, b){if(a[si] < b[si]) return -1; if(a[si] > b[si]) return 1; return 0; });
      for(r = 0; r < listLength; r++){
        if (r % 2 == 0) {
          var rowClass = 'even_Row';
        } else {
          var rowClass = 'odd_Row';
        }

        var rowId = '<tr class="' + rowClass +'" id="' + settings.tableId + '_' + r + '"></tr>'
        $('#' + settings.tableId).append(function(){
          return rowId;
        });

        //Loop through each row
        for(c = 0; c < oldArray[r].length; c++){
          //Loop through each column
            $('#' + settings.tableId + '_' + r ).append(function(){
              return '<td>' + oldArray[r][c] + '</td>';
            });

        }//End of column
      }//End of row
    };//End of createTable Function



    return this;
  }; //End of function
}( jQuery)); //End of plugin scope
