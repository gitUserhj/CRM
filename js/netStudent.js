    //璁剧疆闇€瑕佹樉绀虹殑渚�
	function showSetColumn(){
		$("#disColumn").find("input[name=check]").change(function(res) {
			if (this.checked == true) {
				$("#stuInfo").datagrid("showColumn", this.value);
			} else {
				$("#stuInfo").datagrid("hideColumn", this.value);
			}
		});
	}
	//鍏ㄩ€�
	function allChecked() {
		$("#disColumn").find("input").prop("checked",$("#allChecked").prop("checked"));
		var len = $("#disColumn").find("input[name=check]").length;
		for (var i = 0; i < len; i++) {
			$("#disColumn").find("input[name=check]").eq(i).change();//缁戝畾change浜嬩欢
		}
	}
	
    //娣诲姞瀛︾敓
	function AddStu(){
	    $('#createStu').window('open');
	}
    //璁剧疆闇€瑕佹樉绀虹殑鍒�
	function setShowColumn(){    
	    $("#showColumn").window('open');
	}
	
    //淇濆瓨鏂板瀛︾敓淇℃伅
   function saveStu(){
		if($("#addStudentForm").form("validate")) {//琛ㄥ崟楠岃瘉
			$.post(globalData.server +"student/api/CreateStudent", $("#addStudentForm").serialize(), function(r) {
				if(r.success) {
					$("#createStu").dialog({
						closed: true
					});
					$.messager.alert("娣诲姞鎴愬姛", "娣诲姞瀛︾敓鎴愬姛", "info");
					searchStu();//鏌ヨ
				} else {
					$.messager.alert("娣诲姞澶辫触", r.message, "info");
				}
			}, "json")
		} else {
			$.messager.alert("楠岃瘉鎻愮ず", "璇锋寜鐓ц姹傚～鍐欐暟鎹�", "info");
			return;
		}
    }
      
    //鏍煎紡鍖栨棩鏈�
    function formatTime(value, row, index) {
        if(value){
        	return formateTime(value);
        }else{
        	return value;
        }
    } 
   //鏌ヨ褰撳墠瀛︾敓鐨勮缁嗕俊鎭�
    function showStu(stuId){
   		$("#showStu").window({
   	        href: globalData.server+"student/api/getStuById?stuId="+stuId                
   	    });
       $("#showStu").window('open');
    }
   
   //缂栬緫褰撳墠瀛︾敓
    function editStu(stuId){
   		$("#showStu").window({
   	        href: globalData.server+"student/api/updateStuById?stuId="+stuId                
   	    });
   	  var roleName="缃戠粶鎺ㄥ箍涓撳憳";
      $("#showStu").window('open');
    }
   
    //淇濆瓨缂栬緫淇℃伅
   function updateStu(stuId){
		if($("#editStuForm").form("validate")) {//琛ㄥ崟楠岃瘉
				 $.post(globalData.server +"student/api/updateStudent?stuId="+stuId, $("#editStuForm").serialize(), function(r) {
					 if(r.success) {
						$('#showStu').window('close');//鍏抽棴绐楀彛
						$.messager.alert("缂栬緫鎴愬姛", "鏇存柊瀛︾敓淇℃伅鎴愬姛", "info");
						searchStu();//鏌ヨ
					} else {
						$.messager.alert("缂栬緫澶辫触", r.message, "info");
					}
				}, "json")
			} else {
				$.messager.alert("楠岃瘉鎻愮ず", "璇锋寜鐓ц姹傚～鍐欐暟鎹�", "info");
				return;
			} 
   }
    //鍒犻櫎鎸囧畾瀛︾敓淇℃伅
    function deleteStu(stuId){
    	$.messager.confirm("纭", "鎮ㄧ‘瀹氳鍒犻櫎璇ュ鐢熺殑淇℃伅鍚楋紵", function(r) {
			if(r) {
				$.post(
				   globalData.server + "student/api/deleteStudent", 
				   {stuId: stuId}, 
				   function(data) {
					if(data.success) {
						$.messager.alert("娑堟伅", "鍒犻櫎鎴愬姛");
						searchStu();//鏌ヨ
					} else {
						$.messager.alert("娑堟伅", data.message);
					}
				}, "json")
			}
		});
    }
    //鎵撳紑鏂板缓缃戠粶璺熻釜绐楀彛
    function createFollow(stuId,stuName){
    	    $("#addFollowForm").form('clear');//鍏堟竻绌鸿〃鍗曟暟鎹�
    	    $("#f_stuId").val(stuId);
    	    $("#f_stuName").val(stuName);
    	    $("#addFollow").window('open');            
    }
    //淇濆瓨璺熻釜淇℃伅
    function saveNetFollow(){
       $.post(globalData.server +"netFollow/api/createNetFollow", $("#addFollowForm").serialize(), function(r) {
		  if(r.success) {
			 $('#addFollow').window('close');//鍏抽棴绐楀彛
			 $.messager.alert("鏂板缓璺熻釜鎴愬姛", "鏂板缓缃戠粶璺熻釜鎴愬姛", "info");
		  } else {
			 $.messager.alert("鏂板缓璺熻釜澶辫触", r.message, "info");
		   }
		 }, "json");
    }
    
    //鏌ョ湅鏃ュ織
    function showLog(stuId){
	    $("#log").window({
	        href: globalData.server+'netFollow/api/showLog?stuId='+stuId,
	        width: 800,
	        height: 400,
	        title:'璺熻釜鏃ュ織',
	        modal: true
	    });
     }
    //鏍煎紡鍖栨棩蹇椾腑鐨勫唴瀹逛俊鎭�
    function formatLength(value, row, index) {
        var str = window.decodeURI(value);
        if (str.length >15) {
            return '<div title="' + str + '">' + str.substr(0, 15) + "..." + '</div>';
        }
        else {
            return str;
        }
    }
   
    //鎿嶄綔鍐呭
   function logAction(value, row, index) {
        var data = $("#logInfo").datagrid('getData');
        var row = data.rows[index];
        return '<a href="#" class="easyui-linkbutton l-btn l-btn-small l-btn-plain" iconcls="icon-search" plain="true" onclick="getDetail(' + "'" +row.content+ "'" + ')"><span class="l-btn-left l-btn-icon-left"><span class="l-btn-text">鏌ョ湅</span><span class="l-btn-icon icon-search">&nbsp;</span></span></a>';
    }
    //鏌ョ湅鏃ュ織涓殑鍐呭瀛楁鐨勮鎯呬俊鎭�
    function getDetail(obj){
        $.messager.alert("鍐呭鍒�",window.decodeURI(obj),"info");
    } 
    
    //娣诲姞鍔ㄦ€佷俊鎭�
    function AddDynamic(stuId,stuName){  
      $.messager.prompt('娣诲姞鍔ㄦ€佷俊鎭�', '璇疯緭鍏ュ唴瀹癸細', function (r) {
        if (r) {
            if (r.length=0) {
                return;
            }
            $.ajax({
                url: globalData.server+'dynamicMessage/api/createDynamicMessage',
                type: 'post',
                async:false,
                data: {"studentId":stuId,"studentName":stuName,"messageContent":r},
                dataType: 'json',
                error: function () {
                	$.messager.alert("鎻愮ず","绋嬪簭鍐呴儴閿欒","info");
                },
                success: function(data){ 
                	if(data.success){
                		$.messager.alert("娣诲姞鍔ㄦ€佹秷鎭�", "娣诲姞鍔ㄦ€佹秷鎭垚鍔�", "info");
                	}else{
                		$.messager.alert("娣诲姞鍔ㄦ€佹秷鎭�", r.message, "info");   
                	}
                }
            });
        }
    });
}   
//鎵归噺淇敼瀛︾敓鎵€灞炵殑鍜ㄨ甯�
function saveUpdateZiXun() {
    var ids = [];
    var rows =$('#stuInfo').datagrid('getSelections');
    if (rows.length <= 0) {
    	$.messager.alert("鎻愮ず", "璇峰厛閫夋嫨闇€瑕佷慨鏀圭殑瀛﹀憳璁板綍", "info");
        return false;
    }else{
    	for (var i = 0;i< rows.length;i++) {
            ids.push(rows[i].id);
         }
    }
    var studentIds = ids.join(',');   
    var askerId = $("#up_asker").combobox('getValue');
    if (askerId=="") {
    	$.messager.alert("鎻愮ず", "璇烽€夋嫨鍜ㄨ甯�", "info");
     }else {
          $.ajax({
            url: globalData.server+'/student/api/batchUpdateAskerId',
            type:'post',
            data: {"askerId":askerId,"studentIds":studentIds},
            dataType: 'json',
            error: function () {
            	$.messager.alert("鎻愮ず", "绋嬪簭閿欒", "info");
            },
            success: function (data) {
                if (data.success) {
                	$.messager.alert("鎵归噺鎿嶄綔", "鎵归噺淇敼鍜ㄨ甯堟垚鍔�", "info");
                	$("#changeAsker").window('close');
                    $("#stuInfo").datagrid('reload');
                }else {
                	$.messager.alert("鎵归噺鎿嶄綔", data.message, "info");
                }
            }
        });
    }
}