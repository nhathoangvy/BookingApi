$(document).ready(function(){
  var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();
  $('.write').keyup(function() {
    delay(function(){
      $('.up').submit();
    }, 1500 );
});
/* ajax search query */
        $('#search').on('keyup', () => {
          var key = $('#search').val();
          $('.ajaxQuery').html('<ul></ul>');
           $.get( "/jsonfilter?key=" + key, (data) => {
              var jsonRes = data.filter;
              for(var i = 0 ; i < jsonRes.length; i++){
                $('.ajaxQuery ul').append('<li>' + jsonRes[i].property + '</li>');
              }
              var dataGet = $('.ajaxQuery ul').text();
              if($.trim(dataGet) === ""){
                $('.ajaxQuery ul').append('<li>Not found with ' + key + '</li>');
              }
            });
            /*.fail(function(error){
             dosome
          });*/
       });

       /* form task */

           $('input[name="purpose"]').val(
               $('input[type=radio]:checked').map(function() {
                   return $(this).val();
               }).toArray().join(", ")
           );


       /* edit task */
       var k = $('.idTask').text();
       var uID = $('input[name="userID"]').val();
       $('.edit-task').click( function() {
        $('.TASK').text("");
          $.get( "/task/api/" + k, function(data) {
              var task = data.task;
               for(var j = 0 ; j < task.length; j++){
                 if(task[j].userID == uID){
                   $('.TASK').append('<form action="/editTask" method ="post"><input type="hidden" name="id" value="' + task[j]._id + '" /><input type="hidden" name="status" value="' + task[j].status + '" /><input type="hidden" name="purpose" value="' + task[j].purpose + '" /><input type="hidden" name="property" value="' + task[j].property + '"/><br><div class="status"><input type="radio" name="s" value="draft" checked>Draft<input type="radio" name="s" value="public" >Public<input type="radio" name="s" value="done" >Done</div>Purpose:<div class="radio"><input type="radio" name="p" value="Buy" checked>Buy<input type="radio" name="p" value="Rent" >Rent</div>Local:<select name="local" value="' + task[j].local + '"><option value="Hamrun">Hamrun</option><option value="Vietnam">Viet Nam</option></select><div class="properties"><input type="checkbox" value="Terraced House"/>Terraced House<input type="checkbox" value="Flat"/>Flat</div>Price from:<input type="number" name="priceMin" value="' + task[j].priceMin + '"/>To :<input type="number" name="priceMax" value="' + task[j].priceMax + '"/><br><button type="submit">OK</button></form>');
  $('.delTasks').append('<form style="display:none" action="/del-task" method="post"><input type="hidden" name="id" value="'+ task[j]._id +'"><input type="submit" id="del-task"/></form>');
        }

             }
           });

      });
       /* ajax comments */

       $.get( "/task/api/" + k, (data) => {
         var user = data.user;
           var comment = data.comment;
          for(var i = 0 ; i < user.length; i++){
            for(var j = 0 ; j < comment.length; j++){
              if(typeof (comment[j].edited) === 'undefined'){
                comment[j].edited = "";
              }
          $('.comments').append('<div class="aside"><div class="img"><img src="'+ user[i].facebook.img +'"/><h3>'+ user[i].facebook.name +'</h3><span>' + comment[j].created + '</span><span class="lastEdit">Last edited : <i>' + comment[j].edited + '</i></span></div><div class="cm">' + comment[j].content + '</div>');

             if(comment[j].userID == uID){
$('.comments').append('<div class="editCMM" style="float:left"><a class="editCM" href="javascript:;">EDIT</a><form style="display:none;padding:14px" id="edit" action="/edit-cm" method="post"><input type="hidden" name="id" value="' + comment[j]._id + '"/><textarea name="content">' + comment[j].content +'</textarea><br><input type="submit" value="submit"/></form></div><form style="float:right;padding:14px" id="del" action="/del-cm" method="post"><input type="hidden" name="id" value="' + comment[j]._id + '"/><input type="submit" value="delete"/></form>');
}
   $('.comments').append('</div>');

             }
          }

          var dataGet = $('.comments').text();
          if($.trim(dataGet) === ""){
            $('.comments').append('No comment !');
          }
        });

              setInterval(function(){
                $('.editCMM').map(function(){
                      $(this).click(function(){
                        $(this).find('#edit').fadeIn();
                    });
                  });
                  $('input[name="p"]').click(function() {
                      $('input[name="purpose"]').val(
                          $('input[name="p"]:checked').map(function() {
                              return $(this).val();
                          }).toArray().join(", ")
                      );
                  });

                  $('input[name="s"]').click(function() {
                      $('input[name="status"]').val(
                          $('input[name="s"]:checked').map(function() {
                              return $(this).val();
                          }).toArray().join(", ")
                      );
                  });

                  var purpose = $('input[name="purpose"]').val();
                    $('input[name="p"]').map(function() {
                      var checkPurpose = $(this).val();
                      if($.trim(purpose) === $.trim(checkPurpose)){
                    $(this).prop('checked', true);
                        }
                    });

                  var stt = $('input[name="status"]').val();
                    $('input[name="s"]').map(function() {
                      var checkSTT = $(this).val();
                      if($.trim(stt) === $.trim(checkSTT)){
                    $(this).prop('checked', true);
                        }
                    });
                    $('.lastEdit').map(function(){
                      var lastE = $(this).find('i').text();
                        if($.trim(lastE) === ""){
                          $(this).remove();
                        }
                    });
                    $('input[type=checkbox]').click(function() {
                        $('input[name="property"]').val(
                            $('input[type=checkbox]:checked').map(function() {
                                return $(this).val();
                            }).toArray().join(", ")
                        );
                    });
               }, 100);
});
