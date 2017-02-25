function open_tab(tab_id,panel) {
                $("#"+tab_id).foundation('selectTab',$("#"+panel));
            }
            $("#item1").on('click',function(){
                $("#example-vert-tabs").foundation('selectTab', $("#panel1v")) 
            });
            $("#item2").on('click',function(){
                $("#example-vert-tabs").foundation('selectTab', $("#panel2v")) 
            });
            $("#item3").on('click',function(){
                $("#example-vert-tabs").foundation('selectTab', $("#panel3v")) 
            });
            $("#item4").on('click',function(){
                $("#example-vert-tabs").foundation('selectTab', $("#panel4v")) 
            });